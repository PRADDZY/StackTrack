"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Award, Users, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PerformanceGraph } from "@/components/performance-graph"
import { StockList } from "@/components/stock-list"
import { mockInvestors } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function InvestorProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M">("1D")
  const [isFollowing, setIsFollowing] = useState(false)

  const investor = mockInvestors.find((inv) => inv.username === username)

  if (!investor) {
    return <div>Investor not found</div>
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-purple-500/50">
              <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
              <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
                {investor.name}
              </h1>
              <p className="text-muted-foreground">@{investor.username}</p>
              <div className="flex items-center gap-2 mt-1">
                {investor.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-500/10 text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={toggleFollow}
            variant={isFollowing ? "outline" : "default"}
            className={isFollowing ? "border-purple-500" : ""}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1"
        >
          <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle>Investor Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Followers</span>
                </div>
                <span className="font-medium">{investor.followers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Trading Since</span>
                </div>
                <span className="font-medium">{investor.tradingSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Rank</span>
                </div>
                <span className="font-medium">#{investor.rank}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Win Rate</span>
                </div>
                <span className="font-medium">{investor.winRate}%</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Monthly Return</span>
                  <div className="flex items-center">
                    {investor.monthlyReturn >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                    )}
                    <span
                      className={cn("font-medium", investor.monthlyReturn >= 0 ? "text-green-500" : "text-red-500")}
                    >
                      {Math.abs(investor.monthlyReturn)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Yearly Return</span>
                  <div className="flex items-center">
                    {investor.yearlyReturn >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                    )}
                    <span className={cn("font-medium", investor.yearlyReturn >= 0 ? "text-green-500" : "text-red-500")}>
                      {Math.abs(investor.yearlyReturn)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{investor.bio}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Trading Style</h4>
                <div className="flex flex-wrap gap-2">
                  {investor.tradingStyle.map((style, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-500/10">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 md:col-span-2"
        >
          <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
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
              <div className="h-[300px]">
                <PerformanceGraph timeframe={timeframe} />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
