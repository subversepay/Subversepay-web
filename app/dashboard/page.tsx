"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "./admin-dashboard"
import PlatformDashboard from "./platform-dashboard"
import CustomerDashboard from "./customer-dashboard"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  displayName: string
  role: "admin" | "platform" | "customer"
  wallets?: any[]
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>({
  id: "hdyudbsafi",
  email: "sdhdjf@ddf.now",
  displayName: "Testing",
  role: "platform",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (!token || !storedUser) {
          router.push("/auth")
          return
        }

        // Parse stored user data
        let userData: User
        try {
          userData = JSON.parse(storedUser)
        } catch (parseError) {
          console.error("Failed to parse user data", parseError)
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          router.push("/auth")
          return
        }

        // Fetch fresh user data from API to ensure role is up to date
        try {
          const response = await fetch("/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch user profile")
          }

          const freshUserData = await response.json()
          
          // Update stored user data with fresh data
          localStorage.setItem("user", JSON.stringify(freshUserData))
          // setUser(freshUserData)
        } catch (apiError) {
          console.error("Failed to fetch fresh user data, using stored data", apiError)
          // Fall back to stored user data if API call fails
          // setUser(userData)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setError("Failed to authenticate user")
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive",
        })
        router.push("/auth")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchUser()
  }, [router, toast])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
          </div>
          <div className="text-gray-400">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-red-500 text-xl">⚠️</div>
          <div className="text-white text-lg">Dashboard Error</div>
          <div className="text-gray-400">{error || "Unable to load user data"}</div>
          <button
            onClick={() => router.push("/auth")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />
    case "platform":
      return <PlatformDashboard user={user} />
    case "customer":
    default:
      return <CustomerDashboard user={user} />
  }
}
