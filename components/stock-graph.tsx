"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockStockPerformance } from "@/lib/mock-data"

interface StockGraphProps {
  ticker: string
  timeframe: "1D" | "1W" | "1M"
}

export function StockGraph({ ticker, timeframe }: StockGraphProps) {
  const data = useMemo(() => {
    const stockData = mockStockPerformance[ticker] || mockStockPerformance.default

    switch (timeframe) {
      case "1D":
        return stockData.daily
      case "1W":
        return stockData.weekly
      case "1M":
        return stockData.monthly
      default:
        return stockData.daily
    }
  }, [ticker, timeframe])

  const isPositive = data[0].value <= data[data.length - 1].value

  return (
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
          domain={["dataMin - 100", "dataMax + 100"]}
          tickFormatter={(value) => `₹${value.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Price"]}
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
  )
}
