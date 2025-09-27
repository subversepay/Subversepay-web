"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type FilterOption = {
  value: string
  label: string
}

interface PlatformFilterProps {
  categories: FilterOption[]
  onCategoryChange: (category: string) => void
  selectedCategory: string
  sortOptions: FilterOption[]
  onSortChange: (sort: string) => void
  selectedSort: string
}

export function PlatformFilter({
  categories,
  onCategoryChange,
  selectedCategory,
  sortOptions,
  onSortChange,
  selectedSort,
}: PlatformFilterProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            className={`
              rounded-full text-sm px-4 h-9
              ${
                selectedCategory === category.value
                  ? "bg-brand-blue text-white"
                  : "bg-transparent border-border text-muted-foreground hover:text-foreground"
              }
            `}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
            Sort by: {sortOptions.find((o) => o.value === selectedSort)?.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-background border border-border backdrop-blur-md">
          <DropdownMenuRadioGroup value={selectedSort} onValueChange={onSortChange}>
            {sortOptions.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="text-muted-foreground hover:text-foreground hover:bg-brand-blue/20 cursor-pointer"
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
