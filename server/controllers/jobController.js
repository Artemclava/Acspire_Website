import {
  getPublicJobsService,
  getAllJobsAdminService,
  createJobService,
  updateJobService,
  deleteJobService,
} from '../services/job.service.js'

export const getPublicJobs = async (_req, res, next) => {
  try {
    const jobs = await getPublicJobsService()
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}

export const getAllJobsAdmin = async (_req, res, next) => {
  try {
    const jobs = await getAllJobsAdminService()
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}

export const createJob = async (req, res, next) => {
  try {
    const result = await createJobService(req.body)
    res.json({ id: result.id, message: 'Job posting created' })
  } catch (err) {
    next(err)
  }
}

export const updateJob = async (req, res, next) => {
  try {
    await updateJobService(req.params.id, req.body)
    res.json({ message: 'Job posting updated' })
  } catch (err) {
    next(err)
  }
}

export const deleteJob = async (req, res, next) => {
  try {
    await deleteJobService(req.params.id)
    res.json({ message: 'Job posting deleted' })
  } catch (err) {
    next(err)
  }
}
