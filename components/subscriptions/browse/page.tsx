// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { useToast } from "@/hooks/use-toast"
// import { getCurrentUser, isAuthenticated } from "@/lib/auth/auth"

// interface Platform {
//   address: string
//   name: string
//   description: string
//   plans: Plan[]
//   isActive: boolean
// }

// interface Plan {
//   id: string
//   name: string
//   price: string
//   duration: string
//   features: string[]
// }

// // Mock platform data - in a real app, this would come from your API
// const AVAILABLE_PLATFORMS: Platform[] = [
//   {
//     address: "0x1234567890123456789012345678901234567890",
//     name: "StreamFlix",
//     description: "Premium video streaming service with 4K content",
//     isActive: true,
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         price: "0.01 ETH",
//         duration: "30 days",
//         features: ["HD Streaming", "2 Devices", "Limited Content"],
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         price: "0.02 ETH",
//         duration: "30 days",
//         features: ["4K Streaming", "5 Devices", "Full Content Library", "Offline Downloads"],
//       },
//     ],
//   },
//   {
//     address: "0x2345678901234567890123456789012345678901",
//     name: "MusicFlow",
//     description: "Unlimited music streaming with high-quality audio",
//     isActive: true,
//     plans: [
//       {
//         id: "standard",
//         name: "Standard Plan",
//         price: "0.005 ETH",
//         duration: "30 days",
//         features: ["Unlimited Streaming", "Standard Quality", "Ads"],
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         price: "0.015 ETH",
//         duration: "30 days",
//         features: ["Unlimited Streaming", "High Quality", "No Ads", "Offline Mode"],
//       },
//     ],
//   },
//   {
//     address: "0x3456789012345678901234567890123456789012",
//     name: "GamePass Pro",
//     description: "Access to premium gaming content and early releases",
//     isActive: true,
//     plans: [
//       {
//         id: "gamer",
//         name: "Gamer Plan",
//         price: "0.03 ETH",
//         duration: "30 days",
//         features: ["100+ Games", "Cloud Gaming", "Standard Support"],
//       },
//       {
//         id: "pro",
//         name: "Pro Plan",
//         price: "0.05 ETH",
//         duration: "30 days",
//         features: ["500+ Games", "Cloud Gaming", "Early Access", "Priority Support"],
//       },
//     ],
//   },
// ]

// export default function BrowsePlatforms() {
//   const [platforms] = useState<Platform[]>(AVAILABLE_PLATFORMS)
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     // Check authentication
//     if (!isAuthenticated()) {
//       router.push("/auth/login")
//       return
//     }

//     const currentUser = getCurrentUser()
//     setUser(currentUser)
//   }, [router])

//   const handleSubscribe = async (platform: Platform, plan: Plan) => {
//     if (!user?.wallets?.length) {
//       toast({
//         title: "Wallet Required",
//         description: "Please connect a wallet to subscribe",
//         variant: "destructive",
//       })
//       return
//     }

//     // In a real implementation, this would interact with your smart contract
//     toast({
//       title: "Subscription Initiated",
//       description: `Starting subscription to ${platform.name} - ${plan.name}. Please confirm the transaction in your wallet.`,
//     })

//     // Simulate contract interaction
//     setTimeout(() => {
//       toast({
//         title: "Subscription Successful",
//         description: `You are now subscribed to ${platform.name} - ${plan.name}!`,
//       })
//     }, 3000)
//   }

//   const checkExistingSubscription = async (platformAddress: string) => {
//     if (!user?.wallets?.length) return false

//     try {
//       // Check if user already has a subscription to this platform
//       for (const walletAddress of user.wallets) {
//         const response = await fetch(`http://localhost:3001/api/subscriptions/${walletAddress}/${platformAddress}`)

//         if (response.ok) {
//           const subscription = await response.json()
//           if (subscription.isActive && subscription.expiryTimestamp > Date.now()) {
//             return true
//           }
//         }
//       }
//       return false
//     } catch (error) {
//       return false
//     }
//   }

//   return (
//     <div className="container py-12">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold">Browse Platforms</h1>
//             <p className="text-muted-foreground mt-2">Discover and subscribe to premium content platforms</p>
//           </div>
//           <Button variant="outline" onClick={() => router.push("/subscriptions")}>
//             My Subscriptions
//           </Button>
//         </div>

//         {!user?.wallets?.length && (
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>Wallet Required</CardTitle>
//               <CardDescription>Connect a wallet to subscribe to platforms</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button onClick={() => router.push("/auth/wallet")}>Connect Wallet</Button>
//             </CardContent>
//           </Card>
//         )}

//         <div className="space-y-8">
//           {platforms.map((platform) => (
//             <Card key={platform.address}>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle className="text-2xl">{platform.name}</CardTitle>
//                     <CardDescription className="mt-2">{platform.description}</CardDescription>
//                   </div>
//                   <Badge variant={platform.isActive ? "default" : "secondary"}>
//                     {platform.isActive ? "Active" : "Inactive"}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {platform.plans.map((plan) => (
//                     <Card key={plan.id} className="border-2">
//                       <CardHeader>
//                         <CardTitle className="text-lg">{plan.name}</CardTitle>
//                         <div className="space-y-1">
//                           <p className="text-2xl font-bold">{plan.price}</p>
//                           <p className="text-sm text-muted-foreground">per {plan.duration}</p>
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         <ul className="space-y-2">
//                           {plan.features.map((feature, index) => (
//                             <li key={index} className="text-sm flex items-center">
//                               <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                       <CardFooter>
//                         <Button
//                           className="w-full"
//                           onClick={() => handleSubscribe(platform, plan)}
//                           disabled={!platform.isActive || !user?.wallets?.length}
//                         >
//                           Subscribe Now
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <div className="w-full">
//                   <p className="text-xs text-muted-foreground font-mono break-all">Contract: {platform.address}</p>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useContext } from "react"
import { PLATFORMS } from "@/lib/PLATFORMS"
import { WalletContext } from "@/context/walletContext"
import { createSubvSubscription, createStablecoinSubscription } from "@/services/subscriptionManagement"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function BrowsePlatforms() {
  const [subscribing, setSubscribing] = useState<string | null>(null)
  const { currentAccount } = useContext(WalletContext)
  const { toast } = useToast()

  const handleSubscribe = async (platform, plan) => {
    if (!currentAccount) {
      toast({ title: "Connect Wallet", description: "Please connect your wallet.", variant: "destructive" })
      return
    }
    setSubscribing(`${platform.address}-${plan.id}`)
    try {
      if (plan.tokenType === "SUBV") {
        await createSubvSubscription(platform.address, plan.price, plan.durationDays)
      } else {
        await createStablecoinSubscription(platform.address, plan.stablecoinAddress, plan.price, plan.durationDays)
      }
      toast({ title: "Success", description: `Subscribed to ${platform.name} - ${plan.name}` })
    } catch (err) {
      console.log("subs error", err);
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
    setSubscribing(null)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Browse Platforms</h1>
      {PLATFORMS.map(platform => (
        <div key={platform.address} className="p-4 border rounded">
          <h2 className="text-xl font-semibold">{platform.name}</h2>
          <p className="mb-2">{platform.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platform.plans.map(plan => (
              <div key={plan.id} className="p-3 border rounded flex flex-col gap-2">
                <div>
                  <div className="font-semibold">{plan.name}</div>
                  <div className="text-sm text-muted-foreground">{plan.description}</div>
                </div>
                <div>
                  <span className="font-mono">{plan.price} {plan.tokenType === "SUBV" ? "SUBV" : "Stablecoin"}</span>
                  <span className="ml-2 text-xs">/{plan.durationDays} days</span>
                </div>
                <Button
                  onClick={() => handleSubscribe(platform, plan)}
                  disabled={subscribing === `${platform.address}-${plan.id}`}
                >
                  {subscribing === `${platform.address}-${plan.id}` ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
