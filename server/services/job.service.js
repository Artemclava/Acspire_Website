import { query } from '../config/database.js'

export const getPublicJobsService = async () => {
  const result = await query('SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC')
  return result.rows
}

export const getAllJobsAdminService = async () => {
  const result = await query('SELECT * FROM jobs ORDER BY created_at DESC')
  return result.rows
}

export const createJobService = async (data) => {
  const { title, dept, location, type, level, description, is_active } = data
  const result = await query(
    `INSERT INTO jobs (title, dept, location, type, level, description, is_active) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [title, dept, location, type, level, description, is_active ?? 1]
  )
  return result.rows[0]
}

export const updateJobService = async (id, data) => {
  const { title, dept, location, type, level, description, is_active } = data
  await query(
    `UPDATE jobs SET title=$1, dept=$2, location=$3, type=$4, level=$5, description=$6, is_active=$7 WHERE id=$8`,
    [title, dept, location, type, level, description, is_active, id]
  )
}

export const deleteJobService = async (id) => {
  await query('DELETE FROM jobs WHERE id = $1', [id])
}
