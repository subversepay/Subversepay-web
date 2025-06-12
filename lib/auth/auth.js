// Authentication utilities and API functions

import { isTokenExpired } from "@/utils/utils"
// import { useRouter } from "next/navigation"

// const router = useRouter();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = getToken()
  return {
    "Content-Type": "application/json",
    ...(token && { "x-auth-token": token }),
  }
}

// Helper function to make authenticated API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.msg || data.msg || "An error occurred")
    }

    return data
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error)
    throw error
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("token")
  // isTokenExpired(token) && router.push("/auth")
  // If token exists and is not expired, user is authenticated
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
  const token = localStorage.getItem("token");
  if (isTokenExpired(token)) {
    // router.push("/auth");
    return null
  }
  return token
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
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.msg || data.msg || "Login failed")
    }

    // Store token in localStorage
    localStorage.setItem("token", data.token)

    // Fetch user data
    await refreshUserData()

    return data
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

// Get current user profile
export const getUserProfile = async () => {
  return apiRequest("/api/users/me")
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
    const token = getToken()
    if (!token) throw new Error("No authentication token found")

    console.log("Refreshing user data with token:", token.substring(0, 10) + "...")

    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        "x-auth-token": token,
      },
    })

    console.log("User data response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Failed to fetch user data:", errorData)
      throw new Error(errorData.msg || "Failed to fetch user data")
    }

    const userData = await response.json()
    console.log("User data refreshed:", userData)
    localStorage.setItem("user", JSON.stringify(userData))
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

  return user.wallets.some((wallet) => wallet.address.toLowerCase() === walletAddress.toLowerCase())
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
