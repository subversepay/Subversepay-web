/**
 * Web3 and Ethereum utility functions
 */

// // Get the current chain ID
// export const getChainId = async () => {
//   try {
//     if (typeof window === "undefined") return null

//     const { ethereum } = window
//     if (!ethereum) {
//       throw new Error("MetaMask is not installed")
//     }

//     const chainId = await ethereum.request({ method: "eth_chainId" })
//     return chainId
//   } catch (error) {
//     console.error("Error getting chain ID:", error)
//     throw error
//   }
// }

// // Switch to a specific network
// export const switchNetwork = async (chainId) => {
//   try {
//     if (typeof window === "undefined") return false

//     const { ethereum } = window
//     if (!ethereum) {
//       throw new Error("MetaMask is not installed")
//     }

//     await ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId }],
//     })

//     return true
//   } catch (error) {
//     console.error("Error switching network:", error)
//     throw error
//   }
// }

// Check if MetaMask is installed
export const checkIfWalletIsConnected = async () => {
  try {
    if (typeof window === "undefined") return false

    const { ethereum } = window
    if (!ethereum) {
      console.log("MetaMask not detected")
      return false
    }

    console.log("MetaMask detected")
    return true
  } catch (error) {
    console.error("Error checking wallet connection:", error)
    return false
  }
}

// Get current connected accounts
export const getCurrentAccounts = async () => {
  try {
    if (typeof window === "undefined") return []

    const { ethereum } = window
    if (!ethereum) return []

    const accounts = await ethereum.request({ method: "eth_accounts" })
    return accounts
  } catch (error) {
    console.error("Error getting accounts:", error)
    return []
  }
}

// Request account access
export const requestAccounts = async () => {
  try {
    if (typeof window === "undefined") throw new Error("Window not available")

    const { ethereum } = window
    if (!ethereum) throw new Error("MetaMask not installed")

    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    return accounts
  } catch (error) {
    console.error("Error requesting accounts:", error)
    throw error
  }
}

// Simple message signing for verification
export const signMessage = async (message, address) => {
  try {
    if (typeof window === "undefined") throw new Error("Window not available")

    const { ethereum } = window
    if (!ethereum) throw new Error("MetaMask not installed")

    console.log("Signing message:", message)
    console.log("For address:", address)

    // Use personal_sign with proper formatting
    const signature = await ethereum.request({
      method: "personal_sign",
      params: [message, address],
    })

    console.log("Message signed successfully")
    return signature
  } catch (error) {
    console.error("Error signing message:", error)
    throw new Error("Failed to sign message. Please ensure MetaMask is unlocked and try again.")
  }
}
