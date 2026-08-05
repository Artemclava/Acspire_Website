import { query } from '../config/database.js'

export const submitApplication = async (req, res, next) => {
  try {
    const { job_title, name, email, phone, experience, linkedin, cover_letter } = req.body
    if (!job_title || !name || !email) {
      return res.status(400).json({ error: 'job_title, name and email are required' })
    }
    const result = await query(
      `INSERT INTO job_applications (job_title, name, email, phone, experience, linkedin, cover_letter)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [job_title, name, email, phone || null, experience || null, linkedin || null, cover_letter || null]
    )
    res.json({ id: result.rows[0].id, message: 'Application submitted successfully' })
  } catch (err) {
    next(err)
  }
}

export const getApplications = async (req, res, next) => {
  try {
    const { status } = req.query
    let result
    if (status && status !== 'all') {
      result = await query('SELECT * FROM job_applications WHERE status = $1 ORDER BY created_at DESC', [status])
    } else {
      result = await query('SELECT * FROM job_applications ORDER BY created_at DESC')
    }
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
}

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const allowed = ['pending', 'selected', 'waiting', 'rejected']
    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' })
    await query('UPDATE job_applications SET status = $1, is_read = 1 WHERE id = $2', [status, req.params.id])
    res.json({ message: 'Status updated' })
  } catch (err) {
    next(err)
  }
}

export const markApplicationAsRead = async (req, res, next) => {
  try {
    await query('UPDATE job_applications SET is_read = 1 WHERE id = $1', [req.params.id])
    res.json({ message: 'Marked as read' })
  } catch (err) {
    next(err)
  }
}

export const deleteApplication = async (req, res, next) => {
  try {
    await query('DELETE FROM job_applications WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}

export const getApplicationStats = async (_req, res, next) => {
  try {
    const [total, pending, selected, waiting, rejected, unread] = await Promise.all([
      query('SELECT COUNT(*) as c FROM job_applications'),
      query("SELECT COUNT(*) as c FROM job_applications WHERE status = 'pending'"),
      query("SELECT COUNT(*) as c FROM job_applications WHERE status = 'selected'"),
      query("SELECT COUNT(*) as c FROM job_applications WHERE status = 'waiting'"),
      query("SELECT COUNT(*) as c FROM job_applications WHERE status = 'rejected'"),
      query('SELECT COUNT(*) as c FROM job_applications WHERE is_read = 0'),
    ])
    res.json({
      total: parseInt(total.rows[0].c),
      pending: parseInt(pending.rows[0].c),
      selected: parseInt(selected.rows[0].c),
      waiting: parseInt(waiting.rows[0].c),
      rejected: parseInt(rejected.rows[0].c),
      unread: parseInt(unread.rows[0].c),
    })
  } catch (err) {
    next(err)
  }
}
