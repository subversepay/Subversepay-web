"use client"

import { useState } from "react"
import { PlatformCard } from "./platform-card"
import { PlatformFilter } from "./platform-filter"
import { PLATFORMS, CATEGORIES, SORT_OPTIONS } from "@/lib/PLATFORMS"

export function PlatformGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("popularity")

  // Filter platforms based on selected category
  const filteredPlatforms = PLATFORMS.filter(
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
        categories={CATEGORIES}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        sortOptions={SORT_OPTIONS}
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
