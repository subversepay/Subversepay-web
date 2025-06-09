"use client"

import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { connectWalletOnly, disconnectWallet } from "@/lib/auth/wallet-auth"
import { getCurrentAccounts } from "@/lib/web3/web3-utils"

// Create the context with a default value
export const ContractContext = createContext({
  currentAccount: null,
  setCurrentAccount: () => {},
  ConnectWallet: async () => {},
  DisConnectWallet: () => {},
  isConnecting: false,
})

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user has a connected wallet in localStorage
    const storedWallet = localStorage.getItem("walletAddress")
    if (storedWallet) {
      setCurrentAccount(storedWallet)
    }

    // Check if wallet is still connected in MetaMask
    const checkWalletConnection = async () => {
      try {
        const accounts = await getCurrentAccounts()
        if (accounts.length === 0 && storedWallet) {
          // Wallet was disconnected in MetaMask
          localStorage.removeItem("walletAddress")
          setCurrentAccount(null)
        }
      } catch (error) {
        console.log("Error checking wallet connection:", error)
      }
    }

    checkWalletConnection()
  }, [])

  const ConnectWallet = async () => {
    setIsConnecting(true)

    try {
      const result = await connectWalletOnly()

      if (result.success) {
        setCurrentAccount(result.address)
        toast({
          title: "Wallet connected! 🔗",
          description: `Connected to ${result.address.slice(0, 6)}...${result.address.slice(-4)}`,
          variant: "success",
        })
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const DisConnectWallet = () => {
    disconnectWallet()
    setCurrentAccount(null)
    toast({
      variant: "info",
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Setup event listeners for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0])
          localStorage.setItem("walletAddress", accounts[0])
        } else {
          // User disconnected their wallet
          DisConnectWallet()
        }
      }

      // Setup event listener for chain changes
      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      // Cleanup listeners on unmount
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [])

  return (
    <ContractContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        ConnectWallet,
        DisConnectWallet,
        isConnecting,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}
