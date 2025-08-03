"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

export default function AdminSidebar({
  activeTab = "overview",
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard Overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "platforms",
      label: "Platforms",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      id: "analytics",
      label: "Analytics & Reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "security",
      label: "Security & Monitoring",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "System Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={`relative ${collapsed ? "w-16" : "w-64"} bg-background/60 backdrop-blur-sm border-r border-brand-blue/20 transition-all duration-300 ease-in-out`}
    >
      <button
        className="absolute -right-3 top-8 w-6 h-6 bg-background border border-brand-blue/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-brand-blue/20 flex items-center">
          <div className="relative h-8 w-8 mr-3">
            {/* <div className="absolute inset-0 bg-brand-blue rounded-full opacity-80"></div> */}
            <div className="absolute inset-[2px] bg-background rounded-full flex items-center justify-center">
              <Image src="/Subversepay-web/subv-logoblack.png" alt="subversepay logo" width={50} height={50} />
            </div>
            <div className="absolute inset-0 border border-brand-blue/50 rounded-full"></div>
          </div>

          {!collapsed && <span className="text-lg font-bold text-brand-blue">Admin Panel</span>}
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-brand-blue/20 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}

                  {activeTab === item.id && !collapsed && (
                    <motion.div className="w-1 h-5 bg-brand-blue rounded-full ml-auto" layoutId="activeIndicator" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-brand-blue/20">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-brand-blue/10 transition-colors">
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}