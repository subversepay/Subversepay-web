"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SeamlessFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [counter, setCounter] = useState(578)
  const containerRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: 1,
      title: "Liquidity Across Exchange Times",
      description: "Seamlessly transfer funds between exchanges with minimal delays and fees.",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Accurate Crypto Price Tracking",
      description: "Real-time price updates across all major cryptocurrencies and exchanges.",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Enhanced Crypto Exchange",
      description: "Advanced trading features with improved security and transaction speed.",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    // Increment counter animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 650) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 100)

    // Auto-rotate features
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(featureInterval)
    }
  }, [features.length])

  // Generate particles for the background
  const particleCount = 40
  const particles = Array.from({ length: particleCount })

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] overflow-hidden" ref={containerRef}>
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

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronLeft className="w-5 h-5 text-brand-blue" />
          <span className="text-brand-grey">Back</span>
        </motion.div>

        <motion.div
          className="text-brand-grey text-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          MONETAKEY
        </motion.div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 pt-20 px-8 pb-8 flex">
        {/* Vertical text on the left */}
        <motion.div
          className="w-20 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-brand-blue/30 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-brand-blue text-xs">01</span>
              </div>
            </div>

            <div className="h-[400px] w-[120px] flex items-center justify-center">
              <div className="text-white text-xl font-bold [writing-mode:vertical-rl] rotate-180 tracking-wider">
                <span className="text-brand-grey">Screenshot has been saved to</span>
                <span className="text-white">/Pictures/Screenshot</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <div className="flex-1 flex flex-col">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <span className="text-brand-blue mr-2">&#8594;</span>
              Seamless Features
            </h1>
          </motion.div>

          <div className="flex-1 flex flex-col md:flex-row gap-8">
            {/* Feature list */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {/* Feature icon */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: index * 0.5,
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-brand-blue/30 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Feature content */}
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-brand-grey">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation dots */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                  <ChevronLeft className="w-4 h-4 text-brand-blue" />
                </div>

                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      activeFeature === index ? "bg-brand-blue" : "bg-brand-blue/30"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}

                <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-brand-blue" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Transaction card */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="bg-black/60 backdrop-blur-sm border border-brand-blue/30 rounded-lg p-4 w-64"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-brand-blue/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-[#6c5dd3] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.5 6L10 18.5M7.5 8.5L3.5 12.5L7.5 16.5M16.5 8.5L20.5 12.5L16.5 16.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs text-white">
                    <div>Payment</div>
                    <div className="text-brand-grey text-[10px]">Secure Transaction</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    <span>00</span>
                    <span>{String(counter).padStart(4, "0")}</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="#1f79bd"
                          stroke="#1f79bd"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-brand-grey">
                  <div className="flex items-center gap-1">
                    <span>0x9F72...</span>
                    <span className="w-1 h-1 bg-brand-grey rounded-full"></span>
                    <span>4c6B</span>
                  </div>
                  <div className="w-px h-3 bg-brand-grey/30"></div>
                  <div className="flex items-center gap-1">
                    <span>$54.1</span>
                    <span className="w-1 h-1 bg-brand-grey rounded-full"></span>
                    <span>ETH</span>
                  </div>
                </div>

                {/* Glowing effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 blur-sm rounded-lg"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
