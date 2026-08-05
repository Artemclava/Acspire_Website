import {
  getPublicBlogsService,
  getBlogByIdService,
  getAllBlogsAdminService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
} from '../services/blog.service.js'

export const getPublicBlogs = async (_req, res, next) => {
  try {
    const blogs = await getPublicBlogsService()
    res.json(blogs)
  } catch (err) {
    next(err)
  }
}

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.id)
    if (!blog) return res.status(404).json({ error: 'Blog post not found' })
    res.json(blog)
  } catch (err) {
    next(err)
  }
}

export const getAllBlogsAdmin = async (_req, res, next) => {
  try {
    const blogs = await getAllBlogsAdminService()
    res.json(blogs)
  } catch (err) {
    next(err)
  }
}

export const createBlog = async (req, res, next) => {
  try {
    const result = await createBlogService(req.body)
    res.json({ id: result.id, message: 'Blog created successfully' })
  } catch (err) {
    next(err)
  }
}

export const updateBlog = async (req, res, next) => {
  try {
    await updateBlogService(req.params.id, req.body)
    res.json({ message: 'Blog updated successfully' })
  } catch (err) {
    next(err)
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    await deleteBlogService(req.params.id)
    res.json({ message: 'Blog deleted successfully' })
  } catch (err) {
    next(err)
  }
}
