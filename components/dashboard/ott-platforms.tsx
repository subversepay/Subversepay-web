"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Film, Tv, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OttPlatforms() {
  const [activeCategory, setActiveCategory] = useState("all")

  const platforms = [
    {
      name: "NetflixPro",
      category: "streaming",
      icon: <Play className="h-6 w-6" />,
      color: "#E50914",
      subscribed: true,
      plan: "Premium",
      price: "$15.99/mo",
      nextBilling: "May 15, 2025",
    },
    {
      name: "DisneyPlus",
      category: "streaming",
      icon: <Film className="h-6 w-6" />,
      color: "#0063e5",
      subscribed: true,
      plan: "Monthly",
      price: "$7.99/mo",
      nextBilling: "May 22, 2025",
    },
    {
      name: "Spotify",
      category: "music",
      icon: <Music className="h-6 w-6" />,
      color: "#1DB954",
      subscribed: true,
      plan: "Individual",
      price: "$9.99/mo",
      nextBilling: "May 30, 2025",
    },
    {
      name: "HBO Max",
      category: "streaming",
      icon: <Tv className="h-6 w-6" />,
      color: "#5822b4",
      subscribed: false,
      plan: "Ad-Free",
      price: "$14.99/mo",
      nextBilling: "N/A",
    },
  ]

  const filteredPlatforms =
    activeCategory === "all" ? platforms : platforms.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Your OTT Subscriptions</h2>

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
            variant={activeCategory === "streaming" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              activeCategory === "streaming"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-white"
                : "border-brand-blue/30 text-brand-grey hover:text-white hover:bg-brand-blue/10"
            }`}
            onClick={() => setActiveCategory("streaming")}
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
        {filteredPlatforms.map((platform, index) => (
          <motion.div
            key={platform.name}
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
                  {platform.subscribed ? (
                    <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400">Active</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-xs bg-brand-blue/20 text-brand-blue">Available</span>
                  )}
                </div>
                {platform.subscribed ? (
                  <div className="text-sm text-brand-grey">
                    {platform.plan} • {platform.price}
                  </div>
                ) : (
                  <div className="text-sm text-brand-grey">Save up to 15% with SubversePay</div>
                )}
              </div>
            </div>

            {platform.subscribed && (
              <div className="mt-3 pt-3 border-t border-brand-blue/10 flex items-center justify-between">
                <div className="text-xs text-brand-grey">Next billing: {platform.nextBilling}</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                >
                  Manage
                </Button>
              </div>
            )}

            {!platform.subscribed && (
              <div className="mt-3 pt-3 border-t border-brand-blue/10 flex justify-end">
                <Button size="sm" className="h-7 text-xs bg-brand-blue hover:bg-brand-blue/90 text-white">
                  Subscribe
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10">
          Browse More OTT Platforms
        </Button>
      </div>
    </div>
  )
}
