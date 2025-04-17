"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Article } from "@/lib/types"

interface ArticleListProps {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Articles</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/learn/${article.slug}`}>
                <Card className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-purple-500/10 text-xs capitalize">
                            {article.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mt-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center mt-3">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{article.author.name}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
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
