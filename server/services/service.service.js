import { query } from '../config/database.js'

export const getServicesService = async () => {
  const result = await query('SELECT * FROM services ORDER BY sort_order ASC, created_at ASC')
  return result.rows.map((s) => ({
    ...s,
    features: s.features ? s.features.split(',') : [],
  }))
}

export const createServiceService = async (data) => {
  const { title, description, features, image_url, icon_name, sort_order } = data
  const featuresStr = Array.isArray(features) ? features.join(',') : features
  const result = await query(
    `INSERT INTO services (title, description, features, image_url, icon_name, sort_order) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [title, description, featuresStr, image_url, icon_name, sort_order ?? 0]
  )
  return result.rows[0]
}

export const updateServiceService = async (id, data) => {
  const { title, description, features, image_url, icon_name, sort_order } = data
  const featuresStr = Array.isArray(features) ? features.join(',') : features
  await query(
    `UPDATE services SET title=$1, description=$2, features=$3, image_url=$4, icon_name=$5, sort_order=$6 WHERE id=$7`,
    [title, description, featuresStr, image_url, icon_name, sort_order, id]
  )
}

export const deleteServiceService = async (id) => {
  await query('DELETE FROM services WHERE id = $1', [id])
}
