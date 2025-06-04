// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { LayoutDashboard, Users, FileText, Settings, ChevronLeft, ChevronRight, LogOut, Play, Tv } from "lucide-react"

// export default function DashboardSidebar({
//   view = "b2b",
//   activeTab = "overview",
//   setActiveTab,
// }: {
//   view?: "b2b" | "customer"
//   activeTab: string
//   setActiveTab: (tab: string) => void
// }) {
//   const [collapsed, setCollapsed] = useState(false)

//   const menuItems = [
//     {
//       id: "overview",
//       label: "Overview",
//       icon: <LayoutDashboard className="h-5 w-5" />,
//     },
//     {
//       id: "platforms",
//       label: "OTT Platforms",
//       icon: <Tv className="h-5 w-5" />,
//     },
//     {
//       id: "subscriptions",
//       label: "Subscriptions",
//       icon: <Play className="h-5 w-5" />,
//     },
//     ...(view === "b2b"
//       ? [
//           {
//             id: "customers",
//             label: "Customers",
//             icon: <Users className="h-5 w-5" />,
//           },
//         ]
//       : []),
//     {
//       id: "billing",
//       label: "Billing",
//       icon: <FileText className="h-5 w-5" />,
//     },
//     {
//       id: "settings",
//       label: "Settings",
//       icon: <Settings className="h-5 w-5" />,
//     },
//   ]

//   return (
//     <div
//       className={`relative ${collapsed ? "w-16" : "w-64"} bg-black/60 backdrop-blur-sm border-r border-brand-blue/20 transition-all duration-300 ease-in-out`}
//     >
//       <button
//         className="absolute -right-3 top-8 w-6 h-6 bg-black border border-brand-blue/30 rounded-full flex items-center justify-center text-brand-grey hover:text-white transition-colors z-10"
//         onClick={() => setCollapsed(!collapsed)}
//       >
//         {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
//       </button>

//       <div className="flex flex-col h-full">
//         <div className="p-4 border-b border-brand-blue/20 flex items-center">
//           <div className="relative h-8 w-8 mr-3">
//             <div className="absolute inset-0 bg-brand-blue rounded-full opacity-80"></div>
//             <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-xs">SP</span>
//             </div>
//             <div className="absolute inset-0 border border-brand-blue/50 rounded-full"></div>
//           </div>

//           {!collapsed && <span className="text-lg font-bold text-brand-blue">SubversePay</span>}
//         </div>

//         <div className="flex-1 py-6 overflow-y-auto">
//           <ul className="space-y-2 px-3">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
//                     activeTab === item.id
//                       ? "bg-brand-blue/20 text-white"
//                       : "text-brand-grey hover:text-white hover:bg-brand-blue/10"
//                   }`}
//                   onClick={() => setActiveTab(item.id)}
//                 >
//                   <span className="flex-shrink-0">{item.icon}</span>
//                   {!collapsed && <span>{item.label}</span>}

//                   {activeTab === item.id && !collapsed && (
//                     <motion.div className="w-1 h-5 bg-brand-blue rounded-full ml-auto" layoutId="activeIndicator" />
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="p-4 border-t border-brand-blue/20">
//           <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-brand-grey hover:text-white hover:bg-brand-blue/10 transition-colors">
//             <LogOut className="h-5 w-5" />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, FileText, Settings, ChevronLeft, ChevronRight, LogOut, Play, Tv } from "lucide-react"

export default function DashboardSidebar({
  view = "customer",
  activeTab = "overview",
  setActiveTab,
}: {
  view?: "b2b" | "customer"
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "platforms",
      label: "Browse Platforms",
      icon: <Tv className="h-5 w-5" />,
    },
    {
      id: "subscriptions",
      label: "My Subscriptions",
      icon: <Play className="h-5 w-5" />,
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

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <div
      className={`relative ${collapsed ? "w-16" : "w-64"} bg-black/60 backdrop-blur-sm border-r border-brand-blue/20 transition-all duration-300 ease-in-out`}
    >
      <button
        className="absolute -right-3 top-8 w-6 h-6 bg-black border border-brand-blue/30 rounded-full flex items-center justify-center text-brand-grey hover:text-white transition-colors z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-brand-blue/20 flex items-center">
          <div className="relative h-8 w-8 mr-3">
            <div className="absolute inset-0 bg-brand-blue rounded-full opacity-80"></div>
            <div className="absolute inset-[2px] bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">SP</span>
            </div>
            <div className="absolute inset-0 border border-brand-blue/50 rounded-full"></div>
          </div>

          {!collapsed && <span className="text-lg font-bold text-brand-blue">SubversePay</span>}
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-brand-blue/20 text-white"
                      : "text-brand-grey hover:text-white hover:bg-brand-blue/10"
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-brand-grey hover:text-white hover:bg-brand-blue/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
