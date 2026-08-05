export const validateContactPayload = (req, res, next) => {
  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' })
  }
  next()
}
