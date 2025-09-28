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

  const partners = [
    { name: "Binance Pay", logo: "/Subversepay-web/placeholder.svg" },
    { name: "Stripe", logo: "/Subversepay-web/placeholder.svg" },
    { name: "MetaMask", logo: "/Subversepay-web/placeholder.svg" },
    { name: "WalletConnect", logo: "/Subversepay-web/placeholder.svg" },
    { name: "Payoneer", logo: "/Subversepay-web/placeholder.svg" },
  ]

  // Generate particles for background
  const particleCount = 30
  const particles = Array.from({ length: particleCount })

  return (
    <div className="relative w-full px-4 max-w-4xl mx-auto h-[300px] overflow-hidden" ref={containerRef}>
      {/* Background */}
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

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Trusted By Merchants & Developers
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join the growing ecosystem of businesses integrating SubversePay for seamless stablecoin payments.
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
            {/* Marquee motion */}
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -1500] }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-lg px-6 py-4 hover:border-brand-blue/50 transition-colors"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={30}
                    className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
          </div>
        </motion.div>

        {/* Focus Keys */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-foreground text-sm">
            <span className="text-brand-blue font-medium">SOL</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-brand-blue font-medium">ETH</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">USDC</span>
          </div>

          <div className="h-px w-12 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"></div>

          <div className="text-foreground font-medium">API First • Merchant Ready</div>
        </motion.div>
      </div>
    </div>
  )
}
