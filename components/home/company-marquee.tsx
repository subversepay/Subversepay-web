"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CompanyMarquee() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])
// ?height=30&width=120

  const companies = [
    {
      name: "Netflix",
      logo: "/Subversepay-web/placeholder.svg",
    },
    {
      name: "Disney+",
      logo: "/Subversepay-web/placeholder.svg",
    },
    {
      name: "HBO Max",
      logo: "/Subversepay-web/placeholder.svg",
    },
    {
      name: "Amazon Prime",
      logo: "/Subversepay-web/placeholder.svg",
    },
    {
      name: "Spotify",
      logo: "/Subversepay-web/placeholder.svg",
    },
  ]

  // Generate particles for the background
  const particleCount = 30
  const particles = Array.from({ length: particleCount })

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[300px] overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-black rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-blue/50 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Trusted By Leading OTT Platforms</h2>
          <p className="text-brand-grey max-w-lg mx-auto">
            Join the growing ecosystem of streaming services leveraging SubversePay's stablecoin payment solutions
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            {/* First marquee (left to right) */}
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {[...companies, ...companies, ...companies].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-lg px-6 py-4 hover:border-brand-blue/50 transition-colors"
                >
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={120}
                    height={30}
                    className="h-8 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>

            {/* Overlay gradients */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
          </div>
        </motion.div>

        {/* Focus Keys section preview */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-white text-sm">
            <span className="text-brand-blue font-medium">SOL</span>
            <span className="mx-2 text-brand-grey">•</span>
            <span className="text-brand-blue font-medium">ETH</span>
            <span className="mx-2 text-brand-grey">•</span>
            <span className="text-brand-grey">USDC</span>
          </div>

          <div className="h-px w-12 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"></div>

          <div className="text-white font-medium">Focus Keys</div>

          <div className="text-brand-blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
