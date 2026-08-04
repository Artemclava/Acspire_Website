import { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.jpeg'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid credentials. Please try again.')
      localStorage.setItem('acspire_admin_token', data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#F7F8FA', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ─── Left Brand Panel ─── */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0B1120 0%, #111827 60%, #0D1B2A 100%)' }}>

        {/* Geometric accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04]"
          style={{
            background: 'conic-gradient(from 0deg at 100% 0%, #C9A227, #E8C84A, #C9A227, transparent 60%)',
            borderBottomLeftRadius: '100%',
          }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.03]"
          style={{
            background: 'conic-gradient(from 180deg at 0% 100%, #C9A227, #E8C84A, #C9A227, transparent 60%)',
            borderTopRightRadius: '100%',
          }} />

        {/* Top section */}
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.2)' }}>
              <img src={logoImg} alt="ACSPIRE" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="text-white font-bold text-base tracking-wide">ACSPIRE</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#C9A227' }}>Admin Portal</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#F1F5F9' }}>
              Manage your<br />
              <span style={{ color: '#C9A227' }}>platform</span> with<br />
              confidence.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
              Access your dashboard to oversee content, leads, courses, and services — all in one place.
            </p>
          </div>
        </div>

        {/* Feature list */}
        <div className="space-y-4">
          {[
            { label: 'Content Management', sub: 'Blogs, courses & services' },
            { label: 'Lead Tracking', sub: 'Contact form submissions' },
            { label: 'Secure Access', sub: 'JWT-protected sessions' },
          ].map(({ label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.15)' }}>
                <ChevronRight size={14} style={{ color: '#C9A227' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>{label}</p>
                <p className="text-xs" style={{ color: 'rgba(100,116,139,0.9)' }}>{sub}</p>
              </div>
            </div>
          ))}

          <p className="text-xs pt-6" style={{ color: 'rgba(71,85,105,0.7)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
            © {new Date().getFullYear()} ACSPIRE. All rights reserved.
          </p>
        </div>
      </div>

      {/* ─── Right Form Panel ─── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className="w-full max-w-[400px]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-lg overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
              <img src={logoImg} alt="ACSPIRE" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-wide">ACSPIRE</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1.5">Sign in to your account</h1>
            <p className="text-sm text-slate-500">Enter your admin credentials to continue.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
              style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <span className="text-red-400 mt-0.5 text-base shrink-0">⚠</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@acspire.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 rounded-xl outline-none transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1.5px solid #C9A227'
                    e.target.style.boxShadow = '0 0 0 3px rgba(201,162,39,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1.5px solid #E2E8F0'
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full pl-10 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 rounded-xl outline-none transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1.5px solid #C9A227'
                    e.target.style.boxShadow = '0 0 0 3px rgba(201,162,39,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1.5px solid #E2E8F0'
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-150 mt-1 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #C9A227 0%, #A07D18 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(201,162,39,0.3), 0 1px 3px rgba(0,0,0,0.12)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,162,39,0.4), 0 2px 6px rgba(0,0,0,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(201,162,39,0.3), 0 1px 3px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(0.99)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign in
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid #F1F5F9' }}>
            <p className="text-xs text-slate-400">
              Need help?{' '}
              <a href="mailto:acspire26@gmail.com"
                className="font-semibold transition-colors"
                style={{ color: '#C9A227' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#A07D18')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A227')}>
                acspire26@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
