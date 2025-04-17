"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockActivityFeed } from "@/lib/mock-data"

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {mockActivityFeed.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="overflow-hidden hover:bg-accent/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Link href={`/social/${activity.user.username}`}>
                  <Avatar className="h-10 w-10 border border-purple-500/30">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center">
                    <Link href={`/social/${activity.user.username}`} className="font-semibold hover:underline">
                      {activity.user.name}
                    </Link>
                    <span className="text-muted-foreground mx-1">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm mt-1">
                    {activity.action === "buy" ? (
                      <>
                        Bought{" "}
                        <Badge variant="outline" className="bg-green-500/10 text-xs">
                          {activity.quantity}
                        </Badge>{" "}
                        shares of{" "}
                        <Link href={`/stock/${activity.stock.ticker}`} className="font-medium hover:underline">
                          {activity.stock.name} ({activity.stock.ticker})
                        </Link>{" "}
                        at ₹{activity.price.toLocaleString()}
                      </>
                    ) : (
                      <>
                        Sold{" "}
                        <Badge variant="outline" className="bg-red-500/10 text-xs">
                          {activity.quantity}
                        </Badge>{" "}
                        shares of{" "}
                        <Link href={`/stock/${activity.stock.ticker}`} className="font-medium hover:underline">
                          {activity.stock.name} ({activity.stock.ticker})
                        </Link>{" "}
                        at ₹{activity.price.toLocaleString()}
                      </>
                    )}
                  </p>
                  {activity.comment && <p className="text-sm text-muted-foreground mt-1">"{activity.comment}"</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
