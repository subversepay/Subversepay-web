"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Percent, ChevronRight, Lock } from "lucide-react"

export default function FocusKeys() {
  const [isVisible, setIsVisible] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 70) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isVisible) {
      controls.start("visible")
    }
  }, [isVisible, controls])

  const particleCount = 40
  const particles = Array.from({ length: particleCount })

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-background rounded-xl overflow-hidden">
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

      {/* Sidebar navigation */}
      <div className="absolute left-0 top-0 bottom-0 w-20 border-r border-brand-blue/20 bg-background/40 backdrop-blur-sm flex flex-col items-center py-8 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="#1f79bd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <motion.div
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-blue rounded-full"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.5 }}
          />
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-brand-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Dashboard
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#6d6e70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#6d6e70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-brand-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Profile
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#6d6e70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 16V12" stroke="#6d6e70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8H12.01" stroke="#6d6e70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-brand-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Information
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative group"
        >
          <div className="w-10 h-10 rounded-full bg-background/40 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                stroke="#6d6e70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 2V6" stroke="#6d6e70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2V6" stroke="#6d6e70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10H21" stroke="#6d6e70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-brand-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Calendar
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="absolute left-20 right-0 top-0 bottom-0 p-8 flex flex-col">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-brand-blue/20 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#1f79bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                    stroke="#1f79bd"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-brand-blue/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <h1 className="text-xl font-medium text-white">Focus Keys</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-brand-grey text-sm">ETH</div>
            <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
            <div className="text-brand-grey text-sm">USD</div>
          </div>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Circular progress */}
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#1f79bd"
                  strokeWidth="0.5"
                  strokeDasharray="0.5 2"
                  className="opacity-30"
                />

                {/* Animated dots around the circle */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i * 6 * Math.PI) / 180
                  const x = 50 + 48 * Math.cos(angle)
                  const y = 50 + 48 * Math.sin(angle)

                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="0.5"
                      fill="#1f79bd"
                      initial={{ opacity: 0.1 }}
                      animate={{
                        opacity: [0.1, 0.8, 0.1],
                        r: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.05,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  )
                })}
              </svg>

              {/* Progress circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0a1020" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1f79bd"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${percentage * 2.51} 251`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: percentage / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>

              {/* Inner content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  className="text-5xl font-bold text-white flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span>{percentage}</span>
                  <Percent className="w-8 h-8 ml-1" />
                </motion.div>
                <motion.div
                  className="text-brand-grey mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Completion Rate
                </motion.div>
              </div>
            </div>

            {/* Card below the circle */}
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 bg-background/60 backdrop-blur-md border border-brand-blue/30 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-blue/20 rounded flex items-center justify-center">
                    <Lock className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="text-sm text-white">Secure Key</div>
                </div>
                <div className="w-6 h-6 bg-brand-blue/20 rounded flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-brand-blue" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col items-center justify-center py-8 gap-4">
        <motion.div
          className="text-brand-grey text-xs font-medium [writing-mode:vertical-rl] rotate-180"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          MONETAKEY
        </motion.div>
      </div>
    </div>
  )
}
