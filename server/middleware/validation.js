export const validateContactInput = (req, res, next) => {
  const { email, type } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' })
  }
  if (!type) {
    req.body.type = 'General Enquiry'
  }
  next()
}

export const validateJobApplicationInput = (req, res, next) => {
  const { job_title, name, email } = req.body
  if (!job_title || !name || !email) {
    return res.status(400).json({ error: 'job_title, name, and email are required fields' })
  }
  next()
}
