"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Twitter, Github } from "lucide-react"


export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2lg-O2DPiGu6e2qV7YxdUlPtmtl4yKAT5k.png"
              alt="Abhyudaya Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-bold mb-2">Abhyudaya Coding Club</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Part of the Abhyudaya Mentorship Program at Shri Vaishnav Institute of Information Technology.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Fueling Innovation, One Line of Code at a Time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-6 mb-8"
          >
            <a
              href="https://www.instagram.com/abhyudayacodingclub/"
              target="_blank"
              className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/company/abhyudaya-coding-club"
              target="_blank"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://x.com/abhyudaya_club"
              target="_blank"
              className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com/Abhyudaya-SVVV"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-500">
              &copy; {new Date().getFullYear()} Abhyudaya Coding Club. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

