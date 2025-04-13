"use client"

import { useState } from "react"
import { Play, Film, Tv, Music, Gamepad2, BookOpen, Laptop, Video } from "lucide-react"
import { PlatformCard, type PlatformProps } from "./platform-card"
import { PlatformFilter, type FilterOption } from "./platform-filter"

// Extended platform data with more details
const allPlatforms: PlatformProps[] = [
  {
    name: "Netflix",
    icon: <Play className="h-10 w-10" />,
    color: "#E50914",
    discount: "15% off",
    plans: ["Basic", "Standard", "Premium"],
    description: "Stream award-winning TV shows, movies, anime, documentaries, and more.",
    category: "video",
    popularity: 95,
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
  },
]

const categories: FilterOption[] = [
  { value: "all", label: "All Platforms" },
  { value: "video", label: "Video Streaming" },
  { value: "music", label: "Music" },
  { value: "gaming", label: "Gaming" },
  { value: "audio", label: "Audio" },
]

const sortOptions: FilterOption[] = [
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Highest Discount" },
  { value: "name", label: "Alphabetical" },
]

export function PlatformGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("popularity")

  // Filter platforms based on selected category
  const filteredPlatforms = allPlatforms.filter(
    (platform) => selectedCategory === "all" || platform.category === selectedCategory,
  )

  // Sort platforms based on selected sort option
  const sortedPlatforms = [...filteredPlatforms].sort((a, b) => {
    if (selectedSort === "popularity") {
      return (b.popularity || 0) - (a.popularity || 0)
    } else if (selectedSort === "discount") {
      return Number.parseInt(b.discount) - Number.parseInt(a.discount)
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  return (
    <div>
      <PlatformFilter
        categories={categories}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        sortOptions={sortOptions}
        onSortChange={setSelectedSort}
        selectedSort={selectedSort}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPlatforms.map((platform) => (
          <PlatformCard key={platform.name} platform={platform} />
        ))}
      </div>
    </div>
  )
}
