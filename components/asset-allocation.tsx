"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPortfolio } from "@/lib/mock-data"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function AssetAllocation() {
  const { allocation } = mockPortfolio

  // Define neon colors for the pie chart
  const COLORS = ["#00FFFF", "#FF00FF", "#00FF00", "#FFFF00", "#FF0000"]

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {allocation.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(0,0,0,0.3)"
                    style={{
                      filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}80)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Allocation"]}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {allocation.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  boxShadow: `0 0 5px ${COLORS[index % COLORS.length]}80`,
                }}
              />
              <span className="text-sm">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
