"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mockFollowing } from "@/lib/mock-data"

export function FollowingList() {
  const [following, setFollowing] = useState(mockFollowing)

  const handleUnfollow = (username: string) => {
    setFollowing(following.filter((investor) => investor.username !== username))
  }

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Investors You Follow</CardTitle>
      </CardHeader>
      <CardContent>
        {following.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You are not following any investors yet.</p>
            <Link href="/social/top-investors">
              <Button className="mt-4">Discover Investors</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {following.map((investor, index) => (
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
                          <p className="font-semibold">{investor.name}</p>
                          <p className="text-sm text-muted-foreground">@{investor.username}</p>
                          <div className="flex items-center mt-1">
                            <span className="flex items-center text-sm">
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
                        variant="outline"
                        className="border-purple-500"
                        onClick={() => handleUnfollow(investor.username)}
                      >
                        Unfollow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
