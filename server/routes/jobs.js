import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — get active jobs
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC').all()
  res.json(rows)
})

// Admin — get all jobs
router.get('/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM jobs ORDER BY created_at DESC').all()
  res.json(rows)
})

// Admin — create
router.post('/', requireAuth, (req, res) => {
  const { title, dept, location, type, level, description, is_active } = req.body
  const result = db.prepare(`
    INSERT INTO jobs (title, dept, location, type, level, description, is_active)
    VALUES (?,?,?,?,?,?,?)
  `).run(title, dept, location, type, level, description, is_active ?? 1)
  res.json({ id: result.lastInsertRowid })
})

// Admin — update
router.put('/:id', requireAuth, (req, res) => {
  const { title, dept, location, type, level, description, is_active } = req.body
  db.prepare(`
    UPDATE jobs SET title=?, dept=?, location=?, type=?, level=?, description=?, is_active=?
    WHERE id=?
  `).run(title, dept, location, type, level, description, is_active, req.params.id)
  res.json({ message: 'Updated' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM jobs WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
