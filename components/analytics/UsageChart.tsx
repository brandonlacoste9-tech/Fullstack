'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface UsageChartProps {
  data: {
    date: string
    tokens: number
    apiCalls: number
  }[]
}

export default function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Usage Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="tokens" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Tokens Used"
          />
          <Line 
            type="monotone" 
            dataKey="apiCalls" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="API Calls"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
