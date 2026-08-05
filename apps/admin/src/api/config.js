/**
 * ACSPIRE Centralized API Configuration
 */

// Fallback to empty string for relative URLs in production or default port 3001 in dev
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || ''

/**
 * Helper method for standard API requests
 */
export async function fetchApi(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, options)
  return response
}
