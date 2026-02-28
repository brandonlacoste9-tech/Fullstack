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

  // Generate usage data for the last 6 months
  const now = new Date()
  const usageData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    
    // Calculate actual metrics from user data for this month
    const monthMetrics = user.usageMetrics.filter(m => {
      const metricDate = new Date(m.createdAt)
      return metricDate.getMonth() === date.getMonth() && 
             metricDate.getFullYear() === date.getFullYear()
    })
    
    const tokens = monthMetrics
      .filter(m => m.metricType === 'TOKENS_USED')
      .reduce((sum, m) => sum + m.value, 0)
    
    const apiCalls = monthMetrics
      .filter(m => m.metricType === 'API_CALLS')
      .reduce((sum, m) => sum + m.value, 0)
    
    return {
      date: monthYear,
      tokens: tokens || Math.floor(Math.random() * 2000) + 1000, // Fallback to sample data
      apiCalls: apiCalls || Math.floor(Math.random() * 80) + 40,
    }
  })

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
