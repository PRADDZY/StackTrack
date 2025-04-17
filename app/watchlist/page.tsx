"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WatchlistManager } from "@/components/watchlist/watchlist-manager"
import { CustomPortfolioManager } from "@/components/watchlist/custom-portfolio-manager"

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Watchlists & Custom Portfolios
        </h1>
        <p className="text-muted-foreground mb-6">
          Track your favorite stocks and create theoretical portfolios for comparison
        </p>
      </motion.div>

      <Tabs defaultValue="watchlists" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="watchlists">Watchlists</TabsTrigger>
          <TabsTrigger value="custom-portfolios">Custom Portfolios</TabsTrigger>
        </TabsList>
        <TabsContent value="watchlists">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <WatchlistManager />
          </motion.div>
        </TabsContent>
        <TabsContent value="custom-portfolios">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CustomPortfolioManager />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
