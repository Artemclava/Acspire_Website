import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — get all courses
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, created_at ASC').all()
  res.json(rows)
})

// Admin — create
router.post('/', requireAuth, (req, res) => {
  const { title, track, track_subtitle, description, tag, image_url, sort_order } = req.body
  const result = db.prepare(`
    INSERT INTO courses (title, track, track_subtitle, description, tag, image_url, sort_order)
    VALUES (?,?,?,?,?,?,?)
  `).run(title, track, track_subtitle || null, description, tag, image_url, sort_order ?? 0)
  res.json({ id: result.lastInsertRowid })
})

// Admin — update
router.put('/:id', requireAuth, (req, res) => {
  const { title, track, track_subtitle, description, tag, image_url, sort_order } = req.body
  db.prepare(`
    UPDATE courses SET title=?, track=?, track_subtitle=?, description=?, tag=?, image_url=?, sort_order=?
    WHERE id=?
  `).run(title, track, track_subtitle || null, description, tag, image_url, sort_order, req.params.id)
  res.json({ message: 'Updated' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
