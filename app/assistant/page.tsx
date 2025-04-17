"use client"
import { motion } from "framer-motion"
import { ChatInterface } from "@/components/chat-interface"

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
          AI Assistant
        </h1>
        <p className="text-muted-foreground mb-6">Get insights and recommendations for your portfolio</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChatInterface />
      </motion.div>
    </div>
  )
}
