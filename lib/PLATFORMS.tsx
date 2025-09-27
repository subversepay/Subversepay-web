import { Play, Film, Tv, Music, Gamepad2, BookOpen, Laptop, Video } from "lucide-react"
import type React from "react"

export interface PlatformProps {
  name: string
  icon: React.ReactNode
  color: string
  discount: string
  plans: string[]
  description?: string
  category?: string
  popularity?: number
  address?: string
  blockchainPlans?: {
    id: string
    name: string
    price: string
    tokenType: string
    stablecoinAddress?: string
    durationDays: number
  }[]
}

export const PLATFORMS: PlatformProps[] = [
  {
    name: "Netflix",
    icon: <Play className="h-10 w-10" />,
    color: "#E50914",
    discount: "15% off",
    plans: ["Basic", "Standard", "Premium"],
    description: "Stream award-winning TV shows, movies, anime, documentaries, and more.",
    category: "video",
    popularity: 95,
    address: "0x1234567890123456789012345678901234567890",
    blockchainPlans: [
      { id: "basic", name: "Basic", price: "8", tokenType: "SUBV", durationDays: 30 },
      {
        id: "standard",
        name: "Standard",
        price: "12",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      {
        id: "premium",
        name: "Premium",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Disney+",
    icon: <Film className="h-10 w-10" />,
    color: "#0063e5",
    discount: "10% off",
    plans: ["Monthly", "Annual"],
    description: "Endless entertainment from Disney, Pixar, Marvel, Star Wars, and National Geographic.",
    category: "video",
    popularity: 90,
    address: "0x2345678901234567890123456789012345678901",
    blockchainPlans: [
      { id: "monthly", name: "Monthly", price: "7", tokenType: "SUBV", durationDays: 30 },
      {
        id: "annual",
        name: "Annual",
        price: "70",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 365,
      },
    ],
  },
  {
    name: "HBO Max",
    icon: <Tv className="h-10 w-10" />,
    color: "#5822b4",
    discount: "12% off",
    plans: ["With Ads", "Ad-Free", "Ultimate"],
    description: "Stream blockbuster movies, epic originals, and addictive series.",
    category: "video",
    popularity: 85,
    address: "0x3456789012345678901234567890123456789012",
    blockchainPlans: [
      { id: "with-ads", name: "With Ads", price: "10", tokenType: "SUBV", durationDays: 30 },
      {
        id: "ad-free",
        name: "Ad-Free",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      {
        id: "ultimate",
        name: "Ultimate",
        price: "20",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
]

// Helper functions to get specific data
export const getPlatformByAddress = (address: string) => {
  return PLATFORMS.find((platform) => platform.address?.toLowerCase() === address.toLowerCase())
}

export const getPlatformsByCategory = (category: string) => {
  if (category === "all") return PLATFORMS
  return PLATFORMS.filter((platform) => platform.category === category)
}

export const getPopularPlatforms = (limit?: number) => {
  const sorted = [...PLATFORMS].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  return limit ? sorted.slice(0, limit) : sorted
}

export const CATEGORIES = [
  { value: "all", label: "All Platforms" },
  { value: "video", label: "Video Streaming" },
  { value: "music", label: "Music" },
  { value: "gaming", label: "Gaming" },
  { value: "audio", label: "Audio" },
]

export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Highest Discount" },
  { value: "name", label: "Alphabetical" },
]
