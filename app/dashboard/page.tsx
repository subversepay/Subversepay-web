"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
  Moon,
  Sun,
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

const user = { id: "1", email: "exmol@gmial.com", displayName: "Umar", role: "admin"  }

export default function AdminDashboard({ user = { id: "1", email: "exmol@gmial.com", displayName: "Umar", role: "admin"  } }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [mode, setMode] = useState("light");


  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/auth"
  }

    const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setMode("light");
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      setMode("dark");
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setMode("dark");
    } else {
      document.documentElement.classList.remove('dark');
      setMode("light");
    }
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users, platforms, transactions..."
                className="h-9 w-80 rounded-md bg-background/60 border border-border pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <Button variant="ghost" onClick={toggleTheme} className="flex items-center gap-2">
              {mode === "light" ? <Moon /> : <Sun />}
              <span className="hidden sm:inline">{mode === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>

            <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">{user.displayName.charAt(0)}</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">{user.displayName}</div>
                <div className="text-xs text-muted-foreground">Platform Administrator</div>
              </div>
              <button onClick={handleLogout}>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">
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
            <p className="text-muted-foreground">Monitor and manage the entire SubversePay ecosystem</p>
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
                  icon={<Users className="h-5 w-5 text-primary" />}
                />
                <AdminStatsCard
                  title="Active Platforms"
                  value="156"
                  change="+12"
                  trend="up"
                  icon={<Building2 className="h-5 w-5 text-primary" />}
                />
                <AdminStatsCard
                  title="Monthly Revenue"
                  value="$2.4M"
                  change="+18.2%"
                  trend="up"
                  icon={<DollarSign className="h-5 w-5 text-primary" />}
                />
                <AdminStatsCard
                  title="System Health"
                  value="99.9%"
                  change="+0.1%"
                  trend="up"
                  icon={<Activity className="h-5 w-5 text-primary" />}
                />
              </div>

             {/* Subscription usage or OTT platforms */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">
                  <SubscriptionUsage view={"b2b"} /> 
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
                        <div className="text-sm text-brand-blue font-medium">$99/mo</div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-4">
                        Integration APIs and platform data
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
                            indicatorClassName="bg-brand-blue"
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
                            indicatorClassName="bg-brand-blue"
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
                            indicatorClassName="bg-blue-600"
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
                  <Card className="bg-background/40 border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-background/60 border border-border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Server className="h-8 w-8 text-primary" />
                              <div>
                                <div className="text-sm text-muted-foreground">API Uptime</div>
                                <div className="text-xl font-bold text-foreground">99.98%</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-background/60 border border-border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Database className="h-8 w-8 text-green-500" />
                              <div>
                                <div className="text-sm text-muted-foreground">DB Performance</div>
                                <div className="text-xl font-bold text-foreground">2.3ms</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-background/60 border border-border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Zap className="h-8 w-8 text-yellow-500" />
                              <div>
                                <div className="text-sm text-muted-foreground">Avg Response</div>
                                <div className="text-xl font-bold text-foreground">145ms</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="bg-background/40 border-border h-full">
                    <CardHeader>
                      <CardTitle className="text-foreground">Recent Alerts</CardTitle>
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
                            icon: <Shield className="h-4 w-4 text-primary" />,
                          },
                        ].map((alert, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-background/60 rounded-lg">
                            <div className="mt-0.5">{alert.icon}</div>
                            <div className="flex-1">
                              <div className="text-sm text-foreground">{alert.title}</div>
                              <div className="text-xs text-muted-foreground">{alert.time}</div>
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="h-9 w-64 rounded-md bg-background/60 border border-border pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-foreground"
                    />
                  </div>
                  <select className="h-9 rounded-md bg-background/60 border border-border px-3 text-sm focus:outline-none focus:border-blue-500/50 text-foreground">
                    <option>All Users</option>
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Pending</option>
                  </select>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <Card className="bg-background/40 border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Subscriptions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                                  <span className="text-sm font-medium text-foreground">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === "Active"
                                    ? "bg-success/20 text-success"
                                    : "bg-destructive/20 text-destructive"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.subscriptions}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.joined}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex items-center gap-2 justify-end">
                                <Button variant="ghost" size="sm" className="text-primary hover:bg-accent">
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
      className="bg-background/40 backdrop-blur-sm border border-border rounded-xl p-5"
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
