// Home Page
import { SignIn, SignUp, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">FullStack Studio</div>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600">Analytics</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Build Full-Stack Apps with AI Agents
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Multi-agent swarm system that designs, develops, tests, and deploys your projects automatically
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Get Started Free
            </Link>
            <Link href="/examples" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              View Examples
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard 
            icon="🤖"
            title="5 AI Agents"
            description="Designer, Developer, Tester, Deployer, and Planner working together"
          />
          <FeatureCard 
            icon="🎨"
            title="Design System"
            description="Automatically generate beautiful, consistent UI components"
          />
          <FeatureCard 
            icon="🔗"
            title="GitHub Integration"
            description="Create repos, push code, and manage pull requests automatically"
          />
          <FeatureCard 
            icon="🚀"
            title="Vercel Deployment"
            description="One-click deploy to production with automatic builds"
          />
          <FeatureCard 
            icon="👥"
            title="Team Collaboration"
            description="Invite members, manage roles, and share projects"
          />
          <FeatureCard 
            icon="📊"
            title="Analytics Dashboard"
            description="Track usage, costs, and performance in real-time"
          />
        </div>

        {/* Pricing Tiers */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              tier="Free"
              price="$0"
              features={[
                '5 projects',
                '10 deployments/month',
                '100K tokens/month',
                'Community support'
              ]}
            />
            <PricingCard 
              tier="Pro"
              price="$29"
              features={[
                'Unlimited projects',
                'Unlimited deployments',
                '1M tokens/month',
                'Priority support',
                'Advanced analytics',
                'Team collaboration'
              ]}
              highlighted={true}
            />
            <PricingCard 
              tier="Enterprise"
              price="$199"
              features={[
                'Everything in Pro',
                'Unlimited tokens',
                'Custom AI models',
                'SLA guarantee',
                'Dedicated support',
                'Custom integrations'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({ tier, price, features, highlighted = false }) {
  return (
    <div className={`rounded-lg shadow-lg p-8 ${highlighted ? 'bg-blue-600 text-white transform scale-105' : 'bg-white'}`}>
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{tier}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={highlighted ? 'text-blue-100' : 'text-gray-600'}>/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={highlighted ? 'text-blue-200' : 'text-green-600'}>✓</span>
            <span className={highlighted ? 'text-blue-100' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold ${
        highlighted 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Get Started
      </button>
    </div>
  );
}
