"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Stock } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StockInfoProps {
  stock: Stock
}

export function StockInfo({ stock }: StockInfoProps) {
  // Calculate risk level (1-100)
  const riskLevel = stock.volatility * 100

  // Calculate sentiment (1-100)
  const sentiment = stock.sentiment * 100

  // Get risk color
  const getRiskColor = (risk: number) => {
    if (risk < 33) return "bg-green-500"
    if (risk < 66) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Get sentiment color
  const getSentimentColor = (sent: number) => {
    if (sent < 33) return "bg-red-500"
    if (sent < 66) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Stock Info</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Risk Level</span>
                <span className="text-sm font-medium">
                  {riskLevel < 33 ? "Low" : riskLevel < 66 ? "Medium" : "High"}
                </span>
              </div>
              <Progress
                value={riskLevel}
                className="h-2"
                indicatorClassName={cn(
                  getRiskColor(riskLevel),
                  "transition-all",
                  "shadow-[0_0_10px_rgba(0,255,0,0.7)]",
                )}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market Sentiment</span>
                <span className="text-sm font-medium">
                  {sentiment < 33 ? "Bearish" : sentiment < 66 ? "Neutral" : "Bullish"}
                </span>
              </div>
              <Progress
                value={sentiment}
                className="h-2"
                indicatorClassName={cn(
                  getSentimentColor(sentiment),
                  "transition-all",
                  "shadow-[0_0_10px_rgba(0,255,0,0.7)]",
                )}
              />
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium mb-1">Portfolio Allocation</p>
              <p className="text-2xl font-bold">{stock.allocation}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Company Overview</h3>
          <p className="text-sm text-muted-foreground">{stock.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">52W High</p>
              <p className="font-medium">₹{stock.high52w.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">52W Low</p>
              <p className="font-medium">₹{stock.low52w.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">P/E Ratio</p>
              <p className="font-medium">{stock.pe.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dividend Yield</p>
              <p className="font-medium">{stock.dividendYield.toFixed(2)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
