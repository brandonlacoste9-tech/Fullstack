# FullStack Studio

> **AI-Powered Full-Stack Development Platform with Multi-Agent Swarm**

A comprehensive platform that combines AI agents, GitHub integration, Vercel deployment, team collaboration, and mobile apps to accelerate full-stack development.

[![CI/CD](https://github.com/brandonlacoste9-tech/Fullstack/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/brandonlacoste9-tech/Fullstack/actions/workflows/ci-cd.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## 🚀 Features

### ✅ 1. Core Platform
- **Multi-Agent Swarm** - 5 specialized AI agents working together:
  - 🎨 **Designer Agent** - Generates design systems and UI components
  - 💻 **Developer Agent** - Writes production-ready code
  - 🧪 **Tester Agent** - Creates and runs automated tests
  - 🚀 **Deployer Agent** - Handles CI/CD and deployments
  - 📋 **Planner Agent** - Creates execution plans and orchestrates workflow
- **Design System Generator** - Automatically creates consistent UI components
- **Persistent Planning** - Saves and tracks project progress
- **Browser Automation** - Built on Playwright for end-to-end testing
- **LLM Gateway** - Supports multiple AI models (GPT-4, Claude, Llama)

### ✅ 2. Authentication (Clerk)
- Email/Password authentication
- OAuth providers (Google, GitHub)
- Magic link sign-in
- Webhook user synchronization
- Session management

### ✅ 3. Database (PostgreSQL + Prisma)
8 comprehensive data models:
1. **User** - User accounts and profiles
2. **Project** - Development projects
3. **Task** - Project tasks and agent activities
4. **Team** - Team organizations
5. **TeamMember** - Team membership with roles
6. **Deployment** - Deployment history and status
7. **Subscription** - Stripe billing and usage tracking
8. **Activity** - Real-time activity feed

### ✅ 4. GitHub Integration
- Connect GitHub accounts via OAuth
- Create repositories automatically
- Push code with agent-generated commits
- Create and manage pull requests
- Branch management

### ✅ 5. Vercel Integration
- One-click deployment to Vercel
- Environment variable management
- Deployment tracking and history
- Project linking and configuration
- Multi-environment support (staging, production)

### ✅ 6. Team Collaboration
- Invite team members via email
- Role-based permissions (Owner, Admin, Member)
- Project sharing and access control
- Real-time activity tracking
- Team analytics

### ✅ 7. Example Projects
6 ready-to-use templates:
1. **E-commerce Store** - Full shopping cart and checkout
2. **Blog Platform** - Modern blogging with CMS
3. **SaaS Dashboard** - Analytics and metrics
4. **Social Network** - Posts, likes, and comments
5. **Task Manager** - Kanban-style project management
6. **Landing Page** - Marketing website

### ✅ 8. Stripe Billing
- **3 Pricing Tiers:**
  - 🆓 **Free** - $0/month (5 projects, 100K tokens)
  - ⭐ **Pro** - $29/month (Unlimited projects, 1M tokens)
  - 🏢 **Enterprise** - $199/month (Custom solutions)
- Subscription management
- Usage tracking (tokens, deployments, projects)
- Invoice history
- Customer portal

### ✅ 9. Analytics Dashboard
- Beautiful charts powered by Recharts
- Token consumption tracking
- Cost breakdown visualization
- Agent performance metrics
- Project statistics
- Real-time activity feed

### ✅ 10. Mobile App (React Native + Expo)
- **iOS & Android** support
- **4 Main Screens:**
  - 📊 **Dashboard** - Overview and stats
  - 📁 **Projects** - Project management
  - 💬 **Chat** - Real-time AI chat interface
  - ⚙️ **Settings** - Account and preferences
- Push notification ready
- Native navigation with bottom tabs

### ✅ 11. CI/CD Pipeline (GitHub Actions)
- Automated testing on every push
- Docker image builds
- Multi-environment deployment
- Staging → Production workflow
- Code coverage reporting
- Slack notifications

## 📦 Project Structure

```
Fullstack/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   └── lib/           # Utilities
│   ├── api/                # Express API backend
│   │   └── index.js       # API server with all integrations
│   └── mobile/             # React Native + Expo app
│       └── App.js         # Mobile app with 4 screens
├── packages/
│   ├── database/          # Prisma schema and client
│   │   └── schema.prisma  # 8 data models
│   ├── agents/            # Multi-agent swarm system
│   │   └── index.js      # 5 AI agents
│   ├── ui/               # Shared UI components
│   └── config/           # Shared configuration
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # CI/CD pipeline
├── docker-compose.yml     # Docker orchestration
└── package.json          # Workspace configuration
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Analytics visualization
- **Clerk** - Authentication

### Backend
- **Node.js + Express** - API server
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching (optional)

### Mobile
- **React Native** - Cross-platform framework
- **Expo** - Development platform
- **React Navigation** - Native navigation

### Integrations
- **Clerk** - Authentication & user management
- **Stripe** - Payment processing
- **GitHub API** - Repository management
- **Vercel API** - Deployment automation
- **OpenAI** - AI model access

### Infrastructure
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)
- Accounts for: Clerk, Stripe, GitHub, Vercel, OpenAI

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/brandonlacoste9-tech/Fullstack.git
cd Fullstack
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Copy example files:
```bash
cp apps/api/.env.example apps/api/.env
cp packages/database/.env.example packages/database/.env
```

Configure your `.env` files with your API keys:
- `DATABASE_URL` - PostgreSQL connection string
- `CLERK_SECRET_KEY` - Clerk authentication
- `STRIPE_SECRET_KEY` - Stripe payments
- `OPENAI_API_KEY` - OpenAI API access
- `GITHUB_TOKEN` - GitHub API access
- `VERCEL_TOKEN` - Vercel deployments

4. **Setup database**
```bash
npm run db:migrate
```

5. **Start development servers**

Terminal 1 - API:
```bash
npm run dev --workspace=@fullstack/api
```

Terminal 2 - Web:
```bash
npm run dev --workspace=@fullstack/web
```

Terminal 3 - Mobile (optional):
```bash
npm run start --workspace=@fullstack/mobile
```

6. **Access the applications**
- Web: http://localhost:3000
- API: http://localhost:3001
- Mobile: Expo DevTools will open automatically

### Docker Setup (Alternative)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📱 Mobile App Setup

1. Install Expo CLI:
```bash
npm install -g expo-cli
```

2. Run on iOS simulator:
```bash
npm run ios --workspace=@fullstack/mobile
```

3. Run on Android emulator:
```bash
npm run android --workspace=@fullstack/mobile
```

4. Scan QR code with Expo Go app on your phone

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific workspace
npm test --workspace=@fullstack/api
```

## 🚀 Deployment

### Automatic Deployment (via GitHub Actions)
Push to branches triggers automatic deployment:
- `main` → Production
- `staging` → Staging environment

### Manual Deployment

**Web (Vercel):**
```bash
cd apps/web
vercel --prod
```

**API (Railway/Render):**
```bash
# Follow provider-specific instructions
```

**Mobile (Expo):**
```bash
cd apps/mobile
expo build:android
expo build:ios
```

## 📚 API Documentation

### Agent Swarm Endpoints

```bash
# List all agents
GET /api/agents

# Execute multi-agent workflow
POST /api/agents/execute
{
  "projectId": "proj_123",
  "requirements": {
    "name": "E-commerce Store",
    "features": ["cart", "checkout", "payment"]
  }
}
```

### Project Management

```bash
# Get projects
GET /api/projects

# Create project
POST /api/projects
{
  "name": "My Project",
  "description": "Project description",
  "template": "ecommerce"
}
```

### GitHub Integration

```bash
# Create repository
POST /api/github/create-repo
{
  "name": "my-repo",
  "description": "Repo description",
  "githubToken": "ghp_..."
}

# Create pull request
POST /api/github/create-pr
{
  "owner": "username",
  "repo": "my-repo",
  "title": "Feature: Add authentication",
  "body": "Implements user auth",
  "head": "feature-branch",
  "githubToken": "ghp_..."
}
```

### Vercel Deployment

```bash
# Deploy to Vercel
POST /api/vercel/deploy
{
  "projectId": "proj_123",
  "projectName": "my-app"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** - GPT models for AI agents
- **Vercel** - Deployment platform
- **Clerk** - Authentication solution
- **Stripe** - Payment processing
- **Expo** - Mobile development platform

## 📞 Support

- 📧 Email: support@fullstack.studio
- 💬 Discord: [Join our community](https://discord.gg/fullstack)
- 🐦 Twitter: [@FullStackStudio](https://twitter.com/fullstackstudio)
- 📖 Documentation: [docs.fullstack.studio](https://docs.fullstack.studio)

## 🗺️ Roadmap

- [ ] WebSocket support for real-time collaboration
- [ ] Desktop app (Electron)
- [ ] Custom AI model training
- [ ] Visual workflow builder
- [ ] Code review agent
- [ ] Security scanning agent
- [ ] Performance optimization agent

---

Built with ❤️ by the FullStack Studio team
