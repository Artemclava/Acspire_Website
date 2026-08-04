import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — submit a job application
router.post('/', (req, res) => {
  try {
    const { job_title, name, email, phone, experience, linkedin, cover_letter } = req.body
    if (!job_title || !name || !email) {
      return res.status(400).json({ error: 'job_title, name and email are required' })
    }
    const result = db.prepare(`
      INSERT INTO job_applications (job_title, name, email, phone, experience, linkedin, cover_letter)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(job_title, name, email, phone || null, experience || null, linkedin || null, cover_letter || null)
    res.json({ id: result.lastInsertRowid, message: 'Application submitted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit application' })
  }
})

// Admin — get all applications (optionally filter by status)
router.get('/', requireAuth, (req, res) => {
  const { status } = req.query
  let rows
  if (status && status !== 'all') {
    rows = db.prepare('SELECT * FROM job_applications WHERE status = ? ORDER BY created_at DESC').all(status)
  } else {
    rows = db.prepare('SELECT * FROM job_applications ORDER BY created_at DESC').all()
  }
  res.json(rows)
})

// Admin — update status (pending | selected | waiting | rejected)
router.patch('/:id/status', requireAuth, (req, res) => {
  const { status } = req.body
  const allowed = ['pending', 'selected', 'waiting', 'rejected']
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' })
  db.prepare('UPDATE job_applications SET status = ?, is_read = 1 WHERE id = ?').run(status, req.params.id)
  res.json({ message: 'Status updated' })
})

// Admin — mark as read
router.patch('/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE job_applications SET is_read = 1 WHERE id = ?').run(req.params.id)
  res.json({ message: 'Marked as read' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM job_applications WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

// Admin — stats
router.get('/stats', requireAuth, (req, res) => {
  const total    = db.prepare('SELECT COUNT(*) as c FROM job_applications').get()
  const pending  = db.prepare("SELECT COUNT(*) as c FROM job_applications WHERE status = 'pending'").get()
  const selected = db.prepare("SELECT COUNT(*) as c FROM job_applications WHERE status = 'selected'").get()
  const waiting  = db.prepare("SELECT COUNT(*) as c FROM job_applications WHERE status = 'waiting'").get()
  const rejected = db.prepare("SELECT COUNT(*) as c FROM job_applications WHERE status = 'rejected'").get()
  const unread   = db.prepare('SELECT COUNT(*) as c FROM job_applications WHERE is_read = 0').get()
  res.json({ total: total.c, pending: pending.c, selected: selected.c, waiting: waiting.c, rejected: rejected.c, unread: unread.c })
})

export default router
