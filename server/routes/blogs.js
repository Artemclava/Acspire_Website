import { Router } from 'express'
import {
  getPublicBlogs,
  getBlogById,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', getPublicBlogs)
router.get('/admin/all', requireAuth, getAllBlogsAdmin)
router.get('/:id', getBlogById)
router.post('/', requireAuth, createBlog)
router.put('/:id', requireAuth, updateBlog)
router.delete('/:id', requireAuth, deleteBlog)

export default router
