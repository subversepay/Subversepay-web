// API functions for subscription management
import { getAuthHeaders } from "../auth/auth";
import { logoutUser } from "@/lib/auth/auth";

const INDEXER_API_BASE = process.env.NEXT_PUBLIC_INDEXER_API_URL || "http://localhost:3001";

/**
 * Helper function to make API requests to the indexer.
 */ 
const indexerApiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${INDEXER_API_BASE}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, config);

    if (response.status === 401) {
     logoutUser();

     window.location.href = `/auth?next=${window.location.pathname}`;
    
    throw new Error("Session expired. Redirecting to login.");
    }

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Indexer API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Get a specific subscription for a subscriber and platform
export const getSubscription = async (subscriberAddress, ottPlatformAddress) => {
  return indexerApiRequest(`/api/subscriptions/${subscriberAddress}/${ottPlatformAddress}`);
};

// Get all active subscriptions
export const getActiveSubscriptions = async () => {
  return indexerApiRequest(`/api/subscriptions/active`);
};

// Check on-chain subscription status
export const checkOnChainStatus = async (subscriberAddress, ottPlatformAddress) => {
  const data = await indexerApiRequest(`/api/check-onchain-status/${subscriberAddress}/${ottPlatformAddress}`);
  return data?.isActiveOnChain || false;
};

// Get subscriptions for multiple wallet addresses
export const getSubscriptionsForWallets = async (walletAddresses, platformAddresses) => {
  try {
    const subscriptions = [];

    for (const walletAddress of walletAddresses) {
      for (const platformAddress of platformAddresses) {
        try {
          const subscription = await getSubscription(walletAddress, platformAddress);
          if (subscription) {
            subscriptions.push(subscription);
          }
        } catch (error) {
          console.log(`No subscription found for ${walletAddress} on ${platformAddress}`);
        }
      }
    }

    return subscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions for wallets:", error);
    throw error;
  }
};

// Utility function to check if a subscription is currently active
export const isSubscriptionActive = (subscription) => {
  return subscription?.isActive && new Date(subscription.expiryTimestamp) > new Date();
};

// Utility function to get subscription status text
export const getSubscriptionStatusText = (subscription) => {
  if (!subscription?.isActive) return "Inactive";
  if (new Date(subscription.expiryTimestamp) <= new Date()) return "Expired";
  return "Active";
};

// Get subscription details by ID
export const getSubscriptionById = async (subscriptionId) => {
  return indexerApiRequest(`/api/subscriptions/${subscriptionId}`);
};

// Get all subscriptions for a subscriber
export const getSubscriptionsForSubscriber = async (subscriberAddress) => {
  return indexerApiRequest(`/api/subscriptions/subscriber/${subscriberAddress}`);
};

// Get all subscriptions for a platform
export const getSubscriptionsForPlatform = async (platformAddress) => {
  return indexerApiRequest(`/api/subscriptions/platform/${platformAddress}`);
};
