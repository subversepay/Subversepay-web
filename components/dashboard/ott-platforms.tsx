"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getPlatformsByCategory } from "@/lib/PLATFORMS"

interface Subscription {
  _id: string
  subscriberAddress: string
  ottPlatformAddress: string
  planId: string
  expiryTimestamp: number
  isActive: boolean
  transactionHash: string
  blockNumber: number
  createdAt: string
  updatedAt: string
}

export default function OttPlatforms({ subscriptions = [] }: { subscriptions?: Subscription[] }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const router = useRouter()

  const getPlatformSubscription = (platformAddress: string) => {
    return subscriptions.find(
      (sub) =>
        sub.ottPlatformAddress.toLowerCase() === platformAddress.toLowerCase() &&
        sub.isActive &&
        sub.expiryTimestamp > Date.now(),
    )
  }

  // Get platforms that have addresses (blockchain-enabled platforms)
  const blockchainPlatforms = getPlatformsByCategory(activeCategory).filter((platform) => platform.address)

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Your Subscriptions</h2>

        <div className="flex items-center gap-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              activeCategory === "all"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-white"
                : "border-brand-blue/30 text-brand-grey hover:text-white hover:bg-brand-blue/10"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </Button>
          <Button
            variant={activeCategory === "video" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              activeCategory === "video"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-white"
                : "border-brand-blue/30 text-brand-grey hover:text-white hover:bg-brand-blue/10"
            }`}
            onClick={() => setActiveCategory("video")}
          >
            Streaming
          </Button>
          <Button
            variant={activeCategory === "music" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              activeCategory === "music"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-white"
                : "border-brand-blue/30 text-brand-grey hover:text-white hover:bg-brand-blue/10"
            }`}
            onClick={() => setActiveCategory("music")}
          >
            Music
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blockchainPlatforms.map((platform, index) => {
          const subscription = getPlatformSubscription(platform.address!)
          const isSubscribed = !!subscription

          return (
            <motion.div
              key={platform.address}
              className="bg-black/60 border border-brand-blue/20 rounded-lg p-4 hover:border-brand-blue/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <div className="text-brand-blue">{platform.icon}</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{platform.name}</h3>
                    {isSubscribed ? (
                      <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-xs bg-brand-blue/20 text-brand-blue">Available</span>
                    )}
                  </div>
                  {isSubscribed ? (
                    <div className="text-sm text-brand-grey">
                      Plan: {subscription.planId} • Expires:{" "}
                      {new Date(subscription.expiryTimestamp).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-sm text-brand-grey">Save up to {platform.discount} with SubversePay</div>
                  )}
                </div>
              </div>

              {isSubscribed && (
                <div className="mt-3 pt-3 border-t border-brand-blue/10 flex items-center justify-between">
                  <div className="text-xs text-brand-grey">
                    Next billing: {new Date(subscription.expiryTimestamp).toLocaleDateString()}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                    onClick={() => router.push("/subscriptions")}
                  >
                    Manage
                  </Button>
                </div>
              )}

              {!isSubscribed && (
                <div className="mt-3 pt-3 border-t border-brand-blue/10 flex justify-end">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-brand-blue hover:bg-brand-blue/90 text-white"
                    onClick={() => router.push("/subscriptions/browse")}
                  >
                    Subscribe
                  </Button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
          onClick={() => router.push("/subscriptions/browse")}
        >
          Browse More Platforms
        </Button>
      </div>
    </div>
  )
}
