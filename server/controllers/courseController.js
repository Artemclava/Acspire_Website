import {
  getCoursesService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
} from '../services/course.service.js'

export const getCourses = async (_req, res, next) => {
  try {
    const courses = await getCoursesService()
    res.json(courses)
  } catch (err) {
    next(err)
  }
}

export const createCourse = async (req, res, next) => {
  try {
    const result = await createCourseService(req.body)
    res.json({ id: result.id, message: 'Course created' })
  } catch (err) {
    next(err)
  }
}

export const updateCourse = async (req, res, next) => {
  try {
    await updateCourseService(req.params.id, req.body)
    res.json({ message: 'Course updated' })
  } catch (err) {
    next(err)
  }
}

export const deleteCourse = async (req, res, next) => {
  try {
    await deleteCourseService(req.params.id)
    res.json({ message: 'Course deleted' })
  } catch (err) {
    next(err)
  }
}
