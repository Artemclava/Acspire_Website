import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Globe,
  Smartphone,
  BarChart3,
  Palette,
  Code2,
  Search,
  TrendingUp,
  CheckCircle,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Factory,
  Building2,
  Hotel,
  Briefcase,
  Sparkles,
  Megaphone,
  Video,
  Mail,
} from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

// Handles both full uploaded URLs and Unsplash photo IDs
const getImageSrc = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=420&fit=crop'
  if (img.startsWith('http')) return img
  return `https://images.unsplash.com/${img}?w=640&h=420&fit=crop&auto=format`
}

import { API_BASE_URL as API_URL } from '../api/config'

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

const ICON_MAP = {
  BarChart3,
  Search,
  TrendingUp,
  Palette,
  Globe,
  Smartphone,
  Code2,
  Megaphone,
  Video,
  Mail,
}

const initialServices = [
  {
    icon: BarChart3,
    title: 'Digital Marketing',
    desc: 'Grow your brand with data-driven digital marketing strategies that increase visibility, engagement, and qualified leads.',
    features: ['Social Media Marketing', 'Content Strategy', 'Brand Management', 'Campaign Analytics'],
    img: 'photo-1460925895917-afdab827c52f',
  },
  {
    icon: Search,
    title: 'SEO & Content Marketing',
    desc: 'Improve search visibility and organic growth with strategic SEO, content optimization, and digital marketing.',
    features: ['Technical SEO', 'Keyword Research', 'Content Marketing', 'Local SEO'],
    img: 'photo-1551288049-bebda4e38f71',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Maximize ROI with high-performing advertising campaigns across Google, Meta, and other digital platforms.',
    features: ['Google Ads', 'Meta Ads', 'Lead Generation', 'Campaign Optimization'],
    img: 'photo-1552664730-d307ca884978',
  },
  {
    icon: Palette,
    title: 'Branding & Creative Strategy',
    desc: 'Build a strong brand identity through creative design, visual storytelling, and impactful marketing strategies.',
    features: ['Logo Design', 'Brand Identity', 'Creative Campaigns', 'Marketing Creatives'],
    img: 'photo-1522542550221-31fd19575a2d',
  },
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Create responsive, high-performance websites that strengthen your online presence and deliver exceptional user experiences.',
    features: ['Corporate Websites', 'Landing Pages', 'E-Commerce', 'Website Maintenance'],
    img: 'photo-1504384308090-c894fdcc538d',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    desc: 'Turn business data into actionable insights with intelligent dashboards, reporting, and performance analytics.',
    features: ['Dashboard Reporting', 'Performance Tracking', 'Market Analysis', 'Business Insights'],
    img: 'photo-1554224155-6726b3ff858f',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Develop scalable Android and iOS applications that deliver seamless experiences and support business growth.',
    features: ['Android Apps', 'iOS Apps', 'Cross-Platform Apps', 'App Maintenance'],
    img: 'photo-1571171637578-41bc2dd41cd2',
  },
  {
    icon: Code2,
    title: 'AI Solutions & Chatbots',
    desc: 'Build intelligent AI-powered solutions including chatbots, RAG systems, AI agents, and workflow automation.',
    features: ['AI Chatbots', 'RAG Solutions', 'AI Agents', 'Workflow Automation'],
    img: 'photo-1677442136019-21780ecad995',
  },
]

const techStack = [
  { cat: 'Frontend', techs: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { cat: 'Backend', techs: ['Node.js', 'Python', 'Laravel', 'Go', 'Java Spring'] },
  { cat: 'Mobile', techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'] },
  { cat: 'Cloud', techs: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'] },
  { cat: 'Database', techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'] },
  { cat: 'Marketing', techs: ['Google Ads', 'Meta Ads', 'HubSpot', 'Semrush', 'Klaviyo'] },
]

const industries = [
  {
    title: 'Education',
    icon: GraduationCap,
    desc: 'Modern digital solutions for educational institutions and e-learning platforms.',
  },
  {
    title: 'Healthcare',
    icon: HeartPulse,
    desc: 'Innovative technology that improves patient care and healthcare operations.',
  },
  {
    title: 'Finance',
    icon: Landmark,
    desc: 'Secure, scalable digital solutions for banking and financial services.',
  },
  {
    title: 'Retail & E-Commerce',
    icon: ShoppingBag,
    desc: 'Helping brands increase sales with engaging digital experiences.',
  },
  {
    title: 'Manufacturing',
    icon: Factory,
    desc: 'Optimizing manufacturing workflows through digital transformation.',
  },
  {
    title: 'Real Estate',
    icon: Building2,
    desc: 'Smart websites and marketing solutions for modern real estate businesses.',
  },
  {
    title: 'Hospitality',
    icon: Hotel,
    desc: 'Creating exceptional guest experiences through digital innovation.',
  },
  {
    title: 'Startups & Enterprises',
    icon: Briefcase,
    desc: 'Scalable technology solutions designed for ambitious businesses.',
  },
]

export default function Services() {
  const [services, setServices] = useState(initialServices)

  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(
            data.map((s) => ({
              icon: ICON_MAP[s.icon_name] || BarChart3,
              title: s.title,
              desc: s.description,
              features: Array.isArray(s.features) ? s.features : (s.features ? s.features.split(',') : []),
              img: s.image_url || 'photo-1460925895917-afdab827c52f',
            }))
          )
        }
      })
      .catch((err) => console.log('Using default services fallback:', err))
  }, [])

  return (
    <div className="pt-16 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="hero-orb hero-orb-1 animate-orb-1" />
        <div className="hero-orb hero-orb-2 animate-orb-2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-hero-up text-center lg:text-left">
              <span className="highlight-tag mb-4 sm:mb-6 inline-flex">
                <Sparkles size={13} />
                Digital Solutions
              </span>
              <h1
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                className="text-3xl sm:text-4xl lg:text-[62px] text-[#0F172A] leading-[1.1] mb-4 sm:mb-6"
              >
                Building the Future of{' '}
                <span className="hero-gold-text">Solutions for Every Business</span>
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed mb-6 sm:mb-8">
                ACSPIRE provides innovative digital solutions that help businesses build
                their online presence, automate operations, increase customer engagement,
                and achieve sustainable growth through technology and strategic marketing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary btn-shine justify-center">
                  Get a Free Quote <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn-secondary justify-center">
                  Learn About Us
                </Link>
              </div>
            </div>
            <div className="animate-hero-left order-first lg:order-last">
              <div className="relative">
                <div className="img-zoom relative rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=680&h=480&fit=crop&auto=format"
                    alt="Digital services team at work"
                    className="w-full h-[240px] sm:h-[350px] lg:h-[440px] object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID WITH STRICT ALTERNATING LAYOUT */}
      <section className="relative py-16 sm:py-24 lg:py-28 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">What We Offer</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              End-to-End Digital Excellence
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              Eight specialized service lines, one unified team — aligned to accelerate your business growth.
            </p>
          </Animate>

          <div className="flex flex-col gap-6 sm:gap-8">
            {services.map(({ icon: Icon, title, desc, features, img }, i) => {
              const isEven = i % 2 === 0
              return (
                <Animate
                  key={title}
                  delay={60}
                  className="group bg-white rounded-[20px] sm:rounded-[28px] border border-[#E2E8F0] shadow-sm overflow-hidden hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-500 card-lift"
                >
                  <div className="flex flex-col lg:grid lg:grid-cols-2">

                    {/* IMAGE CONTAINER:
                        Mobile (< lg): order-1 (always top on mobile)
                        Desktop (>= lg):
                          - Even (Card 1, 3, 5): lg:order-1 (IMAGE LEFT)
                          - Odd (Card 2, 4, 6): lg:order-2 (IMAGE RIGHT)
                    */}
                    <div className={`img-zoom order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <img
                        src={getImageSrc(img)}
                        alt={title}
                        className="w-full h-48 sm:h-60 lg:h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=420&fit=crop' }}
                      />
                    </div>

                    {/* CONTENT CONTAINER:
                        Mobile (< lg): order-2 (always below image on mobile)
                        Desktop (>= lg):
                          - Even (Card 1, 3, 5): lg:order-2 (CONTENT RIGHT)
                          - Odd (Card 2, 4, 6): lg:order-1 (CONTENT LEFT)
                    */}
                    <div className={`p-5 sm:p-8 lg:p-12 flex flex-col justify-center order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="icon-card mb-4 sm:mb-6 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37]">
                        <Icon size={22} className="text-[#D4AF37] group-hover:text-white transition-colors" />
                      </div>
                      <h3
                        style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                        className="text-lg sm:text-2xl lg:text-3xl text-[#0F172A] mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors"
                      >
                        {title}
                      </h3>
                      <p className="text-[13px] sm:text-[15.5px] text-[#475569] leading-relaxed mb-4 sm:mb-6">{desc}</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-8">
                        {features.map((f) => (
                          <div key={f} className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[13.5px] text-[#475569] font-medium">
                            <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                              <CheckCircle size={10} className="text-[#D4AF37]" />
                            </div>
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/contact"
                        className="btn-primary btn-shine w-fit sm:w-fit self-start justify-center text-xs sm:text-sm py-2 px-5"
                      >
                        Get Started <ArrowRight size={13} />
                      </Link>
                    </div>

                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Technology</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              Our Technology Stack
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              We work with industry-leading tools and technologies to deliver scalable, future-proof solutions.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {techStack.map(({ cat, techs }, i) => (
              <Animate key={cat} delay={i * 70} className="card-gold p-5 sm:p-7">
                <h4
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                  className="text-xs sm:text-[14px] text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  {cat}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((t) => (
                    <span
                      key={t}
                      className="tag-pill bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] text-xs sm:text-[13px] font-semibold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE EMPOWER */}
      <section className="relative py-16 sm:py-24 lg:py-28 section-dots" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Industries</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              Industries We Empower
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              Delivering innovative digital solutions across diverse industries with measurable impact.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {industries.map(({ title, icon: Icon, desc }, i) => (
              <Animate key={title} delay={i * 60}>
                <div className="group relative bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] p-6 sm:p-8 flex flex-col h-auto sm:h-[280px] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-500 card-lift">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FBF5DC] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#D4AF37] transition-all duration-500">
                    <Icon size={24} className="text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <h3
                    style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
                    className="text-lg sm:text-xl text-[#0F172A] mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors"
                  >
                    {title}
                  </h3>
                  <p className="text-xs sm:text-[14px] leading-relaxed text-[#64748B] flex-1">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
