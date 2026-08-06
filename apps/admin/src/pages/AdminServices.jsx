import { useEffect, useState, useRef } from 'react'
import { Plus, Edit2, Trash2, Loader2, X, Upload, Image as ImageIcon, Tag, PlusCircle, AlertTriangle } from 'lucide-react'

import { API_BASE_URL as API } from '../api/config'

const ICON_OPTIONS = [
  { value: 'BarChart3',    label: 'BarChart3 — Marketing' },
  { value: 'Search',       label: 'Search — SEO' },
  { value: 'TrendingUp',   label: 'TrendingUp — Performance' },
  { value: 'Palette',      label: 'Palette — Branding' },
  { value: 'Globe',        label: 'Globe — Web' },
  { value: 'Smartphone',   label: 'Smartphone — Mobile' },
  { value: 'Code2',        label: 'Code2 — AI / Tech' },
  { value: 'Megaphone',    label: 'Megaphone — Ads' },
  { value: 'Video',        label: 'Video — Content' },
  { value: 'Mail',         label: 'Mail — Email Mktg' },
]

const getImageSrc = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=400&fit=crop'
  if (url.startsWith('http')) return url
  return `https://images.unsplash.com/${url}?w=700&h=400&fit=crop&auto=format`
}

const DEFAULT_FORM = {
  title: '',
  description: '',
  features: [],
  image_url: 'photo-1460925895917-afdab827c52f',
  icon_name: 'BarChart3',
  sort_order: 0,
}

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState(DEFAULT_FORM)
  const [newFeature, setNewFeature] = useState('')
  const featureInputRef = useRef(null)

  const fetchServices = () => {
    setLoading(true)
    fetch(`${API}/api/services`)
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchServices() }, [])

  const openCreateModal = () => {
    setEditingService(null)
    setNewFeature('')
    setForm({ ...DEFAULT_FORM, sort_order: services.length + 1 })
    setShowModal(true)
  }

  const openEditModal = (service) => {
    setEditingService(service)
    setNewFeature('')
    setForm({
      title: service.title,
      description: service.description || '',
      features: Array.isArray(service.features) ? service.features : (service.features || '').split(',').map((f) => f.trim()).filter(Boolean),
      image_url: service.image_url || DEFAULT_FORM.image_url,
      icon_name: service.icon_name || 'BarChart3',
      sort_order: service.sort_order || 0,
    })
    setShowModal(true)
  }

  const addFeature = () => {
    const val = newFeature.trim()
    if (!val) return
    setForm((p) => ({ ...p, features: [...p.features, val] }))
    setNewFeature('')
    featureInputRef.current?.focus()
  }

  const removeFeature = (idx) => {
    setForm((p) => ({ ...p, features: p.features.filter((_, i) => i !== idx) }))
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
    const url = editingService ? `${API}/api/services/${editingService.id}` : `${API}/api/services`
    const method = editingService ? 'PUT' : 'POST'

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
      fetchServices()
    } catch (err) {
      alert('Failed to save service')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/services/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setDeleteTarget(null)
      fetchServices()
    } catch (err) {
      alert('Failed to delete service')
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
            Services Offered
          </h1>
          <p className="text-[#64748B] text-sm">Manage business services, features, and technology tags shown on the site.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus size={16} className="text-[#D4AF37]" /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#D4AF37]">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-sm">
          <p className="text-[#64748B] text-sm mb-4 italic">No services created yet.</p>
          <button onClick={openCreateModal} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Create First Service
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="aspect-[16/9] relative bg-slate-100 overflow-hidden">
                <img
                  src={getImageSrc(service.image_url)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=400&fit=crop' }}
                />
                <span className="absolute top-3 left-3 bg-[#0F172A] text-[#D4AF37] text-[10.5px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {service.icon_name}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-[#64748B] text-xs leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map((f) => (
                        <span key={f} className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-200">
                          <Tag size={10} className="text-[#D4AF37]" /> {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-slate-100">
                  <button onClick={() => openEditModal(service)} className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(service)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white resize-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Icon</label>
                <select
                  value={form.icon_name}
                  onChange={(e) => setForm((p) => ({ ...p, icon_name: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                >
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic.value} value={ic.value}>{ic.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
                  Features / Tech Stack Tags
                </label>
                {form.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.features.map((f, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs px-3 py-1 rounded-full font-medium">
                        {f}
                        <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700 ml-0.5">
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={featureInputRef}
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-all"
                  >
                    <PlusCircle size={14} className="text-[#D4AF37]" /> Add Tag
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] mt-1.5">Press Enter or click "Add Tag" to add.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
                  Service Photo — Fixed 16:9 Ratio
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
                  {editingService ? 'Update Service' : 'Save Service'}
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
                  Delete Service?
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
