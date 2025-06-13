"use client"

import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, isAuthenticated } from "@/lib/auth/auth"
import { formatDistanceToNow } from "date-fns"
import { WalletContext } from "@/context/walletContext"
import SubscriptionDemo from '@/components/SubscriptionDemo'



interface Subscription {
  _id: string
  subscriberAddress: string
  ottPlatformAddress: string
  planId: string
  expiryTimestamp: number
  isActive: boolean
  transactionHash: string
  blockNumber: number
  createdAt: string 
  updatedAt: string
}

interface Platform {
  address: string
  name: string
  description: string
}

// Mock platform data - in a real app, this would come from your API
const PLATFORMS: Platform[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "StreamFlix",
    description: "Premium video streaming service",
  },
  {
    address: "0x2345678901234567890123456789012345678901",
    name: "MusicFlow",
    description: "Unlimited music streaming",
  },
  {
    address: "0x3456789012345678901234567890123456789012",
    name: "GamePass Pro",
    description: "Access to premium gaming content",
  },
]

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { ConnectWallet, isConnecting } = useContext(WalletContext)
  

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/auth")
      return
    }

    const currentUser = getCurrentUser()
    setUser(currentUser)

    fetchSubscriptions()
    fetchActiveSubscriptions()
  }, [router])

  const fetchSubscriptions = async () => {
    try {
      const user = getCurrentUser()
      if (!user?.wallets?.length) {
        setIsLoading(false)
        return
      }

      // Fetch subscriptions for each connected wallet
      const allSubscriptions: Subscription[] = []

      for (const walletAddress of user.wallets) {
        for (const platform of PLATFORMS) {
          try {
            const response = await fetch(`http://localhost:3001/api/subscriptions/${walletAddress}/${platform.address}`)

            if (response.ok) {
              const subscription = await response.json()
              allSubscriptions.push(subscription)
            }
          } catch (error) {
            // Subscription not found for this wallet/platform combination
            console.log(`No subscription found for ${walletAddress} on ${platform.name}`)
          }
        }
      }

      setSubscriptions(allSubscriptions)
    } catch (error) {
      console.error("Failed to fetch subscriptions", error)
      toast({
        title: "Error",
        description: "Failed to fetch your subscriptions",
        variant: "destructive",
      })
    }
  }

  const fetchActiveSubscriptions = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/subscriptions/active")

      if (!response.ok) {
        throw new Error("Failed to fetch active subscriptions")
      }

      const activeSubscriptions = await response.json()
      setActiveSubscriptions(activeSubscriptions)
    } catch (error) {
      console.error("Failed to fetch active subscriptions", error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkOnChainStatus = async (subscriberAddress: string, ottPlatformAddress: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/check-onchain-status/${subscriberAddress}/${ottPlatformAddress}`,
      )

      if (!response.ok) {
        throw new Error("Failed to check on-chain status")
      }

      const data = await response.json()

      toast({
        title: "On-chain Status",
        description: `Subscription is ${data.isActiveOnChain ? "active" : "inactive"} on-chain`,
        variant: "info",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check on-chain status",
        variant: "destructive",
      })
    }
  }

  const getPlatformInfo = (address: string): Platform => {
    return (
      PLATFORMS.find((p) => p.address.toLowerCase() === address.toLowerCase()) || {
        address,
        name: "Unknown Platform",
        description: "Platform information not available",
      }
    )
  }

  const isSubscriptionActive = (subscription: Subscription): boolean => {
    return subscription.isActive && subscription.expiryTimestamp > Date.now()
  }

  const formatExpiryDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    return formatDistanceToNow(date, { addSuffix: true })
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading subscriptions...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {/* <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Subscriptions</h1>
          <Button onClick={() => router.push("/subscriptions/browse")}>Browse Platforms</Button>
        </div>

        {!user?.wallets?.length && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>No Wallet Connected</CardTitle>
              <CardDescription>Connect a wallet to view your subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => ConnectWallet()}>Connect Wallet</Button>
            </CardContent>
          </Card>
        )}

        {user?.wallets?.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No subscriptions found for your connected wallets.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subscriptions.map((subscription) => {
                    const platform = getPlatformInfo(subscription.ottPlatformAddress)
                    const isActive = isSubscriptionActive(subscription)

                    return (
                      <Card key={subscription._id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{platform.name}</CardTitle>
                              <CardDescription>{platform.description}</CardDescription>
                            </div>
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Expired"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium">Plan ID</p>
                            <p className="text-sm text-muted-foreground">{subscription.planId}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Expires</p>
                            <p className="text-sm text-muted-foreground">
                              {formatExpiryDate(subscription.expiryTimestamp)}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Subscriber</p>
                            <p className="text-xs font-mono text-muted-foreground break-all">
                              {subscription.subscriberAddress}
                            </p>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              checkOnChainStatus(subscription.subscriberAddress, subscription.ottPlatformAddress)
                            }
                          >
                            Check On-Chain Status
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">All Active Subscriptions</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Network Activity</CardTitle>
                  <CardDescription>Recent active subscriptions across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeSubscriptions.length === 0 ? (
                    <p className="text-center text-muted-foreground">No active subscriptions found.</p>
                  ) : (
                    <div className="space-y-4">
                      {activeSubscriptions.slice(0, 10).map((subscription) => {
                        const platform = getPlatformInfo(subscription.ottPlatformAddress)

                        return (
                          <div
                            key={subscription._id}
                            className="flex justify-between items-center p-4 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{platform.name}</p>
                              <p className="text-sm text-muted-foreground">Plan: {subscription.planId}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                Expires {formatExpiryDate(subscription.expiryTimestamp)}
                              </p>
                              <p className="text-xs text-muted-foreground">Block: {subscription.blockNumber}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div> */}
      <SubscriptionDemo />
    </div>
  )
}


