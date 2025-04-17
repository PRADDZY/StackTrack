"use client"

import { motion } from "framer-motion"
import { MarketHighlights } from "@/components/market-highlights"
import { Headlines } from "@/components/headlines"
import { SearchBar } from "@/components/search-bar"
import { PortfolioSummaryCard } from "@/components/portfolio-summary-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockPortfolio } from "@/lib/mock-data"

export default function Home() {
  const { totalValue, dailyChange, dailyChangePercent, overallChange, overallChangePercent } = mockPortfolio
  const isDailyPositive = dailyChange >= 0
  const isOverallPositive = overallChange >= 0

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Welcome to StackTrack
        </h1>
        <p className="text-muted-foreground mb-6">Where your stocks shine brighter</p>
      </motion.div>

      {/* Portfolio Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
              Your Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-3xl font-bold">₹{totalValue.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">1-Day Change</p>
                <div className="flex items-center">
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
                <p className="text-sm text-muted-foreground">Overall P&L</p>
                <div className="flex items-center">
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

            <div className="mt-4">
              <PortfolioSummaryCard />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SearchBar />
      </motion.div>

      {/* Market Highlights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketHighlights />
          </CardContent>
        </Card>
      </motion.div>

      {/* Market News Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Headlines />
      </motion.div>
    </div>
  )
}
