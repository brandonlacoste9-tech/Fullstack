# Fullstack Studio

A comprehensive full-stack development platform with AI-powered agents, team collaboration, and multi-platform deployment.

## 🚀 Features

### ✅ 1. Core Platform
- **Multi-Agent Swarm System** - 5 specialized AI agents:
  - Planning Agent: Project planning and task breakdown
  - Code Generation Agent: Automated code generation
  - Testing Agent: Test creation and execution
  - Documentation Agent: Auto-generated documentation
  - Deployment Agent: CI/CD and deployment automation
- **Design System Generator** - Automated UI component generation
- **Persistent Planning** - Save and track project plans
- **Browser Automation** - Automated testing and workflows
- **LLM Gateway** - Integrated AI capabilities

### ✅ 2. Authentication (Clerk)
- Email/Password authentication
- OAuth providers (Google, GitHub)
- Magic link authentication
- Webhook-based user synchronization

### ✅ 3. Database (PostgreSQL + Prisma)
8 comprehensive data models:
- User management
- Project tracking
- Task management
- Team collaboration
- Team member roles
- Activity logging
- Usage metrics
- Deployment tracking

### ✅ 4. GitHub Integration
- Connect GitHub accounts
- Create repositories automatically
- Push code directly from the platform
- Create pull requests programmatically

### ✅ 5. Vercel Integration
- One-click deployment
- Environment variable management
- Deployment tracking and monitoring
- Project linking and configuration

### ✅ 6. Team Collaboration
- Invite team members via email
- Role-based access control (Owner/Admin/Member)
- Project sharing and permissions
- Real-time activity tracking

### ✅ 7. Example Projects
6 ready-to-use templates:
- Next.js SaaS Starter
- E-commerce Store
- Blog & CMS
- Analytics Dashboard
- REST API Backend
- Portfolio Website

### ✅ 8. Stripe Billing
- 3 pricing tiers:
  - **Free**: 5 projects, 100 API calls/month
  - **Pro**: Unlimited projects, 10,000 API calls/month
  - **Enterprise**: Unlimited everything, custom features
- Subscription management
- Usage tracking and limits
- Invoice history
- Customer portal integration

### ✅ 9. Analytics Dashboard
- Real-time usage charts (Recharts)
- Token consumption tracking
- Cost breakdown visualization
- Agent performance metrics
- Project analytics
- Activity feed with live updates

### ✅ 10. Mobile App (React Native + Expo)
- iOS & Android support
- 4 main screens:
  - Dashboard: Overview and statistics
  - Projects: Project management
  - Chat: Real-time AI chat interface
  - Settings: User preferences and account
- Push notification support
- Native navigation

### ✅ 11. CI/CD Pipeline (GitHub Actions)
- Automated testing on PR
- Docker container builds
- Multi-environment deployment
- Staging → Production workflow
- Automatic Vercel deployments

## 📦 Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (Analytics)
- SWR (Data Fetching)

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Authentication
- Clerk

### Payment Processing
- Stripe

### Integrations
- GitHub (Octokit)
- Vercel API
- OpenAI / LLM Gateway

### Mobile
- React Native
- Expo
- React Navigation

### DevOps
- Docker
- GitHub Actions
- Vercel

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20.x or higher
- PostgreSQL 15 or higher
- Docker (optional)
- Stripe account
- Clerk account
- GitHub account
- Vercel account

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

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Database connection string
- Clerk API keys
- Stripe API keys
- GitHub credentials
- Vercel token
- OpenAI API key

4. **Set up the database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Mobile App Setup

1. **Navigate to mobile directory**
```bash
cd mobile
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Expo**
```bash
npm start
```

4. **Run on device**
- iOS: Press `i` or scan QR code with Camera app
- Android: Press `a` or scan QR code with Expo Go app

## 🐳 Docker Deployment

### Development
```bash
docker-compose up
```

### Production
```bash
docker build -t fullstack-app .
docker run -p 3000:3000 --env-file .env fullstack-app
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📚 API Documentation

### Authentication
- `POST /api/webhooks/clerk` - Clerk user sync webhook

### Stripe
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler
- `POST /api/stripe/portal` - Customer portal access

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Teams
- `GET /api/teams` - List user teams
- `POST /api/teams` - Create team
- `POST /api/teams/:id/invite` - Invite team member

### GitHub
- `POST /api/github/repos` - Create repository
- `POST /api/github/push` - Push code
- `POST /api/github/pr` - Create pull request

### Vercel
- `POST /api/vercel/deploy` - Deploy to Vercel
- `GET /api/vercel/status/:id` - Check deployment status

## 📊 Project Structure

```
Fullstack/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── components/            # React components
│   ├── analytics/        # Analytics components
│   ├── ui/               # UI components
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── agents/           # AI agent system
│   ├── prisma.ts         # Database client
│   ├── stripe.ts         # Stripe integration
│   ├── github.ts         # GitHub integration
│   ├── vercel.ts         # Vercel integration
│   └── templates.ts      # Project templates
├── mobile/                # React Native app
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── navigation/   # Navigation config
│   │   └── components/   # Mobile components
│   └── App.tsx
├── prisma/                # Prisma schema
│   └── schema.prisma
├── .github/
│   └── workflows/        # CI/CD pipelines
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔒 Security

- All API routes are protected with Clerk authentication
- Environment variables for sensitive data
- Webhook signature verification
- CORS protection
- Rate limiting (recommended to add)

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push to main

### Docker
```bash
docker build -t fullstack-app .
docker push your-registry/fullstack-app:latest
```

### Manual
1. Build the application: `npm run build`
2. Start the server: `npm start`

## 📝 Environment Variables

See `.env.example` for a complete list of required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/brandonlacoste9-tech/Fullstack/issues)
- Documentation: [Wiki](https://github.com/brandonlacoste9-tech/Fullstack/wiki)

## 🎯 Roadmap

- [ ] Add real-time collaboration features
- [ ] Implement WebSocket support
- [ ] Add more AI agents
- [ ] Expand template library
- [ ] Add more OAuth providers
- [ ] Implement advanced analytics
- [ ] Add custom domain support
- [ ] Mobile app improvements

---

Built with ❤️ using Next.js, React Native, and modern web technologies.
