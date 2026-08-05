import { useEffect, useState } from 'react'
import { Trash2, CheckCircle, Search, Loader2, Mail, Phone, Calendar, User, Briefcase, GraduationCap, AlertTriangle, X } from 'lucide-react'

import { API_BASE_URL as API } from '../api/config'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchContacts = () => {
    setLoading(true)
    const token = localStorage.getItem('acspire_admin_token')
    fetch(`${API}/api/contacts?type=${filter}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setContacts(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchContacts()
  }, [filter])

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/contacts/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id))
      if (selected?.id === deleteTarget.id) setSelected(null)
      setDeleteTarget(null)
    } catch (err) {
      alert('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const handleMarkRead = async (id) => {
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/contacts/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      })
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, is_read: 1 } : c)))
      if (selected?.id === id) setSelected((p) => ({ ...p, is_read: 1 }))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase()
    const nameStr = (c.name || `${c.first_name || ''} ${c.last_name || ''}`).toLowerCase()
    const emailStr = (c.email || '').toLowerCase()
    const phoneStr = (c.phone || '').toLowerCase()
    return nameStr.includes(q) || emailStr.includes(q) || phoneStr.includes(q)
  })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Contact Submissions
          </h1>
          <p className="text-[#64748B] text-sm">View and manage all inquiries submitted through the contact forms.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#E2E8F0] shadow-xs">
          {['All', 'Student Enquiry', 'Business Enquiry'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6 relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-xs transition-all"
        />
      </div>

      {/* Content layout: List + Detail sidepanel */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className={selected ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-[#D4AF37]">
                <Loader2 size={28} className="animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-[#64748B] text-center py-16 text-sm italic">No contact records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Name</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Interest</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filtered.map((c) => {
                      const displayName = c.name || `${c.first_name || ''} ${c.last_name || ''}`.trim() || 'N/A'
                      const isSelected = selected?.id === c.id

                      return (
                        <tr
                          key={c.id}
                          onClick={() => {
                            setSelected(c)
                            if (!c.is_read) handleMarkRead(c.id)
                          }}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#FBF5DC]/60 border-l-4 border-l-[#D4AF37]'
                              : c.is_read
                              ? 'hover:bg-slate-50 opacity-75'
                              : 'hover:bg-slate-50 font-bold bg-slate-50/50'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold ${
                                c.type === 'Student Enquiry'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {c.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#0F172A]">{displayName}</td>
                          <td className="py-3.5 px-4 text-[#64748B] font-medium">{c.email}</td>
                          <td className="py-3.5 px-4 text-slate-800 font-semibold">{c.course || c.service || '-'}</td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setDeleteTarget(c)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Selected Contact Details Sidepanel */}
        {selected && (
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md h-fit sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2 ${
                    selected.type === 'Student Enquiry'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {selected.type}
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {selected.name || `${selected.first_name || ''} ${selected.last_name || ''}`.trim()}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-500 hover:text-slate-900 text-xs font-bold px-2.5 py-1.5 bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                <Mail size={16} className="text-[#D4AF37] shrink-0" />
                <a href={`mailto:${selected.email}`} className="hover:underline text-blue-600 font-bold">{selected.email}</a>
              </div>

              {selected.phone && (
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <Phone size={16} className="text-[#D4AF37] shrink-0" />
                  <a href={`tel:${selected.phone}`} className="hover:underline font-semibold">{selected.phone}</a>
                </div>
              )}

              {selected.company && (
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <Briefcase size={16} className="text-[#D4AF37] shrink-0" />
                  <span>Company: <strong className="text-slate-900">{selected.company}</strong></span>
                </div>
              )}

              {selected.qualification && (
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <GraduationCap size={16} className="text-[#D4AF37] shrink-0" />
                  <span>Qualification: <strong className="text-slate-900">{selected.qualification}</strong></span>
                </div>
              )}

              {(selected.course || selected.service) && (
                <div className="p-3.5 bg-[#FBF5DC]/60 rounded-xl border border-[#D4AF37]/30">
                  <p className="text-[11px] font-extrabold text-[#B89222] uppercase tracking-wider mb-1">
                    {selected.type === 'Student Enquiry' ? 'Interested Course' : 'Interested Service'}
                  </p>
                  <p className="font-extrabold text-[#0F172A] text-sm">{selected.course || selected.service}</p>
                </div>
              )}

              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Message / Requirements</p>
                <div className="p-4 bg-slate-50 rounded-xl text-slate-800 text-sm leading-relaxed border border-slate-200">
                  {selected.message || 'No message provided.'}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar size={13} /> {selected.created_at ? new Date(selected.created_at).toLocaleString() : '-'}
                </span>
                <button
                  onClick={() => setDeleteTarget(selected)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 font-bold"
                >
                  <Trash2 size={13} /> Delete Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Delete Inquiry Record?
                </h3>
                <p className="text-slate-500 text-xs">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Are you sure you want to delete inquiry from <strong className="text-slate-900">"{deleteTarget.name || deleteTarget.email}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all disabled:opacity-60"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
