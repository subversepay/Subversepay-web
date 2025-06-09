import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from 'jwt-decode';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format address for display (0x1234...5678)
 */
export function formatAddress(address: string | null | undefined, chars = 4): string {
  if (!address) return ""
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
}

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString()
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Calculate time remaining from now until a future date
 */
export function timeRemaining(futureDate: Date | string | number): string {
  const now = new Date()
  const future = new Date(futureDate)
  const diffMs = future.getTime() - now.getTime()

  if (diffMs <= 0) return "Expired"

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h remaining`
  }

  return `${diffHours}h remaining`
}

export function isTokenExpired(token: string): boolean {
  if(!token) return true;
  const DecodeToken = jwtDecode<{ exp: number }>(token);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return DecodeToken.exp < currentTime;
}