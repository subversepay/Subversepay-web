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

    console.log("Requesting wallet connection...")
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found in wallet")
    }

    console.log("Wallet connected successfully, account:", accounts[0])
    return accounts[0]
  } catch (error) {
    console.error("Error connecting wallet:", error)

    // Handle specific error cases
    if (error.code === 4001) {
      throw new Error("User rejected the wallet connection request")
    } else if (error.code === -32002) {
      throw new Error("Wallet connection request is already pending")
    }

    throw error
  }
}

// Sign a message with the wallet using personal_sign
export const signMessage = async (message, address) => {
  try {
    if (typeof window === "undefined") return null

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    console.log("Requesting message signature for address:", address)
    console.log("Message to sign:", message)

    // Ensure the message is properly formatted as a string
    const messageToSign = typeof message === "string" ? message : JSON.stringify(message)

    // Use personal_sign with proper parameter order: [message, address]
    const signature = await ethereum.request({
      method: "personal_sign",
      params: [messageToSign, address],
    })

    console.log("Message signed successfully, signature:", signature)
    return signature
  } catch (error) {
    console.error("Error signing message:", error)

    // Handle specific error cases
    if (error.code === 4001) {
      throw new Error("User rejected the signature request")
    } else if (error.code === -32002) {
      throw new Error("Signature request is already pending")
    } else if (error.code === -32603) {
      throw new Error("Internal error occurred during signing")
    }

    throw error
  }
}

// Sign typed data using eth_signTypedData_v4 (fallback method)
export const signTypedData = async (typedData, address) => {
  try {
    if (typeof window === "undefined") return null

    const { ethereum } = window
    if (!ethereum) {
      throw new Error("MetaMask is not installed")
    }

    console.log("Requesting typed data signature for address:", address)
    console.log("Typed data to sign:", typedData)

    const signature = await ethereum.request({
      method: "eth_signTypedData_v4",
      params: [address, JSON.stringify(typedData)],
    })

    console.log("Typed data signed successfully, signature:", signature)
    return signature
  } catch (error) {
    console.error("Error signing typed data:", error)

    // Handle specific error cases
    if (error.code === 4001) {
      throw new Error("User rejected the typed data signature request")
    } else if (error.code === -32002) {
      throw new Error("Typed data signature request is already pending")
    }

    throw error
  }
}

// Create typed data structure for wallet linking
export const createWalletLinkingTypedData = (nonce, address) => {
  return {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
      ],
      WalletLinking: [
        { name: "address", type: "address" },
        { name: "nonce", type: "string" },
        { name: "action", type: "string" },
      ],
    },
    primaryType: "WalletLinking",
    domain: {
      name: "SubversePay",
      version: "1",
      chainId: 1, // Ethereum mainnet, adjust as needed
    },
    message: {
      address: address,
      nonce: nonce,
      action: "Link wallet to account",
    },
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
