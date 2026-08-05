import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminContacts from './pages/AdminContacts'
import AdminJobs from './pages/AdminJobs'
import AdminJobApplications from './pages/AdminJobApplications'
import AdminServices from './pages/AdminServices'
import AdminBlogs from './pages/AdminBlogs'
import AdminCourses from './pages/AdminCourses'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="job-applications" element={<AdminJobApplications />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="courses" element={<AdminCourses />} />
        </Route>

        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="job-applications" element={<AdminJobApplications />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="courses" element={<AdminCourses />} />
        </Route>

        <Route path="*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
