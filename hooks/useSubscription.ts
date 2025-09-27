"use-client"

import { useCallback } from "react"
import { createStablecoinSubscription, createSubvSubscription, checkSubscriptionStatus, getSubscriptionDetails } from "@/services/subscriptionManagement"
import { useToast } from "@/hooks/use-toast"

export function useSubscription() {
  const { toast } = useToast()

  // Subscribe with stablecoin
  const subscribeStablecoin = useCallback(async (ottPlatform: string, stablecoin: string, amount: string, durationDays: number) => {
    try {
      toast({ title: "Transaction", description: "Please confirm in your wallet..." })
      const receipt = await createStablecoinSubscription(ottPlatform, stablecoin, amount, durationDays)
      toast({ title: "Success", description: "Subscription successful!", variant: "success" })
      return receipt
    } catch (err: any) {
      toast({ title: "Error!", description: err.message, variant: "info" })
      console.log(err);
      throw err
    }
  }, [toast])

  // Subscribe with SUBV token
  const subscribeSubv = useCallback(async (ottPlatform: string, amount: string, durationDays: number) => {
    try {
      toast({ title: "Transaction", description: "Please confirm in your wallet..." })
      const receipt = await createSubvSubscription(ottPlatform, amount, durationDays)
      toast({ title: "Success", description: "Subscription successful!", variant: "success" })
      return receipt
    } catch (err: any) {
      toast({ title: "Error!", description: err.message, variant: "info" })
      console.log(err);
      throw err
    }
  }, [toast])

  // Check active status
  const isSubscriptionActive = useCallback(async (subscriber: string, ottPlatform: string) => {
    try {
      return await checkSubscriptionStatus(subscriber, ottPlatform)
    } catch (err) {
      toast({ title: "Error", description: "Failed to check status", variant: "destructive" })
      return false
    }
  }, [toast])

  // Get details
  const getDetails = useCallback(async (subscriber: string, ottPlatform: string) => {
    try {
      return await getSubscriptionDetails(subscriber, ottPlatform)
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch details", variant: "destructive" })
      return null
    }
  }, [toast])

  return {
    subscribeStablecoin,
    subscribeSubv,
    isSubscriptionActive,
    getDetails,
  }
}