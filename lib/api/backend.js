// API client for User Management Service (port 3002) and Indexer Service (port 3001)
// Path: lib/api/backend.js

import { getAuthHeaders, setToken, logoutUser } from '@/lib/auth/auth';

const USER_API_BASE = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:3002/api';
const INDEXER_API_BASE = process.env.NEXT_PUBLIC_INDEXER_API_URL || 'http://localhost:3001';

/**
 * Parse JSON and handle errors. If 401 => logout and redirect.
 * @param {Response} res
 */
async function handleJsonResponse(res) {
  if (res.status === 401) {
    // session expired / unauthorized
    logoutUser();
    throw new Error('Unauthorized - redirected to login');
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const json = await res.json();
    if (!res.ok) {
      const msg = json?.message || json?.error || JSON.stringify(json);
      throw new Error(msg);
    }
    return json;
  }

  if (!res.ok) {
    throw new Error(res.statusText || 'Request failed');
  }

  return null;
}

/* ---- User endpoints (/api/users) ---- */

/**
 * Register a standard user (email/password)
 * @param {{email:string,password:string,displayName?:string}} payload
 */
export async function registerUser({ email, password, displayName }) {
  const res = await fetch(`${USER_API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  });

  const data = await handleJsonResponse(res);
  if (data?.token) {
    setToken(data.token);
  }
  return data;
}

/**
 * Login user with email/password
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  const res = await fetch(`${USER_API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleJsonResponse(res);
  if (data?.token) {
    setToken(data.token);
  }
  return data;
}

/**
 * Fetch authenticated user profile
 */
export async function fetchUserProfile() {
  const headers = { ...getAuthHeaders(), Accept: 'application/json' };
  const res = await fetch(`${USER_API_BASE}/users/me`, {
    method: 'GET',
    headers,
  });
  return handleJsonResponse(res);
}

/* ---- Merchant wallet auth (/api/merchants) ---- */

/**
 * Request nonce to sign for merchant login
 * @param {string} walletAddress
 */
export async function getMerchantNonce(walletAddress) {
  const res = await fetch(`${USER_API_BASE}/merchants/nonce`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress }),
  });

  return handleJsonResponse(res);
}

/**
 * Merchant login with wallet address and signature
 * @param {string} walletAddress
 * @param {string} signature
 */
export async function merchantLogin(walletAddress, signature) {
  const res = await fetch(`${USER_API_BASE}/merchants/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, signature }),
  });

  const data = await handleJsonResponse(res);
  if (data?.token) {
    setToken(data.token);
  }
  return data;
}

/**
 * Fetch merchant profile (requires JWT)
 */
export async function fetchMerchantProfile() {
  const headers = { ...getAuthHeaders(), Accept: 'application/json' };
  const res = await fetch(`${USER_API_BASE}/merchants/profile`, {
    method: 'GET',
    headers,
  });
  return handleJsonResponse(res);
}

/**
 * Generate merchant API key
 */
export async function generateMerchantApiKey() {
  const headers = { ...getAuthHeaders(), 'Content-Type': 'application/json' };
  const res = await fetch(`${USER_API_BASE}/merchants/generate-apikey`, {
    method: 'POST',
    headers,
  });
  return handleJsonResponse(res);
}

/* ---- Indexer service (/products, /subscription-status) ---- */

/**
 * Fetch all products for a merchant
 * @param {string} merchantAddress
 */
export async function fetchMerchantProducts(merchantAddress) {
  const url = new URL(`${INDEXER_API_BASE}/products`);
  url.searchParams.set('merchantAddress', merchantAddress);
  const res = await fetch(url.toString(), { method: 'GET' });
  return handleJsonResponse(res);
}

/**
 * Check if subscription is active
 * @param {{subscriberAddress:string,merchantAddress:string,productId:number|string}} args
 */
export async function checkSubscriptionStatus({ subscriberAddress, merchantAddress, productId }) {
  const url = new URL(`${INDEXER_API_BASE}/subscription-status`);
  url.searchParams.set('subscriberAddress', subscriberAddress);
  url.searchParams.set('merchantAddress', merchantAddress);
  url.searchParams.set('productId', String(productId));
  const res = await fetch(url.toString(), { method: 'GET' });
  return handleJsonResponse(res);
}