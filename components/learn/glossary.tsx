"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { GlossaryTerm } from "@/lib/types"

interface GlossaryProps {
  terms: GlossaryTerm[]
}

export function Glossary({ terms }: GlossaryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTerms = terms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group terms by first letter
  const groupedTerms: Record<string, GlossaryTerm[]> = {}
  filteredTerms.forEach((term) => {
    const firstLetter = term.term.charAt(0).toUpperCase()
    if (!groupedTerms[firstLetter]) {
      groupedTerms[firstLetter] = []
    }
    groupedTerms[firstLetter].push(term)
  })

  // Sort the keys alphabetically
  const sortedLetters = Object.keys(groupedTerms).sort()

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Financial Glossary</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {sortedLetters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No terms found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedLetters.map((letter) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">
                  {letter}
                </h3>
                <div className="space-y-4">
                  {groupedTerms[letter].map((term, index) => (
                    <motion.div
                      key={term.term}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{term.term}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
