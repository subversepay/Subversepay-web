"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft } from "lucide-react"

export default function KeyVisualization() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Simulate node activation sequence
    const timeout1 = setTimeout(() => setActiveNode("main"), 1000)
    const timeout2 = setTimeout(() => setActiveNode("pro"), 2000)
    const timeout3 = setTimeout(() => setActiveNode("echo"), 3000)
    const timeout4 = setTimeout(() => setActiveNode("marketplace"), 4000)
    const timeout5 = setTimeout(() => setActiveNode("social"), 5000)
    const timeout6 = setTimeout(() => setActiveNode(null), 6000)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      clearTimeout(timeout4)
      clearTimeout(timeout5)
      clearTimeout(timeout6)
    }
  }, [])

  // Generate particles for the background
  const particleCount = 50
  const particles = Array.from({ length: particleCount })

  // Node data
  const nodes = [
    {
      id: "main",
      label: "Keys",
      description: "The Keys of Monetary Crypto",
      position: { x: "50%", y: "30%" },
      connections: ["pro", "echo"],
    },
    {
      id: "pro",
      label: "Pro",
      description: "Professional Cryptocurrency Tools",
      position: { x: "30%", y: "50%" },
      connections: ["marketplace"],
    },
    {
      id: "echo",
      label: "Echo",
      description: "Enhanced Security Features",
      position: { x: "70%", y: "50%" },
      connections: ["social"],
    },
    {
      id: "marketplace",
      label: "Marketplace",
      description: "Buy and sell digital assets",
      position: { x: "20%", y: "70%" },
      connections: [],
    },
    {
      id: "social",
      label: "Social Wallet",
      description: "Connect with other crypto users",
      position: { x: "80%", y: "70%" },
      connections: [],
    },
  ]

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

      {/* Circular visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central radial animation */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Outer circle */}
            <motion.circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="#1f79bd"
              strokeWidth="0.5"
              strokeDasharray="1 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.6 }}
            />

            {/* Animated dots around the circle */}
            {Array.from({ length: 80 }).map((_, i) => {
              const angle = (i * 4.5 * Math.PI) / 180
              const x = 150 + 140 * Math.cos(angle)
              const y = 150 + 140 * Math.sin(angle)

              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="0.8"
                  fill="#1f79bd"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.1, 0.6, 0.1],
                    r: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.03,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              )
            })}

            {/* Inner circle */}
            <motion.circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="#1f79bd"
              strokeWidth="0.5"
              strokeDasharray="1 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8 }}
            />

            {/* Animated inner dots */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 6 * Math.PI) / 180
              const x = 150 + 100 * Math.cos(angle)
              const y = 150 + 100 * Math.sin(angle)

              return (
                <motion.circle
                  key={`inner-${i}`}
                  cx={x}
                  cy={y}
                  r="0.6"
                  fill="#1f79bd"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    r: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.04,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              )
            })}
          </svg>
        </motion.div>

        {/* Nodes and connections */}
        <div className="absolute inset-0">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.map((node) =>
              node.connections.map((targetId) => {
                const target = nodes.find((n) => n.id === targetId)
                if (!target) return null

                // Extract percentages and convert to numbers
                const sourceX = Number.parseFloat(node.position.x.replace("%", ""))
                const sourceY = Number.parseFloat(node.position.y.replace("%", ""))
                const targetX = Number.parseFloat(target.position.x.replace("%", ""))
                const targetY = Number.parseFloat(target.position.y.replace("%", ""))

                const isActive = activeNode === node.id || activeNode === targetId

                return (
                  <motion.path
                    key={`${node.id}-${targetId}`}
                    d={`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`}
                    stroke="#1f79bd"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: isActive ? 0.8 : 0.3,
                      pathLength: 1,
                      strokeWidth: isActive ? "0.6" : "0.3",
                    }}
                    transition={{
                      pathLength: { duration: 1.5, delay: 0.5 },
                      opacity: { duration: 0.3 },
                    }}
                  />
                )
              }),
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: isActive ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.8 },
                  scale: { duration: 0.5, delay: 0.8 },
                  x: isActive
                    ? {
                        duration: 0.5,
                        times: [0, 0.2, 0.8, 1],
                        repeat: 0,
                      }
                    : {},
                }}
              >
                <div className={`relative ${isActive ? "z-10" : "z-0"}`}>
                  {/* Node icon */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-brand-blue text-white" : "bg-black/60 text-brand-blue"
                    } backdrop-blur-sm border border-brand-blue/30 transition-colors duration-300`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Glowing effect when active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-brand-blue/30 rounded-lg blur-md"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </div>

                  {/* Node label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${isActive ? "text-white" : "text-brand-grey"} transition-colors duration-300`}
                    >
                      {node.label}
                    </div>

                    {/* Description (only visible when active) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="text-xs text-brand-grey mt-1 max-w-[150px] text-center"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {node.description}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom button */}
      <motion.div
        className="absolute bottom-6 right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 relative overflow-hidden group">
          <span className="relative z-10">View More</span>
          <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
        </button>
      </motion.div>
    </div>
  )
}
