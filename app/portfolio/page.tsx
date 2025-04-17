"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PortfolioSummary } from "@/components/portfolio-summary"
import { AssetAllocation } from "@/components/asset-allocation"
import { PerformanceGraph } from "@/components/performance-graph"
import { StockList } from "@/components/stock-list"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M">("1D")

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Your Portfolio
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PortfolioSummary />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AssetAllocation />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="backdrop-blur-sm bg-white/10 dark:bg-black/20 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-2xl font-semibold mb-4">Portfolio Performance</h2>
        <Tabs defaultValue="1D" className="mb-4">
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
        <PerformanceGraph timeframe={timeframe} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <StockList />
      </motion.div>
    </div>
  )
}
