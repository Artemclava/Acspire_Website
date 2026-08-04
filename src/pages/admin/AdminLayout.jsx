import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.jpeg'
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Wrench,
  FileText,
  GraduationCap,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sparkles,
  UserCheck,
  ClipboardList,
} from 'lucide-react'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('acspire_admin_token')
    if (!token) {
      navigate('/admin/login')
    } else {
      setAuthed(true)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('acspire_admin_token')
    navigate('/admin/login')
  }

  if (!authed) return null

  const navItems = [
    { label: 'Dashboard',        path: '/admin',                  icon: LayoutDashboard,  exact: true },
    { label: 'Contacts',         path: '/admin/contacts',         icon: MessageSquare },
    { label: 'Jobs',             path: '/admin/jobs',             icon: Briefcase },
    { label: 'Applications',     path: '/admin/job-applications', icon: ClipboardList },
    { label: 'Services',         path: '/admin/services',         icon: Wrench },
    { label: 'Blogs',            path: '/admin/blogs',            icon: FileText },
    { label: 'Courses',          path: '/admin/courses',          icon: GraduationCap },
  ]

  const currentPathName = location.pathname.split('/')[2] || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans">
      {/* Sidebar (Clean Light Style) */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between shrink-0 shadow-sm z-20">
        <div>
          {/* Logo / Header */}
          <div className="p-5 border-b border-[#F1F5F9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-sm shrink-0">
              <img src={logoImg} alt="ACSPIRE" className="w-full h-full object-contain bg-white p-0.5" />
            </div>
            <div>
              <span className="text-[#0F172A] font-extrabold text-lg block leading-none tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                ACSPIRE
              </span>
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            <p className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Navigation</p>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0F172A] text-white shadow-lg shadow-slate-900/15'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-[#D4AF37]' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-[#D4AF37]" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#F1F5F9] flex flex-col gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <ExternalLink size={15} className="text-slate-400" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#E2E8F0] px-8 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#0F172A] font-extrabold capitalize text-sm">
              {currentPathName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FBF5DC] text-[#B89222] border border-[#D4AF37]/30">
              <Sparkles size={12} className="text-[#D4AF37]" /> System Active
            </span>
            <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                A
              </div>
              <span className="text-xs font-bold text-slate-800">Admin</span>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
