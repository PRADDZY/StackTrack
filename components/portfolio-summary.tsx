"use client"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { mockPortfolio } from "@/lib/mock-data"

export function PortfolioSummary() {
  const { totalValue, dailyChange, dailyChangePercent, overallChange, overallChangePercent } = mockPortfolio

  const isDailyPositive = dailyChange >= 0
  const isOverallPositive = overallChange >= 0

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-3xl font-bold">₹{totalValue.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Change</p>
              <div className="flex items-center mt-1">
                {isDailyPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                )}
                <p className={cn("text-lg font-semibold", isDailyPositive ? "text-green-500" : "text-red-500")}>
                  ₹{Math.abs(dailyChange).toLocaleString()} ({Math.abs(dailyChangePercent)}%)
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Overall Change</p>
              <div className="flex items-center mt-1">
                {isOverallPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                )}
                <p className={cn("text-lg font-semibold", isOverallPositive ? "text-green-500" : "text-red-500")}>
                  ₹{Math.abs(overallChange).toLocaleString()} ({Math.abs(overallChangePercent)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
