import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Tag } from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

import { API_BASE_URL as API_URL } from '../api/config'

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').trim()
}

const getImageSrc = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=550&fit=crop'
  if (img.startsWith('http')) return img
  return `https://images.unsplash.com/${img}?w=900&h=550&fit=crop&auto=format`
}

function Animate({ children, delay = 0, className = '', dir = 'up' }) {
  const { ref, inView } = useInView()
  const transforms = {
    up: inView ? 'translateY(0)' : 'translateY(32px)',
    left: inView ? 'translateX(0)' : 'translateX(-32px)',
    right: inView ? 'translateX(0)' : 'translateX(32px)',
    scale: inView ? 'scale(1)' : 'scale(0.92)',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: transforms[dir] || transforms.up,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const initialArticles = [
  {
    id: 1,
    img: 'photo-1504384308090-c894fdcc538d',
    cat: 'Digital Marketing',
    title: 'Is a Digital Marketing Course in Chennai Worth it in 2026?',
    excerpt: 'Explore career growth, demand in Chennai, and core skills needed for digital marketing success.',
    author: { name: 'Sophia Williams', img: 'photo-1573496359142-b8d87734a5a2' },
    date: 'Jan 18, 2026',
  },
  {
    id: 2,
    img: 'photo-1460925895917-afdab827c52f',
    cat: 'SEO & Growth',
    title: 'What Is Digital Marketing? A Complete Guide For Businesses',
    excerpt: 'Discover essential strategies, key channels, and how to scale brand presence online.',
    author: { name: 'Daniel Park', img: 'photo-1507003211169-0a1dd7228f2d' },
    date: 'Jan 15, 2026',
  },
  {
    id: 3,
    img: 'photo-1486406146926-c627a92ad1ab',
    cat: 'Branding',
    title: 'Types of Digital Marketing: 8 Channels You Need to Know',
    excerpt: 'Explore SEO, social media, content marketing, PPC, and influencer strategies that scale.',
    author: { name: 'Amara Osei', img: 'photo-1494790108377-be9c29b29330' },
    date: 'Jan 10, 2026',
  },
  {
    id: 4,
    img: 'photo-1561070791-2526d30994b5',
    cat: 'Web Development',
    title: 'Top Reasons to Learn Digital Marketing in 2026',
    excerpt: 'High industry demand, remote freelancing, career roles, and entrepreneurial benefits.',
    author: { name: 'Amara Osei', img: 'photo-1494790108377-be9c29b29330' },
    date: 'Jan 05, 2026',
  },
  {
    id: 5,
    img: 'photo-1524178232363-1fb2b075b655',
    cat: 'AI & Technology',
    title: 'The Digital Marketing Ecosystem: Connecting All Channels',
    excerpt: 'Learn how SEO, paid ads, email marketing, and social media work together seamlessly.',
    author: { name: 'Mei Lin', img: 'photo-1438761681033-6461ffad8d80' },
    date: 'Dec 28, 2025',
  },
]

export default function Blog() {
  const [articles, setArticles] = useState(initialArticles)

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(
            data.map((b) => ({
              id: b.id,
              img: b.image_url || 'photo-1504384308090-c894fdcc538d',
              cat: b.category,
              title: b.title,
              excerpt: b.excerpt,
              author: { name: b.author_name || 'ACSPIRE Team', img: b.author_img || 'photo-1573496359142-b8d87734a5a2' },
              date: b.published_at ? new Date(b.published_at).toLocaleDateString() : 'Recent',
            }))
          )
        }
      })
      .catch((err) => console.log('Using default articles fallback:', err))
  }, [])

  const featured = articles[0] || initialArticles[0]
  const regularArticles = articles.length > 1 ? articles.slice(1) : articles

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden py-20 lg:py-24 section-mesh border-b border-[#E2E8F0]">
        <div className="hero-orb hero-orb-1 animate-orb-1 opacity-20" />
        <div className="hero-orb hero-orb-2 animate-orb-2 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-hero-up max-w-3xl mx-auto">
            <span className="highlight-tag mb-6 inline-flex">
              <Sparkles size={13} />
              ACSPIRE Insights
            </span>
            <h1
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              className="text-4xl sm:text-5xl lg:text-[62px] text-[#0F172A] leading-[1.08] mb-6"
            >
              Digital Growth <span className="hero-gold-text">Insights & Articles</span>
            </h1>
            <p className="text-[17px] text-[#475569] leading-relaxed max-w-2xl mx-auto">
              Explore strategic insights, actionable guides, and industry trends on Digital Marketing, Web Development, SEO, and AI Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED HERO ARTICLE ── */}
      {featured && (
        <section className="relative py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Animate className="card-gold bg-white rounded-[28px] border border-[#E2E8F0] overflow-hidden shadow-xl card-lift">
              <div className="grid lg:grid-cols-12 items-center">
                <Link
                  to={`/blog/${featured.id}`}
                  className="lg:col-span-7 block img-zoom relative h-72 lg:h-[420px] cursor-pointer"
                >
                  <img
                    src={getImageSrc(featured.img)}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=550&fit=crop' }}
                  />
                  <span className="absolute top-4 left-4 bg-[#0F172A]/85 backdrop-blur-md text-[#D4AF37] text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
                    Featured Article
                  </span>
                </Link>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[12.5px] font-bold text-[#D4AF37] uppercase tracking-wider mb-3 inline-flex items-center gap-1.5">
                      <Tag size={13} /> {featured.cat}
                    </span>
                    <h2
                      style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                      className="text-2xl lg:text-3xl text-[#0F172A] leading-snug mb-4 hover:text-[#D4AF37] transition-colors"
                    >
                      <Link to={`/blog/${featured.id}`}>{stripHtml(featured.title)}</Link>
                    </h2>
                    <p className="text-[15px] text-[#475569] leading-relaxed mb-6">
                      {stripHtml(featured.excerpt)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://images.unsplash.com/${featured.author.img}?w=80&h=80&fit=crop&auto=format`}
                        alt={featured.author.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop' }}
                      />
                      <div>
                        <div className="text-[13.5px] font-bold text-[#0F172A]">{featured.author.name}</div>
                      </div>
                    </div>
                    <Link to={`/blog/${featured.id}`} className="btn-primary btn-shine text-sm py-2.5 px-6">
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ── CLEAN 3-COLUMN ARTICLES GRID (FULL WIDTH) ── */}
      <section className="relative py-16 section-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, i) => (
              <Animate
                key={article.id}
                delay={i * 70}
                className="card-gold bg-white rounded-[24px] overflow-hidden shadow-md card-lift flex flex-col justify-between border border-[#E2E8F0]"
              >
                <Link to={`/blog/${article.id}`} className="flex flex-col justify-between h-full cursor-pointer group text-left">
                  <div>
                    <div className="img-zoom relative h-52">
                      <img
                        src={getImageSrc(article.img)}
                        alt={stripHtml(article.title)}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop' }}
                      />
                      <span className="absolute top-3.5 left-3.5 bg-[#0F172A]/85 backdrop-blur-md text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                        {article.cat}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3
                        style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                        className="text-xl text-[#0F172A] mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors"
                      >
                        {stripHtml(article.title)}
                      </h3>
                      <p className="text-[14px] text-[#64748B] leading-relaxed mb-4">
                        {stripHtml(article.excerpt)}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[13px] text-[#64748B]">
                    <span className="font-bold text-[#D4AF37] group-hover:text-[#C8960C] flex items-center gap-1.5 transition-colors">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
