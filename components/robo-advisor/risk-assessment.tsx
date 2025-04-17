"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { mockRiskQuestions } from "@/lib/mock-data"

interface RiskAssessmentProps {
  onComplete: (profile: string) => void
}

export function RiskAssessment({ onComplete }: RiskAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const totalQuestions = mockRiskQuestions.length
  const progress = (currentQuestion / totalQuestions) * 100

  const handleNext = () => {
    if (currentAnswer === null) return

    const newAnswers = { ...answers, [currentQuestion]: currentAnswer }
    setAnswers(newAnswers)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setCurrentAnswer(null)
    } else {
      // Calculate risk profile
      const totalScore = Object.values(newAnswers).reduce((sum, score) => sum + score, 0)
      const maxPossibleScore = totalQuestions * 4 // Assuming each question has 5 options (0-4)
      const scorePercentage = (totalScore / maxPossibleScore) * 100

      let riskProfile
      if (scorePercentage < 20) {
        riskProfile = "conservative"
      } else if (scorePercentage < 40) {
        riskProfile = "moderately-conservative"
      } else if (scorePercentage < 60) {
        riskProfile = "moderate"
      } else if (scorePercentage < 80) {
        riskProfile = "moderately-aggressive"
      } else {
        riskProfile = "aggressive"
      }

      setIsComplete(true)
      onComplete(riskProfile)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const question = mockRiskQuestions[currentQuestion]

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/20 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Risk Tolerance Assessment</CardTitle>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Assessment Complete!</h3>
            <p className="text-muted-foreground">
              Based on your answers, we've created a personalized investment recommendation for you.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium mb-4">
                Question {currentQuestion + 1} of {totalQuestions}
              </h3>
              <p className="mb-6">{question.question}</p>

              <RadioGroup value={currentAnswer?.toString()} onValueChange={(value) => setCurrentAnswer(Number(value))}>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </motion.div>
          </div>
        )}
      </CardContent>
      {!isComplete && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentAnswer === null}>
            {currentQuestion < totalQuestions - 1 ? (
              <>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              "Complete"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
