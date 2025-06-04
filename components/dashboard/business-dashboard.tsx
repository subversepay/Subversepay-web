// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import {
//   CreditCard,
//   Users,
//   BarChart3,
//   Settings,
//   Bell,
//   Search,
//   ChevronDown,
//   ArrowUpRight,
//   ArrowDownRight,
//   Clock,
//   CheckCircle2,
//   AlertCircle,
//   Plus,
//   Play,
//   Film,
//   Tv,
//   Gamepad2,
//   Music,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import DashboardSidebar from "./dashboard-sidebar"
// import SubscriptionUsage from "./subscription-usage"
// import BillingHistory from "./billing-history"
// import OttPlatforms from "./ott-platforms"

// export default function SubscriptionDashboard({ view = "b2b" }: { view?: "b2b" | "customer" }) {
//   const [activeTab, setActiveTab] = useState("overview")
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState(null)
//   const router = useRouter()


//    useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token")
//     const storedUser = localStorage.getItem("user")

//     if (!token || !storedUser) {
//       router.push("/auth")
//       return
//     }

//     // Parse user data
//     try {
//       setUser(JSON.parse(storedUser))
//     } catch (error) {
//       console.error("Failed to parse user data", error)
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       router.push("/auth")
//     }

//     // Fetch user profile from API
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:3002/api/users/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile")
//         }

//         const userData = await response.json()
//         setUser(userData)
//         localStorage.setItem("user", JSON.stringify(userData))
//       } catch (error) {
//         console.error("Failed to fetch user profile", error)
//         // Don't log out the user if this fails, just use the stored data
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchUserProfile()
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     router.push("/")
//     toast({
//       title: "Logged out",
//       description: "You have been logged out successfully",
//     })
//   }

//   return (
//     <div className="flex h-screen bg-black text-white overflow-hidden">
//       <DashboardSidebar view={view} activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="h-16 border-b border-brand-blue/20 flex items-center justify-between px-6 bg-black/60 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
//               <input
//                 type="text"
//                 placeholder={view === "b2b" ? "Search..." : "Search OTT platforms..."}
//                 className="h-9 w-64 rounded-md bg-black/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//               />
//             </div>

//             {view === "b2b" && (
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="text-brand-grey">Organization:</span>
//                 <div className="flex items-center gap-1 text-white cursor-pointer hover:text-brand-blue transition-colors">
//                   <span>StreamFlix Media</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="relative p-2 rounded-full hover:bg-brand-blue/10 transition-colors">
//               <Bell className="h-5 w-5 text-brand-grey" />
//               <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-blue"></span>
//             </button>

//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
//                 <span className="text-sm font-medium text-white">{view === "b2b" ? "SM" : "JS"}</span>
//               </div>
//               <div className="text-sm">
//                 <div className="font-medium text-white">{view === "b2b" ? "Sarah Miller" : "John Smith"}</div>
//                 <div className="text-xs text-brand-grey">{view === "b2b" ? "API Admin" : "Subscriber"}</div>
//               </div>
//               <ChevronDown className="h-4 w-4 text-brand-grey" />
//             </div>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="flex-1 overflow-auto p-6">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-full">
//               <div className="flex flex-col items-center gap-4">
//                 <div className="relative w-12 h-12">
//                   <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
//                 </div>
//                 <div className="text-brand-grey">Loading dashboard...</div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-white mb-1">
//                   {activeTab === "overview"
//                     ? "Dashboard Overview"
//                     : activeTab === "subscriptions"
//                       ? "OTT Subscriptions"
//                       : activeTab === "platforms"
//                         ? "OTT Platforms"
//                         : activeTab === "customers"
//                           ? "Customer Management"
//                           : activeTab === "billing"
//                             ? "Billing & Payments"
//                             : "Account Settings"}
//                 </h1>
//                 <p className="text-brand-grey">
//                   {view === "b2b"
//                     ? "Manage your OTT platform API integrations and stablecoin payments"
//                     : "Manage your OTT platform subscriptions paid with stablecoins"}
//                 </p>
//               </div>

//               {activeTab === "overview" && (
//                 <div className="space-y-6">
//                   {/* Stats cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <StatsCard
//                       title={view === "b2b" ? "Active Integrations" : "Active Subscriptions"}
//                       value={view === "b2b" ? "8" : "3"}
//                       change={view === "b2b" ? "+2" : "0"}
//                       trend="up"
//                       icon={<Play className="h-5 w-5 text-brand-blue" />}
//                     />
//                     <StatsCard
//                       title={view === "b2b" ? "Total Subscribers" : "Total Spent"}
//                       value={view === "b2b" ? "12,458" : "$142.97"}
//                       change={view === "b2b" ? "+842" : "+$49.99"}
//                       trend="up"
//                       icon={
//                         view === "b2b" ? (
//                           <Users className="h-5 w-5 text-brand-blue" />
//                         ) : (
//                           <CreditCard className="h-5 w-5 text-brand-blue" />
//                         )
//                       }
//                     />
//                     <StatsCard
//                       title={view === "b2b" ? "Monthly Revenue" : "Saved vs Direct"}
//                       value={view === "b2b" ? "$86,240" : "$17.50"}
//                       change={view === "b2b" ? "+12.4%" : "+10.9%"}
//                       trend="up"
//                       icon={<BarChart3 className="h-5 w-5 text-brand-blue" />}
//                     />
//                     <StatsCard
//                       title="API Usage"
//                       value={view === "b2b" ? "78%" : "N/A"}
//                       change={view === "b2b" ? "+8%" : ""}
//                       trend={view === "b2b" ? "up" : "neutral"}
//                       icon={<Settings className="h-5 w-5 text-brand-blue" />}
//                     />
//                   </div>

//                   {/* Subscription usage or OTT platforms */}
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                       {view === "b2b" ? <SubscriptionUsage view={view} /> : <OttPlatforms />}
//                     </div>
//                     <div className="lg:col-span-1">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
//                         <div className="flex items-center justify-between mb-4">
//                           <h2 className="text-lg font-medium text-white">
//                             {view === "b2b" ? "API Integration" : "Stablecoin Balance"}
//                           </h2>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="text-xs h-8 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
//                           >
//                             {view === "b2b" ? "Manage API" : "Add Funds"}
//                           </Button>
//                         </div>

//                         {view === "b2b" ? (
//                           <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4 mb-4">
//                             <div className="flex items-center justify-between mb-2">
//                               <div className="text-lg font-medium text-white">Enterprise API</div>
//                               <div className="text-sm text-brand-blue font-medium">$999/mo</div>
//                             </div>

//                             <div className="text-sm text-brand-grey mb-4">
//                               Full access to OTT platform integration APIs with unlimited transactions
//                             </div>

//                             <div className="space-y-3">
//                               <div>
//                                 <div className="flex items-center justify-between text-xs mb-1">
//                                   <span className="text-brand-grey">API Calls</span>
//                                   <span className="text-white">782,450 / 1,000,000</span>
//                                 </div>
//                                 <Progress
//                                   value={78}
//                                   className="h-1.5 bg-brand-blue/20"
//                                   indicatorClassName="bg-brand-blue"
//                                 />
//                               </div>

//                               <div>
//                                 <div className="flex items-center justify-between text-xs mb-1">
//                                   <span className="text-brand-grey">OTT Platforms</span>
//                                   <span className="text-white">8 / 12</span>
//                                 </div>
//                                 <Progress
//                                   value={66}
//                                   className="h-1.5 bg-brand-blue/20"
//                                   indicatorClassName="bg-brand-blue"
//                                 />
//                               </div>

//                               <div>
//                                 <div className="flex items-center justify-between text-xs mb-1">
//                                   <span className="text-brand-grey">Stablecoin Types</span>
//                                   <span className="text-white">5 / 8</span>
//                                 </div>
//                                 <Progress
//                                   value={62}
//                                   className="h-1.5 bg-brand-blue/20"
//                                   indicatorClassName="bg-brand-blue"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4">
//                               <div className="flex items-center gap-3 mb-3">
//                                 <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center">
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                                       stroke="#1f79bd"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                     <path
//                                       d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
//                                       stroke="#1f79bd"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <div>
//                                   <div className="text-white font-medium">USDC Balance</div>
//                                   <div className="text-2xl font-bold text-white">$124.50</div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
//                               <div className="flex items-center gap-3 mb-3">
//                                 <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                                       stroke="#6d6e70"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                     <path
//                                       d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
//                                       stroke="#6d6e70"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <div>
//                                   <div className="text-white font-medium">USDT Balance</div>
//                                   <div className="text-2xl font-bold text-white">$75.00</div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
//                               <div className="flex items-center gap-3 mb-3">
//                                 <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <path
//                                       d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                                       stroke="#6d6e70"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                     <path
//                                       d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
//                                       stroke="#6d6e70"
//                                       strokeWidth="2"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                   </svg>
//                                 </div>
//                                 <div>
//                                   <div className="text-white font-medium">DAI Balance</div>
//                                   <div className="text-2xl font-bold text-white">$50.00</div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         <div className="text-sm text-brand-grey mt-4">
//                           {view === "b2b"
//                             ? "Next billing date: May 15, 2025"
//                             : "Auto-convert enabled for subscription payments"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent activity */}
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                       <BillingHistory view={view} />
//                     </div>
//                     <div className="lg:col-span-1">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5 h-full">
//                         <div className="flex items-center justify-between mb-4">
//                           <h2 className="text-lg font-medium text-white">Recent Activity</h2>
//                           <Button variant="ghost" size="sm" className="text-xs h-8 text-brand-grey hover:text-white">
//                             View All
//                           </Button>
//                         </div>

//                         <div className="space-y-4">
//                           {(view === "b2b"
//                             ? [
//                                 {
//                                   title: "New subscriber on NetflixPro",
//                                   time: "2 hours ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                                 {
//                                   title: "API usage threshold reached",
//                                   time: "Yesterday",
//                                   icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
//                                 },
//                                 {
//                                   title: "New OTT platform integrated",
//                                   time: "2 days ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                                 {
//                                   title: "Stablecoin payment processed",
//                                   time: "3 days ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                               ]
//                             : [
//                                 {
//                                   title: "NetflixPro subscription renewed",
//                                   time: "2 hours ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                                 {
//                                   title: "USDC funds added to wallet",
//                                   time: "Yesterday",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                                 {
//                                   title: "DisneyPlus subscription started",
//                                   time: "2 days ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                                 {
//                                   title: "Account settings updated",
//                                   time: "3 days ago",
//                                   icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
//                                 },
//                               ]
//                           ).map((activity, index) => (
//                             <div key={index} className="flex items-start gap-3">
//                               <div className="mt-0.5">{activity.icon}</div>
//                               <div>
//                                 <div className="text-sm text-white">{activity.title}</div>
//                                 <div className="text-xs text-brand-grey flex items-center gap-1">
//                                   <Clock className="h-3 w-3" />
//                                   <span>{activity.time}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "platforms" && (
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
//                         <input
//                           type="text"
//                           placeholder="Search OTT platforms..."
//                           className="h-9 w-64 rounded-md bg-black/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-brand-grey">Category:</span>
//                         <select className="h-9 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
//                           <option>All Categories</option>
//                           <option>Streaming</option>
//                           <option>Movies</option>
//                           <option>TV Shows</option>
//                           <option>Music</option>
//                           <option>Gaming</option>
//                         </select>
//                       </div>
//                     </div>

//                     {view === "b2b" && (
//                       <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add Platform
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[
//                       {
//                         name: "NetflixPro",
//                         category: "Streaming",
//                         icon: <Play className="h-6 w-6" />,
//                         plans: ["Basic", "Standard", "Premium"],
//                         discount: "15% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "DisneyPlus",
//                         category: "Streaming",
//                         icon: <Film className="h-6 w-6" />,
//                         plans: ["Monthly", "Annual"],
//                         discount: "10% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "HBO Max",
//                         category: "Streaming",
//                         icon: <Tv className="h-6 w-6" />,
//                         plans: ["With Ads", "Ad-Free", "Ultimate"],
//                         discount: "12% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Amazon Prime",
//                         category: "Streaming",
//                         icon: <Play className="h-6 w-6" />,
//                         plans: ["Monthly", "Annual"],
//                         discount: "8% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Hulu",
//                         category: "Streaming",
//                         icon: <Tv className="h-6 w-6" />,
//                         plans: ["With Ads", "No Ads", "Live TV"],
//                         discount: "10% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Apple TV+",
//                         category: "Streaming",
//                         icon: <Tv className="h-6 w-6" />,
//                         plans: ["Monthly", "Annual"],
//                         discount: "5% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Spotify",
//                         category: "Music",
//                         icon: <Music className="h-6 w-6" />,
//                         plans: ["Individual", "Duo", "Family"],
//                         discount: "12% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Xbox Game Pass",
//                         category: "Gaming",
//                         icon: <Gamepad2 className="h-6 w-6" />,
//                         plans: ["Console", "PC", "Ultimate"],
//                         discount: "15% off",
//                         integrated: true,
//                       },
//                       {
//                         name: "Paramount+",
//                         category: "Streaming",
//                         icon: <Film className="h-6 w-6" />,
//                         plans: ["Essential", "Premium"],
//                         discount: "8% off",
//                         integrated: false,
//                       },
//                     ].map((platform, index) => (
//                       <div
//                         key={index}
//                         className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl overflow-hidden group hover:border-brand-blue/50 transition-colors"
//                       >
//                         <div className="p-5">
//                           <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-12 h-12 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
//                                 {platform.icon}
//                               </div>
//                               <div>
//                                 <h3 className="text-lg font-medium text-white">{platform.name}</h3>
//                                 <div className="text-sm text-brand-grey">{platform.category}</div>
//                               </div>
//                             </div>
//                             {platform.integrated && (
//                               <div className="px-2 py-1 rounded text-xs bg-green-900/30 text-green-400">Integrated</div>
//                             )}
//                           </div>

//                           <div className="space-y-3 mb-4">
//                             <div>
//                               <div className="text-sm text-brand-grey mb-1">Available Plans</div>
//                               <div className="flex flex-wrap gap-2">
//                                 {platform.plans.map((plan, i) => (
//                                   <span
//                                     key={i}
//                                     className="px-2 py-1 rounded-full text-xs bg-brand-blue/10 text-brand-blue"
//                                   >
//                                     {plan}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>

//                             <div>
//                               <div className="text-sm text-brand-grey mb-1">Discount with SubversePay</div>
//                               <div className="text-green-400 font-medium">{platform.discount}</div>
//                             </div>
//                           </div>

//                           <Button
//                             className={`w-full ${
//                               view === "b2b"
//                                 ? "bg-brand-blue hover:bg-brand-blue/90 text-white"
//                                 : "bg-brand-blue hover:bg-brand-blue/90 text-white"
//                             }`}
//                           >
//                             {view === "b2b"
//                               ? platform.integrated
//                                 ? "Manage Integration"
//                                 : "Add Integration"
//                               : "Subscribe Now"}
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === "subscriptions" && (
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
//                         <input
//                           type="text"
//                           placeholder="Search subscriptions..."
//                           className="h-9 w-64 rounded-md bg-black/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-brand-grey">Status:</span>
//                         <select className="h-9 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
//                           <option>All</option>
//                           <option>Active</option>
//                           <option>Expired</option>
//                           <option>Cancelled</option>
//                         </select>
//                       </div>
//                     </div>

//                     {view === "customer" && (
//                       <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add Subscription
//                       </Button>
//                     )}
//                   </div>

//                   <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead>
//                           <tr className="border-b border-brand-blue/20">
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               {view === "b2b" ? "Customer" : "Platform"}
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Plan
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Status
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Next Billing
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Amount
//                             </th>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-brand-blue/10">
//                           {(view === "b2b"
//                             ? [
//                                 {
//                                   customer: "John Smith",
//                                   platform: "NetflixPro",
//                                   plan: "Premium",
//                                   status: "Active",
//                                   nextBilling: "May 15, 2025",
//                                   amount: "$15.99",
//                                 },
//                                 {
//                                   customer: "Emma Johnson",
//                                   platform: "DisneyPlus",
//                                   plan: "Annual",
//                                   status: "Active",
//                                   nextBilling: "June 22, 2025",
//                                   amount: "$79.99",
//                                 },
//                                 {
//                                   customer: "Michael Brown",
//                                   platform: "HBO Max",
//                                   plan: "Ad-Free",
//                                   status: "Active",
//                                   nextBilling: "May 30, 2025",
//                                   amount: "$14.99",
//                                 },
//                                 {
//                                   customer: "Sarah Wilson",
//                                   platform: "Spotify",
//                                   plan: "Family",
//                                   status: "Active",
//                                   nextBilling: "May 18, 2025",
//                                   amount: "$16.99",
//                                 },
//                                 {
//                                   customer: "David Lee",
//                                   platform: "Amazon Prime",
//                                   plan: "Annual",
//                                   status: "Expired",
//                                   nextBilling: "N/A",
//                                   amount: "$0.00",
//                                 },
//                               ]
//                             : [
//                                 {
//                                   platform: "NetflixPro",
//                                   plan: "Premium",
//                                   status: "Active",
//                                   nextBilling: "May 15, 2025",
//                                   amount: "$15.99",
//                                 },
//                                 {
//                                   platform: "DisneyPlus",
//                                   plan: "Monthly",
//                                   status: "Active",
//                                   nextBilling: "May 22, 2025",
//                                   amount: "$7.99",
//                                 },
//                                 {
//                                   platform: "Spotify",
//                                   plan: "Individual",
//                                   status: "Active",
//                                   nextBilling: "May 30, 2025",
//                                   amount: "$9.99",
//                                 },
//                               ]
//                           ).map((sub, index) => (
//                             <tr key={index} className="hover:bg-brand-blue/5">
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                                 {view === "b2b" ? sub.customer : sub.platform}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                                 {view === "b2b" ? `${sub.platform} - ${sub.plan}` : sub.plan}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <span
//                                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                     sub.status === "Active"
//                                       ? "bg-green-900/30 text-green-400"
//                                       : sub.status === "Expired"
//                                         ? "bg-red-900/30 text-red-400"
//                                         : "bg-yellow-900/30 text-yellow-400"
//                                   }`}
//                                 >
//                                   {sub.status}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-grey">{sub.nextBilling}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{sub.amount}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
//                                 >
//                                   Manage
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                     {view === "b2b" && (
//                       <div className="px-6 py-3 flex items-center justify-between border-t border-brand-blue/20">
//                         <div className="text-sm text-brand-grey">Showing 5 of 12,458 subscriptions</div>
//                         <div className="flex items-center gap-2">
//                           <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-brand-grey">
//                             Previous
//                           </Button>
//                           <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-white">
//                             Next
//                           </Button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === "customers" && view === "b2b" && (
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-grey" />
//                         <input
//                           type="text"
//                           placeholder="Search customers..."
//                           className="h-9 w-64 rounded-md bg-black/60 border border-brand-blue/20 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-brand-grey">Platform:</span>
//                         <select className="h-9 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
//                           <option>All Platforms</option>
//                           <option>NetflixPro</option>
//                           <option>DisneyPlus</option>
//                           <option>HBO Max</option>
//                           <option>Spotify</option>
//                           <option>Amazon Prime</option>
//                         </select>
//                       </div>
//                     </div>

//                     <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Add Customer
//                     </Button>
//                   </div>

//                   <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead>
//                           <tr className="border-b border-brand-blue/20">
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Customer
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Email
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Subscriptions
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Status
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               MRR
//                             </th>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-brand-grey uppercase tracking-wider">
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-brand-blue/10">
//                           {[
//                             {
//                               name: "John Smith",
//                               email: "john.smith@example.com",
//                               subscriptions: 3,
//                               status: "Active",
//                               mrr: "$33.97",
//                             },
//                             {
//                               name: "Emma Johnson",
//                               email: "emma.j@example.com",
//                               subscriptions: 1,
//                               status: "Active",
//                               mrr: "$79.99",
//                             },
//                             {
//                               name: "Michael Brown",
//                               email: "michael.b@example.com",
//                               subscriptions: 2,
//                               status: "Active",
//                               mrr: "$24.98",
//                             },
//                             {
//                               name: "Sarah Wilson",
//                               email: "sarah.w@example.com",
//                               subscriptions: 1,
//                               status: "Active",
//                               mrr: "$16.99",
//                             },
//                             {
//                               name: "David Lee",
//                               email: "david.lee@example.com",
//                               subscriptions: 0,
//                               status: "Inactive",
//                               mrr: "$0.00",
//                             },
//                           ].map((customer, index) => (
//                             <tr key={index} className="hover:bg-brand-blue/5">
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
//                                     <span className="text-sm font-medium text-white">{customer.name.charAt(0)}</span>
//                                   </div>
//                                   <div className="ml-3">
//                                     <div className="text-sm font-medium text-white">{customer.name}</div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-grey">{customer.email}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                                 {customer.subscriptions}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <span
//                                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                     customer.status === "Active"
//                                       ? "bg-green-900/30 text-green-400"
//                                       : "bg-red-900/30 text-red-400"
//                                   }`}
//                                 >
//                                   {customer.status}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{customer.mrr}</td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
//                                 >
//                                   View
//                                 </Button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="px-6 py-3 flex items-center justify-between border-t border-brand-blue/20">
//                       <div className="text-sm text-brand-grey">Showing 5 of 12,458 customers</div>
//                       <div className="flex items-center gap-2">
//                         <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-brand-grey">
//                           Previous
//                         </Button>
//                         <Button variant="outline" size="sm" className="h-8 border-brand-blue/30 text-white">
//                           Next
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "billing" && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//                         <h2 className="text-lg font-medium text-white mb-4">Payment Methods</h2>

//                         <div className="space-y-4 mb-6">
//                           <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4 relative">
//                             <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-xs bg-brand-blue/20 text-brand-blue">
//                               Default
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-md bg-brand-blue/20 flex items-center justify-center">
//                                 <svg
//                                   width="24"
//                                   height="24"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                                     stroke="#1f79bd"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   />
//                                   <path
//                                     d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
//                                     stroke="#1f79bd"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <div className="text-white font-medium">USDC Wallet</div>
//                                 <div className="text-sm text-brand-grey">Connected to MetaMask</div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-md bg-brand-blue/10 flex items-center justify-center">
//                                 <svg
//                                   width="24"
//                                   height="24"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                                     stroke="#6d6e70"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   />
//                                   <path
//                                     d="M7.5 12H15M15 12L11.25 8.25M15 12L11.25 15.75"
//                                     stroke="#6d6e70"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <div className="text-white font-medium">USDT Wallet</div>
//                                 <div className="text-sm text-brand-grey">Connected to MetaMask</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-brand-blue border-brand-blue/30 hover:bg-brand-blue/10"
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Connect Wallet
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//                         <h2 className="text-lg font-medium text-white mb-4">Billing Information</h2>

//                         <div className="space-y-4">
//                           <div>
//                             <div className="text-sm text-brand-grey mb-1">Name</div>
//                             <div className="text-white">{view === "b2b" ? "StreamFlix Media" : "John Smith"}</div>
//                           </div>

//                           <div>
//                             <div className="text-sm text-brand-grey mb-1">Email</div>
//                             <div className="text-white">
//                               {view === "b2b" ? "billing@streamflix.com" : "john.smith@example.com"}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="text-sm text-brand-grey mb-1">Wallet Address</div>
//                             <div className="text-white text-sm">0x1a2b...3c4d</div>
//                           </div>

//                           <div>
//                             <div className="text-sm text-brand-grey mb-1">Default Currency</div>
//                             <div className="text-white">USDC</div>
//                           </div>
//                         </div>

//                         <div className="mt-6">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="text-brand-blue border-brand-blue/30 hover:bg-brand-blue/10"
//                           >
//                             Edit Billing Information
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <BillingHistory view={view} />
//                 </div>
//               )}

//               {activeTab === "settings" && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//                         <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>

//                         <div className="space-y-6">
//                           <div>
//                             <label className="block text-sm text-brand-grey mb-2">
//                               {view === "b2b" ? "Organization Name" : "Full Name"}
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                               defaultValue={view === "b2b" ? "StreamFlix Media" : "John Smith"}
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm text-brand-grey mb-2">Email Address</label>
//                             <input
//                               type="email"
//                               className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                               defaultValue={view === "b2b" ? "admin@streamflix.com" : "john.smith@example.com"}
//                             />
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <label className="block text-sm text-brand-grey mb-2">Default Stablecoin</label>
//                               <select className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
//                                 <option>USDC</option>
//                                 <option>USDT</option>
//                                 <option>DAI</option>
//                                 <option>BUSD</option>
//                               </select>
//                             </div>

//                             <div>
//                               <label className="block text-sm text-brand-grey mb-2">Auto-Renewal</label>
//                               <select className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white">
//                                 <option>Enabled</option>
//                                 <option>Disabled</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div>
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-black/60 h-4 w-4"
//                                 defaultChecked
//                               />
//                               <span className="text-sm text-white">
//                                 Receive email notifications for subscription renewals
//                               </span>
//                             </label>
//                           </div>

//                           <div className="pt-4 border-t border-brand-blue/20">
//                             <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Changes</Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                       <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//                         <h2 className="text-lg font-medium text-white mb-4">Security</h2>

//                         <div className="space-y-6">
//                           <div>
//                             <label className="block text-sm text-brand-grey mb-2">Change Password</label>
//                             <input
//                               type="password"
//                               className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white mb-2"
//                               placeholder="Current password"
//                             />
//                             <input
//                               type="password"
//                               className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white mb-2"
//                               placeholder="New password"
//                             />
//                             <input
//                               type="password"
//                               className="w-full h-10 rounded-md bg-black/60 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-white"
//                               placeholder="Confirm new password"
//                             />
//                           </div>

//                           <div>
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 className="rounded border-brand-blue/30 text-brand-blue focus:ring-brand-blue/30 bg-black/60 h-4 w-4"
//                                 defaultChecked
//                               />
//                               <span className="text-sm text-white">Enable two-factor authentication</span>
//                             </label>
//                           </div>

//                           <div className="pt-4 border-t border-brand-blue/20">
//                             <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white w-full">
//                               Update Password
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {view === "b2b" && (
//                     <div className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//                       <h2 className="text-lg font-medium text-white mb-4">API Integration</h2>

//                       <div className="space-y-4 mb-6">
//                         <div className="bg-black/60 border border-brand-blue/30 rounded-lg p-4">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="text-white font-medium">Production API Key</div>
//                             <div className="text-xs text-brand-grey">Created: Apr 12, 2025</div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="text"
//                               className="flex-1 h-9 rounded-md bg-black/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-brand-grey"
//                               value="sp_live_••••••••••••••••••••••••••••••"
//                               readOnly
//                             />
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
//                             >
//                               Copy
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
//                             >
//                               Regenerate
//                             </Button>
//                           </div>
//                         </div>

//                         <div className="bg-black/60 border border-brand-blue/10 rounded-lg p-4">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="text-white font-medium">Test API Key</div>
//                             <div className="text-xs text-brand-grey">Created: Apr 12, 2025</div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="text"
//                               className="flex-1 h-9 rounded-md bg-black/80 border border-brand-blue/20 px-3 text-sm focus:outline-none focus:border-brand-blue/50 text-brand-grey"
//                               value="sp_test_••••••••••••••••••••••••••••••"
//                               readOnly
//                             />
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
//                             >
//                               Copy
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-9 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10"
//                             >
//                               Regenerate
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="text-sm text-brand-grey">
//                         API keys provide access to your OTT platform integrations. Keep them secure and never share them
//                         in public areas such as GitHub or client-side code.
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }

// function StatsCard({
//   title,
//   value,
//   change,
//   trend,
//   icon,
// }: {
//   title: string
//   value: string
//   change?: string
//   trend: "up" | "down" | "neutral"
//   icon: React.ReactNode
// }) {
//   return (
//     <motion.div
//       className="bg-black/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className="text-sm text-brand-grey">{title}</div>
//         <div className="w-8 h-8 rounded-md bg-brand-blue/10 flex items-center justify-center">{icon}</div>
//       </div>
//       <div className="text-2xl font-bold text-white mb-1">{value}</div>
//       {change && (
//         <div className="flex items-center text-xs">
//           {trend === "up" ? (
//             <div className="flex items-center text-green-400">
//               <ArrowUpRight className="h-3 w-3 mr-1" />
//               <span>{change}</span>
//             </div>
//           ) : trend === "down" ? (
//             <div className="flex items-center text-red-400">
//               <ArrowDownRight className="h-3 w-3 mr-1" />
//               <span>{change}</span>
//             </div>
//           ) : (
//             <div className="text-brand-grey">
//               <span>No change</span>
//             </div>
//           )}
//           <span className="text-brand-grey ml-1">from last month</span>
//         </div>
//       )}
//     </motion.div>
//   )
// }