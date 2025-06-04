// Authentication utilities and API functions

const API_BASE_URL = "http://localhost:3002"

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Helper function to make authenticated API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: getAuthHeaders(),
    ...options,
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.msg || data.msg || "An error occurred")
  }

  return data
}

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("token")
  return !!token
}

// Get the current user from localStorage
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error("Failed to parse user data", error)
    return null
  }
}

// Get the auth token
export const getToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

// Register a new user
export const registerUser = async (userData) => {
  return apiRequest("/api/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

// Login user with email/password
export const loginUser = async (credentials) => {
  return apiRequest("/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

// Login user with wallet signature
export const walletLogin = async (walletData) => {
  return apiRequest("/api/users/wallet-login", {
    method: "POST",
    body: JSON.stringify(walletData),
  })
}

// Get current user profile
export const getUserProfile = async () => {
  return apiRequest("/api/users/me")
}

// Link wallet to existing account (Step 1: Get nonce)
export const linkWallet = async (address) => {
  return apiRequest("/api/users/link-wallet", {
    method: "POST",
    body: JSON.stringify({ address }),
  })
}

// Verify wallet linking (Step 2: Verify signature)
export const verifyLinkWallet = async (walletData) => {
  return apiRequest("/api/users/verify-link-wallet", {
    method: "POST",
    body: JSON.stringify(walletData),
  })
}

// Logout user
export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("walletAddress")
  }
}

// Refresh user data from server
export const refreshUserData = async () => {
  try {
    const userData = await getUserProfile()
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
    return userData
  } catch (error) {
    console.error("Failed to refresh user data", error)
    throw error
  }
}

// Check if user has specific wallet linked
export const hasWalletLinked = (walletAddress) => {
  const user = getCurrentUser()
  if (!user || !user.wallets) return false

  return user.wallets.some((wallet) => wallet.address === walletAddress)
}

// Get user's primary wallet
export const getPrimaryWallet = () => {
  const user = getCurrentUser()
  if (!user || !user.wallets) return null

  return user.wallets.find((wallet) => wallet.isPrimary) || user.wallets[0] || null
}

// Get all user's wallets
export const getUserWallets = () => {
  const user = getCurrentUser()
  if (!user || !user.wallets) return []

  return user.wallets
}
