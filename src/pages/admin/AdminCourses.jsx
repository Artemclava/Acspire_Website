import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Loader2, X, Upload, Image as ImageIcon, AlertTriangle } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const PRESET_BADGES = [
  'Popular', 'Trending', 'Career Track',
  'Advanced', 'Hands-on', 'Essential',
  'High Demand', 'Management', 'Growth', 'Leadership',
]

const TRACKS = ['Digital Marketing', 'Technology & AI', 'Business & Leadership']
const CUSTOM_TRACK_KEY = '__custom__'

const getImageSrc = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=400&fit=crop'
  if (url.startsWith('http')) return url
  return `https://images.unsplash.com/${url}?w=700&h=400&fit=crop&auto=format`
}

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [customBadge, setCustomBadge] = useState(false)
  const [customTrack, setCustomTrack] = useState('')
  const [selectedTrackKey, setSelectedTrackKey] = useState('Digital Marketing')
  const [form, setForm] = useState({
    title: '',
    track: 'Digital Marketing',
    track_subtitle: '',
    description: '',
    tag: 'Popular',
    image_url: 'photo-1460925895917-afdab827c52f',
    sort_order: 0,
  })

  const fetchCourses = () => {
    setLoading(true)
    fetch(`${API}/api/courses`)
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCourses() }, [])

  const openCreateModal = () => {
    setEditingCourse(null)
    setCustomBadge(false)
    setCustomTrack('')
    setSelectedTrackKey('Digital Marketing')
    setForm({
      title: '',
      track: 'Digital Marketing',
      track_subtitle: '',
      description: '',
      tag: 'Popular',
      image_url: 'photo-1460925895917-afdab827c52f',
      sort_order: courses.length + 1,
    })
    setShowModal(true)
  }

  const openEditModal = (course) => {
    setEditingCourse(course)
    const isCustom = !PRESET_BADGES.includes(course.tag)
    setCustomBadge(isCustom)
    const isCustomTrack = !TRACKS.includes(course.track)
    setSelectedTrackKey(isCustomTrack ? CUSTOM_TRACK_KEY : (course.track || 'Digital Marketing'))
    setCustomTrack(isCustomTrack ? (course.track || '') : '')
    setForm({
      title: course.title,
      track: course.track || 'Digital Marketing',
      track_subtitle: course.track_subtitle || '',
      description: course.description || '',
      tag: course.tag || 'Popular',
      image_url: course.image_url || '',
      sort_order: course.sort_order || 0,
    })
    setShowModal(true)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const res = await fetch(`${API}/api/upload`, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm((p) => ({ ...p, image_url: data.url }))
    } catch (err) {
      alert('Image upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('acspire_admin_token')
    const finalTrack = selectedTrackKey === CUSTOM_TRACK_KEY ? customTrack.trim() : selectedTrackKey
    if (!finalTrack) {
      alert('Please enter a track name')
      return
    }

    const payload = {
      ...form,
      track: finalTrack,
    }

    const url = editingCourse ? `${API}/api/courses/${editingCourse.id}` : `${API}/api/courses`
    const method = editingCourse ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Operation failed')
      setShowModal(false)
      fetchCourses()
    } catch (err) {
      alert('Failed: ' + err.message)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/courses/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setDeleteTarget(null)
      fetchCourses()
    } catch (err) {
      alert('Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Course Management
          </h1>
          <p className="text-[#64748B] text-sm">Add, edit, or remove professional course programs displayed on the website.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus size={16} className="text-[#D4AF37]" /> Add New Course
        </button>
      </div>

      {/* Course List / Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#D4AF37]">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-sm">
          <p className="text-[#64748B] text-sm mb-4 italic">No courses created yet.</p>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Create First Course
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/9] relative bg-slate-100 overflow-hidden">
                  <img
                    src={getImageSrc(course.image_url)}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=400&fit=crop' }}
                  />
                  <span className="absolute top-3 left-3 bg-[#0F172A] text-white text-[10.5px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {course.tag || 'Popular'}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-extrabold text-[#B89222] uppercase tracking-wider block mb-1">
                    {course.track || 'General'}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0F172A] leading-snug mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-[11px] font-bold text-slate-400">Sort order: #{course.sort_order ?? 0}</span>
                <div className="flex items-center gap-2 pt-3">
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    title="Edit Course"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(course)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create/Edit Course */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Digital Marketing Masterclass"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Category / Track *</label>
                  <select
                    value={selectedTrackKey}
                    onChange={(e) => {
                      setSelectedTrackKey(e.target.value)
                      if (e.target.value !== CUSTOM_TRACK_KEY) {
                        setForm((p) => ({ ...p, track: e.target.value }))
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  >
                    {TRACKS.map((t) => <option key={t} value={t}>{t}</option>)}
                    <option value={CUSTOM_TRACK_KEY}>+ Custom Track…</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Badge Tag</label>
                  <select
                    value={customBadge ? '__custom__' : form.tag}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setCustomBadge(true)
                        setForm((p) => ({ ...p, tag: '' }))
                      } else {
                        setCustomBadge(false)
                        setForm((p) => ({ ...p, tag: e.target.value }))
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  >
                    {PRESET_BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
                    <option value="__custom__">+ Custom Badge…</option>
                  </select>
                </div>
              </div>

              {selectedTrackKey === CUSTOM_TRACK_KEY && (
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Enter Custom Track Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Data Science & Analytics"
                    value={customTrack}
                    onChange={(e) => setCustomTrack(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                </div>
              )}

              {customBadge && (
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Custom Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Special Offer"
                    value={form.tag}
                    onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Course Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed description of what students will learn..."
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white resize-none transition"
                />
              </div>

              {/* Cover Photo */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
                  Course Image
                </label>
                <div className="relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 mb-3">
                  {form.image_url ? (
                    <img
                      src={getImageSrc(form.image_url)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <ImageIcon size={28} className="mb-1" />
                      <span className="text-xs">No image selected</span>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-[#D4AF37]">
                      <Loader2 size={24} className="animate-spin" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-800 text-xs font-bold cursor-pointer transition-colors">
                    <Upload size={13} className="text-[#D4AF37]" />
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={form.image_url}
                    onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 shadow-md disabled:opacity-60">
                  {editingCourse ? 'Update Course' : 'Save Course'}
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
                  Delete Course?
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
