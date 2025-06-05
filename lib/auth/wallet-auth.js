/**
 * Wallet authentication utilities
 */
import { signMessage, requestWalletConnection } from "../web3/web3-utils"
import { getToken, refreshUserData } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

// Link wallet to existing account (Step 1: Get nonce)
export const linkWallet = async (address) => {
  try {
    const token = getToken()
    if (!token) throw new Error("Authentication required")

    const response = await fetch(`${API_BASE_URL}/api/users/link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ address }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.msg || "Failed to initiate wallet linking")
    }

    return data
  } catch (error) {
    console.error("Error linking wallet:", error)
    throw error
  }
}

// Verify wallet linking (Step 2: Verify signature)
export const verifyLinkWallet = async (address, signature) => {
  try {
    const token = getToken()
    if (!token) throw new Error("Authentication required")

    const response = await fetch(`${API_BASE_URL}/api/users/verify-link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ address, signature }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.msg || "Failed to verify wallet signature")
    }

    return data
  } catch (error) {
    console.error("Error verifying wallet link:", error)
    throw error
  }
}

// Complete wallet linking process
export const completeWalletLinking = async () => {
  try {
    // 1. Request wallet connection
    const address = await requestWalletConnection()

    // 2. Get nonce from backend
    const { nonce } = await linkWallet(address)

    // 3. Sign the nonce
    const message = `I am signing my one-time nonce: ${nonce}`
    const signature = await signMessage(message, address)

    // 4. Verify signature with backend
    await verifyLinkWallet(address, signature)

    // 5. Update local storage and refresh user data
    localStorage.setItem("walletAddress", address)
    await refreshUserData()

    return { success: true, address }
  } catch (error) {
    console.error("Error completing wallet linking:", error)
    throw error
  }
}

// Wallet login
export const walletLogin = async () => {
  try {
    // 1. Request wallet connection
    const address = await requestWalletConnection()

    // 2. Sign authentication message
    const message = `Welcome to SubversePay! Please sign this message to authenticate your wallet: ${address}`
    const signature = await signMessage(message, address)

    // 3. Send to backend for verification
    const response = await fetch(`${API_BASE_URL}/api/users/wallet-login`, {
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

    // 4. Store token and user data
    localStorage.setItem("token", data.token)
    localStorage.setItem("walletAddress", address)

    // 5. Fetch user profile
    await refreshUserData()

    return { success: true, address }
  } catch (error) {
    console.error("Error during wallet login:", error)
    throw error
  }
}
