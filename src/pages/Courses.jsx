import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const getImageSrc = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
  if (img.startsWith('http')) return img
  return `https://images.unsplash.com/${img}?w=500&h=300&fit=crop&auto=format`
}
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Star,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Play,
  BarChart3,
  Code2,
  Palette,
  Globe,
  Layers,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

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

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E2E8F0] bg-white rounded-2xl overflow-hidden shadow-sm transition-all hover:border-[#D4AF37]/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-[#F8FAFC] transition-colors"
      >
        <span
          style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
          className="text-sm sm:text-[15.5px] text-[#0F172A] pr-3"
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#D4AF37] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-[14.5px] text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]/50">
          <p className="pt-3 sm:pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

const digitalMarketingCourses = [
  {
    img: 'photo-1460925895917-afdab827c52f',
    title: 'Complete Digital Marketing Program',
    desc: 'Master SEO, Google Ads, Meta Ads, Social Media, Email Marketing, and Analytics.',
    tag: 'Popular',
  },
  {
    img: 'photo-1516321318423-f06f85e504b3',
    title: 'Performance Marketing',
    desc: 'Drive measurable growth with data-driven advertising strategies.',
    tag: 'Advanced',
  },
  {
    img: 'photo-1516321497487-e288fb19713f',
    title: 'Meta Ads & Google Ads',
    desc: 'Create and optimize high-performing advertising campaigns.',
    tag: 'Hands-on',
  },
  {
    img: 'photo-1432888622747-4eb9a8efeb07',
    title: 'SEO Mastery',
    desc: 'Improve search visibility with advanced SEO techniques.',
    tag: 'Essential',
  },
]

const technologyCourses = [
  {
    img: 'photo-1571171637578-41bc2dd41cd2',
    title: 'Full Stack Web Development',
    desc: 'Learn React, Node.js, APIs and databases.',
    tag: 'Career Track',
  },
  {
    img: 'photo-1677442136019-21780ecad995',
    title: 'Agentic AI Development',
    desc: 'Build AI Agents, RAG Systems and Automations.',
    tag: 'Trending',
  },
  {
    img: 'photo-1551288049-bebda4e38f71',
    title: 'Business Analytics',
    desc: 'Learn dashboards and business intelligence.',
    tag: 'High Demand',
  },
]

const entrepreneurshipCourses = [
  {
    img: 'photo-1521791136064-7986c2920216',
    title: 'Human Resources Development',
    desc: 'Develop leadership and HR skills.',
    tag: 'Management',
  },
  {
    img: 'photo-1552664730-d307ca884978',
    title: 'Sales & Marketing',
    desc: 'Master sales and customer acquisition.',
    tag: 'Growth',
  },
  {
    img: 'photo-1554224155-6726b3ff858f',
    title: 'Finance Management',
    desc: 'Learn finance and business planning.',
    tag: 'Leadership',
  },
]

const benefits = [
  { icon: Award, title: 'Industry Certifications', desc: 'Earn certificates recognized by top employers globally.' },
  { icon: Play, title: 'Live + Recorded Sessions', desc: 'Attend live classes or watch recordings at your own pace.' },
  { icon: Users, title: 'Community Access', desc: 'Join a network of 10,000+ professionals and alumni.' },
  { icon: BookOpen, title: 'Lifetime Course Access', desc: 'Access all course materials and updates forever.' },
  { icon: CheckCircle, title: 'Project-Based Learning', desc: 'Build real-world portfolio projects under expert guidance.' },
  { icon: BarChart3, title: 'Career Support', desc: 'Resume review, mock interviews, and job placement assistance.' },
]

const reviews = [
  {
    name: 'Alex Thompson',
    img: 'photo-1507003211169-0a1dd7228f2d',
    course: 'Full-Stack Web Development',
    rating: 5,
    text: "Best investment I've ever made. Within 3 months of completing the course, I landed a full-stack developer role with a 60% salary increase.",
  },
  {
    name: 'Sarah Chen',
    img: 'photo-1494790108377-be9c29b29330',
    course: 'Digital Marketing Mastery',
    rating: 5,
    text: 'The Meta & Google Ads modules alone transformed my career. The live mentoring sessions gave me real confidence to scale campaigns for client projects.',
  },
  {
    name: 'Michael Patel',
    img: 'photo-1500648767791-00dcc994a43e',
    course: 'Agentic AI Development',
    rating: 5,
    text: 'Cutting-edge content! Learning to build RAG workflows and autonomous AI agents gave our company an incredible competitive edge in product development.',
  },
]

const FALLBACK_COURSES = {
  'Digital Marketing': digitalMarketingCourses,
  'Technology & AI': technologyCourses,
  'Business & Leadership': entrepreneurshipCourses,
}

const TRACK_META = {
  'Digital Marketing': {
    label: 'Track 01',
    heading: 'Digital Marketing Programs',
    sub: 'Practical, campaign-focused learning to help you scale brands and generate leads.',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
    imgH: 'h-40 sm:h-48',
  },
  'Technology & AI': {
    label: 'Track 02',
    heading: 'Technology & AI Courses',
    sub: 'Build full-stack applications, intelligent AI chatbots, and automated workflows.',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    imgH: 'h-44 sm:h-52',
  },
  'Business & Leadership': {
    label: 'Track 03',
    heading: 'Business & Leadership',
    sub: 'Develop management, HR, sales strategy, and financial literacy skills.',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    imgH: 'h-44 sm:h-52',
  },
}

const KNOWN_TRACKS = Object.keys(TRACK_META)

export default function Courses() {
  const [trackGroups, setTrackGroups] = useState(
    KNOWN_TRACKS.map((t) => ({ track: t, courses: FALLBACK_COURSES[t] }))
  )

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return
        const mapItem = (c) => ({
          img: c.image_url || 'photo-1460925895917-afdab827c52f',
          title: c.title,
          desc: c.description,
          tag: c.tag || 'Popular',
          track_subtitle: c.track_subtitle || null,
        })
        const grouped = {}
        data.forEach((c) => {
          const t = c.track || 'Digital Marketing'
          if (!grouped[t]) grouped[t] = []
          grouped[t].push(mapItem(c))
        })
        const getSubtitle = (trackName, courses) => {
          const sub = courses.find((c) => c.track_subtitle)?.track_subtitle
          return sub || null
        }
        const knownGroups = KNOWN_TRACKS.map((t) => ({
          track: t,
          courses: grouped[t] || [],
          track_subtitle: getSubtitle(t, grouped[t] || []),
        }))
        const customTracks = Object.keys(grouped).filter((t) => !KNOWN_TRACKS.includes(t))
        const customGroups = customTracks.map((t) => ({
          track: t,
          courses: grouped[t],
          track_subtitle: getSubtitle(t, grouped[t]),
        }))
        setTrackGroups([...knownGroups, ...customGroups])
      })
      .catch((err) => console.log('Using default courses fallback:', err))
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
                Career Training &amp; Upskilling
              </span>
              <h1
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                className="text-3xl sm:text-4xl lg:text-[62px] text-[#0F172A] leading-[1.1] mb-4 sm:mb-6"
              >
                Master In-Demand Skills for <span className="hero-gold-text">Digital Success</span>
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed mb-6 sm:mb-8">
                Transform your career with hands-on, industry-recognized training in Digital Marketing, Full-Stack Development, AI, and Business Analytics.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary btn-shine justify-center">
                  Enroll Now <ArrowRight size={16} />
                </Link>
                <a href="#courses-list" className="btn-secondary justify-center">
                  Browse Courses
                </a>
              </div>
            </div>

            <div className="animate-hero-left order-first lg:order-last">
              <div className="relative">
                <div className="img-zoom relative rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=680&h=480&fit=crop&auto=format"
                    alt="Students collaborating"
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

      {/* COURSES LIST */}
      <section id="courses-list" className="relative py-16 sm:py-24 lg:py-28 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-24">
          {trackGroups.map(({ track, courses: trackCourses, track_subtitle }, trackIdx) => {
            if (!trackCourses || trackCourses.length === 0) return null
            const meta = TRACK_META[track]
            const isFirstTrack = track === KNOWN_TRACKS[0]
            const gridClass = meta?.grid || 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
            const imgH = meta?.imgH || 'h-44 sm:h-52'
            return (
              <div key={track}>
                <Animate className="mb-8 sm:mb-12">
                  <span className="section-label">{meta?.label || `Track ${String(trackIdx + 1).padStart(2, '0')}`}</span>
                  <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl mt-2 mb-2 sm:mb-3">
                    {meta?.heading || track}
                  </h2>
                  <p className="section-subtext max-w-xl">
                    {track_subtitle || meta?.sub || `Explore our ${track} programs and advance your skills.`}
                  </p>
                </Animate>

                <div className={gridClass}>
                  {trackCourses.map(({ img, title, desc, tag }, i) => (
                    <Animate
                      key={`${track}-${title}-${i}`}
                      delay={i * (isFirstTrack ? 60 : 70)}
                      className="card-gold bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-sm card-lift flex flex-col"
                    >
                      <div className={`img-zoom relative ${imgH}`}>
                        <img
                          src={getImageSrc(img)}
                          alt={title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop' }}
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#0F172A]/80 backdrop-blur-md text-[#D4AF37] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                          {tag}
                        </span>
                      </div>
                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-base sm:text-lg lg:text-xl text-[#0F172A] mb-2">
                            {title}
                          </h3>
                          <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed mb-3 sm:mb-4">{desc}</p>
                        </div>
                        <Link to="/contact" className="text-xs sm:text-[13.5px] font-bold text-[#D4AF37] hover:text-[#C8960C] flex items-center gap-1.5 transition-colors">
                          Learn More <ArrowRight size={14} />
                        </Link>
                      </div>
                    </Animate>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Why Learn With Us</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              The ACSPIRE Learning Advantage
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              Our training is designed around real projects, live mentorship, and long-term career growth.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Animate key={title} delay={i * 60} className="glass-card p-6 sm:p-8 cursor-default">
                <div className="icon-card mb-4 sm:mb-5">
                  <Icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-base sm:text-[17px] text-[#0F172A] mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed">{desc}</p>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative py-16 sm:py-24 lg:py-28 section-dots" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Student Reviews</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              What Our Graduates Say
            </h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {reviews.map(({ name, img, course, rating, text }, i) => (
              <Animate key={name} delay={i * 80} className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm card-lift flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(rating)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#D4AF37" className="text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[14.5px] text-[#475569] leading-relaxed mb-4 sm:mb-6 italic">"{text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <img
                    src={`https://images.unsplash.com/${img}?w=100&h=100&fit=crop&auto=format`}
                    alt={name}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <div className="text-xs sm:text-[14px] font-bold text-[#0F172A]">{name}</div>
                    <div className="text-[10px] sm:text-[12px] text-[#64748B]">{course}</div>
                  </div>
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
