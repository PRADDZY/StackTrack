"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { StockDetail } from "@/components/stock-detail"
import { StockGraph } from "@/components/stock-graph"
import { StockInfo } from "@/components/stock-info"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockStocks } from "@/lib/mock-data"

export default function StockPage() {
  const params = useParams()
  const ticker = params.ticker as string
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M">("1D")

  const stock = mockStocks.find((s) => s.ticker === ticker)

  if (!stock) {
    return <div>Stock not found</div>
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          {stock.name} ({stock.ticker})
        </h1>
        <p className="text-muted-foreground mb-6">
          {stock.sector} • {stock.exchange}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="backdrop-blur-sm bg-white/10 dark:bg-black/20 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <StockDetail stock={stock} />
            <Tabs defaultValue="1D" className="mt-6">
              <TabsList>
                <TabsTrigger value="1D" onClick={() => setTimeframe("1D")}>
                  1D
                </TabsTrigger>
                <TabsTrigger value="1W" onClick={() => setTimeframe("1W")}>
                  1W
                </TabsTrigger>
                <TabsTrigger value="1M" onClick={() => setTimeframe("1M")}>
                  1M
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="h-[300px] mt-4">
              <StockGraph ticker={ticker} timeframe={timeframe} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StockInfo stock={stock} />
        </motion.div>
      </div>
    </div>
  )
}
