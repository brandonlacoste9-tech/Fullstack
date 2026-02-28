import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import UsageChart from '@/components/analytics/UsageChart'
import CostBreakdown from '@/components/analytics/CostBreakdown'
import ActivityFeed from '@/components/analytics/ActivityFeed'
import { prisma } from '@/lib/prisma'

export default async function AnalyticsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      usageMetrics: {
        orderBy: { createdAt: 'desc' },
        take: 30,
      },
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      projects: true,
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Mock usage data for chart
  const usageData = [
    { date: '2024-01', tokens: 1200, apiCalls: 45 },
    { date: '2024-02', tokens: 1900, apiCalls: 67 },
    { date: '2024-03', tokens: 1500, apiCalls: 52 },
    { date: '2024-04', tokens: 2100, apiCalls: 78 },
    { date: '2024-05', tokens: 2800, apiCalls: 95 },
    { date: '2024-06', tokens: 3200, apiCalls: 112 },
  ]

  // Mock cost data
  const costData = [
    { category: 'API Calls', cost: 45.50 },
    { category: 'Token Usage', cost: 123.75 },
    { category: 'Deployments', cost: 28.00 },
    { category: 'Storage', cost: 12.25 },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Monitor your usage, costs, and activity in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm font-medium">Total Projects</div>
          <div className="text-3xl font-bold mt-2">{user.projects.length}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm font-medium">API Calls</div>
          <div className="text-3xl font-bold mt-2">
            {user.usageMetrics.filter(m => m.metricType === 'API_CALLS').reduce((sum, m) => sum + m.value, 0)}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm font-medium">Tokens Used</div>
          <div className="text-3xl font-bold mt-2">
            {user.usageMetrics.filter(m => m.metricType === 'TOKENS_USED').reduce((sum, m) => sum + m.value, 0)}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm font-medium">Total Cost</div>
          <div className="text-3xl font-bold mt-2">
            ${user.usageMetrics.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <UsageChart data={usageData} />
        <CostBreakdown data={costData} />
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={user.activities.map(a => ({
        ...a,
        timestamp: a.createdAt
      }))} />
    </div>
  )
}
