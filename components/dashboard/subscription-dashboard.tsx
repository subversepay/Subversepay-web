"use client"

import type React from "react"

import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  CreditCard,
  Users,
  BarChart3,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Play,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getActiveSubscriptions, getSubscriptionsForWallets } from "@/lib/subscription-api"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import BillingHistory from "@/components/dashboard/billing-history"
import OttPlatforms from "@/components/dashboard/ott-platforms"
import WalletLinkButton from "@/components/wallet/walletLinkButton"
// import WalletManager from "@components/wallet/walletManager"

interface User { 
  id: string
  email?: string
  displayName: string
  wallets: Wallet[]
  createdAt: string
  updatedAt: string
}

interface Wallet {
  id: string
  address: string
  isPrimary: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

interface Subscription {
  id: string
  subscriberAddress: string
  ottPlatformAddress: string
  planId: string
  expiryTimestamp: Date
  isActive: boolean
  transactionHash: string
  blockNumber: number
  createdAt: Date
  updatedAt: Date
}

export default function SubscriptionDashboard({ view = "customer" }: { view?: "b2b" | "customer" }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Platform addresses for known platforms
  const PLATFORM_ADDRESSES = [
    "0x1234567890123456789012345678901234567890", // StreamFlix
    "0x2345678901234567890123456789012345678901", // MusicFlow
    "0x3456789012345678901234567890123456789012", // GamePass Pro
  ]

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (!token || !storedUser) {
      router.push("/auth")
      return
    }

    // Parse user data
    try {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Fetch subscription data
      fetchSubscriptionData(userData)
    } catch (error) {
      console.error("Failed to parse user data", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/auth")
    }
  }, [router])

  const fetchSubscriptionData = async (userData: User) => {
    try {
      // Fetch user's subscriptions if they have wallets
      if (userData.wallets && userData.wallets.length > 0) {
        const walletAddresses = userData.wallets.map((wallet) => wallet.address)
        const userSubscriptions = await getSubscriptionsForWallets(walletAddresses, PLATFORM_ADDRESSES)
        setSubscriptions(userSubscriptions)
      }

      // Fetch all active subscriptions for network overview
      const allActiveSubscriptions = await getActiveSubscriptions()
      setActiveSubscriptions(allActiveSubscriptions)
    } catch (error) {
      console.error("Failed to fetch subscription data", error)
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const getStats = () => {
    const activeUserSubscriptions = subscriptions.filter(
      (sub) => sub.isActive && new Date(sub.expiryTimestamp) > new Date(),
    )

    const totalSpent = subscriptions.reduce((total, sub) => {
      // Mock calculation - in real app, you'd have price data
      return total + (sub.planId === "premium" ? 15.99 : sub.planId === "basic" ? 9.99 : 12.99)
    }, 0)

    return {
      activeSubscriptions: activeUserSubscriptions.length,
      totalSubscriptions: subscriptions.length,
      totalSpent: totalSpent.toFixed(2),
      networkActive: activeSubscriptions.length,
    }
  }

  const stats = getStats()

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <DashboardSidebar view={view} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-brand-blue/20 flex items-center justify-between px-6 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                className="h-9 w-64 rounded-md bg-black/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <WalletLinkButton />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-brand-blue/10 transition-colors">
              <Bell className="h-5 w-5 text-brand-grey" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-blue"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{user?.displayName?.charAt(0) || "U"}</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-white">{user?.displayName || "User"}</div>
                <div className="text-xs text-brand-grey">Subscriber</div>
              </div>
              <button onClick={handleLogout}>
                <ChevronDown className="h-4 w-4 text-brand-grey" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                </div>
                <div className="text-brand-grey">Loading dashboard...</div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {activeTab === "overview"
                    ? "Dashboard Overview"
                    : activeTab === "subscriptions"
                      ? "My Subscriptions"
                      : activeTab === "platforms"
                        ? "Browse Platforms"
                        : activeTab === "billing"
                          ? "Billing & Payments"
                          : "Account Settings"}
                </h1>
                <p className="text-brand-grey">Manage your OTT platform subscriptions paid with stablecoins</p>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title="Active Subscriptions"
                      value={stats.activeSubscriptions.toString()}
                      change={`+${stats.totalSubscriptions - stats.activeSubscriptions}`}
                      trend="up"
                      icon={<Play className="h-5 w-5 text-brand-blue" />}
                    />
                    <StatsCard
                      title="Total Spent"
                      value={`$${stats.totalSpent}`}
                      change="+$23.97"
                      trend="up"
                      icon={<CreditCard className="h-5 w-5 text-brand-blue" />}
                    />
                    <StatsCard
                      title="Connected Wallets"
                      value={user?.wallets?.length?.toString() || "0"}
                      change=""
                      trend="neutral"
                      icon={<BarChart3 className="h-5 w-5 text-brand-blue" />}
                    />
                    <StatsCard
                      title="Network Active"
                      value={stats.networkActive.toString()}
                      change="+142"
                      trend="up"
                      icon={<Users className="h-5 w-5 text-brand-blue" />}
                    />
                  </div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <OttPlatforms subscriptions={subscriptions} />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-medium text-white">Wallet Balance</h2>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                          >
                            Add Funds
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
                                <span className="text-brand-blue font-bold">$</span>
                              </div>
                              <div>
                                <div className="text-white font-medium">USDC Balance</div>
                                <div className="text-2xl font-bold text-white">$124.50</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                <span className="text-brand-grey font-bold">$</span>
                              </div>
                              <div>
                                <div className="text-white font-medium">USDT Balance</div>
                                <div className="text-2xl font-bold text-white">$75.00</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-brand-grey mt-4">
                          Auto-convert enabled for subscription payments
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BillingHistory view={view} subscriptions={subscriptions} />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
                          <Button variant="ghost" size="sm" className="text-xs h-8 text-brand-grey hover:text-white">
                            View All
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {subscriptions.slice(0, 4).map((subscription, index) => (
                            <div key={subscription.id} className="flex items-start gap-3">
                              <div className="mt-0.5">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              </div>
                              <div>
                                <div className="text-sm text-white">
                                  Subscription {subscription.isActive ? "renewed" : "expired"} - Plan{" "}
                                  {subscription.planId}
                                </div>
                                <div className="text-xs text-brand-grey flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(subscription.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "subscriptions" && (
                <div className="space-y-6">
                  {/* Redirect to the dedicated subscriptions page */}
                  {router.push("/subscriptions")}
                </div>
              )}

              {activeTab === "platforms" && (
                <div className="space-y-6">
                  {/* Redirect to the browse platforms page */}
                  {router.push("/subscriptions/browse")}
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  <BillingHistory view={view} subscriptions={subscriptions} />
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                    <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-brand-grey mb-2">Display Name</label>
                        <input
                          type="text"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
                          defaultValue={user?.displayName || ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-brand-grey mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
                          defaultValue={user?.email || ""}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-brand-grey mb-2">Connected Wallets</label>
                        <div className="space-y-2">
                          {/* <WalletManager /> */}
                          {/* {user?.wallets?.map((wallet, index) => (
                            <div key={wallet.id} className="bg-black/60 border border-brand-blue/20 rounded-lg p-3">
                              <div className="font-mono text-sm text-white break-all">{wallet.address}</div>
                            </div>
                          ))} */}
                        </div>
                      </div>
                      <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Changes</Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change?: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-brand-grey">{title}</div>
        <div className="w-8 h-8 rounded-md bg-brand-blue/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {change && (
        <div className="flex items-center text-xs">
          {trend === "up" ? (
            <div className="flex items-center text-green-400">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          ) : trend === "down" ? (
            <div className="flex items-center text-red-400">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          ) : (
            <div className="text-brand-grey">
              <span>No change</span>
            </div>
          )}
          <span className="text-brand-grey ml-1">from last month</span>
        </div>
      )}
    </motion.div>
  )
}
