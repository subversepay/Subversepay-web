export interface Plan {
  id: string
  name: string
  price: string // as string for ethers parsing
  tokenType: "SUBV" | "stablecoin"
  stablecoinAddress?: string
  durationDays: number
  description?: string
}

export interface Platform {
  address: string
  name: string
  description: string
  plans: Plan[]
}