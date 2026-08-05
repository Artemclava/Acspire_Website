import { query } from '../config/database.js'

export const getPublicBlogsService = async () => {
  const result = await query('SELECT * FROM blogs WHERE is_published = 1 ORDER BY published_at DESC')
  return result.rows
}

export const getBlogByIdService = async (id) => {
  const result = await query('SELECT * FROM blogs WHERE id = $1 AND is_published = 1', [id])
  return result.rows[0]
}

export const getAllBlogsAdminService = async () => {
  const result = await query('SELECT * FROM blogs ORDER BY created_at DESC')
  return result.rows
}

export const createBlogService = async (data) => {
  const { title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published } = data
  const result = await query(
    `INSERT INTO blogs (title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
    [title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published ?? 1]
  )
  return result.rows[0]
}

export const updateBlogService = async (id, data) => {
  const { title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published } = data
  await query(
    `UPDATE blogs SET title=$1, category=$2, excerpt=$3, content=$4, author_name=$5, author_img=$6,
     image_url=$7, read_time=$8, is_published=$9 WHERE id=$10`,
    [title, category, excerpt, content, author_name, author_img, image_url, read_time, is_published, id]
  )
}

export const deleteBlogService = async (id) => {
  await query('DELETE FROM blogs WHERE id = $1', [id])
}
