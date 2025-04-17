"use client"
import { Card, CardContent } from "@/components/ui/card"
import { mockPortfolio } from "@/lib/mock-data"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function PortfolioSummaryCard() {
  const { totalValue, dailyChange, dailyChangePercent, overallChange, overallChangePercent } = mockPortfolio

  const isDailyPositive = dailyChange >= 0
  const isOverallPositive = overallChange >= 0

  return (
    <Link href="/portfolio">
      <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800 hover:bg-white/20 dark:hover:bg-black/30 transition-all cursor-pointer overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                Portfolio Details
              </h3>
              <span className="text-sm text-muted-foreground">View Details →</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Top Holding</p>
                <p className="font-medium">RELI (20%)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Asset Classes</p>
                <p className="font-medium">5</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stocks</p>
                <p className="font-medium">{mockPortfolio.holdings.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">Just now</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
