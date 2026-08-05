export const validateJobPayload = (req, res, next) => {
  const { title } = req.body
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Job title is required' })
  }
  next()
}
