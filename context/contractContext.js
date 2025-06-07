"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { checkIfWalletIsConnected } from "@/lib/web3/web3-utils"
import { completeWalletLinking, walletLogin } from "@/lib/auth/wallet-auth"
import { isAuthenticated } from "@/lib/auth/auth"

// Create the context with a default value
export const ContractContext = React.createContext()

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const [ethereum, setEthereum] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  // Initialize ethereum object and check for stored wallet
  useEffect(() => {
    if (typeof window !== "undefined") {
      setEthereum(window.ethereum)

      // Check if user has a connected wallet in localStorage
      const storedWallet = localStorage.getItem("walletAddress")
      if (storedWallet) {
        setCurrentAccount(storedWallet)
      }
    }
  }, [])

  // Connect wallet for authentication
  const ConnectWallet = async () => {
    setIsConnecting(true)

    try {
      const hasWallet = await checkIfWalletIsConnected()
      if (!hasWallet) {
        toast({
          title: "Metamask not detected",
          description: "Please install Metamask browser extension",
          variant: "destructive",
        })
        return
      }

      const result = await walletLogin()

      setCurrentAccount(result.address)

      toast({
        title: "Wallet connected",
        description: "You have been authenticated with your wallet",
        variant: "success",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Link additional wallet to existing account
  const LinkWallet = async () => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication required",
        description: "Please log in to link a wallet",
        variant: "warning",
      })
      return
    }

    setIsLinking(true)

    try {
      console.log("Starting wallet linking from context...")
      const result = await completeWalletLinking()
      console.log("Wallet linking completed:", result)

      setCurrentAccount(result.address)

      toast({
        title: "Wallet linked successfully",
        description: "Your wallet has been linked to your account",
        variant: "success",
      })
    } catch (error) {
      console.error("Failed to link wallet:", error)

      // More specific error messages
      let errorMessage = "An unknown error occurred"
      if (error.message.includes("User rejected")) {
        errorMessage = "Wallet connection was rejected"
      } else if (error.message.includes("Authentication required")) {
        errorMessage = "Please log in first"
      } else if (error.message.includes("MetaMask")) {
        errorMessage = "Please install MetaMask"
      } else if (error.message.includes("No token")) {
        errorMessage = "Authentication token not found. Please log in again."
      } else if (error.message.includes("Token is not valid")) {
        errorMessage = "Authentication token expired. Please log in again."
      } else {
        errorMessage = error.message
      }

      toast({
        title: "Failed to link wallet",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLinking(false)
    }
  }

  // Disconnect wallet
  const DisConnectWallet = useCallback(() => {
    setCurrentAccount(null)
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    toast({
      title: "Wallet disconnected",
      description: "You have been logged out",
      variant: "info",
    })
  }, [toast])

  // Check wallet connection on ethereum change
  useEffect(() => {
    if (ethereum) {
      checkIfWalletIsConnected()

      // Setup event listeners for account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0])
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

      ethereum.on("accountsChanged", handleAccountsChanged)
      ethereum.on("chainChanged", handleChainChanged)

      // Cleanup listeners on unmount
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("accountsChanged", handleAccountsChanged)
          ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [ethereum, DisConnectWallet])

  return (
    <ContractContext.Provider
      value={{
        currentAccount,
        ConnectWallet,
        DisConnectWallet,
        LinkWallet,
        isConnecting,
        isLinking,
        isAuthenticated,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}
