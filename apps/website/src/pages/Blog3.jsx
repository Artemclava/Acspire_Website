import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Calendar, Tag, Layers, CheckCircle2, ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react'

const blog3Img = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=560&fit=crop&auto=format'

export default function Blog3() {
  const types = [
    { n: '01', title: 'Search Engine Optimization (SEO)', desc: 'Improving website visibility on Google to rank higher and attract organic traffic.' },
    { n: '02', title: 'Social Media Marketing', desc: 'Promoting brands on Instagram, Facebook, LinkedIn, X, and YouTube to build engaged audiences.' },
    { n: '03', title: 'Content Marketing', desc: 'Creating valuable blogs, articles, and videos to attract, educate, and convert customers.' },
    { n: '04', title: 'Email Marketing', desc: 'Communicating directly with subscribers through targeted newsletters and automated campaigns.' },
    { n: '05', title: 'Pay-Per-Click (PPC) Ads', desc: 'Running targeted ads on Google and Meta for fast lead generation and measurable ROI.' },
    { n: '06', title: 'Influencer Marketing', desc: 'Partnering with domain creators to expand brand authority and authentic reach.' },
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
              Branding & Strategy
            </span>
            <span className="text-xs text-[#64748B] font-semibold">Mar 12, 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-6"
          >
            Types of <span className="hero-gold-text">Digital Marketing: 8 Channels</span> You Need to Know
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img src={blog3Img} alt="Types of Digital Marketing" className="w-full h-full object-cover" />
          </div>

          <div className="mb-14">
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-2xl sm:text-3xl text-[#0F172A] mb-6">
              The 6 Core Digital Marketing Channels
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {types.map((t) => (
                <div key={t.n} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl">
                  <div className="text-xs font-black text-[#D4AF37] mb-2">{t.n}</div>
                  <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-lg text-[#0F172A] mb-2">
                    {t.title}
                  </h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed m-0">{t.desc}</p>
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
