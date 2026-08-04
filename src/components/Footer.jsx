import { Link } from 'react-router-dom'
import {
  Phone, MapPin, Navigation, Clock, ArrowUp
} from 'lucide-react'
import { FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa'
import logo from '../assets/logo.jpeg'

const socials = [
  { label: 'LinkedIn', icon: <FaLinkedinIn size={15} />, href: 'https://www.linkedin.com/company/acspire-india/', title: 'LinkedIn' },
  { label: 'YouTube', icon: <FaYoutube size={15} />, href: 'https://youtube.com/@acspireindia?si=rFnqNdi513NY6OBM', title: 'YouTube' },
  { label: 'Instagram', icon: <FaInstagram size={15} />, href: 'https://www.instagram.com/acspire.india?igsh=Mm1sOWoyMHk0aG8w', title: 'Instagram' },
]

const services = [
  'Web Development',
  'Mobile App Development',
  'Digital Marketing',
  'SEO & Performance Marketing',
  'AI Solutions & Automation',
  'Business Analytics',
]

const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Courses', to: '/courses' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const mapLocationQuery = "Artem Clava, Plot No A1, Mangalakshmi nagar, madhanathapuram, Porur, Chennai, Tamil Nadu 600125"
  const mapDirectUrl = "https://maps.app.goo.gl/kEYM3fVzCyFVXHECA"

  return (
    <footer
      className="relative bg-[#070B14] text-white overflow-hidden border-t border-[#1E293B]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Ambient Background Glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1E3A8A 0%, transparent 70%)' }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── MAIN UNIFIED COMPACT FOOTER GRID ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* COL 1: Brand Info & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
                {/* CLEAN CIRCULAR LOGO CONTAINER - NO WHITE BACKGROUND */}
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 shadow-lg shrink-0 bg-transparent group-hover:border-[#D4AF37] group-hover:scale-105 transition-all duration-300">
                  <img src={logo} alt="ACSPIRE" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <span
                    className="text-white font-black text-xl block leading-none tracking-tight group-hover:text-[#D4AF37] transition-colors"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    ACSPIRE
                  </span>
                  <span className="text-[#D4AF37] text-[9px] font-bold tracking-[0.2em] uppercase block mt-1">
                    Digital Growth Partner
                  </span>
                </div>
              </Link>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm">
                Helping ambitious businesses scale through modern web development, performance marketing, AI automation, and professional training.
              </p>
            </div>

            {/* Social Links (LinkedIn, YouTube, Instagram) */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ label, icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#070B14] active:scale-95 transition-all duration-200 text-slate-300 shadow-xs hover:shadow-[#D4AF37]/30"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: Quick Links & Services (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                Company
              </h4>
              <ul className="space-y-2">
                {company.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-400 text-xs hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all duration-200"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                Services
              </h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s}>
                    <Link
                      to="/services"
                      className="text-slate-400 text-xs hover:text-[#D4AF37] hover:translate-x-1 inline-block transition-all duration-200 truncate max-w-full"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COL 3: Address & Info (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
              Headquarters
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="leading-snug text-slate-300 font-medium">
                  <strong className="text-white block text-[11px] font-bold text-[#D4AF37]">Artem Clava</strong>
                  Plot No A1, Mangalakshmi Nagar, Madhanandhapuram, Porur, Chennai - 600125
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#D4AF37] shrink-0" />
                <a href="tel:+916383283731" className="text-slate-300 font-semibold hover:text-[#D4AF37] transition-colors">
                  +91 63832 83731
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={13} className="text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 text-[11px]">Mon–Fri: 10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* COL 4: Compact Integrated Map (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider mb-3.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                Location Map
              </span>
              <a
                href={mapDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
              >
                Directions <Navigation size={10} />
              </a>
            </h4>

            {/* Embedded compact map card */}
            <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-md h-36 w-full bg-[#0F172A] group">
              <iframe
                title="Artem Clava Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocationQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'contrast(1.05) saturate(1.1) brightness(0.92)',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Clickable overlay to open exact directions */}
              <a
                href={mapDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors flex items-end p-2"
                aria-label="Open location in Google Maps"
              >
                <div className="bg-[#070B14]/90 backdrop-blur-xs border border-[#D4AF37]/40 text-white rounded-md px-2 py-1 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <Navigation size={10} className="text-[#D4AF37]" />
                  <span>Open Maps</span>
                </div>
              </a>
            </div>


          </div>

        </div>
      </div>

      {/* ── BOTTOM LEGAL BAR ── */}
      <div className="w-full border-t border-white/10 bg-black/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} ACSPIRE Digital Growth Partner. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <Link to="/contact" className="text-slate-500 hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-slate-500 hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-slate-500 hover:text-[#D4AF37] transition-colors">Cookie Policy</Link>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070B14] active:scale-90 transition-all duration-200"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

    </footer>
  )
}
