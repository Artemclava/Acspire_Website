import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Mail, Phone, MapPin, Clock, ChevronDown,
  Sparkles, CheckCircle2, AlertCircle, Loader2, X,
  GraduationCap, Briefcase
} from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'

/* ─── Google Sheets URL ─── */
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || ''

/* ─── Animate ─── */
function Animate({ children, delay = 0, className = '', dir = 'up' }) {
  const { ref, inView } = useInView()
  const transforms = {
    up: inView ? 'translateY(0)' : 'translateY(32px)',
    left: inView ? 'translateX(0)' : 'translateX(-32px)',
    right: inView ? 'translateX(0)' : 'translateX(32px)',
  }
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: transforms[dir] || transforms.up,
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ─── FAQ ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E2E8F0] bg-white rounded-2xl overflow-hidden shadow-sm hover:border-[#D4AF37]/50 transition-all">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-[#F8FAFC] transition-colors">
        <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-sm sm:text-[15.5px] text-[#0F172A] pr-3">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-[#D4AF37] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-[14.5px] text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]/50">
          <p className="pt-3 sm:pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Constants ─── */
const qualifications = [
  '10th Pass', '12th Pass', 'Currently in UG (College)',
  'Graduate (B.E / B.Tech / B.Sc)', 'Post Graduate (M.Tech / MCA / MBA)',
  'Working Professional', 'Other',
]

/* ─── Validation ─── */
const validateStudent = (f) => {
  const e = {}
  if (!f.name.trim()) e.name = 'Full name is required'
  else if (f.name.trim().length < 2) e.name = 'Must be at least 2 characters'
  else if (!/^[a-zA-Z\s]+$/.test(f.name)) e.name = 'Only letters allowed'
  if (!f.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email'
  if (!f.phone.trim()) e.phone = 'Phone is required'
  else if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit number'
  if (!f.course) e.course = 'Please select a course'
  if (!f.qualification) e.qualification = 'Please select your qualification'
  return e
}

const validateBusiness = (f) => {
  const e = {}
  if (!f.firstName.trim()) e.firstName = 'First name is required'
  else if (f.firstName.trim().length < 2) e.firstName = 'Min 2 characters'
  else if (!/^[a-zA-Z\s]+$/.test(f.firstName)) e.firstName = 'Letters only'
  if (!f.lastName.trim()) e.lastName = 'Last name is required'
  else if (f.lastName.trim().length < 2) e.lastName = 'Min 2 characters'
  else if (!/^[a-zA-Z\s]+$/.test(f.lastName)) e.lastName = 'Letters only'
  if (!f.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email'
  if (!f.service) e.service = 'Please select a service'
  if (!f.message.trim()) e.message = 'Please describe your project'
  else if (f.message.trim().length < 20) e.message = `Min 20 characters (${f.message.trim().length}/20)`
  return e
}

/* ─── Helpers ─── */
const inp = (err) => `w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-[14px] bg-[#F8FAFC] border ${err ? 'border-red-400 bg-red-50/20' : 'border-[#E2E8F0]'} rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 transition-all`

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium"><AlertCircle size={11} /> {msg}</p>
}

async function sendSubmission(payload) {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  let savedToDb = false
  try {
    const res = await fetch(`${API}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) savedToDb = true
  } catch {}

  if (SHEETS_URL) {
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
    } catch {}
  }
}

/* ─── STUDENT FORM ─── */
function StudentForm({ courses = [] }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', course: '', qualification: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }))
    if (touched[k]) {
      const errs = validateStudent({ ...f, [k]: v })
      setErrors((e) => ({ ...e, [k]: errs[k] }))
    }
  }
  const blur = (k) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((e) => ({ ...e, [k]: validateStudent(f)[k] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(Object.keys(f).reduce((a, k) => ({ ...a, [k]: true }), {}))
    const errs = validateStudent(f)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    try {
      await sendSubmission({ type: 'Student Course Enquiry', name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), course: f.course, qualification: f.qualification, message: f.message.trim() || '-' })
      setStatus('success')
    } catch {
      setStatus('error')
      setSubmitError('Something went wrong. Please call us directly at +91 63832 83731.')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'success') return <SuccessCard type="student" onReset={() => { setStatus(null); setF({ name: '', email: '', phone: '', course: '', qualification: '', message: '' }); setTouched({}); setErrors({}) }} />

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
      {status === 'error' && <ErrorBanner msg={submitError} onClose={() => setStatus(null)} />}

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Full Name <span className="text-red-500">*</span></label>
        <input type="text" placeholder="e.g. Ranjith Kumar" value={f.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} className={inp(touched.name && errors.name)} />
        {touched.name && <FieldError msg={errors.name} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Email Address <span className="text-red-500">*</span></label>
          <input type="email" placeholder="ranjith@gmail.com" value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} className={inp(touched.email && errors.email)} />
          {touched.email && <FieldError msg={errors.email} />}
        </div>
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Phone Number <span className="text-red-500">*</span></label>
          <input type="tel" placeholder="+91 98765 43210" value={f.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} className={inp(touched.phone && errors.phone)} />
          {touched.phone && <FieldError msg={errors.phone} />}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Course of Interest <span className="text-red-500">*</span></label>
        <select value={f.course} onChange={(e) => set('course', e.target.value)} onBlur={() => blur('course')} className={inp(touched.course && errors.course)}>
          <option value="">Select a course...</option>
          {(courses.length > 0 ? courses : [
            'Full Stack Web Development', 'Digital Marketing', 'Business Analytics',
            'Agentic AI Development', 'Other',
          ]).map((c) => <option key={c}>{c}</option>)}
        </select>
        {touched.course && <FieldError msg={errors.course} />}
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Current Qualification <span className="text-red-500">*</span></label>
        <select value={f.qualification} onChange={(e) => set('qualification', e.target.value)} onBlur={() => blur('qualification')} className={inp(touched.qualification && errors.qualification)}>
          <option value="">Select your qualification...</option>
          {qualifications.map((q) => <option key={q}>{q}</option>)}
        </select>
        {touched.qualification && <FieldError msg={errors.qualification} />}
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Any Questions?</label>
        <textarea rows={3} placeholder="Any specific questions about course, fees, schedule..." value={f.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} className={`${inp(touched.message && errors.message)} resize-none`} />
        {touched.message && <FieldError msg={errors.message} />}
      </div>

      <button type="submit" disabled={submitting} className="btn-primary btn-shine w-full justify-center py-3 sm:py-3.5 text-xs sm:text-[15px] disabled:opacity-70">
        {submitting ? <><Loader2 size={16} className="animate-spin mr-2" /> Sending...</> : <>Request Callback <ArrowRight size={16} /></>}
      </button>
      <p className="text-[11px] sm:text-[12px] text-[#94A3B8] text-center">Our advisor will call you within 24 hours.</p>
    </form>
  )
}

/* ─── BUSINESS FORM ─── */
function BusinessForm({ services = [] }) {
  const [f, setF] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const set = (k, v) => {
    setF((p) => ({ ...p, [k]: v }))
    if (touched[k]) {
      const errs = validateBusiness({ ...f, [k]: v })
      setErrors((e) => ({ ...e, [k]: errs[k] }))
    }
  }
  const blur = (k) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((e) => ({ ...e, [k]: validateBusiness(f)[k] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(Object.keys(f).reduce((a, k) => ({ ...a, [k]: true }), {}))
    const errs = validateBusiness(f)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    try {
      await sendSubmission({ type: 'Business Enquiry', firstName: f.firstName.trim(), lastName: f.lastName.trim(), email: f.email.trim(), phone: f.phone.trim() || '-', company: f.company.trim() || '-', service: f.service, budget: f.budget || 'Not specified', message: f.message.trim() })
      setStatus('success')
    } catch {
      setStatus('error')
      setSubmitError('Something went wrong. Please call +91 63832 83731.')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'success') return <SuccessCard type="business" onReset={() => { setStatus(null); setF({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', budget: '', message: '' }); setTouched({}); setErrors({}) }} />

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
      {status === 'error' && <ErrorBanner msg={submitError} onClose={() => setStatus(null)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">First Name <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Arjun" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={() => blur('firstName')} className={inp(touched.firstName && errors.firstName)} />
          {touched.firstName && <FieldError msg={errors.firstName} />}
        </div>
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Last Name <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Sharma" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={() => blur('lastName')} className={inp(touched.lastName && errors.lastName)} />
          {touched.lastName && <FieldError msg={errors.lastName} />}
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Work Email <span className="text-red-500">*</span></label>
        <input type="email" placeholder="arjun@company.com" value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} className={inp(touched.email && errors.email)} />
        {touched.email && <FieldError msg={errors.email} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Phone</label>
          <input type="tel" placeholder="+91 98765 43210" value={f.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} className={inp(touched.phone && errors.phone)} />
          {touched.phone && <FieldError msg={errors.phone} />}
        </div>
        <div>
          <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Company Name</label>
          <input type="text" placeholder="Your Company Pvt. Ltd." value={f.company} onChange={(e) => set('company', e.target.value)} className={inp(false)} />
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Service of Interest <span className="text-red-500">*</span></label>
        <select value={f.service} onChange={(e) => set('service', e.target.value)} onBlur={() => blur('service')} className={inp(touched.service && errors.service)}>
          <option value="">Select a service...</option>
          {(services.length > 0 ? services : [
            'Web Development', 'Mobile App Development', 'Digital Marketing',
            'SEO & Growth', 'AI Solutions', 'Other',
          ]).map((s) => <option key={s}>{s}</option>)}
        </select>
        {touched.service && <FieldError msg={errors.service} />}
      </div>

      <div>
        <label className="block text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-1.5">Project Details <span className="text-red-500">*</span></label>
        <textarea rows={4} placeholder="Tell us about your project, goals, and specific requirements... (min. 20 characters)" value={f.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} className={`${inp(touched.message && errors.message)} resize-none`} />
        <div className="flex justify-between mt-1">
          {touched.message ? <FieldError msg={errors.message} /> : <span />}
          <span className={`text-[11px] font-medium ml-auto ${f.message.trim().length >= 20 ? 'text-[#22c55e]' : 'text-[#94A3B8]'}`}>{f.message.trim().length}/20</span>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary btn-shine w-full justify-center py-3 sm:py-3.5 text-xs sm:text-[15px] disabled:opacity-70">
        {submitting ? <><Loader2 size={16} className="animate-spin mr-2" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
      </button>
      <p className="text-[11px] sm:text-[12px] text-[#94A3B8] text-center">We respond within 4 business hours.</p>
    </form>
  )
}

function SuccessCard({ type, onReset }) {
  return (
    <div className="text-center flex flex-col items-center justify-center py-8 min-h-[300px]">
      <div className="w-16 h-16 bg-[#FBF5DC] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
        <CheckCircle2 size={32} className="text-[#D4AF37]" />
      </div>
      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-xl sm:text-2xl text-[#0F172A] mb-2">
        {type === 'student' ? '🎓 Request Sent!' : '✅ Message Sent!'}
      </h3>
      <p className="text-[#475569] text-xs sm:text-[15px] max-w-sm leading-relaxed mb-6">
        {type === 'student'
          ? 'Our academic advisor will call you within 24 hours to guide you through enrollment.'
          : 'Thank you for reaching out. Our team will contact you within 4 business hours.'
        }
      </p>
      <button onClick={onReset} className="btn-secondary text-xs sm:text-sm">Send Another Message</button>
    </div>
  )
}

function ErrorBanner({ msg, onClose }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5">
      <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-bold text-red-700">Submission Failed</p>
        <p className="text-xs text-red-600 mt-0.5">{msg}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600"><X size={14} /></button>
    </div>
  )
}

/* ─── MAIN ─── */
export default function Contact() {
  const [activeTab, setActiveTab] = useState('student')
  const [courseList, setCourseList] = useState([])
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    fetch(`${API}/api/courses`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCourseList([...data.map(c => c.title), 'Other'])
        }
      })
      .catch(() => {})
    fetch(`${API}/api/services`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServiceList([...data.map(s => s.title), 'Other'])
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="pt-16 overflow-hidden">
      {/* HERO */}
      <section className="relative bg-white overflow-hidden min-h-[45vh] flex items-center">
        <div className="hero-orb hero-orb-1 animate-orb-1 opacity-20" />
        <div className="hero-orb hero-orb-2 animate-orb-2 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full text-center">
          <div className="animate-hero-up max-w-3xl mx-auto">
            <span className="highlight-tag mb-4 sm:mb-6 inline-flex"><Sparkles size={13} /> Get In Touch</span>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-3xl sm:text-4xl lg:text-[62px] text-[#0F172A] leading-[1.1] mb-4 sm:mb-6">
              Let's Start a <span className="hero-gold-text">Conversation</span>
            </h1>
            <p className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed">
              Whether you're a student looking to upskill or a business ready to scale — we have the right solution for you.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="relative py-12 sm:py-20 section-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* FORM CARD */}
            <div className="lg:col-span-3">
              <div className="card-gold bg-white rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-lg">

                {/* TAB SWITCHER */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-[11px] sm:text-[13px] text-[#94A3B8] font-bold uppercase tracking-widest mb-3 text-center">Who are you?</p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 bg-[#F1F5F9] rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab('student')}
                      className={`flex items-center justify-center gap-2 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-[14px] font-bold transition-all duration-300 ${
                        activeTab === 'student'
                          ? 'bg-white text-[#D4AF37] shadow-md border border-[#D4AF37]/30'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <GraduationCap size={16} />
                      I'm a Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('business')}
                      className={`flex items-center justify-center gap-2 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-[14px] font-bold transition-all duration-300 ${
                        activeTab === 'business'
                          ? 'bg-white text-[#D4AF37] shadow-md border border-[#D4AF37]/30'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <Briefcase size={16} />
                      I'm a Business
                    </button>
                  </div>
                </div>

                {/* FORM CONTENT */}
                <div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-lg sm:text-xl text-[#0F172A] mb-4 sm:mb-5">
                    {activeTab === 'student' ? 'Course Enquiry Form' : 'Business Enquiry Form'}
                  </h2>
                  {activeTab === 'student'
                    ? <StudentForm key="student" courses={courseList} />
                    : <BusinessForm key="business" services={serviceList} />}
                </div>

              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">

              <Animate className="glass-card p-6 sm:p-8">
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-base sm:text-lg text-[#0F172A] mb-5">Contact Details</h3>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: Phone, label: 'Phone', value: '+91 6383283731', sub: 'Mon - Fri 10am - 6pm' },
                    { icon: Mail, label: 'Email', value: 'acspire26@gmail.com', sub: 'Quick Response' },
                    { icon: MapPin, label: 'Headquarters', value: 'Plot No A1, Mangalakshmi nagar', sub: 'madhanathapuram, Porur, Chennai 600125' },
                    { icon: Clock, label: 'Working Hours', value: 'Monday to Friday', sub: '10:00 AM – 6:00 PM (IST)' },
                  ].map(({ icon: Icon, label, value, sub }) => (
                    <div key={label} className="flex gap-3.5">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FBF5DC] rounded-xl flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                        <Icon size={16} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider mb-0.5">{label}</p>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-xs sm:text-[15px] text-[#0F172A]">{value}</p>
                        <p className="text-[11px] sm:text-[12.5px] text-[#64748B]">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Animate>

              <Animate delay={100} className="glass-card p-6 sm:p-8">
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-base sm:text-lg text-[#0F172A] mb-4">Which form is right for you?</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                    <GraduationCap size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-0.5">Student Form</p>
                      <p className="text-[11px] sm:text-[12.5px] text-[#64748B] leading-relaxed">For students, freshers, and professionals wanting to learn new skills.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                    <Briefcase size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-[13.5px] font-bold text-[#0F172A] mb-0.5">Business Form</p>
                      <p className="text-[11px] sm:text-[12.5px] text-[#64748B] leading-relaxed">For businesses needing web dev, marketing, AI, or digital solutions.</p>
                    </div>
                  </div>
                </div>
              </Animate>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
