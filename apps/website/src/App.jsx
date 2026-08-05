import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
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
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/course-worth" element={<Blog1 />} />
        <Route path="/blog/what-is-digital-marketing" element={<Blog2 />} />
        <Route path="/blog/types-of-digital-marketing" element={<Blog3 />} />
        <Route path="/blog/reasons-to-learn" element={<Blog4 />} />
        <Route path="/blog/digital-marketing-ecosystem" element={<Blog5 />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* Footer is included in each individual page component */}
    </BrowserRouter>
  )
}
