"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { isAuthenticated } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"

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

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchAddress, setSearchAddress] = useState("")
  const [searchPlatform, setSearchPlatform] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check authentication - in a real app, you'd also check for admin role
    if (!isAuthenticated()) {
      router.push("/auth/login")
      return
    }

    fetchAllSubscriptions()
  }, [router])

  useEffect(() => {
    // Filter subscriptions based on search criteria
    let filtered = subscriptions

    if (searchAddress) {
      filtered = filtered.filter((sub) => sub.subscriberAddress.toLowerCase().includes(searchAddress.toLowerCase()))
    }

    if (searchPlatform) {
      filtered = filtered.filter((sub) => sub.ottPlatformAddress.toLowerCase().includes(searchPlatform.toLowerCase()))
    }

    setFilteredSubscriptions(filtered)
  }, [subscriptions, searchAddress, searchPlatform])

  const fetchAllSubscriptions = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/subscriptions/active")

      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions")
      }

      const data = await response.json()
      setSubscriptions(data)
      setFilteredSubscriptions(data)
    } catch (error) {
      console.error("Failed to fetch subscriptions", error)
      toast({
        title: "Error",
        description: "Failed to fetch subscription data",
        variant: "destructive",
      })
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
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check on-chain status",
        variant: "destructive",
      })
    }
  }

  const isSubscriptionActive = (subscription: Subscription): boolean => {
    return subscription.isActive && subscription.expiryTimestamp > Date.now()
  }

  const formatExpiryDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    return formatDistanceToNow(date, { addSuffix: true })
  }

  const getStats = () => {
    const total = subscriptions.length
    const active = subscriptions.filter(isSubscriptionActive).length
    const expired = total - active

    return { total, active, expired }
  }

  const stats = getStats()

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading subscription data...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Subscription Management</h1>
            <p className="text-muted-foreground mt-2">Monitor and manage all platform subscriptions</p>
          </div>
          <Button variant="outline" onClick={fetchAllSubscriptions}>
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expired Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Filter subscriptions by address or platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="searchAddress">Subscriber Address</Label>
                <Input
                  id="searchAddress"
                  placeholder="Enter subscriber address..."
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="searchPlatform">Platform Address</Label>
                <Input
                  id="searchPlatform"
                  placeholder="Enter platform address..."
                  value={searchPlatform}
                  onChange={(e) => setSearchPlatform(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscriptions ({filteredSubscriptions.length})</CardTitle>
            <CardDescription>Complete list of subscription records from the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSubscriptions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No subscriptions found matching your criteria.</p>
            ) : (
              <div className="space-y-4">
                {filteredSubscriptions.map((subscription) => {
                  const isActive = isSubscriptionActive(subscription)

                  return (
                    <div key={subscription._id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Expired"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Plan: {subscription.planId}</span>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Subscriber</p>
                            <p className="text-xs font-mono text-muted-foreground break-all">
                              {subscription.subscriberAddress}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Platform</p>
                            <p className="text-xs font-mono text-muted-foreground break-all">
                              {subscription.ottPlatformAddress}
                            </p>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div>
                            <p className="text-sm font-medium">Expires</p>
                            <p className="text-sm text-muted-foreground">
                              {formatExpiryDate(subscription.expiryTimestamp)}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Block</p>
                            <p className="text-sm text-muted-foreground">#{subscription.blockNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Transaction: {subscription.transactionHash}</p>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            checkOnChainStatus(subscription.subscriberAddress, subscription.ottPlatformAddress)
                          }
                        >
                          Verify On-Chain
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
