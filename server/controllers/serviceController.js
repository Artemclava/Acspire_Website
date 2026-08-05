import {
  getServicesService,
  createServiceService,
  updateServiceService,
  deleteServiceService,
} from '../services/service.service.js'

export const getServices = async (_req, res, next) => {
  try {
    const services = await getServicesService()
    res.json(services)
  } catch (err) {
    next(err)
  }
}

export const createService = async (req, res, next) => {
  try {
    const result = await createServiceService(req.body)
    res.json({ id: result.id, message: 'Service created' })
  } catch (err) {
    next(err)
  }
}

export const updateService = async (req, res, next) => {
  try {
    await updateServiceService(req.params.id, req.body)
    res.json({ message: 'Service updated' })
  } catch (err) {
    next(err)
  }
}

export const deleteService = async (req, res, next) => {
  try {
    await deleteServiceService(req.params.id)
    res.json({ message: 'Service deleted' })
  } catch (err) {
    next(err)
  }
}
