"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockArticles, mockStrategies, mockInsights } from "@/lib/mock-data"

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  // Find the content from any of the content types
  const article = mockArticles.find((a) => a.slug === slug)
  const strategy = mockStrategies.find((s) => s.slug === slug)
  const insight = mockInsights.find((i) => i.slug === slug)

  const content = article || strategy || insight

  if (!content) {
    return <div>Content not found</div>
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Learning Hub
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{content.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={content.author.avatar || "/placeholder.svg"} alt={content.author.name} />
            <AvatarFallback>{content.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{content.author.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{content.date}</span>
              <span className="mx-2">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{content.readTime} min read</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              {content.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {content.category && <span className="capitalize">{content.category}</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
