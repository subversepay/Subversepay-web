"use client"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { getCurrentAccounts, checkIfWalletIsConnected } from "@/lib/web3/web3-utils"
import { formatBigNumber } from "@/lib/web3/contract-utils"

// ERC20 ABI for balance checking
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
]

// Common stablecoin addresses (you can update these based on your network)
const TOKEN_ADDRESSES = {
  USDC: "0xA0b86a33E6441b8435b662303c0f479c6e8c385d", // Example USDC address
  USDT: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // Example USDT address
  SUBV: process.env.NEXT_PUBLIC_SUBV_TOKEN_ADDRESS || "0x...", // Your SUBV token address
}

interface TokenBalance {
  symbol: string
  name: string
  balance: string
  decimals: number
  address: string
  usdValue?: number
}

interface WalletBalanceState {
  balances: TokenBalance[]
  totalUsdValue: number
  isLoading: boolean
  error: string | null
  walletAddress: string | null
  isConnected: boolean
}

export const useWalletBalance = () => {
  const [state, setState] = useState<WalletBalanceState>({
    balances: [],
    totalUsdValue: 0,
    isLoading: false,
    error: null,
    walletAddress: null,
    isConnected: false,
  })

  // Get ETH balance
  const getEthBalance = useCallback(async (address: string) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) return "0"

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const balance = await provider.getBalance(address)
      return ethers.utils.formatEther(balance)
    } catch (error) {
      console.error("Error getting ETH balance:", error)
      return "0"
    }
  }, [])

  // Get token balance
  const getTokenBalance = useCallback(async (tokenAddress: string, walletAddress: string) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) return null

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)

      const [balance, decimals, symbol, name] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals(),
        contract.symbol(),
        contract.name(),
      ])

      return {
        symbol,
        name,
        balance: formatBigNumber(balance, decimals),
        decimals,
        address: tokenAddress,
      }
    } catch (error) {
      console.error(`Error getting token balance for ${tokenAddress}:`, error)
      return null
    }
  }, [])

  // Fetch all balances
  const fetchBalances = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const accounts = await getCurrentAccounts()
      if (!accounts || accounts.length === 0) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isConnected: false,
          walletAddress: null,
          balances: [],
          totalUsdValue: 0,
        }))
        return
      }

      const walletAddress = accounts[0]

      // Get ETH balance
      const ethBalance = await getEthBalance(walletAddress)

      // Get token balances
      const tokenPromises = Object.entries(TOKEN_ADDRESSES).map(([symbol, address]) =>
        getTokenBalance(address, walletAddress),
      )

      const tokenResults = await Promise.all(tokenPromises)
      const validTokens = tokenResults.filter(Boolean) as TokenBalance[]

      // Add ETH balance
      const allBalances: TokenBalance[] = [
        {
          symbol: "ETH",
          name: "Ethereum",
          balance: ethBalance,
          decimals: 18,
          address: "0x0000000000000000000000000000000000000000",
        },
        ...validTokens,
      ]

      // Calculate total USD value (you can integrate with price APIs here)
      const totalUsdValue = allBalances.reduce((total, token) => {
        // Mock USD values - replace with real price data
        const mockPrices: { [key: string]: number } = {
          ETH: 2000,
          USDC: 1,
          USDT: 1,
          SUBV: 0.1, // Example price for SUBV token
        }

        const price = mockPrices[token.symbol] || 0
        const usdValue = Number.parseFloat(token.balance) * price
        token.usdValue = usdValue

        return total + usdValue
      }, 0)

      setState((prev) => ({
        ...prev,
        balances: allBalances,
        totalUsdValue,
        walletAddress,
        isConnected: true,
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error fetching balances:", error)
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to fetch balances",
        isLoading: false,
      }))
    }
  }, [getEthBalance, getTokenBalance])

  // Check wallet connection and fetch balances
  useEffect(() => {
    const initializeWallet = async () => {
      const isWalletAvailable = await checkIfWalletIsConnected()
      if (isWalletAvailable) {
        await fetchBalances()
      }
    }

    initializeWallet()
  }, [fetchBalances])

  // Listen for account changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setState((prev) => ({
          ...prev,
          isConnected: false,
          walletAddress: null,
          balances: [],
          totalUsdValue: 0,
        }))
      } else {
        fetchBalances()
      }
    }

    const handleChainChanged = () => {
      fetchBalances()
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [fetchBalances])

  return {
    ...state,
    refreshBalances: fetchBalances,
  }
}
