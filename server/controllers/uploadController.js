import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer Disk Storage setup for local fallback
const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  },
})

export const uploadMiddleware = multer({
  storage: isCloudinaryConfigured ? multer.memoryStorage() : diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only images allowed'))
  },
}).single('image')

export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' })

    if (isCloudinaryConfigured) {
      // Upload file buffer to Cloudinary CDN
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'acspire/uploads' },
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: 'Cloudinary upload failed', details: error.message })
          }
          return res.json({ url: result.secure_url, filename: result.public_id })
        }
      )
      return uploadStream.end(req.file.buffer)
    }

    // Local Storage Fallback
    const hostUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`
    const url = `${hostUrl}/uploads/${req.file.filename}`
    return res.json({ url, filename: req.file.filename })
  } catch (err) {
    next(err)
  }
}
