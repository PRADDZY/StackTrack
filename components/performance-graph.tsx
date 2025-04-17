"use client"

import { useMemo } from "react"
import { mockPortfolioPerformance } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PerformanceGraphProps {
  timeframe: "1D" | "1W" | "1M"
}

export function PerformanceGraph({ timeframe }: PerformanceGraphProps) {
  const data = useMemo(() => {
    switch (timeframe) {
      case "1D":
        return mockPortfolioPerformance.daily
      case "1W":
        return mockPortfolioPerformance.weekly
      case "1M":
        return mockPortfolioPerformance.monthly
      default:
        return mockPortfolioPerformance.daily
    }
  }, [timeframe])

  const isPositive = data[0].value <= data[data.length - 1].value

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: "rgba(255,255,255,0.5)" }}
            domain={["dataMin - 1000", "dataMax + 1000"]}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Value"]}
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
            }}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#00ff00" : "#ff0000"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
            style={{
              filter: `drop-shadow(0 0 8px ${isPositive ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"})`,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
