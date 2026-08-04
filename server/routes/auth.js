import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    return res.json({ token })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
})

router.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out' })
})

export default router
