"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ApiUsage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Simulated API usage data
  const chartData = {
    "7d": [1200, 1400, 1350, 1600, 1750, 1900, 2100],
    "30d": Array.from({ length: 30 }, () => Math.floor(Math.random() * 2500) + 1000),
    "90d": Array.from({ length: 90 }, () => Math.floor(Math.random() * 3000) + 1200),
  }

  const currentData = chartData[timeRange as keyof typeof chartData]
  const maxValue = Math.max(...currentData)

  return (
    <div className="bg-background/40 border border-brand-blue/20 rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">API Usage Overview</h2>
        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              className={`h-8 text-xs ${
                timeRange === range
                  ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
                  : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-56 flex items-end gap-1 border-t border-brand-blue/10 pt-4">
        {currentData.map((value, index) => {
          const height = (value / maxValue) * 100
          return (
            <motion.div
              key={index}
              className="flex-1 bg-brand-blue/30 rounded-t relative group"
              style={{ height: `${height}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background/90 border border-brand-blue/20 rounded px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {value.toLocaleString()} calls
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total API Calls" value="78,240" change="+12%" />
        <StatCard title="Success Rate" value="99.2%" change="+0.4%" />
        <StatCard title="Failed Requests" value="312" change="-5%" />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string
  value: string
  change: string
}) {
  return (
    <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
      <div className="text-sm text-muted-foreground mb-1">{title}</div>
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div
        className={`text-xs mt-1 ${
          change.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {change} vs last period
      </div>
    </div>
  )
}
