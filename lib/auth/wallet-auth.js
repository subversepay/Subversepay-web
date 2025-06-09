
// Complete wallet linking process (simplified)
// export const completeWalletLinking = async () => {
//   try {
//     console.log("🔗 Starting wallet linking...")

//     // Step 1: Connect wallet
//     console.log("📱 Connecting wallet...")
//     const address = await connectWallet()

//     // Step 2: Link the address to user account
//     console.log("💾 Linking wallet to account...")
//     await linkWalletAddress(address)

//     // Step 3: Verify ownership with signature
//     console.log("✍️ Requesting verification signature...")
//     const { message, signature } = await signVerificationMessage(address)

//     // Step 4: Submit verification
//     console.log("✅ Verifying wallet ownership...")
//     await verifyWalletOwnership(address, message, signature)

//     // Step 5: Update local state
//     localStorage.setItem("walletAddress", address)
//     await refreshUserData()

//     console.log("🎉 Wallet linked successfully!")
//     return { success: true, address }
//   } catch (error) {
//     console.error("❌ Wallet linking failed:", error)
//     throw error
//   }
// }

import { checkIfWalletIsConnected, requestAccounts, signMessage } from "@/lib/web3/web3-utils"
import { getToken } from "@/lib/auth/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

// Step 1: Just connect wallet (get address)
export const connectWalletOnly = async () => {
  try {
    console.log("Starting wallet connection...")

    // Check if MetaMask is available
    const hasWallet = await checkIfWalletIsConnected()
    if (!hasWallet) {
      throw new Error("MetaMask not detected. Please install MetaMask browser extension.")
    }

    // Request account access
    const accounts = await requestAccounts()

    if (accounts.length === 0) {
      throw new Error("No accounts found. Please create an account in MetaMask.")
    }

    console.log("Requested accounts:", accounts)
    const address = accounts[0]
    console.log("Wallet connected:", address)

    // Store wallet address
    localStorage.setItem("walletAddress", address)

    return {
      success: true,
      address: address,
    }
  } catch (error) {
    console.error("Error connecting wallet:", error)
    throw error
  }
}

// Step 2: Link wallet to user account
export const linkWalletToAccount = async (walletAddress) => {
  try {
    console.log("Linking wallet to account:", walletAddress)

    const token = getToken()
    if (!token) {
      throw new Error("Authentication required. Please log in first.")
    }

    const response = await fetch(`${API_BASE_URL}/api/users/link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        address: walletAddress,
      }),
    })

    // Handle non-JSON responses
    if (!response.ok) {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const errorData = await response.json()
        throw new Error(errorData.msg || "Failed to link wallet")
      } else {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to link wallet")
      }
    }

    const data = await response.json()
    console.log("Wallet linked successfully")
    return {
      success: true,
      message: data.msg || "Wallet linked successfully",
      data,
    }
  } catch (error) {
    console.error("Error linking wallet:", error)
    throw error
  }
}

// Step 3: Verify wallet ownership
export const verifyWalletOwnership = async (walletAddress, nonce) => {
  try {
    console.log("Verifying wallet ownership:", walletAddress, nonce)

    const token = getToken()
    if (!token) {
      throw new Error("Authentication required. Please log in first.")
    }

    // Create a simple verification message
    // const message = `Verify wallet ownership for SubversePay account. Nonce: ${nonce}`
    const message = `I am signing my one-time nonce: ${nonce}`

    // Sign the message
    const signature = await signMessage(message, walletAddress)

    console.log("Sending verification to backend:", {
      address: walletAddress,
      signature,
    })

    // Send verification to backend
    const response = await fetch(`${API_BASE_URL}/api/users/verify-link-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        address: walletAddress,
        signature,
      }),
    })

    // Handle non-JSON responses
    if (!response.ok) {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const errorData = await response.json()
        throw new Error(errorData.msg || "Failed to verify wallet")
      } else {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to verify wallet")
      }
    }

    // Try to parse JSON response, but handle text responses too
    let data
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      data = { msg: text }
    }

    console.log("Wallet verified successfully:", data)
    return {
      success: true,
      message: data.msg || "Wallet verified successfully",
      data,
    }
  } catch (error) {
    console.error("Error verifying wallet:", error)
    throw error
  }
}

// Complete wallet linking process (connect + link + verify)
export const completeWalletLinking = async () => {
  try {
    // Step 1: Connect wallet
    const connectResult = await connectWalletOnly()
    if (!connectResult.success) {
      throw new Error("Failed to connect wallet")
    }

    const walletAddress = connectResult.address

    // Step 2: Link to account
    await linkWalletToAccount(walletAddress)

    // Step 3: Verify ownership
    await verifyWalletOwnership(walletAddress)

    return {
      success: true,
      address: walletAddress,
      message: "Wallet linked and verified successfully!",
    }
  } catch (error) {
    console.error("Error completing wallet linking:", error)
    throw error
  }
}

// Disconnect wallet
export const disconnectWallet = () => {
  localStorage.removeItem("walletAddress")
  console.log("Wallet disconnected")
}

// For wallet login (if still needed )
export const walletLogin = async () => {
  try {
    const connectResult = await connectWalletOnly()
    if (!connectResult.success) {
      throw new Error("Failed to connect wallet")
    }

    const address = connectResult.address
    const message = `Welcome to SubversePay! Please sign this message to authenticate your wallet: ${address}`

    const signature = await signMessage(message, address)

    const response = await fetch(`${API_BASE_URL}/api/users/wallet-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: address,
        message: message,
        signature: signature,
      }),
    })

    // Handle non-JSON responses
    if (!response.ok) {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const errorData = await response.json()
        throw new Error(errorData.msg || "Wallet authentication failed")
      } else {
        const errorText = await response.text()
        throw new Error(errorText || "Wallet authentication failed")
      }
    }

    const data = await response.json()

    // Store authentication data
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("walletAddress", address)

    return {
      success: true,
      address: address,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    console.error("Error with wallet login:", error)
    throw error
  }
}

