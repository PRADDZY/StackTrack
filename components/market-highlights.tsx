"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMarketHighlights } from "@/lib/mock-data"

export function MarketHighlights() {
  const { gainers, losers } = mockMarketHighlights

  return (
    <div>
      <Tabs defaultValue="gainers">
        <TabsList className="mb-4">
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
        </TabsList>
        <TabsContent value="gainers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gainers.map((stock, index) => (
              <motion.div
                key={stock.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-green-500/20 dark:border-green-500/20 shadow-[0_0_15px_rgba(0,255,0,0.1)] dark:shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{stock.ticker}</p>
                        <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                      </div>
                      <div className="flex items-center text-green-500">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="font-medium">{stock.change}%</span>
                      </div>
                    </div>
                    <p className="mt-2 text-lg font-bold">₹{stock.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="losers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {losers.map((stock, index) => (
              <motion.div
                key={stock.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-red-500/20 dark:border-red-500/20 shadow-[0_0_15px_rgba(255,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,0,0,0.15)]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{stock.ticker}</p>
                        <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                      </div>
                      <div className="flex items-center text-red-500">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span className="font-medium">{stock.change}%</span>
                      </div>
                    </div>
                    <p className="mt-2 text-lg font-bold">₹{stock.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
