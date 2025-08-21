"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, Users } from "lucide-react"
import { Link } from "react-router"


export function CommunitySection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with fellow coders, share your solutions, and get help when you're stuck.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  WhatsApp Group
                </CardTitle>
                <CardDescription>Join our active WhatsApp community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt="WhatsApp QR Code"
                      width={128}
                      height={128}
                      className="rounded-lg border p-2"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Scan the QR code or click the button below to join our WhatsApp group for daily discussions.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={""} >
                    💬 Join the Discussion
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Doubt Solving Sessions
                </CardTitle>
                <CardDescription>Weekend sessions to clear your doubts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-medium">Next Session</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Saturday, 10:00 AM - 12:00 PM</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Online via Google Meet</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get your doubts cleared by mentors and peers in our weekend sessions.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={""} >
                    View Schedule
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Share Your Solutions
                </CardTitle>
                <CardDescription>Learn from others and help your peers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Sharing your approach helps you learn better and helps others understand different ways to solve a
                  problem.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm font-medium">How to share:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 mt-2">
                    <li>Post your solution in the WhatsApp group</li>
                    <li>Explain your approach briefly</li>
                    <li>Ask for feedback from mentors</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={""} >
                    View Solution Guidelines
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

