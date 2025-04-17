"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { mockPortfolioRecommendations } from "@/lib/mock-data"
import { Download, Info } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PortfolioRecommendationProps {
  riskProfile: string | null
}

export function PortfolioRecommendation({ riskProfile }: PortfolioRecommendationProps) {
  if (!riskProfile) {
    return <div>Please complete the risk assessment first.</div>
  }

  const recommendation = mockPortfolioRecommendations[riskProfile] || mockPortfolioRecommendations.moderate

  // Define neon colors for the pie chart
  const COLORS = ["#00FFFF", "#FF00FF", "#00FF00", "#FFFF00", "#FF0000", "#0088FE", "#9C27B0"]

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recommended Portfolio Allocation</CardTitle>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on your {riskProfile.replace("-", " ")} risk profile</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recommendation.allocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {recommendation.allocation.map((entry, index) => (
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Profile: {riskProfile.replace("-", " ")}</h3>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Expected Returns</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Annual Return (Estimated)</p>
                    <p className="text-lg font-semibold">{recommendation.expectedReturn}%</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Volatility</p>
                    <p className="text-lg font-semibold">{recommendation.volatility}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Investment Horizon</h4>
                <p className="text-sm">{recommendation.timeHorizon}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Download className="h-4 w-4 mr-2" /> Download Report
          </Button>
        </CardFooter>
      </Card>

      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Recommended ETFs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendation.recommendedETFs.map((etf, index) => (
              <motion.div
                key={etf.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <p className="font-semibold">{etf.ticker}</p>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <p className="text-sm">{etf.name}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{etf.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{etf.allocation}%</p>
                        <p className="text-sm text-muted-foreground">Allocation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
