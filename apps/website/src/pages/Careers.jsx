import { useState, useEffect } from 'react'
import {
  ArrowRight, MapPin, Clock, Heart, Zap, Globe, Award, Coffee,
  TrendingUp, ChevronDown, Laptop, Shield, Sparkles, X, Loader2,
  CheckCircle2, User, Mail, Phone, Briefcase, Link as LinkIcon, FileText,
} from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

import { API_BASE_URL as API_URL } from '../api/config'

const initialOpenings = [
  { title: 'Senior Full-Stack Developer', dept: 'Engineering', location: 'Chennai', type: 'Full-Time', level: 'Senior', desc: 'Build and scale our client web applications using React, Node.js, and PostgreSQL. Lead technical architecture decisions and mentor junior developers.' },
  { title: 'Digital Marketing Manager', dept: 'Marketing', location: 'Chennai', type: 'Full-Time', level: 'Mid-Senior', desc: 'Drive multi-channel digital marketing campaigns for 10+ client accounts. Expert in SEO, PPC, and marketing analytics.' },
  { title: 'AI & Automation Specialist', dept: 'Engineering', location: 'Chennai', type: 'Full-Time', level: 'Senior', desc: 'Develop cutting-edge AI agents, RAG workflows, and enterprise automation solutions for our clients.' },
  { title: 'Business Analyst', dept: 'Engineering', location: 'Chennai', type: 'Full-Time', level: 'Senior', desc: 'Drive new client acquisition in the Middle East and South Asia markets. Strong network and enterprise sales track record preferred.' },
  { title: 'SEO Specialist', dept: 'Engineering', location: 'Chennai', type: 'Full-Time', level: 'Senior', desc: 'Lead SEO strategy and execution for multiple client accounts. Deep expertise in technical SEO, content strategy, and analytics.' },
]

function Animate({ children, delay = 0, className = '', dir = 'up' }) {
  const { ref, inView } = useInView()
  const transforms = {
    up: inView ? 'translateY(0)' : 'translateY(32px)',
    left: inView ? 'translateX(0)' : 'translateX(-32px)',
    right: inView ? 'translateX(0)' : 'translateX(32px)',
    scale: inView ? 'scale(1)' : 'scale(0.92)',
  }
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: transforms[dir] || transforms.up, transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

const benefits = [
  { icon: TrendingUp, title: 'Competitive Salary', desc: 'Market-leading compensation benchmarked against top agencies globally.' },
  { icon: Laptop, title: 'Remote Flexibility', desc: 'Hybrid work model — work from home, office, or anywhere in the world.' },
  { icon: Coffee, title: 'Modern Workspaces', desc: 'Beautifully designed offices in Chennai.' },
  { icon: Zap, title: 'Fast Growth', desc: 'Rapid career advancement with clear paths and performance-based promotions.' },
]

const hiringSteps = [
  { step: '01', title: 'Apply Online', desc: 'Submit your resume and portfolio through our careers form.' },
  { step: '02', title: 'Initial Screen', desc: 'A 30-minute call with our People team to align on role and expectations.' },
  { step: '03', title: 'Skills Assessment', desc: 'A take-home task or live technical/creative exercise relevant to the role.' },
  { step: '04', title: 'Team Interview', desc: 'Meet the team you will work with in a structured panel interview.' },
  { step: '05', title: 'Offer & Onboarding', desc: 'Receive your offer and start your ACSPIRE journey with a structured 30-day onboarding.' },
]

const testimonials = [
  { name: 'Elena Rodriguez', role: 'Senior Developer — joined 2021', img: 'photo-1573496359142-b8d87734a5a2', text: 'ACSPIRE gave me the opportunity to lead a 12-person engineering team within 18 months. The culture of growth and trust here is unlike anywhere I have worked before.' },
  { name: 'Marcus Johnson', role: 'Marketing Manager — joined 2020', img: 'photo-1507003211169-0a1dd7228f2d', text: 'Working across 15+ client accounts keeps the work dynamic and challenging. The learning budget and leadership support have been instrumental in my development.' },
  { name: 'Aisha Patel', role: 'UI/UX Designer — joined 2022', img: 'photo-1494790108377-be9c29b29330', text: "The design team here is world-class. I've grown more in 2 years at ACSPIRE than in my previous 5 years combined. The projects are ambitious and the feedback culture is excellent." },
]

/* ─── Apply Modal ─── */
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', linkedin: '', cover_letter: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/job-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_title: job.title, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-slate-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 transition-all'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="relative bg-white rounded-[20px] sm:rounded-[28px] shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto" style={{ animation: 'modalIn 0.3s cubic-bezier(.22,1,.36,1)' }}>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F1F5F9] px-4 sm:px-8 py-4 sm:py-6 rounded-t-[20px] sm:rounded-t-[28px] z-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#FBF5DC] rounded-full mb-1.5">
                <Sparkles size={12} className="text-[#D4AF37]" />
                <span className="text-[10px] sm:text-xs font-bold text-[#C8960C]">Applying For</span>
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {job.title}
              </h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-8">
          {success ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-2xl font-extrabold text-slate-900 mb-2">Application Submitted!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Thank you for applying for <span className="font-semibold text-slate-900">{job.title}</span>. Our recruiting team will review your details and respond within 48 hours.
              </p>
              <button onClick={onClose} className="btn-primary py-2.5 px-7 text-sm">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required value={form.name} onChange={update('name')} className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" required value={form.email} onChange={update('email')} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" required value={form.phone} onChange={update('phone')} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Experience *</label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select required value={form.experience} onChange={update('experience')} className={inputCls}>
                      <option value="">Select experience</option>
                      <option value="0-1 years">0-1 years (Fresher)</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years (Senior)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="url" value={form.linkedin} onChange={update('linkedin')} className={inputCls} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Cover Letter / Note</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <textarea rows="3" value={form.cover_letter} onChange={update('cover_letter')} className={`${inputCls} pl-10 resize-none`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary btn-shine w-full py-3 mt-2 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Submit Application <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Careers() {
  const [openings, setOpenings] = useState(initialOpenings)
  const [applyJob, setApplyJob] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const active = data.filter((j) => j.is_active === 1 || j.is_active === true)
          if (active.length > 0) {
            setOpenings(
              active.map((j) => ({
                title: j.title,
                dept: j.dept || j.department || 'Engineering',
                location: j.location || 'Chennai',
                type: j.type || 'Full-Time',
                level: j.level || 'Experienced',
                desc: j.description,
              }))
            )
          }
        }
      })
      .catch((err) => console.log('Using initial openings fallback:', err))
  }, [])

  return (
    <div className="pt-16 overflow-hidden">
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}

      {/* HERO */}
      <section className="relative bg-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="hero-orb hero-orb-1 animate-orb-1" />
        <div className="hero-orb hero-orb-2 animate-orb-2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-hero-up text-center lg:text-left">
              <span className="highlight-tag mb-4 sm:mb-6 inline-flex">
                <Sparkles size={13} />
                Careers at ACSPIRE
              </span>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-3xl sm:text-4xl lg:text-[62px] text-[#0F172A] leading-[1.1] mb-4 sm:mb-6">
                Build Your Career at <span className="hero-gold-text">ACSPIRE</span>
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed mb-6 sm:mb-8">
                Join a team of innovators, marketers, developers, and business professionals who are passionate about creating impactful digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <a href="#openings" className="btn-primary btn-shine justify-center">View Open Roles <ArrowRight size={16} /></a>
                <a href="#culture" className="btn-secondary justify-center">Our Culture</a>
              </div>
            </div>

            <div className="animate-hero-left order-first lg:order-last">
              <div className="relative">
                <div className="img-zoom relative rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=680&h=480&fit=crop&auto=format" alt="ACSPIRE team culture" className="w-full h-[240px] sm:h-[350px] lg:h-[440px] object-cover" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 60%)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section id="culture" className="relative py-16 sm:py-24 lg:py-28 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <Animate dir="left">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {['photo-1522071820081-009f0129c71c', 'photo-1497366216548-37526070297c', 'photo-1524178232363-1fb2b075b655', 'photo-1552664730-d307ca884978'].map((img, i) => (
                  <div key={i} className="img-zoom rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                    <img src={`https://images.unsplash.com/${img}?w=320&h=240&fit=crop&auto=format`} alt="Life at ACSPIRE" className="w-full h-32 sm:h-44 object-cover" />
                  </div>
                ))}
              </div>
            </Animate>
            <Animate delay={150} dir="right">
              <span className="section-label">Why Work With Us</span>
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4">Grow With a Team That Values Innovation</h2>
              <p className="section-subtext mb-4">At ACSPIRE, we believe that great careers are built through collaboration, continuous learning, and meaningful work.</p>
              <p className="section-subtext mb-6">We provide a supportive environment where you can develop your skills, work with experienced professionals, and build a rewarding career.</p>
            </Animate>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Perks &amp; Benefits</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">Everything You Need to Thrive</h2>
            <p className="section-subtext max-w-2xl mx-auto">We take care of our team so they can focus on doing their best work.</p>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Animate key={title} delay={i * 60} className="glass-card p-6 sm:p-7 cursor-default">
                <div className="icon-card mb-4 sm:mb-5"><Icon size={22} className="text-[#D4AF37]" /></div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-base sm:text-[16px] text-[#0F172A] mb-2">{title}</h3>
                <p className="text-xs sm:text-[13.5px] text-[#64748B] leading-relaxed">{desc}</p>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="relative py-16 sm:py-24 lg:py-28 section-dots" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Hiring Process</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">Our Hiring Journey</h2>
            <p className="section-subtext max-w-xl mx-auto">Transparent, respectful, and fast.</p>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {hiringSteps.map(({ step, title, desc }, i) => (
              <Animate key={step} delay={i * 80} className="stat-card p-5 sm:p-6 flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-0">
                <div className="number-badge mb-0 sm:mb-4 shrink-0">{step}</div>
                <div className="text-left sm:text-center">
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-base sm:text-[15px] text-[#0F172A] mb-1">{title}</h3>
                  <p className="text-xs sm:text-[12.5px] text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="openings" className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Open Roles</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">Current Opportunities</h2>
            <p className="section-subtext max-w-xl mx-auto">Don't see the perfect role? Send us your details anyway.</p>
          </Animate>

          <div className="flex flex-col gap-4 sm:gap-5">
            {openings.map((job, i) => (
              <Animate key={job.title + i} delay={i * 50} className="card-gold bg-white rounded-[16px] sm:rounded-[24px] border border-[#E2E8F0] p-5 sm:p-8 shadow-sm card-lift">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      <span className="bg-[#EFF6FF] text-[#1E3A8A] text-[10.5px] sm:text-[11.5px] font-bold px-2.5 py-0.5 rounded-full">{job.dept}</span>
                      <span className="bg-[#FBF5DC] text-[#D4AF37] text-[10.5px] sm:text-[11.5px] font-bold px-2.5 py-0.5 rounded-full">{job.level}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-lg sm:text-xl text-[#0F172A] mb-2">{job.title}</h3>
                    <p className="text-xs sm:text-[14.5px] text-[#475569] leading-relaxed mb-3 sm:mb-4">{job.desc}</p>
                    <div className="flex flex-wrap gap-4 text-xs sm:text-[13px] text-[#64748B] font-medium">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#D4AF37]" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#D4AF37]" /> {job.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setApplyJob(job)}
                    className="btn-primary btn-shine text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto justify-center py-2.5 px-6"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYEE TESTIMONIALS */}
      <section className="relative py-16 sm:py-24 lg:py-28 section-dots" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Team Feedback</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">Life at ACSPIRE</h2>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {testimonials.map(({ name, role, img, text }, i) => (
              <Animate key={name} delay={i * 80} className="card-gold bg-white p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-sm card-lift flex flex-col justify-between">
                <p className="text-xs sm:text-[14.5px] text-[#475569] leading-relaxed mb-4 sm:mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <img src={`https://images.unsplash.com/${img}?w=100&h=100&fit=crop&auto=format`} alt={name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4AF37]" />
                  <div>
                    <div className="text-xs sm:text-[14px] font-bold text-[#0F172A]">{name}</div>
                    <div className="text-[10px] sm:text-[12px] text-[#64748B]">{role}</div>
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
