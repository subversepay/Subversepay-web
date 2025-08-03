// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"

// export default function SubscriptionUsage({ view = "b2b" }: { view?: "b2b" | "customer" }) {
//   const [timeRange, setTimeRange] = useState("30d")

//   // Sample data for the chart
//   const chartData = {
//     "7d": [42, 48, 52, 58, 62, 68, 72],
//     "30d": [
//       42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105, 108, 112, 115, 118, 122, 125,
//       128, 132, 135, 138,
//     ],
//     "90d": Array.from({ length: 90 }, (_, i) => Math.floor(Math.random() * 50) + 100),
//   }

//   const currentData = chartData[timeRange as keyof typeof chartData]
//   const maxValue = Math.max(...currentData)

//   return (
//     <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-medium text-foreground">API Integration Usage</h2>

//         <div className="flex items-center gap-2">
//           <Button
//             variant={timeRange === "7d" ? "default" : "outline"}
//             size="sm"
//             className={`h-8 text-xs ${
//               timeRange === "7d"
//                 ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
//                 : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
//             }`}
//             onClick={() => setTimeRange("7d")}
//           >
//             7D
//           </Button>
//           <Button
//             variant={timeRange === "30d" ? "default" : "outline"}
//             size="sm"
//             className={`h-8 text-xs ${
//               timeRange === "30d"
//                 ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
//                 : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
//             }`}
//             onClick={() => setTimeRange("30d")}
//           >
//             30D
//           </Button>
//           <Button
//             variant={timeRange === "90d" ? "default" : "outline"}
//             size="sm"
//             className={`h-8 text-xs ${
//               timeRange === "90d"
//                 ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
//                 : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
//             }`}
//             onClick={() => setTimeRange("90d")}
//           >
//             90D
//           </Button>
//         </div>
//       </div>

//       <div className="h-64 relative">
//         <div className="absolute inset-y-0 left-0 w-10 flex flex-col justify-between text-xs text-muted-foreground">
//           <div>1M</div>
//           <div>750K</div>
//           <div>500K</div>
//           <div>250K</div>
//           <div>0</div>
//         </div>

//         <div className="absolute inset-y-0 left-10 right-0">
//           {/* Horizontal grid lines */}
//           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
//             {[0, 1, 2, 3, 4].map((i) => (
//               <div key={i} className="border-t border-brand-blue/10 h-0"></div>
//             ))}
//           </div>

//           {/* Chart */}
//           <div className="absolute inset-0 flex items-end">
//             <div className="flex-1 flex items-end h-full">
//               {currentData.map((value, index) => {
//                 const height = (value / maxValue) * 100

//                 return (
//                   <motion.div
//                     key={index}
//                     className="flex-1 mx-0.5 bg-brand-blue/20 rounded-t-sm relative group"
//                     style={{ height: `${height}%` }}
//                     initial={{ height: 0 }}
//                     animate={{ height: `${height}%` }}
//                     transition={{ duration: 0.5, delay: index * 0.02 }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-t from-brand-blue to-brand-blue/50 opacity-80"></div>

//                     {/* Tooltip */}
//                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background/90 border border-brand-blue/30 rounded px-2 py-1 text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//                       {value}K API calls
//                     </div>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between text-xs text-muted-foreground mt-2 pl-10">
//         {timeRange === "7d" && (
//           <>
//             <div>Mon</div>
//             <div>Tue</div>
//             <div>Wed</div>
//             <div>Thu</div>
//             <div>Fri</div>
//             <div>Sat</div>
//             <div>Sun</div>
//           </>
//         )}
//         {timeRange === "30d" && (
//           <>
//             <div>Week 1</div>
//             <div>Week 2</div>
//             <div>Week 3</div>
//             <div>Week 4</div>
//           </>
//         )}
//         {timeRange === "90d" && (
//           <>
//             <div>Month 1</div>
//             <div>Month 2</div>
//             <div>Month 3</div>
//           </>
//         )}
//       </div>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
//           <div className="text-sm text-muted-foreground mb-1">Total API Calls</div>
//           <div className="text-xl font-bold text-foreground">782.4K</div>
//           <div className="text-xs text-success flex items-center mt-1">
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-1"
//             >
//               <path
//                 d="M7 17L17 7M17 7H7M17 7V17"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>12.5%</span>
//             <span className="text-muted-foreground ml-1">vs last period</span>
//           </div>
//         </div>

//         <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
//           <div className="text-sm text-muted-foreground mb-1">OTT Platforms</div>
//           <div className="text-xl font-bold text-foreground">8</div>
//           <div className="text-xs text-success flex items-center mt-1">
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-1"
//             >
//               <path
//                 d="M7 17L17 7M17 7H7M17 7V17"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>+2</span>
//             <span className="text-muted-foreground ml-1">vs last period</span>
//           </div>
//         </div>

//         <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
//           <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
//           <div className="text-xl font-bold text-foreground">99.8%</div>
//           <div className="text-xs text-success flex items-center mt-1">
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-1"
//             >
//               <path
//                 d="M7 17L17 7M17 7H7M17 7V17"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>0.2%</span>
//             <span className="text-muted-foreground ml-1">vs last period</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function SubscriptionUsage({ view = "customer" }: { view?: "b2b" | "customer" }) {
  const [timeRange, setTimeRange] = useState("30d")

  // Sample data for the chart
  const chartData = {
    "7d": [42, 48, 52, 58, 62, 68, 72],
    "30d": [
      42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105, 108, 112, 115, 118, 122, 125,
      128, 132, 135, 138,
    ],
    "90d": Array.from({ length: 90 }, (_, i) => Math.floor(Math.random() * 50) + 100),
  }

  const currentData = chartData[timeRange as keyof typeof chartData]
  const maxValue = Math.max(...currentData)

  return (
    <div className="bg-background/40 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">Subscription Usage</h2>

        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              timeRange === "7d"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
                : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
            }`}
            onClick={() => setTimeRange("7d")}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              timeRange === "30d"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
                : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
            }`}
            onClick={() => setTimeRange("30d")}
          >
            30D
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs ${
              timeRange === "90d"
                ? "bg-brand-blue hover:bg-brand-blue/90 text-foreground"
                : "border-brand-blue/30 text-muted-foreground hover:text-foreground hover:bg-brand-blue/10"
            }`}
            onClick={() => setTimeRange("90d")}
          >
            90D
          </Button>
        </div>
      </div>

      <div className="h-64 relative">
        <div className="absolute inset-y-0 left-0 w-10 flex flex-col justify-between text-xs text-muted-foreground">
          <div>100</div>
          <div>75</div>
          <div>50</div>
          <div>25</div>
          <div>0</div>
        </div>

        <div className="absolute inset-y-0 left-10 right-0">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-brand-blue/10 h-0"></div>
            ))}
          </div>

          {/* Chart */}
          <div className="absolute inset-0 flex items-end">
            <div className="flex-1 flex items-end h-full">
              {currentData.map((value, index) => {
                const height = (value / maxValue) * 100

                return (
                  <motion.div
                    key={index}
                    className="flex-1 mx-0.5 bg-brand-blue/20 rounded-t-sm relative group"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue to-brand-blue/50 opacity-80"></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background/90 border border-brand-blue/30 rounded px-2 py-1 text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {value} hours
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mt-2 pl-10">
        {timeRange === "7d" && (
          <>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </>
        )}
        {timeRange === "30d" && (
          <>
            <div>Week 1</div>
            <div>Week 2</div>
            <div>Week 3</div>
            <div>Week 4</div>
          </>
        )}
        {timeRange === "90d" && (
          <>
            <div>Month 1</div>
            <div>Month 2</div>
            <div>Month 3</div>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Total Hours</div>
          <div className="text-xl font-bold text-foreground">142.5</div>
          <div className="text-xs text-success flex items-center mt-1">
            <span>+12.5%</span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Active Subscriptions</div>
          <div className="text-xl font-bold text-foreground">3</div>
          <div className="text-xs text-success flex items-center mt-1">
            <span>+1</span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-background/60 border border-brand-blue/20 rounded-lg p-3">
          <div className="text-sm text-muted-foreground mb-1">Avg. Daily Usage</div>
          <div className="text-xl font-bold text-foreground">4.7h</div>
          <div className="text-xs text-success flex items-center mt-1">
            <span>+0.3h</span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        </div>
      </div>
    </div>
  )
}

