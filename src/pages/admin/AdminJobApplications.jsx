import { useState, useEffect, useCallback } from 'react'
import {
  Users, CheckCircle2, Clock4, XCircle, Search, ChevronDown,
  Trash2, Mail, Phone, Briefcase, Link as LinkIcon, FileText,
  Eye, RefreshCw, AlertCircle, Calendar,
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const STATUS_CONFIG = {
  pending:  { label: 'Pending',  color: '#64748B', bg: '#F1F5F9', dot: '#94A3B8' },
  selected: { label: 'Selected', color: '#15803D', bg: '#F0FDF4', dot: '#22C55E' },
  waiting:  { label: 'Waiting',  color: '#B45309', bg: '#FFFBEB', dot: '#F59E0B' },
  rejected: { label: 'Rejected', color: '#B91C1C', bg: '#FEF2F2', dot: '#EF4444' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold"
      style={{ background: cfg.bg, color: cfg.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4 shadow-sm">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-[#0F172A]">{value}</p>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default function AdminJobApplications() {
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, selected: 0, waiting: 0, rejected: 0, unread: 0 })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [updating, setUpdating] = useState(null)

  const token = localStorage.getItem('acspire_admin_token')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [appsRes, statsRes] = await Promise.all([
        fetch(`${API}/api/job-applications?status=${statusFilter}`, { headers }),
        fetch(`${API}/api/job-applications/stats`, { headers }),
      ])
      const appsData = await appsRes.json()
      const statsData = await statsRes.json()
      setApplications(Array.isArray(appsData) ? appsData : [])
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchAll() }, [fetchAll])

  const updateStatus = async (id, status) => {
    setUpdating(id)
    try {
      await fetch(`${API}/api/job-applications/${id}/status`, {
        method: 'PATCH', headers,
        body: JSON.stringify({ status }),
      })
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status, is_read: 1 } : a))
      setStats((prev) => ({ ...prev }))
      if (selected?.id === id) setSelected((p) => ({ ...p, status, is_read: 1 }))
      fetchAll()
    } finally {
      setUpdating(null)
    }
  }

  const deleteApp = async (id) => {
    if (!window.confirm('Delete this application?')) return
    await fetch(`${API}/api/job-applications/${id}`, { method: 'DELETE', headers })
    setApplications((prev) => prev.filter((a) => a.id !== id))
    if (selected?.id === id) setSelected(null)
    fetchAll()
  }

  const openDetail = async (app) => {
    setSelected(app)
    if (!app.is_read) {
      await fetch(`${API}/api/job-applications/${app.id}/read`, { method: 'PATCH', headers })
      setApplications((prev) => prev.map((a) => a.id === app.id ? { ...a, is_read: 1 } : a))
    }
  }

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase()
    return !q || a.name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.job_title?.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Job Applications
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Review and manage candidate applications</p>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={Users}        label="Total"    value={stats.total}    color="#6366F1" />
        <StatCard icon={AlertCircle}  label="Pending"  value={stats.pending}  color="#64748B" />
        <StatCard icon={CheckCircle2} label="Selected" value={stats.selected} color="#16A34A" />
        <StatCard icon={Clock4}       label="Waiting"  value={stats.waiting}  color="#D97706" />
        <StatCard icon={XCircle}      label="Rejected" value={stats.rejected} color="#DC2626" />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or job title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'selected', 'waiting', 'rejected'].map((s) => (
            <button key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all border shadow-sm ${statusFilter === s
                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'}`}>
              {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <RefreshCw size={18} className="animate-spin" />
            <span className="text-sm font-medium">Loading applications…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Users size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-600 font-bold mb-1">No applications found</p>
            <p className="text-slate-400 text-sm">Try changing the filter or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F1F5F9]">
                  {['Applicant', 'Applied For', 'Experience', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {filtered.map((app) => (
                  <tr key={app.id}
                    className={`hover:bg-[#FAFBFC] transition-colors ${!app.is_read ? 'bg-[#FFFBEB]/40' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {!app.is_read && <div className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />}
                        <div>
                          <p className="font-bold text-[#0F172A] text-sm">{app.name}</p>
                          <p className="text-xs text-slate-500">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-700">{app.job_title}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-600 font-medium">{app.experience || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-500">{new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openDetail(app)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" title="View details">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => deleteApp(app.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl" style={{ animation: 'slideIn 0.3s ease' }}>
            {/* Drawer header */}
            <div className="sticky top-0 bg-white border-b border-[#F1F5F9] px-7 py-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {selected.name}
                </h2>
                <p className="text-sm text-slate-500">{selected.job_title}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors mt-0.5">
                ✕
              </button>
            </div>

            {/* Status update bar */}
            <div className="px-7 py-4 bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <button key={key}
                    disabled={updating === selected.id}
                    onClick={() => updateStatus(selected.id, key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selected.status === key ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                    style={{
                      background: selected.status === key ? cfg.bg : '#fff',
                      color: cfg.color,
                      borderColor: cfg.dot,
                      ringColor: cfg.dot,
                    }}>
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="px-7 py-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Mail,    label: 'Email',      value: selected.email },
                  { icon: Phone,   label: 'Phone',      value: selected.phone || '—' },
                  { icon: Briefcase, label: 'Experience', value: selected.experience || '—' },
                  { icon: Calendar, label: 'Applied',   value: new Date(selected.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#F8FAFC] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={13} className="text-slate-400" />
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>

              {selected.linkedin && (
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <LinkIcon size={13} className="text-slate-400" />
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn</p>
                  </div>
                  <a href={selected.linkedin} target="_blank" rel="noreferrer"
                    className="text-sm font-semibold text-[#1E3A8A] hover:underline break-all">{selected.linkedin}</a>
                </div>
              )}

              {selected.cover_letter && (
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={13} className="text-slate-400" />
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cover Letter / Message</p>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selected.cover_letter}</p>
                </div>
              )}

              <button onClick={() => deleteApp(selected.id)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
                <Trash2 size={14} />
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
