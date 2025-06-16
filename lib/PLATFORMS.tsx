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
  {
    name: "Amazon Prime",
    icon: <Play className="h-10 w-10" />,
    color: "#00A8E1",
    discount: "8% off",
    plans: ["Monthly", "Annual"],
    description: "Watch movies, TV, and sports, including Amazon Originals.",
    category: "video",
    popularity: 88,
    address: "0x4567890123456789012345678901234567890123",
    blockchainPlans: [
      { id: "monthly", name: "Monthly", price: "9", tokenType: "SUBV", durationDays: 30 },
      {
        id: "annual",
        name: "Annual",
        price: "99",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 365,
      },
    ],
  },
  {
    name: "Hulu",
    icon: <Tv className="h-10 w-10" />,
    color: "#1CE783",
    discount: "10% off",
    plans: ["With Ads", "No Ads", "Live TV"],
    description: "Watch thousands of shows and movies, with plans starting at $7.99/month.",
    category: "video",
    popularity: 82,
    address: "0x5678901234567890123456789012345678901234",
    blockchainPlans: [
      { id: "with-ads", name: "With Ads", price: "6", tokenType: "SUBV", durationDays: 30 },
      {
        id: "no-ads",
        name: "No Ads",
        price: "12",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      {
        id: "live-tv",
        name: "Live TV",
        price: "70",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Apple TV+",
    icon: <Tv className="h-10 w-10" />,
    color: "#A1A1A1",
    discount: "5% off",
    plans: ["Monthly", "Annual"],
    description: "Stream exclusive Apple Originals from the world's greatest storytellers.",
    category: "video",
    popularity: 75,
    address: "0x6789012345678901234567890123456789012345",
    blockchainPlans: [
      { id: "monthly", name: "Monthly", price: "5", tokenType: "SUBV", durationDays: 30 },
      {
        id: "annual",
        name: "Annual",
        price: "50",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 365,
      },
    ],
  },
  {
    name: "Spotify",
    icon: <Music className="h-10 w-10" />,
    color: "#1DB954",
    discount: "12% off",
    plans: ["Individual", "Duo", "Family"],
    description: "Listen to millions of songs, podcasts, and audiobooks.",
    category: "music",
    popularity: 92,
    address: "0x7890123456789012345678901234567890123456",
    blockchainPlans: [
      { id: "individual", name: "Individual", price: "10", tokenType: "SUBV", durationDays: 30 },
      {
        id: "duo",
        name: "Duo",
        price: "13",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      {
        id: "family",
        name: "Family",
        price: "16",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Apple Music",
    icon: <Music className="h-10 w-10" />,
    color: "#FA243C",
    discount: "8% off",
    plans: ["Individual", "Student", "Family"],
    description: "Stream 100 million songs, ad-free with spatial audio.",
    category: "music",
    popularity: 84,
    address: "0x8901234567890123456789012345678901234567",
    blockchainPlans: [
      { id: "individual", name: "Individual", price: "10", tokenType: "SUBV", durationDays: 30 },
      { id: "student", name: "Student", price: "5", tokenType: "SUBV", durationDays: 30 },
      {
        id: "family",
        name: "Family",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Xbox Game Pass",
    icon: <Gamepad2 className="h-10 w-10" />,
    color: "#107C10",
    discount: "15% off",
    plans: ["Console", "PC", "Ultimate"],
    description: "Unlimited access to over 100 high-quality games.",
    category: "gaming",
    popularity: 88,
    address: "0x9012345678901234567890123456789012345678",
    blockchainPlans: [
      { id: "console", name: "Console", price: "10", tokenType: "SUBV", durationDays: 30 },
      { id: "pc", name: "PC", price: "10", tokenType: "SUBV", durationDays: 30 },
      {
        id: "ultimate",
        name: "Ultimate",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "PlayStation Plus",
    icon: <Gamepad2 className="h-10 w-10" />,
    color: "#0070D1",
    discount: "10% off",
    plans: ["Essential", "Extra", "Premium"],
    description: "Get monthly games, online multiplayer, exclusive discounts, and more.",
    category: "gaming",
    popularity: 86,
    address: "0xa123456789012345678901234567890123456789",
    blockchainPlans: [
      { id: "essential", name: "Essential", price: "10", tokenType: "SUBV", durationDays: 30 },
      {
        id: "extra",
        name: "Extra",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      {
        id: "premium",
        name: "Premium",
        price: "18",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Audible",
    icon: <BookOpen className="h-10 w-10" />,
    color: "#F6BC25",
    discount: "12% off",
    plans: ["Plus", "Premium Plus"],
    description: "The largest selection of audiobooks and audio entertainment.",
    category: "audio",
    popularity: 78,
    address: "0xb234567890123456789012345678901234567890",
    blockchainPlans: [
      { id: "plus", name: "Plus", price: "8", tokenType: "SUBV", durationDays: 30 },
      {
        id: "premium-plus",
        name: "Premium Plus",
        price: "15",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "YouTube Premium",
    icon: <Video className="h-10 w-10" />,
    color: "#FF0000",
    discount: "8% off",
    plans: ["Individual", "Family", "Student"],
    description: "Ad-free videos, background play, and YouTube Music Premium.",
    category: "video",
    popularity: 80,
    address: "0xc345678901234567890123456789012345678901",
    blockchainPlans: [
      { id: "individual", name: "Individual", price: "12", tokenType: "SUBV", durationDays: 30 },
      {
        id: "family",
        name: "Family",
        price: "18",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
      { id: "student", name: "Student", price: "7", tokenType: "SUBV", durationDays: 30 },
    ],
  },
  {
    name: "Twitch",
    icon: <Laptop className="h-10 w-10" />,
    color: "#9146FF",
    discount: "10% off",
    plans: ["Turbo"],
    description: "Watch and support your favorite streamers ad-free.",
    category: "video",
    popularity: 75,
    address: "0xd456789012345678901234567890123456789012",
    blockchainPlans: [{ id: "turbo", name: "Turbo", price: "9", tokenType: "SUBV", durationDays: 30 }],
  },
  {
    name: "Paramount+",
    icon: <Film className="h-10 w-10" />,
    color: "#0064FF",
    discount: "12% off",
    plans: ["Essential", "With Showtime"],
    description: "Stream originals, movies, and your favorite shows from CBS, BET, Comedy Central, and more.",
    category: "video",
    popularity: 70,
    address: "0xe567890123456789012345678901234567890123",
    blockchainPlans: [
      { id: "essential", name: "Essential", price: "6", tokenType: "SUBV", durationDays: 30 },
      {
        id: "with-showtime",
        name: "With Showtime",
        price: "12",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Peacock",
    icon: <Tv className="h-10 w-10" />,
    color: "#000000",
    discount: "8% off",
    plans: ["Premium", "Premium Plus"],
    description: "Stream current NBC and Bravo hits, exclusive Originals, and iconic movies and shows.",
    category: "video",
    popularity: 65,
    address: "0xf678901234567890123456789012345678901234",
    blockchainPlans: [
      { id: "premium", name: "Premium", price: "5", tokenType: "SUBV", durationDays: 30 },
      {
        id: "premium-plus",
        name: "Premium Plus",
        price: "10",
        tokenType: "stablecoin",
        stablecoinAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        durationDays: 30,
      },
    ],
  },
  {
    name: "Tidal",
    icon: <Music className="h-10 w-10" />,
    color: "#000000",
    discount: "15% off",
    plans: ["HiFi", "HiFi Plus"],
    description: "Experience music as the artist intended with HiFi sound quality.",
    category: "music",
    popularity: 60,
    address: "0x1789012345678901234567890123456789012345",
    blockchainPlans: [
      { id: "hifi", name: "HiFi", price: "10", tokenType: "SUBV", durationDays: 30 },
      {
        id: "hifi-plus",
        name: "HiFi Plus",
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
