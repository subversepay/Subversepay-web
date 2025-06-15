import { Platform } from "@/types/subscription"

export const PLATFORMS: Platform[] = [
  {
    address: "0xc597037Bb39C1000dC38131e576C0528a2C93F3b",
    name: "StreamFlix",
    description: "Premium video streaming service",
    plans: [
      { id: "basic", name: "Basic", price: "5", tokenType: "SUBV", durationDays: 30 },
      { id: "pro", name: "Pro", price: "10", tokenType: "stablecoin", stablecoinAddress: "0x...", durationDays: 30 },
    ],
  },
  // ...other platforms
]