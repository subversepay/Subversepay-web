/**
 * Wallet authentication utilities
 */
import { signMessage, requestWalletConnection, signTypedData, createWalletLinkingTypedData } from "../web3/web3-utils"
import { getToken, refreshUserData } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

// Link wallet to existing account (Step 1: Get nonce)
export const linkWallet = async (address) => {
  try {
    const token = getToken()
    if (!token) throw new Error("Authentication required")

    console.log("Linking wallet with token:", token.substring(0, 10) + "...")
    console.log("API URL:", `${API_BASE_URL}/api/users/link-wallet`)

    const response = await fetch(`${API_BASE_URL}/api/users/link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ address }),
    })

    console.log("linking wallet response status:", response.status)

    const data = await response.json()
    console.log("linking wallet response data:", data)

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
export const verifyLinkWallet = async (address, signature, signatureType = "personal_sign") => {
  try {
    const token = getToken()
    if (!token) throw new Error("Authentication required")

    console.log("Verifying wallet with token:", token.substring(0, 10) + "...")

    const response = await fetch(`${API_BASE_URL}/api/users/verify-link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ address, signature, signatureType }),
    })

    console.log("verify wallet response status:", response.status)

    const data = await response.json()
    console.log("verify wallet response data:", data)

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
    console.log("Starting wallet linking process...")

    // 1. Request wallet connection
    const address = await requestWalletConnection()
    console.log("Wallet connected, address:", address)

    // 2. Get nonce from backend
    console.log("Getting nonce for address:", address)
    const { nonce } = await linkWallet(address)
    console.log("Received nonce:", nonce)

    // 3. Try to sign the message using different methods
    let signature
    let signatureType

    try {
      // Method 1: Try personal_sign first (recommended by MetaMask)
      const message = `I am signing my one-time nonce: ${nonce}`
      console.log("Attempting personal_sign with message:", message)

      signature = await signMessage(message, address)
      
      signatureType = "personal_sign"
      console.log("personal_sign successful")
    } catch (personalSignError) {
      console.log("personal_sign failed, trying eth_signTypedData_v4:", personalSignError.message)

      try {
        // Method 2: Try eth_signTypedData_v4 as fallback
        const typedData = createWalletLinkingTypedData(nonce, address)
        console.log("Attempting eth_signTypedData_v4 with typed data:", typedData)

        signature = await signTypedData(typedData, address)
        signatureType = "eth_signTypedData_v4"
        console.log("eth_signTypedData_v4 successful")
      } catch (typedDataError) {
        console.error("Both signing methods failed:", {
          personalSign: personalSignError.message,
          typedData: typedDataError.message,
        })
        throw new Error("Failed to sign message. Please ensure MetaMask is unlocked and try again.")
      }
    }

    console.log("Signature received:", signature)
    console.log("Signature type:", signatureType)

    // 4. Verify signature with backend
    console.log("Verifying signature with backend...")
    const verifyResult = await verifyLinkWallet(address, signature, signatureType)
    console.log("Signature verified successfully:", verifyResult)

    // 5. Update local storage and refresh user data
    localStorage.setItem("walletAddress", address)
    console.log("Refreshing user data after wallet linking...")
    await refreshUserData()
    console.log("User data refreshed")

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
