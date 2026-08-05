import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@acspire.com'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Acspire@2026'

let defaultPasswordHash = null
const getAdminHash = async () => {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH
  }
  if (!defaultPasswordHash) {
    defaultPasswordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10)
  }
  return defaultPasswordHash
}

export const authenticateAdmin = async (email, password) => {
  if (email !== DEFAULT_ADMIN_EMAIL) return null
  const hash = await getAdminHash()
  const match = await bcrypt.compare(password, hash)
  if (!match) return null

  const token = jwt.sign(
    { role: 'admin', email },
    process.env.JWT_SECRET || 'acspire_default_secret_jwt_2026',
    { expiresIn: '7d' }
  )
  return token
}
