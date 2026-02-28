// Express API Server
const express = require('express');
const cors = require('cors');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { AgentSwarm } = require('@fullstack/agents');
const prisma = require('@fullstack/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

function rateLimiter(req, res, next) {
  const identifier = req.auth?.userId || req.ip;
  const now = Date.now();
  
  if (!rateLimit[identifier]) {
    rateLimit[identifier] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return next();
  }
  
  if (now > rateLimit[identifier].resetTime) {
    rateLimit[identifier] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return next();
  }
  
  if (rateLimit[identifier].count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'Too many requests', 
      retryAfter: Math.ceil((rateLimit[identifier].resetTime - now) / 1000) 
    });
  }
  
  rateLimit[identifier].count++;
  next();
}

// Apply rate limiting to all routes
app.use(rateLimiter);

// Initialize Agent Swarm
const agentSwarm = new AgentSwarm();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Feature 2: Clerk Authentication webhook
app.post('/api/webhooks/clerk', async (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'user.created') {
    await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`.trim(),
        avatar: data.image_url,
      }
    });
  }
  
  res.json({ received: true });
});

// Feature 1: Multi-Agent Swarm endpoints
app.get('/api/agents', ClerkExpressRequireAuth(), (req, res) => {
  const agents = agentSwarm.listAgents();
  res.json({ agents });
});

app.post('/api/agents/execute', ClerkExpressRequireAuth(), async (req, res) => {
  const { projectId, requirements } = req.body;
  const result = await agentSwarm.executeWorkflow(requirements);
  res.json({ result });
});

// Feature 3: Projects CRUD
app.get('/api/projects', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: { tasks: true, deployments: true }
  });
  
  res.json({ projects });
});

app.post('/api/projects', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const project = await prisma.project.create({
    data: {
      ...req.body,
      userId: user.id
    }
  });
  
  res.json({ project });
});

// Feature 4: GitHub Integration
// Note: Rate limiting is applied via global middleware above
app.post('/api/github/create-repo', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({ auth: req.body.githubToken });
    
    const repo = await octokit.repos.createForAuthenticatedUser({
      name: req.body.name,
      description: req.body.description,
      private: false,
      auto_init: true
    });
    
    res.json({ repo: repo.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/github/create-pr', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({ auth: req.body.githubToken });
    
    const pr = await octokit.pulls.create({
      owner: req.body.owner,
      repo: req.body.repo,
      title: req.body.title,
      body: req.body.body,
      head: req.body.head,
      base: 'main'
    });
    
    res.json({ pr: pr.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Feature 5: Vercel Integration
app.post('/api/vercel/deploy', ClerkExpressRequireAuth(), async (req, res) => {
  const deployment = await prisma.deployment.create({
    data: {
      projectId: req.body.projectId,
      status: 'building',
      environment: 'production'
    }
  });
  
  // Simulated Vercel deployment
  setTimeout(async () => {
    await prisma.deployment.update({
      where: { id: deployment.id },
      data: {
        status: 'ready',
        vercelUrl: `https://${req.body.projectName}.vercel.app`,
        deployedAt: new Date()
      }
    });
  }, 5000);
  
  res.json({ deployment });
});

// Feature 6: Team Collaboration
app.post('/api/teams', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const team = await prisma.team.create({
    data: {
      name: req.body.name,
      slug: req.body.slug,
      members: {
        create: {
          userId: user.id,
          role: 'owner'
        }
      }
    }
  });
  
  res.json({ team });
});

app.post('/api/teams/:teamId/invite', ClerkExpressRequireAuth(), async (req, res) => {
  const member = await prisma.teamMember.create({
    data: {
      teamId: req.params.teamId,
      userId: req.body.userId,
      role: req.body.role || 'member'
    }
  });
  
  res.json({ member });
});

// Feature 8: Stripe Billing
app.post('/api/stripe/create-checkout', ClerkExpressRequireAuth(), async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{
      price: req.body.priceId,
      quantity: 1,
    }],
    success_url: `${process.env.APP_URL}/success`,
    cancel_url: `${process.env.APP_URL}/pricing`,
  });
  
  res.json({ sessionId: session.id });
});

app.post('/api/webhooks/stripe', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Update user subscription
    await prisma.subscription.create({
      data: {
        userId: session.client_reference_id,
        stripeCustomerId: session.customer,
        stripePriceId: session.line_items.data[0].price.id,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });
  }
  
  res.json({ received: true });
});

// Feature 9: Analytics endpoints
app.get('/api/analytics/usage', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id }
  });
  
  res.json({
    tokensUsed: subscription?.tokensUsed || 0,
    projectsCount: subscription?.projectsCount || 0,
    deploymentsCount: subscription?.deploymentsCount || 0
  });
});

app.get('/api/analytics/activities', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { project: true }
  });
  
  res.json({ activities });
});

// Feature 7: Example Projects/Templates
app.get('/api/templates', (req, res) => {
  const templates = [
    { id: 1, name: 'E-commerce Store', description: 'Full-featured online store with cart and checkout', tech: ['Next.js', 'Stripe', 'Prisma'] },
    { id: 2, name: 'Blog Platform', description: 'Modern blogging platform with CMS', tech: ['Next.js', 'MDX', 'Tailwind'] },
    { id: 3, name: 'SaaS Dashboard', description: 'Analytics dashboard with charts and metrics', tech: ['React', 'Recharts', 'PostgreSQL'] },
    { id: 4, name: 'Social Network', description: 'Social platform with posts, likes, and comments', tech: ['Next.js', 'Clerk', 'Prisma'] },
    { id: 5, name: 'Task Manager', description: 'Kanban-style task management app', tech: ['React', 'DnD Kit', 'Zustand'] },
    { id: 6, name: 'Landing Page', description: 'Beautiful marketing landing page', tech: ['Next.js', 'Framer Motion', 'Tailwind'] }
  ];
  
  res.json({ templates });
});

app.post('/api/templates/:id/create', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  const templateId = req.params.id;
  
  // Create project from template
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      template: `template-${templateId}`,
      userId: user.id,
      status: 'active'
    }
  });
  
  res.json({ project });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  console.log(`📊 Features enabled: Multi-Agent, Auth, GitHub, Vercel, Stripe, Analytics`);
});
