// API functions for subscription management

const INDEXER_API_BASE = "http://localhost:3001"

export interface Subscription {
  id: string
  subscriberAddress: string
  ottPlatformAddress: string
  planId: string
  expiryTimestamp: Date
  isActive: boolean
  transactionHash: string
  blockNumber: number
  createdAt: Date
  updatedAt: Date
}

// Get a specific subscription for a subscriber and platform
export const getSubscription = async (
  subscriberAddress: string,
  ottPlatformAddress: string,
): Promise<Subscription | null> => {
  try {
    const response = await fetch(`${INDEXER_API_BASE}/api/subscriptions/${subscriberAddress}/${ottPlatformAddress}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null // Subscription not found
      }
      throw new Error("Failed to fetch subscription")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching subscription:", error)
    throw error
  }
}

// Get all active subscriptions
export const getActiveSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const response = await fetch(`${INDEXER_API_BASE}/api/subscriptions/active`)

    if (!response.ok) {
      throw new Error("Failed to fetch active subscriptions")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching active subscriptions:", error)
    throw error
  }
}

// Check on-chain subscription status
export const checkOnChainStatus = async (subscriberAddress: string, ottPlatformAddress: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${INDEXER_API_BASE}/api/check-onchain-status/${subscriberAddress}/${ottPlatformAddress}`,
    )

    if (!response.ok) {
      throw new Error("Failed to check on-chain status")
    }

    const data = await response.json()
    return data.isActiveOnChain
  } catch (error) {
    console.error("Error checking on-chain status:", error)
    throw error
  }
}

// Get subscriptions for multiple wallet addresses
export const getSubscriptionsForWallets = async (
  walletAddresses: string[],
  platformAddresses: string[],
): Promise<Subscription[]> => {
  const subscriptions: Subscription[] = []

  for (const walletAddress of walletAddresses) {
    for (const platformAddress of platformAddresses) {
      try {
        const subscription = await getSubscription(walletAddress, platformAddress)
        if (subscription) {
          subscriptions.push(subscription)
        }
      } catch (error) {
        // Continue with other combinations if one fails
        console.log(`No subscription found for ${walletAddress} on ${platformAddress}`)
      }
    }
  }

  return subscriptions
}

// Utility function to check if a subscription is currently active
export const isSubscriptionActive = (subscription: Subscription): boolean => {
  return subscription.isActive && new Date(subscription.expiryTimestamp) > new Date()
}

// Utility function to get subscription status text
export const getSubscriptionStatusText = (subscription: Subscription): string => {
  if (!subscription.isActive) return "Inactive"
  if (new Date(subscription.expiryTimestamp) <= new Date()) return "Expired"
  return "Active"
}
