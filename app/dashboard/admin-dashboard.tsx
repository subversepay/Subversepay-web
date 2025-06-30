"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  Shield,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Ban,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminSidebar from "@/components/dashboard/navigation/admin-sidebar"
import SubscriptionUsage from "@/components/dashboard/charts/subscription-usage"

interface User {
  id: string
  email: string
  displayName: string
  role: string
}

interface AdminDashboardProps {
  user: User
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/auth"
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-blue-500/20 flex items-center justify-between px-6 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users, platforms, transactions..."
                className="h-9 w-80 rounded-md bg-black/60 border border-blue-500/20 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-blue-500/10 transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{user.displayName.charAt(0)}</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-white">{user.displayName}</div>
                <div className="text-xs text-gray-400">Platform Administrator</div>
              </div>
              <button onClick={handleLogout}>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              {activeTab === "overview"
                ? "Overview"
                : activeTab === "users"
                  ? "User Management"
                  : activeTab === "platforms"
                    ? "Platform Management"
                    : activeTab === "analytics"
                      ? "Analytics & Reports"
                      : activeTab === "security"
                        ? "Security & Monitoring"
                        : "System Settings"}
            </h1>
            <p className="text-gray-400">Monitor and manage the entire SubversePay ecosystem</p>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatsCard
                  title="Total Users"
                  value="24,847"
                  change="+1,234"
                  trend="up"
                  icon={<Users className="h-5 w-5 text-blue-500" />}
                />
                <AdminStatsCard
                  title="Active Platforms"
                  value="156"
                  change="+12"
                  trend="up"
                  icon={<Building2 className="h-5 w-5 text-blue-500" />}
                />
                <AdminStatsCard
                  title="Monthly Revenue"
                  value="$2.4M"
                  change="+18.2%"
                  trend="up"
                  icon={<DollarSign className="h-5 w-5 text-blue-500" />}
                />
                <AdminStatsCard
                  title="System Health"
                  value="99.9%"
                  change="+0.1%"
                  trend="up"
                  icon={<Activity className="h-5 w-5 text-blue-500" />}
                />
              </div>

             {/* Subscription usage or OTT platforms */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                  <SubscriptionUsage view={"b2b"} /> 
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-white">
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

                    <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-medium text-white">Enterprise API</div>
                        <div className="text-sm text-brand-blue font-medium">$99/mo</div>
                      </div>

                      <div className="text-sm text-brand-grey mb-4">
                        Integration APIs and platform data
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-brand-grey">API Calls</span>
                            <span className="text-white">782,450 / 1,000,000</span>
                          </div>
                          <Progress
                            value={78}
                            className="h-1.5 bg-brand-blue/20"
                            indicatorClassName="bg-brand-blue"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-brand-grey">OTT Platforms</span>
                            <span className="text-white">8 / 12</span>
                          </div>
                          <Progress
                            value={66}
                            className="h-1.5 bg-brand-blue/20"
                            indicatorClassName="bg-brand-blue"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-brand-grey">Stablecoin Types</span>
                            <span className="text-white">5 / 8</span>
                          </div>
                          <Progress
                            value={62}
                            className="h-1.5 bg-brand-blue/20"
                            indicatorClassName="bg-brand-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Health & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-black/40 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Server className="h-8 w-8 text-blue-500" />
                              <div>
                                <div className="text-sm text-gray-400">API Uptime</div>
                                <div className="text-xl font-bold text-white">99.98%</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Database className="h-8 w-8 text-green-500" />
                              <div>
                                <div className="text-sm text-gray-400">DB Performance</div>
                                <div className="text-xl font-bold text-white">2.3ms</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-black/60 border border-blue-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Zap className="h-8 w-8 text-yellow-500" />
                              <div>
                                <div className="text-sm text-gray-400">Avg Response</div>
                                <div className="text-xl font-bold text-white">145ms</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="bg-black/40 border-blue-500/20 h-full">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "High API usage detected",
                            time: "5 min ago",
                            severity: "warning",
                            icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
                          },
                          {
                            title: "New platform integration",
                            time: "1 hour ago",
                            severity: "info",
                            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
                          },
                          {
                            title: "Security scan completed",
                            time: "2 hours ago",
                            severity: "info",
                            icon: <Shield className="h-4 w-4 text-blue-500" />,
                          },
                        ].map((alert, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-black/60 rounded-lg">
                            <div className="mt-0.5">{alert.icon}</div>
                            <div className="flex-1">
                              <div className="text-sm text-white">{alert.title}</div>
                              <div className="text-xs text-gray-400">{alert.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="h-9 w-64 rounded-md bg-black/60 border border-blue-500/20 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <select className="h-9 rounded-md bg-black/60 border border-blue-500/20 px-3 text-sm focus:outline-none focus:border-blue-500/50 text-white">
                    <option>All Users</option>
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Pending</option>
                  </select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <Card className="bg-black/40 border-blue-500/20">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-blue-500/20">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Subscriptions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-500/10">
                        {[
                          {
                            name: "John Smith",
                            email: "john@example.com",
                            role: "Customer",
                            status: "Active",
                            subscriptions: 3,
                            joined: "Jan 15, 2024",
                          },
                          {
                            name: "Sarah Wilson",
                            email: "sarah@example.com",
                            role: "Creator",
                            status: "Active",
                            subscriptions: 1,
                            joined: "Feb 22, 2024",
                          },
                          {
                            name: "Mike Johnson",
                            email: "mike@example.com",
                            role: "Customer",
                            status: "Suspended",
                            subscriptions: 0,
                            joined: "Mar 10, 2024",
                          },
                        ].map((user, index) => (
                          <tr key={index} className="hover:bg-blue-500/5">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-white">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === "Active"
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-red-900/30 text-red-400"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.subscriptions}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.joined}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex items-center gap-2 justify-end">
                                <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10">
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
        </main>
      </div>
    </div>
  )
}

function AdminStatsCard({
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
          ) : trend === "down" ? (
            <div className="flex items-center text-red-400">
              <ArrowDownRight className="h-3 w-3 mr-1" />
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
