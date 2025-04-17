"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

interface MiniChartProps {
  data: { value: number }[]
  isPositive: boolean
}

export function MiniChart({ data, isPositive }: MiniChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? "#00ff00" : "#ff0000"}
          strokeWidth={1.5}
          dot={false}
          style={{
            filter: `drop-shadow(0 0 3px ${isPositive ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"})`,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
