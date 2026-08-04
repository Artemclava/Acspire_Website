import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — get all services
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM services ORDER BY sort_order ASC, created_at ASC').all()
  // Parse features from comma-separated string to array
  const parsed = rows.map((s) => ({ ...s, features: s.features ? s.features.split(',') : [] }))
  res.json(parsed)
})

// Admin — create
router.post('/', requireAuth, (req, res) => {
  const { title, description, features, image_url, icon_name, sort_order } = req.body
  const featuresStr = Array.isArray(features) ? features.join(',') : features
  const result = db.prepare(`
    INSERT INTO services (title, description, features, image_url, icon_name, sort_order)
    VALUES (?,?,?,?,?,?)
  `).run(title, description, featuresStr, image_url, icon_name, sort_order ?? 0)
  res.json({ id: result.lastInsertRowid })
})

// Admin — update
router.put('/:id', requireAuth, (req, res) => {
  const { title, description, features, image_url, icon_name, sort_order } = req.body
  const featuresStr = Array.isArray(features) ? features.join(',') : features
  db.prepare(`
    UPDATE services SET title=?, description=?, features=?, image_url=?, icon_name=?, sort_order=?
    WHERE id=?
  `).run(title, description, featuresStr, image_url, icon_name, sort_order, req.params.id)
  res.json({ message: 'Updated' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
