import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Calendar, Tag, Layers, CheckCircle2, ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react'

const blog4Img = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&h=560&fit=crop&auto=format'

export default function Blog4() {
  const roles = [
    { title: 'Digital Marketing Executive', desc: 'Manage campaigns across multiple online channels.' },
    { title: 'SEO Specialist', desc: 'Optimize website structure and content to rank on search engines.' },
    { title: 'Social Media Manager', desc: 'Engage brand audiences across social media platforms.' },
    { title: 'Performance Marketer', desc: 'Execute and optimize paid ad campaigns for maximum ROI.' },
  ]

  return (
    <div className="w-full pt-20 overflow-hidden bg-white">
      <section className="relative pt-12 pb-16 section-mesh border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#C8960C] mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
              Career & Upskilling
            </span>
            <span className="text-xs text-[#64748B] font-semibold">Apr 05, 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-6"
          >
            Top Reasons to <span className="hero-gold-text">Learn Digital Marketing in 2026</span>
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img src={blog4Img} alt="Learn Digital Marketing" className="w-full h-full object-cover" />
          </div>

          <p className="text-xl leading-relaxed text-[#1E293B] font-medium mb-12 pb-10 border-b border-[#E2E8F0]">
            Digital marketing has become one of the most valuable skills in today's economy. Whether you're a student, job seeker, founder, or professional, digital marketing opens doors to fast-growing career roles.
          </p>

          <div className="mb-14">
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-2xl sm:text-3xl text-[#0F172A] mb-6">
              Popular Career Roles in Digital Marketing
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {roles.map((r) => (
                <div key={r.title} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl">
                  <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-lg text-[#0F172A] mb-2 uppercase tracking-wide">
                    {r.title}
                  </h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed m-0">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
