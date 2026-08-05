import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import logo from '../assets/logo.jpeg'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/courses', label: 'Courses' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const shouldScroll = window.scrollY > 40
      setScrolled(prev => (prev !== shouldScroll ? shouldScroll : prev))
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[64px] sm:h-[72px]" : "h-[72px] sm:h-[84px]"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300"
          >
            <div className="relative shrink-0">
              <img
                src={logo}
                alt="ACSPIRE"
                className={`rounded-full object-cover transition-all duration-500 border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] group-hover:rotate-6 shadow-sm ${
                  scrolled ? "h-10 w-10 sm:h-12 sm:w-12" : "h-11 w-11 sm:h-14 sm:w-14"
                }`}
              />
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="flex flex-col leading-none">
              <h1
                className="text-[18px] sm:text-[22px] lg:text-[24px] font-extrabold tracking-[1.5px] sm:tracking-[2px] text-[#0F172A] group-hover:text-[#D4AF37] transition-colors duration-300"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                ACSPIRE
              </h1>

              <span
                className="mt-0.5 text-[7.5px] sm:text-[8.5px] uppercase tracking-[2.5px] sm:tracking-[3.5px] text-[#D4AF37] font-semibold whitespace-nowrap"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Digital Growth Partner
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-2 bg-[#F8FAFC]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E2E8F0]">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full text-[13.5px] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/40'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="btn-primary btn-shine text-sm py-2.5 px-6 shadow-md shadow-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/30"
            >
              Get Started
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-xl p-2 border border-[#E2E8F0] bg-white/80 text-[#0F172A] transition-all duration-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 active:scale-95"
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-b border-[#E2E8F0] transition-all duration-300 shadow-xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${
                    isActive
                      ? 'text-[#D4AF37] bg-[#FBF5DC] border border-[#F2E3A2]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`
                }
              >
                <span>{label}</span>
                {location.pathname === to && (
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                )}
              </NavLink>
            ))}
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
              <Link to="/contact" className="btn-primary btn-shine w-full justify-center py-2.5 text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
