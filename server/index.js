import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import apiRoutes from './routes/index.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { logger, morganStream } from './utils/logger.js'
import { initDatabase } from './config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const app = express()
const PORT = process.env.PORT || 3001

// ── 1. Security Headers ────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

// ── 2. Disable X-Powered-By ───────────────────────────────────────────────────
app.disable('x-powered-by')

// ── 3. CORS configuration from ALLOWED_ORIGINS ────────────────────────────────
const defaultOrigins = [
  'https://acspire.netlify.app',
  'https://acspireadmin.netlify.app',
  'https://acspirewebsite-production.up.railway.app',
  'https://acspire.in',
  'https://www.acspire.in',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:3000',
]

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : defaultOrigins

// Always allow netlify deployment domains
defaultOrigins.forEach((o) => {
  if (!allowedOrigins.includes(o)) allowedOrigins.push(o)
})

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(null, true) // Development fallback
    },
    credentials: true,
  })
)

// ── 4. Compression & Morgan Logging ──────────────────────────────────────────
app.use(compression())
app.use(morgan('combined', { stream: morganStream }))
app.use('/api/', apiLimiter)

// ── 5. Body Parsers ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static fallback for local uploads
app.use('/uploads', express.static(uploadsDir))

// ── 6. Centralized API Routes ─────────────────────────────────────────────────
app.use('/api', apiRoutes)

// ── 7. Health Check Route ─────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// ── 8. 404 Route Handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ── 9. Global 500 Error Handler ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err)
  logger.error(err.message, { stack: err.stack })
  res.status(500).json({ error: 'Internal Server Error' })
})

// ── Initialize Neon Database & Start Server ──────────────────────────────────
initDatabase().then(() => {
  app.listen(PORT, () => {
    logger.info(`✅ ACSPIRE API running at http://localhost:${PORT}`)
    console.log(`\n  🚀  ACSPIRE Production API server live on port ${PORT}\n`)
  })
})

export default app
