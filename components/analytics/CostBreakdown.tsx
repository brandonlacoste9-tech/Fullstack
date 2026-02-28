'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CostBreakdownProps {
  data: {
    category: string
    cost: number
  }[]
}

export default function CostBreakdown({ data }: CostBreakdownProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" name="Cost ($)" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">Total Cost:</span>
          <span className="text-lg font-bold">
            ${data.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
