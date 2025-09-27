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
  Plus,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import DashboardSidebar from "./dashboard-sidebar"
import SubscriptionUsage from "./subscription-usage"
import BillingHistory from "@/components/dashboard/billing/billing-history"
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton"
import Subscriptions from "./Subscriptions"
import MerchantSettings from "./Settings"
import KycCompliance from "./KycCompliance"

export default function SubscriptionDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
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
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-brand-blue/20 flex items-center justify-between px-6 bg-background/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-4">
              <ConnectWalletButton />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Organization:</span>
              <div className="flex items-center gap-1 text-foreground cursor-pointer hover:text-brand-blue transition-colors">
                <span>StreamFlix Media</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-brand-blue/10 transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-blue"></span>
            </button>

            <div className="flex items-center gap-3">
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
                    <div className="lg:col-span-2">
                      <SubscriptionUsage />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-medium text-foreground">
                            API Integration
                          </h2>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                          >
                            Manage API
                          </Button>
                        </div>

                        <div className="bg-background/60 border border-brand-blue/30 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-lg font-medium text-foreground">Enterprise API</div>
                            <div className="text-sm text-brand-blue font-medium">$999/mo</div>
                          </div>

                          <div className="text-sm text-muted-foreground mb-4">
                            Full access to OTT platform integration APIs with unlimited transactions
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">API Calls</span>
                                <span className="text-foreground">782,450 / 1,000,000</span>
                              </div>
                              <Progress
                                value={78}
                                className="h-1.5 bg-brand-blue/20"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">OTT Platforms</span>
                                <span className="text-foreground">8 / 12</span>
                              </div>
                              <Progress
                                value={66}
                                className="h-1.5 bg-brand-blue/20"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Stablecoin Types</span>
                                <span className="text-foreground">5 / 8</span>
                              </div>
                              <Progress
                                value={62}
                                className="h-1.5 bg-brand-blue/20"
                              />
                            </div>
                          </div>
                        </div>


                        <div className="text-sm text-muted-foreground mt-4">
                          Next billing date: May 15, 2025
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BillingHistory />
                    </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                        <h2 className="text-lg font-medium text-foreground mb-4">Payment Methods</h2>

                        <div className="space-y-4 mb-6">
                          <div className="bg-background/60 border border-brand-blue/30 rounded-lg p-4 relative">
                            <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs bg-brand-blue/20 text-brand-blue">
                              Default
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-brand-blue/20 flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#1f79bd"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
                                    stroke="#1f79bd"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-foreground font-medium">USDC Wallet</div>
                                <div className="text-sm text-muted-foreground">Connected to MetaMask</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-background/60 border border-brand-blue/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-brand-blue/10 flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#6d6e70"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
                                    stroke="#6d6e70"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="text-foreground font-medium">USDT Wallet</div>
                                <div className="text-sm text-muted-foreground">Connected to MetaMask</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-brand-blue border-brand-blue/30 hover:bg-brand-blue/10"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Connect Wallet
                        </Button>
                      </div>
                    </div>

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