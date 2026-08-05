import {
  submitContactService,
  getContactsService,
  markContactAsReadService,
  deleteContactService,
  getContactStatsService,
} from '../services/contact.service.js'

export const submitContact = async (req, res, next) => {
  try {
    const result = await submitContactService(req.body)
    res.json({ id: result.id, message: 'Contact saved successfully' })
  } catch (err) {
    next(err)
  }
}

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService(req.query.type)
    res.json(contacts)
  } catch (err) {
    next(err)
  }
}

export const markContactAsRead = async (req, res, next) => {
  try {
    await markContactAsReadService(req.params.id)
    res.json({ message: 'Marked as read' })
  } catch (err) {
    next(err)
  }
}

export const deleteContact = async (req, res, next) => {
  try {
    await deleteContactService(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}

export const getContactStats = async (_req, res, next) => {
  try {
    const stats = await getContactStatsService()
    res.json(stats)
  } catch (err) {
    next(err)
  }
}
