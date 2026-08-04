import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  Code2,
  Smartphone,
  BarChart3,
  Palette,
  Globe,
  Layers,
  Zap,
  Shield,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Quote,
  Sparkles,
} from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

/* ---------- animated counter ---------- */
function Counter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView(0.3)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 1800
    const steps = 60
    const increment = end / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

/* ---------- animated section ---------- */
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

/* ---------- FAQ item ---------- */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E2E8F0] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm active:border-[#D4AF37]/50 transition-all" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left active:bg-[#F8FAFC] transition-colors"
      >
        <span
          style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
          className="text-[14px] sm:text-[15.5px] text-[#0F172A] pr-3 sm:pr-4 leading-snug"
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#D4AF37] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]/50">
          <p className="pt-3 sm:pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}



const services = [
  {
    icon: BarChart3,
    title: 'Social Media Marketing',
    desc: 'Build your online presence through engaging content, social media campaigns, and audience engagement.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Maximize ROI with Google Ads, Meta Ads, PPC campaigns, and conversion-focused marketing strategies.',
  },
  {
    icon: BookOpen,
    title: 'SEO & Content Marketing',
    desc: 'Boost your online visibility with strategic SEO, high-quality content, keyword optimization, and content marketing that drives organic traffic.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Responsive business websites and custom web applications built with modern technologies.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Android and iOS applications designed for performance, scalability, and seamless user experience.',
  },
  {
    icon: Layers,
    title: 'Business Analytics',
    desc: 'Transform business requirements into effective digital solutions through strategic analysis and planning.',
  },
]

const whyUs = [
  {
    icon: Zap,
    title: 'Innovation-Driven Solutions',
    desc: 'Driving growth through innovative technology and digital solutions.',
  },
  {
    icon: Shield,
    title: 'Trusted Partner',
    desc: 'Building trust with transparency, reliability, and lasting partnerships.',
  },
  {
    icon: Users,
    title: 'Industry Expertise',
    desc: 'Expert professionals delivering impactful digital transformation.',
  },
  {
    icon: TrendingUp,
    title: 'End-to-End Solutions',
    desc: 'Complete digital services from strategy to successful execution.',
  },
]

const courses = [
  {
    img: 'photo-1460925895917-afdab827c52f',
    title: 'Digital Marketing Program',
    desc: 'Master SEO, social media marketing, Google Ads, Meta Ads, and content marketing with hands-on projects.',
  },
  {
    img: 'photo-1571171637578-41bc2dd41cd2',
    title: 'Full Stack Web Development',
    desc: 'Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and build real-world web applications.',
  },
  {
    img: 'photo-1552664730-d307ca884978',
    title: 'Business Analytics & AI',
    desc: 'Develop analytical skills using Excel, Power BI, SQL, AI tools, and data visualization for decision making.',
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'Understanding your vision and business objectives.',
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'Crafting a customized roadmap for success.',
  },
  {
    step: '03',
    title: 'Development',
    desc: 'Building innovative solutions with cutting-edge technology.',
  },
  {
    step: '04',
    title: 'Real-Time Projects',
    desc: 'Applying knowledge through live client projects.',
  },
  {
    step: '05',
    title: 'Launch & Growth',
    desc: 'Ensuring continuous growth with ongoing support.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures Inc.',
    img: 'photo-1494790108377-be9c29b29330',
    text: "ACSPIRE completely transformed our digital presence. Within 6 months, our organic traffic tripled and our conversion rate improved by 240%. They're not just a vendor — they're a true growth partner.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'VP Marketing, Horizon Brands',
    img: 'photo-1507003211169-0a1dd7228f2d',
    text: "The team's expertise in both design and development is unmatched. They delivered our e-commerce platform ahead of schedule and under budget. Our online revenue grew 180% in the first quarter.",
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, EduTech Solutions',
    img: 'photo-1573496359142-b8d87734a5a2',
    text: "From branding to our full digital marketing strategy, ACSPIRE delivered excellence at every stage. Their digital solutions upskilled our entire team capabilities. Highly recommended.",
    rating: 5,
  },
]

const blogs = [
  {
    id: 2,
    img: 'photo-1460925895917-afdab827c52f',
    title: 'What Is Digital Marketing? A Complete Guide for Businesses',
  },
  {
    id: 1,
    img: 'photo-1551288049-bebda4e38f71',
    title: 'Is a Digital Marketing Course in Chennai Worth It in 2026?',
  },
  {
    id: 3,
    img: 'photo-1504384308090-c894fdcc538d',
    title: 'Types of Digital Marketing Every Business Should Know',
  },
]

const faqs = [
  {
    q: 'What services does ACSPIRE provide?',
    a: 'ACSPIRE offers Digital Marketing, Web Development, Mobile App Development, AI Solutions, Business Analytics, SEO, Branding, and UI/UX Design for businesses and professionals.',
  },
  {
    q: 'Do you build custom websites for businesses?',
    a: 'Yes. We develop responsive, SEO-friendly, and high-performance business websites, e-commerce platforms, and custom web applications tailored to your requirements.',
  },
  {
    q: 'Do you provide AI-based solutions?',
    a: 'Yes. We develop AI-powered chatbots, AI agents, workflow automation, intelligent business solutions, and custom AI integrations to improve productivity and customer experience.',
  },
  {
    q: 'What Business Analytics services do you offer?',
    a: 'We provide Business Analytics solutions including Power BI dashboards, Excel reporting, SQL analysis, business intelligence, KPI tracking, and data-driven decision support for organizations.',
  },
  {
    q: 'Do you provide Digital Marketing services?',
    a: 'Yes. Our digital marketing services include SEO, Social Media Marketing, Google Ads, Meta Ads, Content Marketing, Performance Marketing, and complete brand growth strategies.',
  },
  {
    q: 'Do you offer professional courses and certificates?',
    a: 'Yes. We offer industry-oriented programs in Digital Marketing, Full Stack Development, Business Analytics, and AI. Every program includes practical projects and certification.',
  },
  {
    q: 'Are your courses available online and offline?',
    a: 'Yes. Learners can choose between live online classes or offline classroom training based on their convenience.',
  },
  {
    q: 'Do you offer placement assistance?',
    a: 'Yes. Eligible students receive internship opportunities, resume building support, interview preparation, and placement assistance to launch their careers.',
  },
]

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').trim()
}

const getImageSrc = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=350&fit=crop'
  if (img.startsWith('http')) return img
  return `https://images.unsplash.com/${img}?w=600&h=350&fit=crop&auto=format`
}

/* ============================
   HOME PAGE
   ============================ */
export default function Home() {
  const [recentBlogs, setRecentBlogs] = useState([])

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    fetch(`${API}/api/blogs`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentBlogs(data.slice(0, 3))
        }
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden min-h-[100svh] flex items-center">
        <div className="hero-orb hero-orb-1 animate-orb-1" />
        <div className="hero-orb hero-orb-2 animate-orb-2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left */}
            <div className="animate-hero-up text-center lg:text-left">
              <span className="highlight-tag mb-4 sm:mb-6 inline-flex">
                <Sparkles size={13} />
                #1 Digital Growth Partner
              </span>
              <h1
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                className="text-3xl sm:text-4xl lg:text-[64px] text-[#0F172A] leading-[1.1] mb-4 sm:mb-6"
              >
                Your Trusted Partner for <span className="hero-gold-text">Digital Growth</span>
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                ACSPIRE is a premium digital growth partner helping ambitious businesses scale through expert web development, strategic marketing, AI solutions, and world-class design.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link to="/contact" className="btn-primary btn-shine w-full sm:w-auto justify-center">
                  Start Your Journey <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-secondary w-full sm:w-auto justify-center">
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Right – hero image */}
            <div className="relative animate-hero-left order-first lg:order-last" style={{ animationDelay: '200ms' }}>
              <div className="img-zoom relative rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=760&h=560&fit=crop&auto=format"
                  alt="ACSPIRE team collaborating on digital strategy"
                  className="w-full h-[240px] sm:h-[340px] lg:h-[460px] object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── ABOUT PREVIEW ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <Animate dir="left">
              <div className="img-zoom relative rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=680&h=500&fit=crop&auto=format"
                  alt="ACSPIRE modern office"
                  className="w-full h-[240px] sm:h-[320px] lg:h-[440px] object-cover"
                />
              </div>
            </Animate>
            <Animate delay={150} dir="right">
              <span className="section-label">About ACSPIRE</span>
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4 sm:mb-5">
                We Are Your Digital Growth Partner
              </h2>
              <p className="section-subtext mb-4 sm:mb-5">
                ACSPIRE empowers businesses through innovative technology, strategic digital marketing, and industry-focused solutions. We help startups, SMEs, and enterprises build scalable digital solutions that drive measurable growth.
              </p>
              <p className="section-subtext mb-6 sm:mb-8">
                From Digital Marketing, Web Development, AI Agent Solutions and Business Analysis to Mobile App Development, we deliver end-to-end services that prepare businesses and professionals for the future.
              </p>
              <div className="flex gap-4">
                <Link to="/about" className="btn-primary btn-shine">
                  More About Us <ArrowRight size={16} />
                </Link>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Our Capabilities</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">
              Services Designed for Growth
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              Custom digital solutions built to elevate your brand, capture market share, and automate operations.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <Animate key={title} delay={i * 60} className="card-gold bg-white p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-sm card-lift flex flex-col justify-between">
                <div>
                  <div className="icon-card mb-4 sm:mb-6">
                    <Icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-lg sm:text-xl text-[#0F172A] mb-2 sm:mb-3">
                    {title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14.5px] text-[#64748B] leading-relaxed mb-4 sm:mb-6">{desc}</p>
                </div>
                <Link to="/services" className="font-bold text-sm text-[#D4AF37] hover:text-[#C8960C] flex items-center gap-1.5 transition-colors relative z-10 cursor-pointer py-1">
                  Learn More <ArrowRight size={14} />
                </Link>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 section-dots" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Why ACSPIRE</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">
              Why Ambitious Brands Choose Us
            </h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <Animate key={title} delay={i * 70} className="glass-card p-6 sm:p-7 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FBF5DC] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <Icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-base sm:text-lg text-[#0F172A] mb-2">
                  {title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#64748B] leading-relaxed">{desc}</p>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES PREVIEW ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Featured Programs</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">
              Professional Courses & Certification
            </h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map(({ img, title, desc }, i) => (
              <Animate key={title} delay={i * 80} className="card-gold bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-sm card-lift flex flex-col justify-between">
                <div>
                  <div className="img-zoom h-44 sm:h-52">
                    <img src={`https://images.unsplash.com/${img}?w=480&h=300&fit=crop&auto=format`} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-lg sm:text-xl text-[#0F172A] mb-2 sm:mb-3">
                      {title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14px] text-[#64748B] leading-relaxed mb-4 sm:mb-6">{desc}</p>
                  </div>
                </div>
                <div className="px-5 sm:px-7 pb-5 sm:pb-7">
                  <Link to="/courses" className="btn-primary btn-shine w-fit justify-center py-2 px-5 text-xs sm:text-sm">
                    Explore now <ArrowRight size={13} />
                  </Link>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">How We Work</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">Our Proven Process</h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            {process.map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 80} className="stat-card p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-0">
                <div className="number-badge mb-0 sm:mb-4 shrink-0">{step}</div>
                <div className="text-left sm:text-center">
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-sm sm:text-lg text-[#0F172A] mb-1 sm:mb-2">{title}</h3>
                  <p className="text-[12px] sm:text-[13px] text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Testimonials</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">What Our Clients Say</h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map(({ name, role, img, text, rating }, i) => (
              <Animate key={name} delay={i * 80} className="card-gold bg-white p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-sm card-lift flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(rating)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#D4AF37" className="text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed mb-4 sm:mb-6 italic">"{text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <img src={`https://images.unsplash.com/${img}?w=100&h=100&fit=crop&auto=format`} alt={name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37]" />
                  <div>
                    <div className="text-[13px] sm:text-[14px] font-bold text-[#0F172A]">{name}</div>
                    <div className="text-[11px] sm:text-[12px] text-[#64748B]">{role}</div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>



      {/* ── RECENT BLOGS ── */}
      {recentBlogs.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
              <div>
                <span className="section-label">Our Blog</span>
                <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl mt-3" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}>
                  Latest Insights & Articles
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#C8960C] mt-4 md:mt-0 transition-colors"
              >
                View All Articles <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={getImageSrc(blog.image_url)}
                      alt={stripHtml(blog.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {blog.category || 'Digital Marketing'}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <div className="text-xs text-[#94A3B8] font-semibold mb-2">
                      {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Recent'} • {blog.read_time || '5 min read'}
                    </div>

                    <h3
                      style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                      className="text-base sm:text-lg text-[#0F172A] leading-snug mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2"
                    >
                      {stripHtml(blog.title)}
                    </h3>

                    <p className="text-sm text-[#64748B] line-clamp-2 mb-3 sm:mb-4 flex-1">
                      {stripHtml(blog.excerpt)}
                    </p>

                    <div className="flex items-center text-xs font-bold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                      Read Full Article <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-14">
            <span className="section-label">FAQ</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">Frequently Asked Questions</h2>
          </Animate>
          <div className="flex flex-col gap-3 sm:gap-4">
            {faqs.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FBF5DC]/30 to-[#FFFDF7] border-t border-[#E8E8E8]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animate>
            <span className="highlight-tag mb-4 sm:mb-6 inline-flex">
              <Sparkles size={13} />
              Start Your Digital Journey
            </span>

            <h2
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              className="text-2xl sm:text-3xl lg:text-5xl text-[#0F172A] leading-tight mb-4 sm:mb-6"
            >
              Transform Your Business with{' '}
              <span className="hero-gold-text">Smart Digital Solutions</span>
            </h2>

            <p className="text-[15px] sm:text-[17px] text-[#64748B] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
              Whether you're looking for Digital Marketing, Web Development,
              AI Solutions, or Business Analytics, ACSPIRE is here to help you achieve measurable business growth.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="btn-primary btn-shine w-full sm:w-auto justify-center">
                Get Free Consultation
                <ArrowRight size={16} />
              </Link>

              <Link to="/courses" className="btn-secondary w-full sm:w-auto justify-center">
                Explore Courses
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <Footer />
    </div>
  )
}
