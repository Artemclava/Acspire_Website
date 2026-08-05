import { Router } from 'express'
import { login, logout } from '../controllers/authController.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/login', authLimiter, login)
router.post('/logout', logout)

export default router
