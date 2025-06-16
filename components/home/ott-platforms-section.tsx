"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPopularPlatforms } from "@/lib/PLATFORMS"

export default function OttPlatformsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get the top 8 most popular platforms
  const platforms = getPopularPlatforms(8)

  return (
    <section id="platforms" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Supported OTT Platforms
          </h2>
          <p className="text-brand-grey text-lg">
            Subscribe to your favorite streaming services with stablecoin payments and save up to 15% on subscription
            fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className={`relative group transition-all duration-700 delay-${index * 100} ${
                inView ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 border border-brand-blue/30 rounded-xl"></div>
              <div className="absolute inset-0 backdrop-blur-sm rounded-xl"></div>

              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-brand-blue/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-brand-blue/50 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-brand-blue/50 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-brand-blue/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 z-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors h-full flex flex-col">
                <div className="mb-4 relative">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    <div className="text-brand-blue">{platform.icon}</div>
                  </div>
                  <div className="absolute -inset-1 bg-brand-blue/20 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{platform.name}</h3>

                <div className="space-y-3 mb-4 flex-grow">
                  <div>
                    <div className="text-sm text-brand-grey mb-1">Available Plans</div>
                    <div className="flex flex-wrap gap-2">
                      {platform.plans.map((plan, i) => (
                        <span key={i} className="px-2 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue">
                          {plan}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-brand-grey mb-1">Discount with SubversePay</div>
                    <div className="text-green-400 font-medium">{platform.discount}</div>
                  </div>
                </div>

                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white relative overflow-hidden group">
                  <span className="relative z-10">Subscribe Now</span>
                  <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg relative overflow-hidden group"
          >
            <Link href="/platforms">
              <span className="relative z-10">View All Platforms</span>
              <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
