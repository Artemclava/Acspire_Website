import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import contactRoutes from './routes/contacts.js'
import jobRoutes from './routes/jobs.js'
import jobApplicationRoutes from './routes/job-applications.js'
import serviceRoutes from './routes/services.js'
import blogRoutes from './routes/blogs.js'
import courseRoutes from './routes/courses.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only images allowed'))
  },
})

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir))

// ── Image Upload Route ─────────────────────────────────────────────────────────
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' })
  const hostUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`
  const url = `${hostUrl}/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/job-applications', jobApplicationRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/courses', courseRoutes)

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✅  ACSPIRE API running at http://localhost:${PORT}\n`)
})
