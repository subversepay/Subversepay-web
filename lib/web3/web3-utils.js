/**
 * Web3 and Ethereum utility functions
 */

// Check if MetaMask is installed and accessible
export const checkIfWalletIsConnected = async () => {
  try {
    if (typeof window === "undefined") return false

    const { ethereum } = window
    if (!ethereum) {
      return false
    }
    return true
  } catch (error) {
    console.error("Error checking wallet connection:", error)
    return false
  }
}

// Request wallet connection and return accounts
export const requestWalletConnection = async () => {
  try {
    if (typeof window === "undefined") return null

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found in wallet")
    }

    return accounts[0]
  } catch (error) {
    console.error("Error connecting wallet:", error)
    throw error
  }
}

// Sign a message with the wallet
export const signMessage = async (message, address) => {
  try {
    if (typeof window === "undefined") return null

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    const signature = await ethereum.request({
      method: "personal_sign",
      params: [message, address],
    })

    return signature
  } catch (error) {
    console.error("Error signing message:", error)
    throw error
  }
}

// Get the current chain ID
export const getChainId = async () => {
  try {
    if (typeof window === "undefined") return null

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    const chainId = await ethereum.request({ method: "eth_chainId" })
    return chainId
  } catch (error) {
    console.error("Error getting chain ID:", error)
    throw error
  }
}

// Switch to a specific network
export const switchNetwork = async (chainId) => {
  try {
    if (typeof window === "undefined") return false

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    })

    return true
  } catch (error) {
    console.error("Error switching network:", error)
    throw error
  }
}
