// Analytics Dashboard with Recharts
'use client';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const tokenUsageData = [
  { month: 'Jan', tokens: 120000 },
  { month: 'Feb', tokens: 245000 },
  { month: 'Mar', tokens: 398000 },
  { month: 'Apr', tokens: 521000 },
  { month: 'May', tokens: 687000 },
  { month: 'Jun', tokens: 854000 },
];

const costBreakdown = [
  { name: 'LLM Usage', value: 450 },
  { name: 'Deployments', value: 120 },
  { name: 'Storage', value: 80 },
  { name: 'Bandwidth', value: 45 },
];

const agentPerformance = [
  { agent: 'Designer', tasks: 45, success: 43 },
  { agent: 'Developer', tasks: 78, success: 75 },
  { agent: 'Tester', tasks: 62, success: 60 },
  { agent: 'Deployer', tasks: 38, success: 37 },
  { agent: 'Planner', tasks: 29, success: 29 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="text-2xl font-bold text-blue-600">Analytics Dashboard</div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Usage Analytics & Insights</h1>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Projects" value="47" trend="+12%" />
          <MetricCard title="Token Consumption" value="854K" trend="+24%" />
          <MetricCard title="Monthly Cost" value="$695" trend="+8%" />
          <MetricCard title="Success Rate" value="97.3%" trend="+2.1%" />
        </div>

        {/* Token Usage Over Time */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Token Usage Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tokenUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tokens" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Cost Breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Cost Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Agent Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Agent Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#3B82F6" />
                <Bar dataKey="success" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Real-Time Activity Feed</h2>
          <div className="space-y-3">
            <ActivityLog time="Just now" event="Designer agent completed UI mockups" status="success" />
            <ActivityLog time="2 min ago" event="Deployment to Vercel successful" status="success" />
            <ActivityLog time="5 min ago" event="GitHub PR created for feature/auth" status="info" />
            <ActivityLog time="8 min ago" event="Tester agent running 47 tests" status="running" />
            <ActivityLog time="12 min ago" event="Developer agent generated 12 components" status="success" />
            <ActivityLog time="15 min ago" event="Planner created execution plan" status="success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {trend} vs last month
      </p>
    </div>
  );
}

function ActivityLog({ time, event, status }) {
  const statusColors = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
    running: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <div className="flex-1">
        <p className="text-gray-900">{event}</p>
        <p className="text-gray-500 text-sm">{time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}
