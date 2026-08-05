import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Loader2, MapPin, Clock, Briefcase, Check, X, AlertTriangle } from 'lucide-react'

import { API_BASE_URL as API } from '../api/config'

export default function AdminJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    dept: 'Engineering',
    location: 'Chennai',
    type: 'Full-Time',
    level: 'Senior',
    description: '',
    is_active: 1,
  })

  const fetchJobs = () => {
    setLoading(true)
    const token = localStorage.getItem('acspire_admin_token')
    fetch(`${API}/api/jobs/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const openCreateModal = () => {
    setEditingJob(null)
    setForm({
      title: '',
      dept: 'Engineering',
      location: 'Chennai',
      type: 'Full-Time',
      level: 'Senior',
      description: '',
      is_active: 1,
    })
    setShowModal(true)
  }

  const openEditModal = (job) => {
    setEditingJob(job)
    setForm({
      title: job.title,
      dept: job.dept || 'Engineering',
      location: job.location || 'Chennai',
      type: job.type || 'Full-Time',
      level: job.level || 'Senior',
      description: job.description || '',
      is_active: job.is_active,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('acspire_admin_token')
    const url = editingJob ? `${API}/api/jobs/${editingJob.id}` : `${API}/api/jobs`
    const method = editingJob ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Operation failed')
      setShowModal(false)
      fetchJobs()
    } catch (err) {
      alert('Error saving job posting')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/jobs/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      alert('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const toggleActive = async (job) => {
    const token = localStorage.getItem('acspire_admin_token')
    const updated = { ...job, is_active: job.is_active ? 0 : 1 }
    try {
      await fetch(`${API}/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      })
      setJobs((prev) => prev.map((j) => (j.id === job.id ? updated : j)))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Job Openings
          </h1>
          <p className="text-[#64748B] text-sm">Post new job openings or edit existing career opportunities displayed on the website.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus size={16} className="text-[#D4AF37]" /> Post New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#D4AF37]">
            <Loader2 size={28} className="animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-[#64748B] text-center py-16 text-sm italic">No job postings found. Click "Post New Job" to create one.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#D4AF37]/50 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                      {job.dept}
                    </span>
                    <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                      {job.level}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        job.is_active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {job.is_active ? 'Active' : 'Draft'}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {job.title}
                  </h3>
                  <p className="text-[#64748B] text-xs line-clamp-2 mb-3 max-w-2xl">{job.description}</p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={13} className="text-[#D4AF37]" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={13} className="text-[#D4AF37]" /> {job.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => toggleActive(job)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      job.is_active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {job.is_active ? 'Deactivate' : 'Publish'}
                  </button>

                  <button
                    onClick={() => openEditModal(job)}
                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(job)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {editingJob ? 'Edit Job Posting' : 'Create Job Posting'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior React Developer"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="Engineering, Marketing..."
                    value={form.dept}
                    onChange={(e) => setForm((p) => ({ ...p, dept: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Chennai / Remote"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Experience Level</label>
                  <input
                    type="text"
                    placeholder="Senior, Mid-Level..."
                    value={form.level}
                    onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Responsibilities, requirements, and benefits..."
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white resize-none transition"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={!!form.is_active}
                  onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked ? 1 : 0 }))}
                  className="w-4 h-4 accent-[#D4AF37]"
                />
                <label htmlFor="is_active" className="text-sm font-semibold text-slate-800 cursor-pointer">
                  Publish immediately (Visible on website)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 shadow-md"
                >
                  {editingJob ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  Delete Job Opening?
                </h3>
                <p className="text-slate-500 text-xs">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Are you sure you want to delete <strong className="text-slate-900">"{deleteTarget.title}"</strong>?
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
