// API functions for subscription management
import { getAuthHeaders } from "../auth/auth"

const INDEXER_API_BASE = process.env.NEXT_PUBLIC_INDEXER_API_URL || "http://localhost:3001"

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

/**
 * Helper function to make API requests to the indexer.
 */ 
const indexerApiRequest = async <T>(endpoint: string, options: RequestInit = {})
: Promise<T> =>
{
  try {
    const url = `${INDEXER_API_BASE}${endpoint}`
    const config: RequestInit = {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      if (response.status === 404) {
        return null as T
      }
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Indexer API request failed: ${endpoint}`, error)
    throw error
  }
}

// Get a specific subscription for a subscriber and platform
export const getSubscription = async (
  subscriberAddress: string,
  ottPlatformAddress: string,
): Promise<Subscription | null> => {
  return indexerApiRequest<Subscription | null>(`/api/subscriptions/${subscriberAddress}/${ottPlatformAddress}`)
}

// Get all active subscriptions
export const getActiveSubscriptions = async (): Promise<Subscription[]> => {
  return indexerApiRequest<Subscription[]>(`/api/subscriptions/active`)
}

// Check on-chain subscription status
export const checkOnChainStatus = async (subscriberAddress: string, ottPlatformAddress: string): Promise<boolean> => {
  const data = await indexerApiRequest<{ isActiveOnChain: boolean }>(
    `/api/check-onchain-status/${subscriberAddress}/${ottPlatformAddress}`,
  )
  return data?.isActiveOnChain || false
}

// Get subscriptions for multiple wallet addresses
export const getSubscriptionsForWallets = async (
  walletAddresses: string[],
  platformAddresses: string[],
): Promise<Subscription[]> => {
  try {
    // For multiple wallets/platforms, we could optimize with a batch API
    // But for now, we'll use the existing API with multiple calls
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
  } catch (error) {
    console.error("Error fetching subscriptions for wallets:", error)
    throw error
  }
}

// Utility function to check if a subscription is currently active
export const isSubscriptionActive = (subscription: Subscription): boolean => {
  return subscription?.isActive && new Date(subscription.expiryTimestamp) > new Date()
}

// Utility function to get subscription status text
export const getSubscriptionStatusText = (subscription: Subscription): string => {
  if (!subscription?.isActive) return "Inactive"
  if (new Date(subscription.expiryTimestamp) <= new Date()) return "Expired"
  return "Active"
}

// Get subscription details by ID
export const getSubscriptionById = async (subscriptionId: string): Promise<Subscription | null> => {
  return indexerApiRequest<Subscription | null>(`/api/subscriptions/${subscriptionId}`)
}

// Get all subscriptions for a subscriber
export const getSubscriptionsForSubscriber = async (subscriberAddress: string): Promise<Subscription[]> => {
  return indexerApiRequest<Subscription[]>(`/api/subscriptions/subscriber/${subscriberAddress}`)
}

// Get all subscriptions for a platform
export const getSubscriptionsForPlatform = async (platformAddress: string): Promise<Subscription[]> => {
  return indexerApiRequest<Subscription[]>(`/api/subscriptions/platform/${platformAddress}`)
}
