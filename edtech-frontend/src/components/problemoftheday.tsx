"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

type Problem = {
  id: number
  title: string
  url: string
  difficulty: "Easy" | "Medium" | "Hard"
  topics: string[]
  day: number
}

export function ProblemOfTheDay() {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll simulate with a mock problem
    const fetchProblem = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      setProblem({
        id: 1,
        title: "Happy Number",
        url: "https://leetcode.com/problems/happy-number/description/",
        difficulty: "Easy",
        topics: ["Math", "Two Pointers", "Hash Table"],
        day: 3,
      })

      setLoading(false)
    }

    fetchProblem()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return " bg-green-900 text-green-300"
      case "Medium":
        return "bg-yellow-900 text-yellow-300"
      case "Hard":
        return " bg-red-900 text-red-300"
      default:
        return " bg-gray-800 text-gray-300"
    }
  }

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "🟢"
      case "Medium":
        return "🟡"
      case "Hard":
        return "🔴"
      default:
        return ""
    }
  }

  return (
    <section className="py-20 text-white bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Problem of the Day</h2>
          <p className="  max-w-2xl mx-auto">
            Solve today's challenge and track your progress in the 100 Days of Code journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2  border-green-900 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{loading ? "Loading..." : problem?.title}</CardTitle>
                  <CardDescription>{loading ? "" : `Day ${problem?.day} of 100`}</CardDescription>
                </div>
                {!loading && problem && (
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {getDifficultyEmoji(problem.difficulty)} {problem.difficulty}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-20 flex items-center justify-center">
                  <div className="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent"></div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium  text-gray-400 mb-2">Topics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem?.topics.map((topic, index) => (
                        <Badge key={index} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="  p-4 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Today's Challenge:</span> {problem?.title}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Difficulty:</span> {getDifficultyEmoji(problem?.difficulty || "")}{" "}
                      {problem?.difficulty}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={loading}>
                <a href={problem?.url} target="_blank" rel="noopener noreferrer">
                  Solve Now on LeetCode <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

