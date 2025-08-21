"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MatrixRain } from "./ui/matrix-rain"

export function HeroSection() {
  const [currentDay, setCurrentDay] = useState(1)

  useEffect(() => {
    // Calculate the current day based on start date (March 1st)
    const startDate = new Date(2025, 2, 1) // Month is 0-indexed, so 2 = March
    const today = new Date()
    const diffTime = Math.abs(today - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Ensure we don't go beyond 100 days
    setCurrentDay(Math.min(diffDays, 100))
  }, [])

  return (
    <section className="relative min-h-[90vh] bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix-like background animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <MatrixRain />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            className="    py-2 flex flex-col items-center gap-2 rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          > 
           <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2lg-O2DPiGu6e2qV7YxdUlPtmtl4yKAT5k.png"
            alt="Abhyudaya Logo"
            width={200}
            height={200}
          />
            <p className="text-sm md:text-base text-white h-10 py-2 rounded-2xl px-2  bg-gray-900">Abhyudaya Coding Club presents</p>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className=" text-white">100 Days of </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">CODE</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto  text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            100 Days, 100 Coding Challenges. Elevate your DSA Game!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <Button asChild size="lg" className="bg-green-600 rounded-2xl hover:bg-green-700 text-white">
              <Link href="https://chat.whatsapp.com/example-link" target="_blank">
                Join WhatsApp Group
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm  text-gray-400 mb-4">
              *Part of the Abhyudaya Mentorship Program. For SVVV Students Only*
            </p>

            <div className="flex items-center justify-center gap-2 bg-gray-100  px-4 py-2 rounded-full">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="font-medium">Day {currentDay} of 100</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

