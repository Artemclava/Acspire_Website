import { Router } from 'express'
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  markApplicationAsRead,
  deleteApplication,
  getApplicationStats,
} from '../controllers/jobApplicationController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', submitApplication)
router.get('/', requireAuth, getApplications)
router.get('/stats', requireAuth, getApplicationStats)
router.patch('/:id/status', requireAuth, updateApplicationStatus)
router.patch('/:id/read', requireAuth, markApplicationAsRead)
router.delete('/:id', requireAuth, deleteApplication)

export default router
