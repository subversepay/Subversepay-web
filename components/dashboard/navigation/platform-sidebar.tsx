"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

export default function PlatformSidebar({
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
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "subscription",
      label: "Subscription & Plans",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "billing",
      label: "Billing",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={`relative ${collapsed ? "w-16" : "w-64"} bg-black/60 backdrop-blur-sm border-r border-blue-500/20 transition-all duration-300 ease-in-out`}
    >
      <button
        className="absolute -right-3 top-8 w-6 h-6 bg-black border border-blue-500/30 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-blue-500/20 flex items-center">
          <div className="relative h-8 w-8 mr-3">
            {/* <div className="absolute inset-0 bg-blue-500 rounded-full opacity-80"></div> */}
            <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
              <Image src="/Subversepay-web/subv-logoblack.png" alt="subversepay logo" width={50} height={50} />
            </div>
            <div className="absolute inset-0 border border-blue-500/50 rounded-full"></div>
          </div>

          {!collapsed && <span className="text-lg font-bold text-blue-500">Platform Panel</span>}
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-500/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-blue-500/10"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}

                  {activeTab === item.id && !collapsed && (
                    <motion.div className="w-1 h-5 bg-blue-500 rounded-full ml-auto" layoutId="activeIndicator" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-blue-500/20">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
