export const validateCoursePayload = (req, res, next) => {
  const { title } = req.body
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Course title is required' })
  }
  next()
}
