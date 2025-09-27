"use client"

import { useState, useEffect } from "react"

interface TokenPrices {
  [symbol: string]: number
}

export const useTokenPrices = (symbols: string[]) => {
  const [prices, setPrices] = useState<TokenPrices>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      if (symbols.length === 0) return

      setIsLoading(true)
      setError(null)

      try {
        // Using CoinGecko API as an example - you can replace with your preferred price API
        const symbolsQuery = symbols.map((s) => s.toLowerCase()).join(",")
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbolsQuery}&vs_currencies=usd`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch prices")
        }

        const data = await response.json()

        // Map the response to our format
        const priceMap: TokenPrices = {}
        symbols.forEach((symbol) => {
          const key = symbol.toLowerCase()
          if (data[key]?.usd) {
            priceMap[symbol] = data[key].usd
          }
        })

        setPrices(priceMap)
      } catch (err) {
        console.error("Error fetching token prices:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch prices")

        // Fallback to mock prices
        const mockPrices: TokenPrices = {
          ETH: 2000,
          USDC: 1,
          USDT: 1,
          SUBV: 0.1,
        }
        setPrices(mockPrices)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()

    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000)

    return () => clearInterval(interval)
  }, [symbols])

  return { prices, isLoading, error }
}
