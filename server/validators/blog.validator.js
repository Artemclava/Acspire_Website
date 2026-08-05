export const validateBlogPayload = (req, res, next) => {
  const { title } = req.body
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Blog title is required' })
  }
  next()
}
