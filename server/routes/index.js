import { Router } from 'express'
import authRoutes from './auth.js'
import blogRoutes from './blogs.js'
import contactRoutes from './contacts.js'
import courseRoutes from './courses.js'
import jobRoutes from './jobs.js'
import jobApplicationRoutes from './job-applications.js'
import serviceRoutes from './services.js'
import { uploadMiddleware, handleImageUpload } from '../controllers/uploadController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Image Upload
router.post('/upload', requireAuth, uploadMiddleware, handleImageUpload)

// Sub-routes
router.use('/auth', authRoutes)
router.use('/blogs', blogRoutes)
router.use('/contacts', contactRoutes)
router.use('/courses', courseRoutes)
router.use('/jobs', jobRoutes)
router.use('/job-applications', jobApplicationRoutes)
router.use('/services', serviceRoutes)

export default router
