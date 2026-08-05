import { query } from '../config/database.js'

export const getCoursesService = async () => {
  const result = await query('SELECT * FROM courses ORDER BY sort_order ASC, created_at ASC')
  return result.rows
}

export const createCourseService = async (data) => {
  const { title, track, track_subtitle, description, tag, image_url, sort_order } = data
  const result = await query(
    `INSERT INTO courses (title, track, track_subtitle, description, tag, image_url, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [title, track, track_subtitle || null, description, tag, image_url, sort_order ?? 0]
  )
  return result.rows[0]
}

export const updateCourseService = async (id, data) => {
  const { title, track, track_subtitle, description, tag, image_url, sort_order } = data
  await query(
    `UPDATE courses SET title=$1, track=$2, track_subtitle=$3, description=$4, tag=$5, image_url=$6, sort_order=$7 WHERE id=$8`,
    [title, track, track_subtitle || null, description, tag, image_url, sort_order, id]
  )
}

export const deleteCourseService = async (id) => {
  await query('DELETE FROM courses WHERE id = $1', [id])
}
