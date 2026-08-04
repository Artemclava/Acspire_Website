import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Calendar, Tag, Layers, CheckCircle2, ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react'

const blog5Img = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&h=560&fit=crop&auto=format'

export default function Blog5() {
  const ecosystem = [
    { n: '01', title: 'SEO', desc: 'Drive organic traffic by optimizing your web presence for search engines.' },
    { n: '02', title: 'Social Media Marketing', desc: 'Engage your target audience on Instagram, LinkedIn, Facebook, and X.' },
    { n: '03', title: 'Content Marketing', desc: 'Educate, inform, and build trust with prospective customers.' },
    { n: '04', title: 'PPC & Meta Ads', desc: 'Reach ready-to-buy customers instantly with targeted ad campaigns.' },
    { n: '05', title: 'Analytics & Reporting', desc: 'Track key performance metrics and optimize campaign ROI with data.' },
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
              AI & Tech Strategy
            </span>
            <span className="text-xs text-[#64748B] font-semibold">May 21, 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-6"
          >
            The Digital Marketing <span className="hero-gold-text">Ecosystem: Connecting Channels</span>
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img src={blog5Img} alt="Digital Marketing Ecosystem" className="w-full h-full object-cover" />
          </div>

          <p className="text-xl leading-relaxed text-[#1E293B] font-medium mb-12 pb-10 border-b border-[#E2E8F0]">
            Digital marketing is an interconnected ecosystem of tools and techniques. Understanding how each component fits into the bigger picture is key to building campaigns that scale.
          </p>

          <div className="mb-14">
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }} className="text-2xl sm:text-3xl text-[#0F172A] mb-6">
              Pillars of the Digital Marketing Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {ecosystem.map((e) => (
                <div key={e.n} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl">
                  <div className="text-xs font-black text-[#D4AF37] mb-2">{e.n}</div>
                  <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-lg text-[#0F172A] mb-2">
                    {e.title}
                  </h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed m-0">{e.desc}</p>
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
