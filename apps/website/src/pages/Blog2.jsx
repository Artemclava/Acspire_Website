import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Calendar, Tag, Layers, CheckCircle2, ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react'

const blog2Img = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=560&fit=crop&auto=format'

export default function Blog2() {
  const uses = [
    {
      n: '01',
      title: 'Building Brand Awareness',
      desc: 'Through social media, search engines, websites, and online ads, businesses reach a larger audience and become more recognizable.',
    },
    {
      n: '02',
      title: 'Generating Leads',
      desc: 'SEO, content marketing, and paid advertising help businesses attract potential customers and increase conversion opportunities.',
    },
    {
      n: '03',
      title: 'Driving Website Traffic',
      desc: 'SEO, social media marketing, and PPC advertising help drive targeted traffic to websites, increasing inquiries and sales.',
    },
    {
      n: '04',
      title: 'Increasing Sales & Revenue',
      desc: 'By reaching people already interested in specific products, businesses improve conversion rates and grow revenue faster.',
    },
    {
      n: '05',
      title: 'Improving Customer Engagement',
      desc: 'Social media and email marketing enable direct communication with customers, building trust and strengthening relationships.',
    },
    {
      n: '06',
      title: 'Enhancing Customer Retention',
      desc: 'Regular email updates, loyalty programs, and personalized offers encourage repeat purchases and improve customer retention.',
    },
  ]

  return (
    <div className="w-full pt-20 overflow-hidden bg-white">
      {/* Header */}
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
              Business Growth
            </span>
            <span className="text-xs text-[#64748B] font-semibold">Feb 02, 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-6"
          >
            What Is Digital Marketing? <span className="hero-gold-text">A Complete Guide For Businesses</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748B] font-medium pt-2 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>Business Strategy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img src={blog2Img} alt="Digital Marketing Guide" className="w-full h-full object-cover" />
          </div>

          <p className="text-xl leading-relaxed text-[#1E293B] font-medium mb-12 pb-10 border-b border-[#E2E8F0]">
            Digital marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels such as search engines, social media, email, and websites to connect with current and prospective customers.
          </p>

          <div className="mb-14">
            <h2
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              className="text-2xl sm:text-3xl text-[#0F172A] mb-6 flex items-center gap-3"
            >
              <span className="text-[#D4AF37]">/</span> Key Objectives of Digital Marketing
            </h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {uses.map((u) => (
                <div key={u.n} className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                  <div className="text-xs font-black text-[#D4AF37] mb-2">{u.n}</div>
                  <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-lg text-[#0F172A] mb-2">
                    {u.title}
                  </h4>
                  <p className="text-[14px] text-[#64748B] leading-relaxed m-0">{u.desc}</p>
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
