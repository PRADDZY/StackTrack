"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { mockInvestors } from "@/lib/mock-data"

export function Leaderboard() {
  // Sort investors by rank
  const sortedInvestors = [...mockInvestors].sort((a, b) => a.rank - b.rank).slice(0, 10)

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Top Performers This Month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedInvestors.map((investor, index) => (
            <motion.div
              key={investor.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/social/${investor.username}`}>
                <Card
                  className={cn(
                    "overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer",
                    index === 0 && "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
                    index === 1 && "border-gray-400/50",
                    index === 2 && "border-amber-700/50",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full font-bold text-white",
                            index === 0 && "bg-yellow-500",
                            index === 1 && "bg-gray-400",
                            index === 2 && "bg-amber-700",
                            index > 2 && "bg-purple-500/70",
                          )}
                        >
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10 border border-purple-500/30">
                          <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
                          <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{investor.name}</p>
                          <p className="text-sm text-muted-foreground">@{investor.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          {investor.monthlyReturn >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
                          )}
                          <span
                            className={cn(
                              "font-medium text-lg",
                              investor.monthlyReturn >= 0 ? "text-green-500" : "text-red-500",
                            )}
                          >
                            {Math.abs(investor.monthlyReturn)}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Monthly Return</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
