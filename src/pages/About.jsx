import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Award, Heart, Lightbulb, Shield, Users, Target, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'
import { useInView } from '../hooks/useInView'
import giaImg from '../assets/gia.jpeg'
import saranImg from '../assets/saran.png'

function Animate({ children, delay = 0, className = '', dir = 'up' }) {
  const { ref, inView } = useInView()
  const transforms = {
    up: inView ? 'translateY(0)' : 'translateY(32px)',
    left: inView ? 'translateX(0)' : 'translateX(-32px)',
    right: inView ? 'translateX(0)' : 'translateX(32px)',
    scale: inView ? 'scale(1)' : 'scale(0.92)',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: transforms[dir] || transforms.up,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const values = [
  {
    icon: Heart,
    title: 'Client First',
    desc: 'Every decision we make is filtered through the lens of client success. Your growth is our purpose.',
    color: '#EF4444',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We stay ahead of the curve, constantly exploring new technologies and methodologies.',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'Transparent communication, honest pricing, and ethical practices are non-negotiable at ACSPIRE.',
    color: '#3B82F6',
  },
  {
    icon: Target,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards in everything we deliver — no exceptions.',
    color: '#8B5CF6',
  },
  {
    icon: Users,
    title: 'Collaboration',
    desc: 'We work as one team with our clients, merging expertise to create outcomes greater than the sum of parts.',
    color: '#10B981',
  },
  {
    icon: Award,
    title: 'Results-Driven',
    desc: 'Strategy without results is noise. We measure everything and optimize relentlessly.',
    color: '#D4AF37',
  },
]

const team = [
  {
    name: 'Gia Balan',
    role: 'Founder & CEO',
    img: giaImg,
    bio: 'Leading ACSPIRE with a vision to empower businesses through innovation and digital excellence.',
    initials: 'GB',
  },
  {
    name: 'Saran',
    role: 'Co-Founder & COO',
    img: saranImg,
    bio: 'Driving operations, technology, and client success through strategic leadership and innovation.',
    initials: 'SR',
  },
]

export default function About() {
  return (
    <div className="pt-16 overflow-hidden">

      {/* HERO */}
      <section className="relative bg-white overflow-hidden min-h-[85vh] flex items-center">

        {/* Animated background orbs */}
        <div className="hero-orb hero-orb-1 animate-orb-1" />
        <div className="hero-orb hero-orb-2 animate-orb-2" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(226,232,240,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="animate-badge-in">
                <span className="highlight-tag mb-4 sm:mb-6 inline-flex">
                  <Sparkles size={13} />
                  About ACSPIRE
                </span>
              </div>

              <h1
                className="animate-hero-up text-3xl sm:text-4xl lg:text-[62px] leading-[1.1] text-[#0F172A] mb-4 sm:mb-6"
                style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
              >
                Empowering Ideas Into{' '}
                <span className="hero-gold-text">Digital Success</span>
              </h1>

              {/* Animated underline */}
              <div
                className="h-[3px] rounded-full mb-6 sm:mb-8 animate-hero-line mx-auto lg:mx-0"
                style={{
                  background: 'linear-gradient(90deg, #D4AF37, #C8960C, transparent)',
                  width: '160px',
                }}
              />

              <p
                className="text-[15px] sm:text-[17px] text-[#475569] leading-relaxed mb-6 sm:mb-8"
              >
                ACSPIRE is a Digital Growth Partner helping businesses grow through
                innovative technology, strategic marketing, AI solutions, web
                development, business analytics, and professional IT services.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary btn-shine justify-center">
                  Start Your Journey
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-secondary justify-center">
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right — Image */}
            <div className="flex justify-center lg:justify-end animate-hero-left order-first lg:order-last">
              <div className="relative w-full max-w-lg">
                <div className="img-zoom relative rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=700&fit=crop&auto=format"
                    alt="ACSPIRE Team"
                    className="w-full h-[250px] sm:h-[360px] lg:h-[480px] object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 50%, #F5F7FA 100%)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <Animate dir="left">
              <span className="section-label">Who We Are</span>
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-4 sm:mb-5">
                Building Long-Term
                <br />
                <span className="hero-gold-text">Digital Partnerships</span>
              </h2>
              <p className="section-subtext mb-4 sm:mb-5">
                ACSPIRE was founded with a vision to bridge the gap between business
                goals and digital innovation. We partner with organizations to create
                smart, scalable, and future-ready solutions that support sustainable
                growth.
              </p>
              <p className="section-subtext mb-6 sm:mb-8">
                Our multidisciplinary team combines technical expertise, creative
                thinking, and strategic insight to deliver impactful digital experiences.
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                {['Innovative digital solutions', 'Client-first approach', 'Measurable results always'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={13} className="text-[#D4AF37]" />
                    </div>
                    <span className="text-sm sm:text-[15px] text-[#475569] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </Animate>

            <Animate delay={150} dir="right">
              <div className="relative">
                <div className="img-zoom rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=520&fit=crop&auto=format"
                    alt="ACSPIRE leadership team"
                    className="w-full h-[240px] sm:h-[350px] lg:h-[460px] object-cover"
                  />
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Our Purpose</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3">
              Mission &amp; Vision
            </h2>
          </Animate>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <Animate delay={0} className="group relative rounded-[20px] sm:rounded-[28px] p-6 sm:p-10 border border-[#E2E8F0] bg-white overflow-hidden card-lift">
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px]"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #C8960C)' }}
              />
              <div className="relative z-10">
                <div className="icon-card mb-4 sm:mb-6">
                  <Target size={22} className="text-[#D4AF37]" />
                </div>
                <h3
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                  className="text-xl sm:text-2xl text-[#0F172A] mb-3"
                >
                  Our Mission
                </h3>
                <p className="text-[#475569] text-sm sm:text-[16px] leading-relaxed sm:leading-8">
                  To empower businesses with innovative technology, strategic digital
                  solutions, and industry expertise that drive sustainable growth,
                  enhance customer experiences, and create long-term business success.
                </p>
              </div>
            </Animate>

            {/* Vision */}
            <Animate delay={100} className="group relative rounded-[20px] sm:rounded-[28px] p-6 sm:p-10 overflow-hidden card-lift" style={{ background: 'linear-gradient(135deg, #FBF5DC 0%, #FFFDE7 100%)', border: '1px solid #F2E3A2' }}>
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px]"
                style={{ background: 'linear-gradient(90deg, #C8960C, #D4AF37)' }}
              />
              <div className="relative z-10">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6"
                  style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <Lightbulb size={20} className="text-[#D4AF37]" />
                </div>
                <h3
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                  className="text-xl sm:text-2xl text-[#0F172A] mb-3"
                >
                  Our Vision
                </h3>
                <p className="text-[#475569] text-sm sm:text-[16px] leading-relaxed sm:leading-8">
                  To become the most trusted Digital Growth Partner by delivering
                  innovative solutions, fostering lasting client relationships, and
                  enabling businesses to thrive in an ever-evolving digital world.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              Our Core Values
            </h2>
            <p className="section-subtext max-w-2xl mx-auto">
              These principles guide every decision, project, and relationship at ACSPIRE.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <Animate key={title} delay={i * 70} className="group glass-card p-6 sm:p-8 cursor-default">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h3
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
                  className="text-base sm:text-[16px] text-[#0F172A] mb-2"
                >
                  {title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#64748B] leading-relaxed">{desc}</p>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-16">
            <span className="section-label">Leadership</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-5xl mt-3 mb-3">
              The Minds Behind ACSPIRE
            </h2>
            <p className="section-subtext max-w-3xl mx-auto">
              Meet the founders who lead ACSPIRE with innovation and integrity.
            </p>
          </Animate>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl w-full">
              {team.map(({ name, role, img, bio, initials }, i) => (
                <Animate
                  key={name}
                  delay={i * 120}
                  className="group relative rounded-[20px] sm:rounded-[28px] border border-[#E2E8F0] bg-white shadow-xl overflow-hidden card-lift flex flex-col justify-between text-center"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 z-20"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #C8960C, #D4AF37)' }}
                  />

                  <div className="relative w-full h-64 sm:h-[380px] bg-[#F8FAFC] overflow-hidden">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div
                      style={{ display: 'none' }}
                      className="w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#C8960C] items-center justify-center"
                    >
                      <span className="text-white text-4xl sm:text-5xl font-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {initials}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800 }}
                        className="text-xl sm:text-2xl lg:text-3xl text-[#0F172A] mb-1"
                      >
                        {name}
                      </h3>
                      <p className="text-[#D4AF37] font-bold text-xs sm:text-[14px] mb-3 tracking-widest uppercase">{role}</p>
                      <p className="text-[#64748B] leading-relaxed text-xs sm:text-[14.5px] max-w-sm mx-auto">{bio}</p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE GALLERY */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: '#F5F7FA' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animate className="text-center mb-10 sm:mb-14">
            <span className="section-label">Our Workspace</span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl mt-3">
              Life at ACSPIRE
            </h2>
          </Animate>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { img: 'photo-1497366216548-37526070297c', span: 'col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2' },
              { img: 'photo-1552664730-d307ca884978', span: '' },
              { img: 'photo-1571171637578-41bc2dd41cd2', span: '' },
              { img: 'photo-1524178232363-1fb2b075b655', span: '' },
              { img: 'photo-1504384308090-c894fdcc538d', span: '' },
            ].map(({ img, span }, i) => (
              <Animate key={i} delay={i * 60} className={`${span} img-zoom rounded-xl sm:rounded-2xl overflow-hidden shadow-sm`}>
                <img
                  src={`https://images.unsplash.com/${img}?w=480&h=320&fit=crop&auto=format`}
                  alt="ACSPIRE office"
                  className="w-full h-36 sm:h-52 object-cover"
                />
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
