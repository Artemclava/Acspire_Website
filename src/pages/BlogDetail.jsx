import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Tag, Loader2, MapPin } from 'lucide-react'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const getImageSrc = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'
  if (img.startsWith('http')) return img
  return `https://images.unsplash.com/${img}?w=1200&h=600&fit=crop&auto=format`
}

// Detect if a string contains HTML tags
const isHtmlContent = (str) => {
  if (!str) return false
  return /<[a-z][\s\S]*>/i.test(str)
}

// Render HTML or text cleanly without leaking literal tags
function HTMLRenderer({ content, className = '' }) {
  if (!content) return null
  if (isHtmlContent(content)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  }
  return <div className={className}>{content}</div>
}

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/api/blogs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setBlog(data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 pb-40 flex items-center justify-center min-h-[60vh] text-[#D4AF37]">
        <Loader2 size={36} className="animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Article Not Found</h2>
        <Link to="/blog" className="btn-primary">
          <ArrowLeft size={16} /> Back to Articles
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full pt-20 overflow-hidden bg-white">
      {/* Article Header */}
      <section className="relative pt-12 pb-16 section-mesh border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#C8960C] mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
              {blog.category || 'Digital Marketing'}
            </span>
            <span className="text-xs text-[#64748B] font-semibold">
              {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Jan 18, 2026'}
            </span>
          </div>

          {/* Dynamic Article Title (renders HTML tags or text cleanly) */}
          <div className="mb-6">
            {isHtmlContent(blog.title) ? (
              <div dangerouslySetInnerHTML={{ __html: blog.title }} />
            ) : (
              <h1
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight"
              >
                {blog.title}
              </h1>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748B] font-medium pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>{blog.author_name || 'ACSPIRE Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Chennai, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          {/* Cover Image */}
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img
              src={getImageSrc(blog.image_url)}
              alt="Article Cover"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop' }}
            />
          </div>

          {/* Dynamic Excerpt / Lead Paragraph */}
          {blog.excerpt && (
            <div className="mb-12 pb-10 border-b border-[#E2E8F0]">
              <HTMLRenderer
                content={blog.excerpt}
                className="text-xl leading-relaxed text-[#1E293B] font-medium"
              />
            </div>
          )}

          {/* Dynamic Full Article Content Body */}
          {blog.content ? (
            <div className="blog-html-content prose max-w-none">
              <HTMLRenderer content={blog.content} />
            </div>
          ) : (
            <p className="text-slate-400 italic">No article body added yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
