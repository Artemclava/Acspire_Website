import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public — submit contact form
router.post('/', (req, res) => {
  try {
    const {
      type, name, firstName, lastName, email, phone,
      company, course, service, qualification, budget, message,
    } = req.body

    const stmt = db.prepare(`
      INSERT INTO contacts
        (type, name, first_name, last_name, email, phone, company, course, service, qualification, budget, message)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `)
    const result = stmt.run(
      type || 'General',
      name || null,
      firstName || null,
      lastName || null,
      email,
      phone || null,
      company || null,
      course || null,
      service || null,
      qualification || null,
      budget || null,
      message || null,
    )
    res.json({ id: result.lastInsertRowid, message: 'Contact saved successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save contact' })
  }
})

// Admin — get all contacts
router.get('/', requireAuth, (req, res) => {
  const { type } = req.query
  let rows
  if (type && type !== 'All') {
    rows = db.prepare('SELECT * FROM contacts WHERE type = ? ORDER BY created_at DESC').all(type)
  } else {
    rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
  }
  res.json(rows)
})

// Admin — mark as read
router.patch('/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE contacts SET is_read = 1 WHERE id = ?').run(req.params.id)
  res.json({ message: 'Marked as read' })
})

// Admin — delete
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id)
  res.json({ message: 'Deleted' })
})

// Admin — stats
router.get('/stats', requireAuth, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM contacts').get()
  const unread = db.prepare('SELECT COUNT(*) as c FROM contacts WHERE is_read = 0').get()
  const student = db.prepare("SELECT COUNT(*) as c FROM contacts WHERE type = 'Student Enquiry'").get()
  const business = db.prepare("SELECT COUNT(*) as c FROM contacts WHERE type = 'Business Enquiry'").get()
  res.json({ total: total.c, unread: unread.c, student: student.c, business: business.c })
})

export default router
