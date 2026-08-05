import { authenticateAdmin } from '../services/auth.service.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const token = await authenticateAdmin(email, password)
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    return res.json({ token, message: 'Authentication successful' })
  } catch (err) {
    next(err)
  }
}

export const logout = (_req, res) => {
  res.json({ message: 'Logged out successfully' })
}
