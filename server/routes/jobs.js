import { Router } from 'express'
import {
  getPublicJobs,
  getAllJobsAdmin,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', getPublicJobs)
router.get('/all', requireAuth, getAllJobsAdmin)
router.post('/', requireAuth, createJob)
router.put('/:id', requireAuth, updateJob)
router.delete('/:id', requireAuth, deleteJob)

export default router
