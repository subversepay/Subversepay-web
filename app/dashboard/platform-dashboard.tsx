"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  Plus,
  Edit,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import PlatformSidebar from "@/components/dashboard/navigation/platform-sidebar"
import BillingHistory from "@/components/dashboard/billing/billing-history"


export default function PlatformDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <PlatformSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-blue-500/20 flex items-center justify-between px-6 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers, content..."
                className="h-9 w-64 rounded-md bg-black/60 border border-blue-500/20 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-blue-500/10 transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">CR</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-white">Platform Name</div>
                <div className="text-xs text-gray-400">Platform</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              {activeTab === "overview"
                ? "Overview Dashboard"
                : activeTab === "subscribers"
                  ? "Subscriber Management"
                  : activeTab === "content"
                    ? "Subscription & Plans"
                    : activeTab === "analytics"
                      ? "Analytics & Insights"
                      : activeTab === "billing"
                        ? "Billing & Payments"
                        : "Platform Settings"}
            </h1>
            <p className="text-gray-400">Manage your content, subscribers, and earnings</p>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Platform Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <PlatformStatsCard
                  title="Total Subscribers"
                  value="2,847"
                  change="+234"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-blue-500" />}
                />
                <PlatformStatsCard
                  title="Monthly Revenue"
                  value="$12,450"
                  change="+18.2%"
                  trend="up"
                  icon={<DollarSign className="h-5 w-5 text-blue-500" />}
                />
                <PlatformStatsCard
                  title="Content Views"
                  value="45.2K"
                  change="+12.5%"
                  trend="up"
                  icon={<Eye className="h-5 w-5 text-blue-500" />}
                />
                <PlatformStatsCard
                  title="Engagement Rate"
                  value="8.4%"
                  change="+2.1%"
                  trend="up"
                  icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                />
              </div>

              {/* Revenue & Subscriber Growth */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-black/40 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">This Month</div>
                            <div className="text-2xl font-bold text-white">$12,450</div>
                            <div className="text-xs text-green-400">+18.2% from last month</div>
                          </div>
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Average per Sub</div>
                            <div className="text-2xl font-bold text-white">$4.37</div>
                            <div className="text-xs text-green-400">+$0.23 from last month</div>
                          </div>
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="text-sm text-gray-400 mb-1">Pending Payout</div>
                            <div className="text-2xl font-bold text-white">$8,920</div>
                            <div className="text-xs text-gray-400">Available in 3 days</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card className="bg-black/40 border-blue-500/20 h-full">
                    <CardHeader>
                      <CardTitle className="text-white">Subscription Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Basic", price: "$4.99", subscribers: 1247, color: "blue" },
                          { name: "Premium", price: "$9.99", subscribers: 892, color: "purple" },
                          { name: "VIP", price: "$19.99", subscribers: 708, color: "gold" },
                        ].map((plan, index) => (
                          <div key={index} className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-white font-medium">{plan.name}</div>
                              <div className="text-blue-500 font-bold">{plan.price}</div>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">{plan.subscribers} subscribers</div>
                            <Progress
                              value={(plan.subscribers / 2847) * 100}
                              className="h-2 bg-gray-800"
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Activity & Top Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 border-blue-500/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Recent Subscribers</CardTitle>
                    <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-500 bg-transparent">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Alex Johnson", plan: "Premium", joined: "2 hours ago", avatar: "AJ" },
                        { name: "Maria Garcia", plan: "Basic", joined: "5 hours ago", avatar: "MG" },
                        { name: "David Chen", plan: "VIP", joined: "1 day ago", avatar: "DC" },
                        { name: "Sarah Wilson", plan: "Premium", joined: "2 days ago", avatar: "SW" },
                      ].map((subscriber, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/60 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-white">{subscriber.avatar}</span>
                            </div>
                            <div>
                              <div className="text-sm text-white">{subscriber.name}</div>
                              <div className="text-xs text-gray-400">{subscriber.plan} Plan</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">{subscriber.joined}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* <Card className="bg-black/40 border-blue-500/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Top Performing Content</CardTitle>
                    <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-500 bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      New Content
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "Advanced Trading Strategies", views: "12.4K", engagement: "9.2%", rating: 4.8 },
                        { title: "Market Analysis Deep Dive", views: "8.7K", engagement: "7.8%", rating: 4.6 },
                        { title: "Crypto Portfolio Management", views: "6.3K", engagement: "8.9%", rating: 4.9 },
                        { title: "DeFi Fundamentals", views: "5.1K", engagement: "6.4%", rating: 4.5 },
                      ].map((content, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/60 rounded-lg">
                          <div className="flex-1">
                            <div className="text-sm text-white font-medium">{content.title}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-4">
                              <span>{content.views} views</span>
                              <span>{content.engagement} engagement</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>{content.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                    <h2 className="text-lg font-medium text-white mb-4">Payment Methods</h2>

                    <div className="space-y-4 mb-6">
                      <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4 relative">
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
                            <div className="text-white font-medium">USDC Wallet</div>
                            <div className="text-sm text-brand-grey">Connected to MetaMask</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
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
                            <div className="text-white font-medium">USDT Wallet</div>
                            <div className="text-sm text-brand-grey">Connected to MetaMask</div>
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
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                    <h2 className="text-lg font-medium text-white mb-4">Billing Information</h2>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-brand-grey mb-1">Name</div>
                        <div className="text-white">StreamFlix Media</div>
                      </div>

                      <div>
                        <div className="text-sm text-brand-grey mb-1">Email</div>
                        <div className="text-white">
                          billing@streamflix.com
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-brand-grey mb-1">Wallet Address</div>
                        <div className="text-white text-sm">0x1a2b...3c4d</div>
                      </div>

                      <div>
                        <div className="text-sm text-brand-grey mb-1">Default Currency</div>
                        <div className="text-white">USDC</div>
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

              <BillingHistory view={"b2b"} />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                    <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-brand-grey mb-2">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
                          defaultValue={"Platform  Name"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-brand-grey mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
                          defaultValue={"admin@streamflix.com"}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-brand-grey mb-2">Default Stablecoin</label>
                          <select className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
                            <option>USDC</option>
                            <option>USDT</option>
                            <option>DAI</option>
                            <option>BUSD</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-brand-grey mb-2">Auto-Renewal</label>
                          <select className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
                            <option>Enabled</option>
                            <option>Disabled</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-black/60 h-4 w-4"
                            defaultChecked
                          />
                          <span className="text-sm text-white">
                            Receive email notifications for subscription renewals
                          </span>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-brand-blue/20">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                    <h2 className="text-lg font-medium text-white mb-4">Security</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-brand-grey mb-2">Change Password</label>
                        <input
                          type="password"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white mb-2"
                          placeholder="Current password"
                        />
                        <input
                          type="password"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white mb-2"
                          placeholder="New password"
                        />
                        <input
                          type="password"
                          className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-black/60 h-4 w-4"
                            defaultChecked
                          />
                          <span className="text-sm text-white">Enable two-factor authentication</span>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-brand-blue/20">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white w-full">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
                <h2 className="text-lg font-medium text-white mb-4">API Integration</h2>

                <div className="space-y-4 mb-6">
                  <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium">Production API Key</div>
                      <div className="text-xs text-brand-grey">Created: Apr 12, 2025</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 h-9 rounded-md bg-black/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-brand-grey"
                        value="sp_live_••••••••••••••••••••••••••••••"
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                      >
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium">Test API Key</div>
                      <div className="text-xs text-brand-grey">Created: Apr 12, 2025</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="flex-1 h-9 rounded-md bg-black/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-brand-grey"
                        value="sp_test_••••••••••••••••••••••••••••••"
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
                      >
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-brand-grey">
                  API keys provide access to your OTT platform integrations. Keep them secure and never share them
                  in public areas such as GitHub or client-side code.
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function PlatformStatsCard({
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
      className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-400">{title}</div>
        <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {change && (
        <div className="flex items-center text-xs">
          {trend === "up" ? (
            <div className="flex items-center text-green-400">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          ) : (
            <div className="text-gray-400">
              <span>No change</span>
            </div>
          )}
          <span className="text-gray-400 ml-1">from last month</span>
        </div>
      )}
    </motion.div>
  )
}
