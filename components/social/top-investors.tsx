"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { mockInvestors } from "@/lib/mock-data"

export function TopInvestors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({})

  const filteredInvestors = mockInvestors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleFollow = (username: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [username]: !prev[username],
    }))
  }

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Investors</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search investors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredInvestors.map((investor, index) => (
            <motion.div
              key={investor.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <Link href={`/social/${investor.username}`} className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10 border border-purple-500/30">
                        <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
                        <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-semibold">{investor.name}</p>
                          <Badge variant="outline" className="ml-2 bg-purple-500/10 text-xs">
                            #{investor.rank}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">@{investor.username}</p>
                        <div className="flex items-center mt-1 text-sm">
                          <span className="text-muted-foreground mr-3">
                            <span className="font-medium text-foreground">{investor.followers.toLocaleString()}</span>{" "}
                            followers
                          </span>
                          <span className="flex items-center">
                            {investor.monthlyReturn >= 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            <span
                              className={cn(
                                "font-medium",
                                investor.monthlyReturn >= 0 ? "text-green-500" : "text-red-500",
                              )}
                            >
                              {Math.abs(investor.monthlyReturn)}% this month
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Button
                      size="sm"
                      variant={followingState[investor.username] ? "outline" : "default"}
                      className={followingState[investor.username] ? "border-purple-500" : ""}
                      onClick={() => toggleFollow(investor.username)}
                    >
                      {followingState[investor.username] ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
