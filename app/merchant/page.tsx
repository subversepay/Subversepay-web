"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  X,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardSidebar from "./dashboard-sidebar"
import SubscriptionUsage from "./subscription-usage"
import BillingHistory from "@/components/dashboard/billing/billing-history"
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton"
import Subscriptions from "./Subscriptions"
import MerchantSettings from "./Settings"
import KycCompliance from "./KycCompliance"
import { toast } from "@/hooks/use-toast"

export default function SubscriptionDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const activities = [
    {
      title: "New subscriber",
      time: "2 hours ago",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
    {
      title: "API usage threshold reached",
      time: "Yesterday",
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "New merchant onboarded",
      time: "2 days ago",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Payout processed successfully",
      time: "3 days ago",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Sidebar - mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-background border-r border-brand-blue/20">
            <DashboardSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={true} 
              onClose={() => setSidebarOpen(false)} 
            />
          </div>
          <div 
            className="flex-1 bg-black/30" 
            onClick={() => setSidebarOpen(false)} 
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-brand-blue/20 flex items-center justify-between px-4 sm:px-6 bg-background/60 backdrop-blur-sm">
          {/* Left section: Hamburger + Org */}
          <div className="flex items-center gap-3">
            {/* Hamburger menu (mobile only) */}
            <button
              className="md:hidden p-2 rounded hover:bg-brand-blue/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Organization dropdown */}
            <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-brand-blue transition-colors">
              <span className="text-muted-foreground">Organization:</span>
              <span className="font-medium text-foreground">StreamFlix Media</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Center section (wallet button) */}
          <div className="hidden sm:flex">
            <ConnectWalletButton />
          </div>

          {/* Right section: Notifications + User */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-brand-blue/10 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-blue"></span>
            </button>

            {/* User info (hidden on very small screens) */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">SM</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Sarah Miller</div>
                <div className="text-xs text-muted-foreground">API Admin</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
                <div className="text-muted-foreground">Loading dashboard...</div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {activeTab === "overview"
                    ? "Dashboard Overview"
                    : activeTab === "subscriptions"
                      ? "OTT Subscriptions"
                      : activeTab === "KycCompliance"
                        ? "KYC & Compliance"
                        : activeTab === "billing"
                          ? "Billing & Payments"
                          : "Account Settings"}
                </h1>
                <p className="text-muted-foreground">
                  Manage your OTT platform API integrations and stablecoin payments
                </p>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title={"Active Integrations"}
                      value={"8"}
                      change={"+2"}
                      trend="up"
                      icon={<Play className="h-5 w-5 text-brand-blue" />}
                    />
                    <StatsCard
                      title={"Total Subscribers"}
                      value={"12,458"}
                      change={"+842"}
                      trend="up"
                      icon={<Users className="h-5 w-5 text-brand-blue" />
                      }
                    />
                    <StatsCard
                      title={"Monthly Revenue"}
                      value={"$86,240"}
                      change={"+12.4%"}
                      trend="up"
                      icon={<BarChart3 className="h-5 w-5 text-brand-blue" />}
                    />
                    <StatsCard
                      title="API Usage"
                      value={"78%"}
                      change={"+8%"}
                      trend={"up"}
                      icon={<Settings className="h-5 w-5 text-brand-blue" />}
                    />
                  </div>

                  {/* Subscription usage or OTT platforms */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3">
                      <SubscriptionUsage />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BillingHistory />
                    </div>
                    {/* Recent activity */}
                    <div className="lg:col-span-1">
                      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-medium text-foreground">Recent Activity</h2>
                          <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground hover:text-foreground">
                            View All
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {activities.map((activity, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-brand-blue/20 hover:border-brand-blue/40 transition-colors"
                            >
                              <div className="mt-0.5">{activity.icon}</div>
                              <div>
                                <div className="text-sm font-medium text-foreground">
                                  {activity.title}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{activity.time}</span>
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
                <Subscriptions />
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols gap-6">
                    <div className="lg:col-span-1">
                      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                        <h2 className="text-lg font-medium text-foreground mb-4">Billing Information</h2>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Name</div>
                            <div className="text-foreground">StreamFlix Media</div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Email</div>
                            <div className="text-foreground">
                              {"billing@streamflix.com"}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
                            <div className="text-foreground text-sm">0x1a2b...3c4d</div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Default Currency</div>
                            <div className="text-foreground">USDC</div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-brand-blue border-brand-blue/30 hover:bg-brand-blue/10"
                          >
                            Edit Billing Information
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <BillingHistory />
                </div>
              )}

              {activeTab === "KycCompliance" && (
                <KycCompliance />
              )}

              {activeTab === "settings" && (
                <MerchantSettings />
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
      className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="w-8 h-8 rounded-md bg-brand-blue/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      {change && (
        <div className="flex items-center text-xs">
          {trend === "up" ? (
            <div className="flex items-center text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          ) : trend === "down" ? (
            <div className="flex items-center text-destructive">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          ) : (
            <div className="text-muted-foreground">
              <span>No change</span>
            </div>
          )}
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      )}
    </motion.div>
  )
}