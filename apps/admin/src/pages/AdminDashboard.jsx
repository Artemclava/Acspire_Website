import { useEffect, useState } from 'react'
import { MessageSquare, Briefcase, FileText, GraduationCap, Loader2, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { API_BASE_URL as API } from '../api/config'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, unread: 0, student: 0, business: 0 })
  const [counts, setCounts] = useState({ jobs: 0, blogs: 0, courses: 0, services: 0 })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('acspire_admin_token')
    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch(`${API}/api/contacts/stats`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/contacts`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/jobs/all`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/blogs/admin/all`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/courses`).then((r) => r.json()),
      fetch(`${API}/api/services`).then((r) => r.json()),
    ])
      .then(([statsRes, contactsRes, jobsRes, blogsRes, coursesRes, servicesRes]) => {
        if (statsRes?.error || contactsRes?.error || jobsRes?.error || blogsRes?.error) {
          if (
            statsRes?.error?.includes('token') ||
            contactsRes?.error?.includes('token') ||
            jobsRes?.error?.includes('token') ||
            blogsRes?.error?.includes('token')
          ) {
            localStorage.removeItem('acspire_admin_token')
            window.location.href = '/admin/login'
            return
          }
        }
        setStats(statsRes && !statsRes.error ? statsRes : { total: 0, unread: 0, student: 0, business: 0 })
        setRecentContacts(Array.isArray(contactsRes) ? contactsRes.slice(0, 5) : [])
        setCounts({
          jobs: Array.isArray(jobsRes) ? jobsRes.length : 0,
          blogs: Array.isArray(blogsRes) ? blogsRes.length : 0,
          courses: Array.isArray(coursesRes) ? coursesRes.length : 0,
          services: Array.isArray(servicesRes) ? servicesRes.length : 0,
        })
      })
      .catch((err) => console.error('Dashboard fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#D4AF37]">
        <Loader2 size={32} className="animate-spin" />
      </div>
    )
  }

  const statCards = [
    { title: 'Total Inquiries', value: stats.total, sub: `${stats.unread} unread`, icon: MessageSquare, link: '/admin/contacts', badgeBg: 'bg-amber-50 text-amber-600 border-amber-200' },
    { title: 'Job Listings', value: counts.jobs, sub: 'Active roles', icon: Briefcase, link: '/admin/jobs', badgeBg: 'bg-blue-50 text-blue-600 border-blue-200' },
    { title: 'Blog Articles', value: counts.blogs, sub: 'Published & drafts', icon: FileText, link: '/admin/blogs', badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { title: 'Courses', value: counts.courses, sub: 'Offered tracks', icon: GraduationCap, link: '/admin/courses', linkText: 'View Courses', badgeBg: 'bg-purple-50 text-purple-600 border-purple-200' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-[#64748B] text-sm">
          Welcome back! Here is a summary of your website leads, articles, and active programs.
        </p>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              to={card.link}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.badgeBg}`}>
                  <Icon size={22} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider mb-1">{card.title}</p>
                <h3 className="text-3xl font-black text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {card.value}
                </h3>
                <p className="text-[#64748B] text-xs font-medium">{card.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Contact Inquiries Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Recent Contact Submissions
            </h2>
            <p className="text-[#64748B] text-xs">Latest inquiries received from website visitors</p>
          </div>
          <Link
            to="/admin/contacts"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-[#0F172A] hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            View All Submissions ({stats.total}) <ArrowUpRight size={14} />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="text-[#64748B] text-sm py-12 text-center italic">No contact submissions found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 rounded-l-xl">Type</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Interest</th>
                  <th className="py-3.5 px-4 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {recentContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          c.type === 'Student Enquiry'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                      {c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B] font-medium">{c.email}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{c.course || c.service || '-'}</td>
                    <td className="py-3.5 px-4 text-xs text-[#94A3B8] font-medium">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
