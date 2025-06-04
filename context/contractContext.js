"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Create the context with a default value
export const ContractContext = React.createContext()

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState({
    address: ""
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const [ethereum, setEthereum] = useState(null)
  const [signer, setSigner] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for Ethereum provider
    if (typeof window !== "undefined") {
      setEthereum(window.ethereum)

      // Check if user has a connected wallet in localStorage
      const storedWallet = localStorage.getItem("walletAddress")
      if (storedWallet) {
        setCurrentAccount({address: storedWallet})
      }
    }
  }, [])

  // Check if user is authenticated (has token)
  const isAuthenticated = () => {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("token")
  }

  // Get auth token
  const getAuthToken = () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  }

  // Func to Connect wallet (for initial authentication)
  const ConnectWallet = async () => {
    setIsConnecting(true)

    try {
      const hasWallet = await checkIfWalletIsConnected()
      if (!hasWallet) {
        setIsConnecting(false)
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        toast({
          title: "No accounts found",
          description: "Please create an account in Metamask",
          variant: "destructive",
        })
        return
      }

      const address = accounts[0]
      setCurrentAccount({address})
      
      const message = `Welcome to SubversePay! Please sign this message to authenticate your wallet: ${address}`
      
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [message, address],
      })
      
      console.log("walletAddress", address)
      console.log("signature", signature)
      const response = await fetch("http://localhost:3002/api/users/wallet-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, signature }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || "Authentication failed")
      }

      localStorage.setItem("token", data.token)

      const userResponse = await fetch("http://localhost:3002/api/users/me", {
        headers: {
          'x-auth-token': data.token,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        localStorage.setItem("user", JSON.stringify(userData))
      }

      toast({
        title: "Wallet connected",
        description: "You have been authenticated with your wallet",
        variant: "success",
      })

      router.push("/dashboard")
    } catch (error) {
      console.log(error)
      toast({
        title: "Connection failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Func to Link additional wallet to existing account
  const LinkWallet = async () => {
    console.log("link wallet start......");
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
      const hasWallet = await checkIfWalletIsConnected()
      if (!hasWallet) {
        setIsLinking(false)
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        toast({
          title: "No accounts found",
          description: "Please create an account in Metamask",
          variant: "destructive",
        })
        return
      }

      const address = accounts[0]
      setCurrentAccount({address})

      const token = getAuthToken()
console.log("linking wal starts:.....", address);
      // Step 1: Request nonce from backend
      const nonceResponse = await fetch("http://localhost:3002/api/users/link-wallet", {
        method: "POST",
        headers: {
          'x-auth-token': token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })

      const nonceData = await nonceResponse.json()

      if (!nonceResponse.ok) {
        throw new Error(nonceData.msg || "Failed to initiate wallet linking")
      }

      // Step 2: Sign the nonce
      const message = `I am signing my one-time nonce: ${nonceData.nonce}`
      
      console.log("signing message.......");
      
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [message, address],
      })
console.log("signature", signature);
      // Step 3: Verify signature with backend
      const verifyResponse = await fetch("http://localhost:3002/api/users/verify-link-wallet", {
        method: "POST",
        headers: {
          'x-auth-token': token,
        },
        body: JSON.stringify({ address, signature }),
      })
console.log("verifyRes:", verifyResponse);
      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.msg || "Failed to verify wallet signature")
      }

      // Step 4: Update local state and user data
      setCurrentAccount({address})
      localStorage.setItem("walletAddress", address)

      // Refresh user data to show the new wallet
      const userResponse = await fetch("http://localhost:3002/api/users/me", {
        headers: {
          'x-auth-token': data.token,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        localStorage.setItem("user", JSON.stringify(userData))
      }

      toast({
        title: "Wallet linked successfully",
        description: "Your wallet has been linked to your account",
        variant: "success",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to link wallet",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLinking(false)
    }
  }

  // Func to Disconnect wallet
  const DisConnectWallet = () => {
    setCurrentAccount({address: ""})
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast({
      title: "Wallet disconnected",
      description: "You have been logged out",
      variant: "info",
    })
  }

  // Check if window.ethereum is available
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        toast({
          title: "Metamask not detected",
          description: "Please install Metamask browser extension",
          variant: "destructive",
        })
        return false
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [ethereum])

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
