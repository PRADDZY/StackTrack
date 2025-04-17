"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Strategy } from "@/lib/types"

interface StrategyGuidesProps {
  strategies: Strategy[]
}

export function StrategyGuides({ strategies }: StrategyGuidesProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStrategies = strategies.filter(
    (strategy) =>
      strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Investment Strategies</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search strategies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/learn/${strategy.slug}`}>
                <Card className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={`text-xs capitalize ${
                              strategy.level === "beginner"
                                ? "bg-green-500/10"
                                : strategy.level === "intermediate"
                                  ? "bg-yellow-500/10"
                                  : "bg-red-500/10"
                            }`}
                          >
                            {strategy.level}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mt-2">{strategy.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{strategy.excerpt}</p>
                        <div className="flex items-center mt-3">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage
                              src={strategy.author.avatar || "/placeholder.svg"}
                              alt={strategy.author.name}
                            />
                            <AvatarFallback>{strategy.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{strategy.author.name}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{strategy.readTime} min read</span>
                        </div>
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
