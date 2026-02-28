# Architecture Overview

This document describes the technical architecture of FullStack Studio.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)    │    Mobile App (React Native + Expo)     │
│  - React 18           │    - iOS & Android                       │
│  - Tailwind CSS       │    - Expo SDK                            │
│  - Recharts           │    - React Navigation                    │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTPS/WSS
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API Gateway Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  Express API Server (Node.js)                                    │
│  - RESTful endpoints                                             │
│  - Clerk authentication middleware                               │
│  - Request validation                                            │
│  - Rate limiting                                                 │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
┌─────────────────────┐  ┌──────────────┐  ┌──────────────────┐
│   Business Logic    │  │   Agents     │  │  Integrations    │
├─────────────────────┤  ├──────────────┤  ├──────────────────┤
│ - Projects          │  │ - Designer   │  │ - GitHub API     │
│ - Tasks             │  │ - Developer  │  │ - Vercel API     │
│ - Teams             │  │ - Tester     │  │ - Stripe API     │
│ - Deployments       │  │ - Deployer   │  │ - OpenAI API     │
│ - Analytics         │  │ - Planner    │  │ - Clerk Auth     │
└─────────────────────┘  └──────────────┘  └──────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
┌─────────────────────┐  ┌──────────────┐  ┌──────────────────┐
│    PostgreSQL       │  │    Redis     │  │   File Storage   │
│  - Primary DB       │  │  - Cache     │  │   - S3/R2        │
│  - 8 Data Models    │  │  - Sessions  │  │   - Assets       │
│  - Prisma ORM       │  │  - Queues    │  │   - Uploads      │
└─────────────────────┘  └──────────────┘  └──────────────────┘
```

## Component Architecture

### Frontend (Next.js App Router)

```
apps/web/
├── app/                    # App Router pages
│   ├── layout.js          # Root layout with Clerk
│   ├── page.js            # Home page
│   ├── dashboard/         # Dashboard routes
│   ├── projects/          # Project management
│   ├── analytics/         # Analytics dashboard
│   └── api/               # API routes (Next.js API)
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── forms/            # Form components
│   └── charts/           # Chart components
└── lib/                   # Utilities
    ├── api.js            # API client
    ├── auth.js           # Auth helpers
    └── utils.js          # Common utilities
```

### Backend (Express API)

```
apps/api/
├── index.js              # Main server file
├── routes/               # Route handlers
│   ├── agents.js        # Agent endpoints
│   ├── projects.js      # Project CRUD
│   ├── github.js        # GitHub integration
│   ├── vercel.js        # Vercel integration
│   └── stripe.js        # Billing endpoints
├── middleware/          # Express middleware
│   ├── auth.js         # Clerk auth middleware
│   ├── validate.js     # Request validation
│   └── rateLimit.js    # Rate limiting
├── services/           # Business logic
│   ├── AgentService.js # Agent orchestration
│   ├── ProjectService.js
│   └── DeployService.js
└── utils/              # Helper functions
```

### Packages (Shared Code)

```
packages/
├── database/           # Prisma schema & client
│   ├── schema.prisma  # Data models
│   ├── migrations/    # Database migrations
│   └── seed.js       # Seed data
├── agents/            # Multi-agent system
│   ├── Designer.js   # Design agent
│   ├── Developer.js  # Code agent
│   ├── Tester.js     # Test agent
│   ├── Deployer.js   # Deploy agent
│   ├── Planner.js    # Planning agent
│   └── Swarm.js      # Orchestration
├── ui/               # Shared components
│   ├── Button.js
│   ├── Card.js
│   └── Input.js
└── config/           # Shared configuration
    ├── constants.js
    └── env.js
```

## Data Models

### Core Entities

```typescript
// User
{
  id: string          // Primary key
  clerkId: string     // Clerk user ID
  email: string       // Email address
  name: string?       // Display name
  avatar: string?     // Avatar URL
  createdAt: DateTime
  updatedAt: DateTime
}

// Project
{
  id: string
  name: string
  description: string?
  template: string?        // Template ID
  githubRepoUrl: string?   // GitHub repo
  vercelProjectId: string? // Vercel project
  userId: string           // Owner
  teamId: string?          // Optional team
  status: string           // active, archived, deploying
  createdAt: DateTime
  updatedAt: DateTime
}

// Task
{
  id: string
  title: string
  description: string?
  status: string       // pending, in_progress, completed, failed
  priority: string     // low, medium, high
  agentType: string?   // Which agent handled it
  projectId: string
  userId: string
  createdAt: DateTime
  completedAt: DateTime?
}

// Team
{
  id: string
  name: string
  slug: string         // URL-friendly identifier
  createdAt: DateTime
}

// TeamMember
{
  id: string
  role: string         // owner, admin, member
  teamId: string
  userId: string
  createdAt: DateTime
}

// Deployment
{
  id: string
  projectId: string
  vercelUrl: string?
  status: string       // pending, building, ready, error
  environment: string  // production, staging
  commitSha: string?
  createdAt: DateTime
  deployedAt: DateTime?
}

// Subscription
{
  id: string
  userId: string
  stripeCustomerId: string
  stripePriceId: string
  tier: string         // free, pro, enterprise
  status: string       // active, canceled, past_due
  tokensUsed: number
  projectsCount: number
  deploymentsCount: number
  currentPeriodStart: DateTime
  currentPeriodEnd: DateTime
}

// Activity
{
  id: string
  type: string         // Event type
  description: string  // Human-readable description
  metadata: JSON?      // Additional data
  projectId: string?
  userId: string
  createdAt: DateTime
}
```

## Multi-Agent System

### Agent Hierarchy

```
Planner Agent (Orchestrator)
    │
    ├── Designer Agent
    │   ├── Generate design system
    │   ├── Create component library
    │   └── Output design tokens
    │
    ├── Developer Agent
    │   ├── Generate code from specs
    │   ├── Implement features
    │   └── Refactor code
    │
    ├── Tester Agent
    │   ├── Generate tests
    │   ├── Run test suites
    │   └── Report coverage
    │
    └── Deployer Agent
        ├── Setup CI/CD
        ├── Deploy to Vercel
        └── Monitor deployments
```

### Agent Communication

Agents communicate through a message queue system:

```javascript
// Message format
{
  id: string,
  from: AgentType,
  to: AgentType,
  type: MessageType,
  payload: any,
  timestamp: DateTime
}
```

### Workflow Example

1. **User Request:** "Create an e-commerce store"
2. **Planner** creates execution plan
3. **Designer** generates design system
4. **Developer** writes code based on design
5. **Tester** runs quality checks
6. **Deployer** pushes to production
7. **Planner** marks workflow complete

## Security Architecture

### Authentication Flow

```
1. User → Clerk (Sign in)
2. Clerk → Web App (Session token)
3. Web App → API (Bearer token)
4. API → Clerk (Verify token)
5. API → Database (Fetch user data)
6. API → Web App (Protected resource)
```

### Authorization Layers

1. **Clerk Middleware** - Verifies JWT tokens
2. **Role-Based Access** - Team role checks
3. **Resource Ownership** - User owns resource
4. **Rate Limiting** - Prevents abuse

## Performance Optimizations

### Caching Strategy

```javascript
// Redis cache layers
{
  user: 3600,           // 1 hour
  project: 1800,        // 30 minutes
  analytics: 300,       // 5 minutes
  templates: 86400      // 24 hours
}
```

### Database Indexing

```sql
-- Key indexes
CREATE INDEX idx_projects_user ON projects(userId);
CREATE INDEX idx_tasks_project ON tasks(projectId);
CREATE INDEX idx_activities_user ON activities(userId);
CREATE INDEX idx_team_members ON team_members(teamId, userId);
```

### CDN & Edge

- Static assets → Vercel Edge Network
- API responses → CloudFlare caching
- User uploads → S3 + CloudFront

## Scalability

### Horizontal Scaling

- **Web App:** Vercel auto-scaling
- **API:** Multiple containers via Docker
- **Database:** Read replicas + connection pooling
- **Queue:** Redis cluster for job processing

### Vertical Scaling

- **Database:** Increase PostgreSQL resources
- **Cache:** Increase Redis memory
- **API:** Increase container CPU/RAM

## Monitoring & Observability

### Metrics Tracked

- Request latency (p50, p95, p99)
- Error rates
- Database query performance
- Agent execution time
- API endpoint usage
- User session duration

### Logging

```javascript
// Structured logging
{
  timestamp: DateTime,
  level: 'info' | 'warn' | 'error',
  service: 'api' | 'web' | 'agent',
  message: string,
  metadata: object
}
```

### Alerts

- API response time > 1s
- Error rate > 1%
- Database CPU > 80%
- Disk space < 20%
- Failed deployments

## Technology Decisions

### Why Next.js?
- Server-side rendering for SEO
- Built-in API routes
- Excellent developer experience
- Vercel integration

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Great TypeScript support
- Active development

### Why Clerk?
- Complete auth solution
- OAuth providers included
- Webhook support
- Excellent documentation

### Why Stripe?
- Industry-standard payments
- Subscription management
- Excellent API & docs
- Strong security

### Why React Native + Expo?
- Cross-platform (iOS/Android)
- Over-the-air updates
- Large ecosystem
- Rapid development

## Future Architecture

### Planned Improvements

1. **GraphQL API** - More flexible querying
2. **WebSocket** - Real-time updates
3. **Microservices** - Break down monolith
4. **Event Sourcing** - Audit trail
5. **CQRS** - Separate read/write models

---

**Next:** [API Reference](./API_REFERENCE.md)
