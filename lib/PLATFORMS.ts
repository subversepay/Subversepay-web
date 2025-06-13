import { Platform } from "@/types/subscription"

export const PLATFORMS: Platform[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "StreamFlix",
    description: "Premium video streaming service",
    plans: [
      { id: "basic", name: "Basic", price: "5", tokenType: "SUBV", durationDays: 30 },
      { id: "pro", name: "Pro", price: "10", tokenType: "stablecoin", stablecoinAddress: "0x...", durationDays: 30 },
    ],
  },
  // ...other platforms
]