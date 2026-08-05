import { useEffect, useState, useRef } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Upload,
  Image as ImageIcon,
  AlertTriangle,
  Eye,
  FileText,
  Heading,
  Heading2,
  Quote,
  List,
  Bold,
  Italic,
  CheckCircle,
  FileCode,
  Wand2,
  Sparkles,
} from 'lucide-react'

import { API_BASE_URL as API } from '../api/config'

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').trim()
}

const getImageSrc = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=400&fit=crop'
  if (url.startsWith('http')) return url
  return `https://images.unsplash.com/${url}?w=700&h=400&fit=crop&auto=format`
}

const isHtmlContent = (str) => {
  if (!str) return false
  return /<[a-z][\s\S]*>/i.test(str)
}

const isHeadingLine = (line) => {
  if (!line) return false
  const trimmed = line.trim()
  if (trimmed.length > 90) return false

  const hasSentencePunctuation = /[.:;]$/.test(trimmed) && !/\?$/.test(trimmed)
  if (hasSentencePunctuation && trimmed.length > 45) return false

  const headingKeywords = [
    'why ', 'key ', 'benefits', 'challenges', 'future', 'impact', 'conclusion',
    'overview', 'introduction', 'summary', 'guide', 'types of', 'reasons',
    'applications', 'support', 'analytics', 'marketing', 'operations', 'finance',
    'what is', 'how to', 'best practices', 'advantages', 'disadvantages'
  ]
  const lower = trimmed.toLowerCase()
  if (headingKeywords.some((k) => lower.includes(k))) return true
  if (trimmed.length <= 45 && !hasSentencePunctuation) return true

  return false
}

const parsePlainTextToHtml = (rawText) => {
  if (!rawText || !rawText.trim()) return ''

  if (/<(h[1-6]|p|ul|ol|div|span|blockquote|section|article)\b/i.test(rawText)) {
    return rawText
  }

  const text = rawText.replace(/\r\n/g, '\n')
  const rawBlocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)

  const resultBlocks = []
  let inSubSection = false

  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i]
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)

    const isExplicitList = lines.every((l) => /^[-*•\d+.]/.test(l))
    const isImplicitList = lines.length > 1 && lines.every((l) =>
      /^[-*•\d+.]/.test(l) || (!isHeadingLine(l) && l.length < 130 && /[.:;]?$/.test(l))
    )

    if (isExplicitList || isImplicitList) {
      const items = lines
        .map((l) => {
          let cleaned = l.replace(/^[-*•\d+.\s]+/, '').trim()
          // Automatically bold first 2-4 words if it looks like a feature title (e.g. "Automates repetitive tasks" -> "<strong>Automates repetitive tasks:</strong>")
          if (/^[A-Za-z0-9\s]{3,30}:/.test(cleaned)) {
            cleaned = cleaned.replace(/^([A-Za-z0-9\s]{3,30}:)/, '<strong>$1</strong>')
          }
          return `  <li>${cleaned}</li>`
        })
        .join('\n')
      resultBlocks.push(`<ul>\n${items}\n</ul>`)
      continue
    }

    if (lines.length === 1) {
      const line = lines[0]
      if (isHeadingLine(line)) {
        const cleanHeading = line.replace(/^[-*#\d+.\s]+/, '').trim()
        if (cleanHeading.length < 35 && inSubSection) {
          resultBlocks.push(`<h3>${cleanHeading}</h3>`)
        } else {
          resultBlocks.push(`<h2>${cleanHeading}</h2>`)
          inSubSection = true
        }
        continue
      }
    }

    // Paragraph
    let paraText = lines.join(' ')
    if (/^[A-Za-z0-9\s]{3,25}:/.test(paraText)) {
      paraText = paraText.replace(/^([A-Za-z0-9\s]{3,25}:)/, '<strong>$1</strong>')
    }
    resultBlocks.push(`<p>${paraText}</p>`)
  }

  return resultBlocks.join('\n\n')
}

const DEFAULT_FORM = {
  title: '',
  category: 'Digital Marketing',
  excerpt: '',
  content: '',
  author_name: 'ACSPIRE Team',
  author_img: 'photo-1573496359142-b8d87734a5a2',
  image_url: 'photo-1504384308090-c894fdcc538d',
  read_time: '5 min read',
  is_published: 1,
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [inlineUploading, setInlineUploading] = useState(false)
  const [htmlUploading, setHtmlUploading] = useState(false)
  const [htmlFileName, setHtmlFileName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalTab, setModalTab] = useState('editor')
  const [editingBlog, setEditingBlog] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState(DEFAULT_FORM)

  const textareaRef = useRef(null)

  const fetchBlogs = () => {
    setLoading(true)
    const token = localStorage.getItem('acspire_admin_token')
    fetch(`${API}/api/blogs/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const openCreateModal = () => {
    setEditingBlog(null)
    setForm(DEFAULT_FORM)
    setHtmlFileName('')
    setModalTab('editor')
    setShowModal(true)
  }

  const openEditModal = (blog) => {
    setEditingBlog(blog)
    setForm({
      title: blog.title,
      category: blog.category || 'Digital Marketing',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author_name: blog.author_name || 'ACSPIRE Team',
      author_img: blog.author_img || '',
      image_url: blog.image_url || DEFAULT_FORM.image_url,
      read_time: blog.read_time || '5 min read',
      is_published: blog.is_published,
    })
    setHtmlFileName('')
    setModalTab('editor')
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

  const handleInlineImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    setInlineUploading(true)
    try {
      const res = await fetch(`${API}/api/upload`, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      insertSnippet(`<img src="${data.url}" alt="Article photo" class="my-6 rounded-2xl w-full object-cover shadow-lg border border-[#E2E8F0]" />\n`)
    } catch (err) {
      alert('Inline image upload failed: ' + err.message)
    } finally {
      setInlineUploading(false)
      e.target.value = ''
    }
  }

  const insertSnippet = (snippet) => {
    const textarea = textareaRef.current
    if (!textarea) {
      setForm((p) => ({ ...p, content: (p.content || '') + '\n' + snippet }))
      return
    }
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const current = form.content || ''
    const updated = current.substring(0, start) + snippet + current.substring(end)
    setForm((p) => ({ ...p, content: updated }))
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + snippet.length, start + snippet.length)
    }, 50)
  }

  const handleHtmlUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setHtmlUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const raw = ev.target.result
      let clean = raw.replace(/<head[\s\S]*?<\/head>/gi, '')
      clean = clean.replace(/<style[\s\S]*?<\/style>/gi, '')
      clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '')
      clean = clean.replace(/\s*style\s*=\s*(["'])[^"']*\1/gi, '')
      const bodyMatch = clean.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      clean = bodyMatch ? bodyMatch[1].trim() : clean.replace(/<html[^>]*>|<\/html>|<body[^>]*>|<\/body>/gi, '').trim()

      setForm((p) => ({ ...p, content: clean }))
      setHtmlFileName(file.name)
      setHtmlUploading(false)
    }
    reader.onerror = () => setHtmlUploading(false)
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('acspire_admin_token')
    const url = editingBlog ? `${API}/api/blogs/${editingBlog.id}` : `${API}/api/blogs`
    const method = editingBlog ? 'PUT' : 'POST'

    const cleanTitle = form.title.replace(/^<h[1-6][^>]*>(.*?)<\/h[1-6]>$/i, '$1').trim()
    const cleanExcerpt = form.excerpt.replace(/^<p[^>]*>(.*?)<\/p>$/i, '$1').trim()

    let formattedContent = form.content
    if (formattedContent) {
      formattedContent = parsePlainTextToHtml(formattedContent)
    }

    const payload = {
      ...form,
      title: cleanTitle,
      excerpt: cleanExcerpt,
      content: formattedContent,
    }

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
      fetchBlogs()
    } catch (err) {
      alert('Error saving blog article')
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const token = localStorage.getItem('acspire_admin_token')
    try {
      await fetch(`${API}/api/blogs/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id))
      setDeleteTarget(null)
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
            Blogs Management
          </h1>
          <p className="text-[#64748B] text-sm">Publish, edit, and preview articles for the ACSPIRE blog.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F172A] text-white hover:bg-slate-800 text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus size={16} className="text-[#D4AF37]" /> Write New Article
        </button>
      </div>

      {/* Blogs List */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#D4AF37]">
            <Loader2 size={28} className="animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-[#64748B] text-center py-16 text-sm italic">No blog posts found. Click "Write New Article" to start.</p>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#D4AF37]/50 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 hidden sm:block border border-slate-200">
                    <img
                      src={getImageSrc(blog.image_url)}
                      alt={stripHtml(blog.title)}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-[#FBF5DC] text-[#B89222] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                        {blog.category}
                      </span>
                      <span
                        className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${
                          blog.is_published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {blog.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0F172A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {stripHtml(blog.title)}
                    </h3>
                    <p className="text-[#64748B] text-xs line-clamp-1 max-w-2xl mb-2">{stripHtml(blog.excerpt)}</p>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                      <span>By {blog.author_name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    title="Edit Article"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(blog)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor & Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header + Tab Selector */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-extrabold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {editingBlog ? 'Edit Article' : 'Write New Article'}
                </h2>

                {/* Editor / Live Preview Tabs */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setModalTab('editor')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      modalTab === 'editor'
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      modalTab === 'preview'
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye size={13} /> Live Preview
                  </button>
                </div>
              </div>

              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pt-6 pr-1">
              {modalTab === 'editor' ? (
                /* WRITE / EDIT FORM */
                <form id="blog-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Article Title */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Is Digital Marketing Worth it in 2026?"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                    />
                  </div>

                  {/* Category & Author */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                      >
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="SEO & Growth">SEO & Growth</option>
                        <option value="Branding">Branding</option>
                        <option value="Web Development">Web Development</option>
                        <option value="AI & Technology">AI & Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Author Name</label>
                      <input
                        type="text"
                        placeholder="e.g. ACSPIRE Team"
                        value={form.author_name}
                        onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      Excerpt (Short Preview) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="1–2 sentence summary shown on blog list cards..."
                      value={form.excerpt}
                      onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:border-[#D4AF37] focus:bg-white resize-none transition"
                    />
                  </div>

                  {/* Article Body Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Article Body Content *</label>
                      {!htmlFileName && (
                        <span className="text-[11px] text-slate-400 font-medium">Upload HTML file OR write manually below</span>
                      )}
                    </div>

                    {htmlFileName ? (
                      /* HTML FILE LOCKED MODE */
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-100/60 border-b border-emerald-200">
                          <div className="flex items-center gap-2">
                            <FileCode size={15} className="text-emerald-700" />
                            <span className="text-xs font-extrabold text-emerald-800">HTML File Loaded</span>
                            <span className="text-[11px] text-emerald-700 font-mono truncate max-w-[180px]">{htmlFileName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF5DC] hover:bg-[#F5EAB8] text-[#B89222] border border-[#D4AF37]/40 rounded-lg text-xs font-bold cursor-pointer transition">
                              {inlineUploading ? <Loader2 size={12} className="animate-spin" /> : <ImageIcon size={12} />}
                              {inlineUploading ? 'Uploading…' : '+ Add Image'}
                              <input type="file" accept="image/*" onChange={handleInlineImageUpload} className="hidden" />
                            </label>
                            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer transition">
                              <FileCode size={12} />
                              Replace File
                              <input type="file" accept=".html,.htm" onChange={handleHtmlUpload} className="hidden" />
                            </label>
                            <button
                              type="button"
                              onClick={() => { setHtmlFileName(''); setForm(p => ({ ...p, content: '' })) }}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:bg-red-100/60 rounded-lg text-xs font-bold transition"
                            >
                              <X size={12} /> Clear
                            </button>
                          </div>
                        </div>

                        <div className="px-4 py-3 text-[11.5px] text-emerald-800 font-medium">
                          ✅ {form.content.length.toLocaleString()} characters loaded from <strong className="text-emerald-900">{htmlFileName}</strong>.
                          Use <span className="text-[#B89222] font-bold">+ Add Image</span> to insert photos into the article.
                          Switch to <span className="text-slate-900 font-bold">Live Preview</span> tab to inspect rendering.
                        </div>
                      </div>
                    ) : (
                      /* MANUAL EDITOR MODE */
                      <>
                        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 border border-slate-200 rounded-t-xl text-xs border-b-0">
                          <button
                            type="button"
                            onClick={() => insertSnippet('<h2>Section Heading Title</h2>\n')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <Heading size={13} className="text-[#D4AF37]" /> H2 Heading
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<h3>Subheading Title</h3>\n')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <Heading2 size={13} className="text-[#D4AF37]" /> H3 Subheading
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<p>Your paragraph text here...</p>\n')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <FileText size={13} className="text-[#D4AF37]" /> Paragraph
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<ul>\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n</ul>\n')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <List size={13} className="text-[#D4AF37]" /> Bullet List
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<blockquote>"Your highlight quote text here"</blockquote>\n')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <Quote size={13} className="text-[#D4AF37]" /> Quote Box
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<b>bold text</b>')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <Bold size={13} className="text-[#D4AF37]" /> Bold
                          </button>

                          <button
                            type="button"
                            onClick={() => insertSnippet('<i>italic text</i>')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition border border-slate-200"
                          >
                            <Italic size={13} className="text-[#D4AF37]" /> Italic
                          </button>

                          <label className="flex items-center gap-1 px-2.5 py-1 bg-[#FBF5DC] hover:bg-[#F5EAB8] text-[#B89222] border border-[#D4AF37]/30 rounded-lg font-bold cursor-pointer transition">
                            {inlineUploading ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
                            {inlineUploading ? 'Uploading…' : '+ Add Photo'}
                            <input type="file" accept="image/*" onChange={handleInlineImageUpload} className="hidden" />
                          </label>

                          <label className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg font-bold cursor-pointer transition">
                            {htmlUploading ? <Loader2 size={13} className="animate-spin" /> : <FileCode size={13} />}
                            {htmlUploading ? 'Reading…' : '📄 Upload HTML File'}
                            <input type="file" accept=".html,.htm" onChange={handleHtmlUpload} className="hidden" />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              if (!form.content) return
                              const autoHtml = parsePlainTextToHtml(form.content)
                              setForm((p) => {
                                let newTitle = p.title
                                let newExcerpt = p.excerpt
                                if (!newTitle) {
                                  const hMatch = autoHtml.match(/<h[23]>(.*?)<\/h[23]>/i)
                                  if (hMatch) newTitle = hMatch[1]
                                }
                                if (!newExcerpt) {
                                  const pMatch = autoHtml.match(/<p>(.*?)<\/p>/i)
                                  if (pMatch) newExcerpt = pMatch[1].substring(0, 160) + '...'
                                }
                                return { ...p, content: autoHtml, title: newTitle, excerpt: newExcerpt }
                              })
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg font-bold transition shadow-xs"
                          >
                            <Wand2 size={13} className="text-[#D4AF37]" /> ✨ Auto-Format Plain Text
                          </button>
                        </div>

                        <textarea
                          ref={textareaRef}
                          rows={10}
                          required
                          placeholder="Write your article body here — or click '📄 Upload HTML File' above to load from a file…"
                          value={form.content}
                          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-b-xl text-slate-900 text-xs outline-none focus:border-[#D4AF37] focus:bg-white resize-y font-sans leading-relaxed transition"
                        />
                      </>
                    )}
                  </div>

                  {/* Cover Photo Upload */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
                      Article Cover Photo — Fixed 16:9 Ratio
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
                          <span className="text-xs">No cover image selected</span>
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
                        Upload Local Cover Photo
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

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={!!form.is_published}
                      onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked ? 1 : 0 }))}
                      className="w-4 h-4 accent-[#D4AF37]"
                    />
                    <label htmlFor="is_published" className="text-sm font-semibold text-slate-800 cursor-pointer">
                      Publish article live on website
                    </label>
                  </div>
                </form>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 text-center pb-1 font-medium">👁 This is exactly how your article will look on the website</p>
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl">
                    <div className="px-6 pt-6 pb-2 bg-slate-50 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
                        <span>{form.category || 'Digital Marketing'}</span>
                        <span>•</span>
                        <span className="text-slate-500">By {form.author_name || 'ACSPIRE Team'}</span>
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {stripHtml(form.title) || 'Untitled Article'}
                      </h1>
                    </div>

                    <div className="aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={getImageSrc(form.image_url)}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop' }}
                      />
                    </div>

                    <div className="px-6 pb-8 pt-6 space-y-4 bg-white">
                      {form.excerpt && (
                        <p className="text-lg font-medium text-[#1E293B] leading-relaxed pb-4 border-b border-[#E2E8F0]">
                          {stripHtml(form.excerpt)}
                        </p>
                      )}

                      <div className="blog-html-content prose max-w-none">
                        {form.content ? (
                          isHtmlContent(form.content) ? (
                            <div dangerouslySetInnerHTML={{ __html: form.content }} />
                          ) : (
                            form.content.split(/\n\s*\n/).filter(Boolean).map((p, idx) => (
                              <p key={idx}>{p.trim()}</p>
                            ))
                          )
                        ) : (
                          <p className="text-slate-400 italic text-sm">No article body added yet. Upload an HTML file or use the toolbar above.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 shrink-0 mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="blog-form"
                disabled={uploading || inlineUploading || htmlUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 shadow-md disabled:opacity-60 transition"
              >
                <CheckCircle size={16} className="text-[#D4AF37]" />
                {editingBlog ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
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
                  Delete Blog Article?
                </h3>
                <p className="text-slate-500 text-xs">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Are you sure you want to delete <strong className="text-slate-900">"{stripHtml(deleteTarget.title)}"</strong>?
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
