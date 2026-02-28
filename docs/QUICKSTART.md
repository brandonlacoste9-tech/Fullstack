# Quick Start Guide

This guide will help you get FullStack Studio up and running in less than 10 minutes.

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18 or higher installed
- ✅ PostgreSQL 15+ running locally or in the cloud
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/brandonlacoste9-tech/Fullstack.git
cd Fullstack

# Install dependencies (this may take a few minutes)
npm install
```

## Step 2: Setup Database

### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb fullstack

# Copy environment file
cp packages/database/.env.example packages/database/.env

# Edit .env and set your DATABASE_URL
# Example: postgresql://yourusername:yourpassword@localhost:5432/fullstack
```

### Option B: Docker PostgreSQL

Use Docker Compose to run PostgreSQL:

```bash
# Start just the database
docker-compose up db -d
```

### Run Migrations

```bash
# Generate Prisma Client and run migrations
npm run db:migrate --workspace=@fullstack/database
```

## Step 3: Setup API Keys

You'll need API keys from these services:

### Required Services

1. **Clerk** (Authentication) - https://clerk.com
   - Create a free account
   - Create a new application
   - Copy your API keys

2. **Stripe** (Payments) - https://stripe.com
   - Create a free account
   - Get your test API keys from Dashboard

3. **OpenAI** (AI Models) - https://platform.openai.com
   - Create an account
   - Generate an API key

### Optional Services

4. **GitHub** (Repository Integration) - https://github.com/settings/tokens
5. **Vercel** (Deployment) - https://vercel.com/account/tokens

### Configure Environment

```bash
# API environment
cp apps/api/.env.example apps/api/.env

# Web environment
cp apps/web/.env.example apps/web/.env

# Edit both .env files with your API keys
```

**apps/api/.env:**
```bash
DATABASE_URL="postgresql://..."
CLERK_SECRET_KEY="sk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
OPENAI_API_KEY="sk-..."
```

**apps/web/.env:**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## Step 4: Start Development Servers

Open 2 terminal windows:

### Terminal 1 - API Server

```bash
npm run dev --workspace=@fullstack/api
```

You should see:
```
🚀 API Server running on port 3001
📊 Features enabled: Multi-Agent, Auth, GitHub, Vercel, Stripe, Analytics
```

### Terminal 2 - Web App

```bash
npm run dev --workspace=@fullstack/web
```

You should see:
```
✓ Ready on http://localhost:3000
```

## Step 5: Access the Application

Open your browser and navigate to:

🌐 **http://localhost:3000**

You should see the FullStack Studio homepage!

## Step 6: Create Your First Project

1. Click "Get Started Free"
2. Sign up with email or OAuth
3. Go to Dashboard
4. Click "New Project"
5. Choose a template (e.g., "E-commerce Store")
6. Watch the AI agents build your project!

## Troubleshooting

### Database Connection Error

If you see "Can't reach database server":
- Check PostgreSQL is running: `pg_isready`
- Verify your DATABASE_URL is correct
- Make sure the database exists

### Port Already in Use

If port 3000 or 3001 is already in use:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Clerk Authentication Issues

- Verify your CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- Make sure you're using the correct environment (development)
- Check Clerk dashboard for any configuration issues

## Next Steps

Now that you're up and running:

1. 📚 Read the [Full Documentation](../README.md)
2. 🎨 Explore the [Agent System](./AGENTS.md)
3. 🚀 Learn about [Deployment](./DEPLOYMENT.md)
4. 🤝 Join our [Discord Community](https://discord.gg/fullstack)

## Need Help?

- 📖 Check our [FAQ](./FAQ.md)
- 💬 Ask on [Discord](https://discord.gg/fullstack)
- 🐛 Report issues on [GitHub](https://github.com/brandonlacoste9-tech/Fullstack/issues)

---

**Estimated setup time:** 10 minutes (excluding API key registration)

Happy building! 🚀
