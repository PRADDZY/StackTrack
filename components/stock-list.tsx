"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { mockPortfolio } from "@/lib/mock-data"
import { MiniChart } from "@/components/mini-chart"

export function StockList() {
  const [searchTerm, setSearchTerm] = useState("")
  const { holdings } = mockPortfolio

  const filteredHoldings = holdings.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Holdings</CardTitle>
        <Input
          placeholder="Search holdings..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredHoldings.map((stock, index) => {
            const isPositive = stock.change >= 0

            return (
              <motion.div
                key={stock.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/stock/${stock.ticker}`}>
                  <Card className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div>
                              <p className="font-semibold">{stock.ticker}</p>
                              <p className="text-sm text-muted-foreground">{stock.name}</p>
                            </div>
                          </div>
                        </div>

                        <div className="w-24 h-12">
                          <MiniChart data={stock.chartData} isPositive={isPositive} />
                        </div>

                        <div className="text-right ml-4">
                          <p className="font-semibold">₹{stock.price.toLocaleString()}</p>
                          <div className="flex items-center justify-end">
                            {isPositive ? (
                              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <p className={cn("text-sm", isPositive ? "text-green-500" : "text-red-500")}>
                              {Math.abs(stock.change)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
