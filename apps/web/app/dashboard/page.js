// Dashboard Page with Analytics
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">FullStack Studio</div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600">Analytics</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Projects" value="12" change="+3" icon="📁" />
          <StatCard title="Deployments" value="47" change="+12" icon="🚀" />
          <StatCard title="Token Usage" value="854K" change="+124K" icon="🎯" />
          <StatCard title="Team Members" value="8" change="+2" icon="👥" />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem 
              type="deployment"
              message="Deployed 'E-commerce Store' to production"
              time="2 minutes ago"
            />
            <ActivityItem 
              type="project"
              message="Created new project 'Blog Platform'"
              time="1 hour ago"
            />
            <ActivityItem 
              type="team"
              message="Added Sarah to 'Marketing Site' team"
              time="3 hours ago"
            />
            <ActivityItem 
              type="code"
              message="Pushed code to GitHub for 'Dashboard App'"
              time="5 hours ago"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <QuickAction 
            icon="➕"
            title="New Project"
            description="Start from scratch or use a template"
            link="/projects/new"
          />
          <QuickAction 
            icon="📊"
            title="View Analytics"
            description="See detailed usage and performance"
            link="/analytics"
          />
          <QuickAction 
            icon="👥"
            title="Invite Team"
            description="Add members to collaborate"
            link="/team/invite"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </div>
  );
}

function ActivityItem({ type, message, time }) {
  const icons = {
    deployment: '🚀',
    project: '📁',
    team: '👥',
    code: '💻'
  };

  return (
    <div className="flex items-start gap-4 p-4 border-l-4 border-blue-600 bg-blue-50 rounded">
      <span className="text-2xl">{icons[type]}</span>
      <div className="flex-1">
        <p className="text-gray-900">{message}</p>
        <p className="text-gray-500 text-sm">{time}</p>
      </div>
    </div>
  );
}

function QuickAction({ icon, title, description, link }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
