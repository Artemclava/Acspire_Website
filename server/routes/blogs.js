import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — get published blogs
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM blogs WHERE is_published = 1 ORDER BY published_at DESC').all()
  res.json(rows)
})

// Public — get single blog
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM blogs WHERE id = ? AND is_published = 1').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

// Admin — get all blogs (including unpublished)
router.get('/admin/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all()
  res.json(rows)
})

// Admin — create
router.post('/', requireAuth, (req, res) => {
  const { title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published } = req.body
  const result = db.prepare(`
    INSERT INTO blogs (title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published)
    VALUES (?,?,?,?,?,?,?,?,?)
  `).run(title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published ?? 1)
  res.json({ id: result.lastInsertRowid })
})

// Admin — update
router.put('/:id', requireAuth, (req, res) => {
  const { title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published } = req.body
  db.prepare(`
    UPDATE blogs SET title=?, category=?, excerpt=?, content=?, author_name=?, author_img=?,
    image_url=?, read_time=?, is_published=? WHERE id=?
  `).run(title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published, req.params.id)
  res.json({ message: 'Updated' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
