import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Courses from './pages/Courses'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Blog1 from './pages/Blog1'
import Blog2 from './pages/Blog2'
import Blog3 from './pages/Blog3'
import Blog4 from './pages/Blog4'
import Blog5 from './pages/Blog5'
import Contact from './pages/Contact'

// Admin imports
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminContacts from './pages/admin/AdminContacts'
import AdminJobs from './pages/admin/AdminJobs'
import AdminJobApplications from './pages/admin/AdminJobApplications'
import AdminServices from './pages/admin/AdminServices'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminCourses from './pages/admin/AdminCourses'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Nav />
      {children}
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="job-applications" element={<AdminJobApplications />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="courses" element={<AdminCourses />} />
      </Route>

      {/* Public Site Routes */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PublicLayout>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
