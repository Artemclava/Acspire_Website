/**
 * ACSPIRE Centralized API Configuration
 */

const RAILWAY_URL = 'https://acspirewebsite-production.up.railway.app'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001' : RAILWAY_URL)

export const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || ''

/**
 * Helper method for standard API requests
 */
export async function fetchApi(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, options)
  return response
}
