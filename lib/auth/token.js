// Simple token helpers for the frontend (JavaScript)
// Path: lib/auth/token.js

const TOKEN_KEY = 'sp_token';

/**
 * Get the JWT from localStorage
 * @returns {string|null}
 */
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Save JWT to localStorage
 * @param {string} token
 */
export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove JWT from localStorage
 */
export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Return headers object containing Authorization header if token exists
 * @returns {{Authorization?: string}}
 */
export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Logout helper:
 * - removes token
 * - redirects to /auth preserving current path as `next`
 */
export function logoutUser() {
  if (typeof window === 'undefined') return;
  removeToken();
  const next = window.location.pathname + window.location.search;
  window.location.href = `/auth?next=${encodeURIComponent(next)}`;
}