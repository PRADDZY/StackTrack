"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"
import { mockPortfolioRecommendations, mockPortfolio } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface RebalanceAnalysisProps {
  riskProfile: string | null
}

export function RebalanceAnalysis({ riskProfile }: RebalanceAnalysisProps) {
  if (!riskProfile) {
    return <div>Please complete the risk assessment first.</div>
  }

  const recommendation = mockPortfolioRecommendations[riskProfile] || mockPortfolioRecommendations.moderate
  const currentAllocation = mockPortfolio.allocation

  // Calculate differences between current and recommended allocation
  const rebalanceData = recommendation.allocation.map((rec) => {
    const current = currentAllocation.find((curr) => curr.name === rec.name)
    const currentValue = current ? current.value : 0
    const difference = rec.value - currentValue
    const action = difference > 0 ? "buy" : difference < 0 ? "sell" : "hold"

    return {
      name: rec.name,
      recommended: rec.value,
      current: currentValue,
      difference,
      action,
    }
  })

  // Add any current allocations that aren't in the recommendations
  currentAllocation.forEach((curr) => {
    const exists = rebalanceData.some((item) => item.name === curr.name)
    if (!exists) {
      rebalanceData.push({
        name: curr.name,
        recommended: 0,
        current: curr.value,
        difference: -curr.value,
        action: "sell",
      })
    }
  })

  // Calculate drift score (0-100)
  const totalDrift = rebalanceData.reduce((sum, item) => sum + Math.abs(item.difference), 0) / 2
  const driftScore = Math.min(100, totalDrift * 5) // Scale up for visibility

  // Determine if rebalancing is needed
  const needsRebalancing = driftScore > 15

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Portfolio Drift Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Portfolio Drift</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    driftScore < 15 ? "text-green-500" : driftScore < 30 ? "text-yellow-500" : "text-red-500",
                  )}
                >
                  {driftScore.toFixed(1)}%
                </span>
              </div>
              <Progress
                value={driftScore}
                className="h-2"
                indicatorClassName={cn(
                  driftScore < 15 ? "bg-green-500" : driftScore < 30 ? "bg-yellow-500" : "bg-red-500",
                  "transition-all",
                )}
              />
              <p className="text-sm text-muted-foreground mt-2">
                {driftScore < 15
                  ? "Your portfolio is well-balanced."
                  : driftScore < 30
                    ? "Your portfolio has moderate drift and may need rebalancing soon."
                    : "Your portfolio has significant drift and needs rebalancing."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Rebalancing Recommendations</h3>
              <div className="space-y-4">
                {rebalanceData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-muted-foreground">Current: {item.current}%</span>
                              <span className="mx-2 text-muted-foreground">→</span>
                              <span className="text-sm">Target: {item.recommended}%</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {item.difference > 0 ? (
                              <div className="flex items-center text-green-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                <span className="font-medium">Buy {Math.abs(item.difference)}%</span>
                              </div>
                            ) : item.difference < 0 ? (
                              <div className="flex items-center text-red-500">
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                <span className="font-medium">Sell {Math.abs(item.difference)}%</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No change needed</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={!needsRebalancing}>
            <RefreshCw className="h-4 w-4 mr-2" /> Rebalance Portfolio
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
