"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopInvestors } from "@/components/social/top-investors"
import { ActivityFeed } from "@/components/social/activity-feed"
import { Leaderboard } from "@/components/social/leaderboard"
import { FollowingList } from "@/components/social/following-list"

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          Social Trading
        </h1>
        <p className="text-muted-foreground mb-6">Follow top investors and track their trading activities</p>
      </motion.div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
          <TabsTrigger value="top">Top Investors</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ActivityFeed />
          </motion.div>
        </TabsContent>
        <TabsContent value="top">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TopInvestors />
          </motion.div>
        </TabsContent>
        <TabsContent value="leaderboard">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Leaderboard />
          </motion.div>
        </TabsContent>
        <TabsContent value="following">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FollowingList />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
