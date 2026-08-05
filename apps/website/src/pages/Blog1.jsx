import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Calendar, Tag, MapPin, CheckCircle2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const blog1Img = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&h=560&fit=crop&auto=format'

export default function Blog1() {
  return (
    <div className="w-full pt-20 overflow-hidden bg-white">
      {/* Article Header & Hero */}
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
              Digital Marketing
            </span>
            <span className="text-xs text-[#64748B] font-semibold">Jan 18, 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] leading-tight mb-6"
          >
            Is a Digital Marketing Course in Chennai <span className="hero-gold-text">Worth it in 2026?</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748B] font-medium pt-2 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>Career & Education</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Chennai, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Main Cover Image */}
          <div className="rounded-[28px] overflow-hidden mb-12 border border-[#E2E8F0] shadow-xl h-80 sm:h-[450px]">
            <img
              src={blog1Img}
              alt="Digital Marketing Course Chennai"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Paragraph */}
          <p className="text-xl leading-relaxed text-[#1E293B] font-medium mb-12 pb-10 border-b border-[#E2E8F0]">
            As businesses continue to shift their focus online, digital marketing has become one of the most valuable skills in today's job market. From social media marketing and search engine optimization (SEO) to online advertising and content creation, companies rely on digital marketing to reach customers and grow their brands. This has led many students and professionals to wonder: <strong className="text-[#D4AF37]">Is a Digital Marketing Course in Chennai worth it in 2026?</strong>
          </p>

          {/* Section 1 */}
          <div className="mb-14">
            <h2
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              className="text-2xl sm:text-3xl text-[#0F172A] mb-6 flex items-center gap-3"
            >
              <span className="text-[#D4AF37]">/</span> Chennai: A Growing Digital Hub
            </h2>
            <p className="text-[#475569] leading-relaxed text-[16.5px] mb-6">
              The answer is a resounding yes. With Chennai emerging as a major hub for startups, IT companies, e-commerce businesses, and digital agencies, the demand for skilled digital marketers is growing rapidly. Enrolling in a Digital Marketing Course in Chennai can provide practical skills that are highly valued across industries.
            </p>
            <p className="text-[#475569] leading-relaxed text-[16.5px] mb-8">
              A quality Digital Marketing Training in Chennai teaches essential skills that help learners build a strong foundation for a successful career in digital marketing.
            </p>

            {/* Feature List */}
            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] mb-8">
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }} className="text-lg text-[#0F172A] mb-4">
                Core Skills You Will Master:
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Search Engine Optimization (SEO)',
                  'Social Media Marketing & Strategy',
                  'Google Ads & Paid PPC Campaigns',
                  'Content Marketing & Strategy',
                  'Email Automation & Lead Nurturing',
                  'Analytics & Performance Tracking',
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-[#1E293B] font-medium text-[15px] gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-14">
            <h2
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              className="text-2xl sm:text-3xl text-[#0F172A] mb-6 flex items-center gap-3"
            >
              <span className="text-[#D4AF37]">/</span> Career Opportunities After the Course
            </h2>
            <p className="text-[#475569] leading-relaxed text-[16.5px] mb-8">
              One of the biggest advantages of joining a Digital Marketing Institute in Chennai is the variety of career opportunities available. After completing the course, learners can pursue a wide range of roles:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                'Digital Marketing Executive',
                'SEO Specialist',
                'Social Media Manager',
                'Content Strategist',
                'PPC & Ads Expert',
                'Performance Marketer',
              ].map((role) => (
                <div
                  key={role}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center text-sm font-bold text-[#0F172A] shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 Quote */}
          <div className="mb-14">
            <blockquote className="border-l-4 border-[#D4AF37] bg-[#FBF5DC]/40 p-8 rounded-r-2xl text-lg text-[#0F172A] font-medium leading-relaxed italic border border-[#E2E8F0]">
              "Understanding SEO, content strategy, and paid advertising helps businesses reach the right audience and achieve scalable growth — without outsourcing everything to external agencies."
            </blockquote>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
