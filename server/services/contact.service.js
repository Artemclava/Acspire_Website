import { query } from '../config/database.js'

export const submitContactService = async (data) => {
  const {
    type, name, firstName, lastName, email, phone,
    company, course, service, qualification, budget, message,
  } = data

  const result = await query(
    `INSERT INTO contacts (type, name, first_name, last_name, email, phone, company, course, service, qualification, budget, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [
      type || 'General', name || null, firstName || null, lastName || null,
      email, phone || null, company || null, course || null,
      service || null, qualification || null, budget || null, message || null,
    ]
  )
  return result.rows[0]
}

export const getContactsService = async (type) => {
  if (type && type !== 'All') {
    const result = await query('SELECT * FROM contacts WHERE type = $1 ORDER BY created_at DESC', [type])
    return result.rows
  }
  const result = await query('SELECT * FROM contacts ORDER BY created_at DESC')
  return result.rows
}

export const markContactAsReadService = async (id) => {
  await query('UPDATE contacts SET is_read = 1 WHERE id = $1', [id])
}

export const deleteContactService = async (id) => {
  await query('DELETE FROM contacts WHERE id = $1', [id])
}

export const getContactStatsService = async () => {
  const [total, unread, student, business] = await Promise.all([
    query('SELECT COUNT(*) as c FROM contacts'),
    query('SELECT COUNT(*) as c FROM contacts WHERE is_read = 0'),
    query("SELECT COUNT(*) as c FROM contacts WHERE type ILIKE '%Student%'"),
    query("SELECT COUNT(*) as c FROM contacts WHERE type ILIKE '%Business%'"),
  ])
  return {
    total: parseInt(total.rows[0].c),
    unread: parseInt(unread.rows[0].c),
    student: parseInt(student.rows[0].c),
    business: parseInt(business.rows[0].c),
  }
}
