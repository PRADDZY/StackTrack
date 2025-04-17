"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiskAssessment } from "@/components/robo-advisor/risk-assessment"
import { PortfolioRecommendation } from "@/components/robo-advisor/portfolio-recommendation"
import { RebalanceAnalysis } from "@/components/robo-advisor/rebalance-analysis"

export default function RoboAdvisorPage() {
  const [activeTab, setActiveTab] = useState("assessment")
  const [riskProfile, setRiskProfile] = useState<string | null>(null)

  const handleRiskProfileComplete = (profile: string) => {
    setRiskProfile(profile)
    setActiveTab("recommendation")
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Robo-Advisor
        </h1>
        <p className="text-muted-foreground mb-6">
          Get personalized investment recommendations based on your risk profile
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="recommendation" disabled={!riskProfile}>
            Portfolio Recommendation
          </TabsTrigger>
          <TabsTrigger value="rebalance" disabled={!riskProfile}>
            Rebalance Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="assessment">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RiskAssessment onComplete={handleRiskProfileComplete} />
          </motion.div>
        </TabsContent>
        <TabsContent value="recommendation">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PortfolioRecommendation riskProfile={riskProfile} />
          </motion.div>
        </TabsContent>
        <TabsContent value="rebalance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <RebalanceAnalysis riskProfile={riskProfile} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
