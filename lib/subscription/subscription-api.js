// Wrapper for subscription/indexer-related calls using lib/api/backend.js
// Path: lib/subscription/subscription-api.js


import {
  fetchMerchantProducts as fetchMerchantProductsBackend,
  checkSubscriptionStatus as checkSubscriptionStatusBackend,
} from '@/lib/api/backend';
import { logoutUser } from '@/lib/auth/auth';

/**
 * Fetch products for merchant (wrapper)
 * @param {string} merchantAddress
 */
export async function fetchMerchantProducts(merchantAddress) {
  try {
    return await fetchMerchantProductsBackend(merchantAddress);
  } catch (err) {
    // If backend triggered logout or other error, rethrow
    if (err.message && err.message.toLowerCase().includes('unauthorized')) {
      logoutUser();
    }
    throw err;
  }
}

/**
 * Check subscription active state (wrapper)
 */
export async function checkSubscriptionStatus({ subscriberAddress, merchantAddress, productId }) {
  try {
    return await checkSubscriptionStatusBackend({ subscriberAddress, merchantAddress, productId });
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('unauthorized')) {
      logoutUser();
    }
    throw err;
  }
}