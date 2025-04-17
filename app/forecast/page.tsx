"use client"

import { motion } from "framer-motion"
import { MarketForecast } from "@/components/market-forecast"

export default function ForecastPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Market Forecasts
        </h1>
        <p className="text-muted-foreground mb-6">
          Predictive analytics and market forecasts to help inform your investment decisions
        </p>
      </motion.div>

      <MarketForecast />
    </div>
  )
}
