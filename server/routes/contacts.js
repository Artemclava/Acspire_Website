import { Router } from 'express'
import {
  submitContact,
  getContacts,
  markContactAsRead,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', submitContact)
router.get('/', requireAuth, getContacts)
router.get('/stats', requireAuth, getContactStats)
router.patch('/:id/read', requireAuth, markContactAsRead)
router.delete('/:id', requireAuth, deleteContact)

export default router
