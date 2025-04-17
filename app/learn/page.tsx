"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleList } from "@/components/learn/article-list"
import { StrategyGuides } from "@/components/learn/strategy-guides"
import { MarketInsights } from "@/components/learn/market-insights"
import { Glossary } from "@/components/learn/glossary"
import { mockArticles, mockStrategies, mockInsights, mockGlossaryTerms } from "@/lib/mock-data"

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Learning Hub
        </h1>
        <p className="text-muted-foreground mb-6">Expand your investment knowledge with our educational resources</p>
      </motion.div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Guides</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ArticleList articles={mockArticles} />
          </motion.div>
        </TabsContent>
        <TabsContent value="strategies">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StrategyGuides strategies={mockStrategies} />
          </motion.div>
        </TabsContent>
        <TabsContent value="insights">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MarketInsights insights={mockInsights} />
          </motion.div>
        </TabsContent>
        <TabsContent value="glossary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Glossary terms={mockGlossaryTerms} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
