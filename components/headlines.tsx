"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockHeadlines } from "@/lib/mock-data"

export function Headlines() {
  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockHeadlines.map((headline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{headline.title}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-sm text-muted-foreground">{headline.source}</p>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{headline.time}</p>
                      </div>
                    </div>
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
