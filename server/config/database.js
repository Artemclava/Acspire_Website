import pkg from 'pg'
const { Pool } = pkg

const connectionString = process.env.DATABASE_URL || ''

export const isNeonDb = Boolean(connectionString && connectionString.startsWith('postgres'))

export const pool = isNeonDb
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : null

// ── Local In-Memory Fallback Database Store ───────────────────────────────────
const memDb = {
  contacts: [
    {
      id: 1,
      type: 'Business Consultation',
      name: 'Rohan Sharma',
      first_name: 'Rohan',
      last_name: 'Sharma',
      email: 'rohan.sharma@techcorp.in',
      phone: '+91 98765 43210',
      company: 'TechCorp India',
      course: null,
      service: 'Website Development & AI Solutions',
      qualification: null,
      budget: '₹1,00,000 - ₹2,50,000',
      message: 'We want to re-architect our enterprise platform with modern AI agents and modern UI.',
      is_read: 0,
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 2,
      type: 'Student Enquiry',
      name: 'Ananya Roy',
      first_name: 'Ananya',
      last_name: 'Roy',
      email: 'ananya.roy@gmail.com',
      phone: '+91 91234 56789',
      company: null,
      course: 'Full Stack Web Development',
      service: null,
      qualification: 'B.Tech CSE (Final Year)',
      budget: null,
      message: 'Interested in joining the upcoming batch for Full Stack Web Development.',
      is_read: 1,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 3,
      type: 'Business Consultation',
      name: 'Karthik Raja',
      first_name: 'Karthik',
      last_name: 'Raja',
      email: 'karthik@apexsolutions.com',
      phone: '+91 94440 12345',
      company: 'Apex Solutions',
      course: null,
      service: 'Digital Marketing & Performance Ads',
      qualification: null,
      budget: '₹50,000 - ₹1,00,000',
      message: 'Looking for ROI-focused Performance Ads management on Google and Meta.',
      is_read: 0,
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
  ],
  jobs: [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      dept: 'Engineering',
      location: 'Chennai',
      type: 'Full-Time',
      level: 'Senior',
      description: 'Build and scale our client web applications using React, Node.js, and PostgreSQL.',
      is_active: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      dept: 'Marketing',
      location: 'Chennai',
      type: 'Full-Time',
      level: 'Mid-Senior',
      description: 'Drive multi-channel digital marketing campaigns for 10+ client accounts.',
      is_active: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'AI & Automation Specialist',
      dept: 'Engineering',
      location: 'Chennai',
      type: 'Full-Time',
      level: 'Senior',
      description: 'Develop AI agents, RAG workflows, and enterprise automation solutions.',
      is_active: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Business Analyst',
      dept: 'Engineering',
      location: 'Chennai',
      type: 'Full-Time',
      level: 'Senior',
      description: 'Drive client acquisition in the Middle East and South Asia markets.',
      is_active: 1,
      created_at: new Date().toISOString(),
    },
  ],
  job_applications: [
    {
      id: 1,
      job_title: 'Senior Full-Stack Developer',
      name: 'Vikas Sundaram',
      email: 'vikas.sundaram@devmail.com',
      phone: '+91 98840 99887',
      experience: '4+ Years',
      linkedin: 'https://linkedin.com/in/vikas-sundaram',
      cover_letter: 'Passionate about building performant React & Node.js web applications.',
      status: 'pending',
      is_read: 0,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 2,
      job_title: 'Digital Marketing Manager',
      name: 'Pooja Iyer',
      email: 'pooja.iyer@marketinghub.in',
      phone: '+91 97900 11223',
      experience: '5 Years',
      linkedin: 'https://linkedin.com/in/poojaiyer',
      cover_letter: 'Managed multi-lakh budget campaigns across Google, Meta & LinkedIn Ads.',
      status: 'selected',
      is_read: 1,
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: 3,
      job_title: 'AI & Automation Specialist',
      name: 'Arun Kumar',
      email: 'arun.ai@techspec.io',
      phone: '+91 96000 55443',
      experience: '3 Years',
      linkedin: 'https://linkedin.com/in/arunkumar-ai',
      cover_letter: 'Experienced in LangChain, Python, RAG pipelines, and OpenAI API integration.',
      status: 'waiting',
      is_read: 0,
      created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    },
  ],
  services: [
    {
      id: 1,
      title: 'Digital Marketing',
      description: 'Grow your brand with data-driven digital marketing strategies.',
      features: 'Social Media Marketing,Content Strategy,Brand Management,Campaign Analytics',
      image_url: 'photo-1460925895917-afdab827c52f',
      icon_name: 'BarChart3',
      sort_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'SEO & Content Marketing',
      description: 'Improve search visibility with strategic SEO and content optimization.',
      features: 'Technical SEO,Keyword Research,Content Marketing,Local SEO',
      image_url: 'photo-1551288049-bebda4e38f71',
      icon_name: 'Search',
      sort_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Performance Marketing',
      description: 'Maximize ROI with high-performing advertising campaigns.',
      features: 'Google Ads,Meta Ads,Lead Generation,Campaign Optimization',
      image_url: 'photo-1552664730-d307ca884978',
      icon_name: 'TrendingUp',
      sort_order: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Branding & Creative Strategy',
      description: 'Build a strong brand identity through creative design.',
      features: 'Logo Design,Brand Identity,Creative Campaigns,Marketing Creatives',
      image_url: 'photo-1522542550221-31fd19575a2d',
      icon_name: 'Palette',
      sort_order: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Website Development',
      description: 'Create responsive, high-performance websites.',
      features: 'Corporate Websites,Landing Pages,E-Commerce,Website Maintenance',
      image_url: 'photo-1504384308090-c894fdcc538d',
      icon_name: 'Globe',
      sort_order: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: 6,
      title: 'Business Analytics',
      description: 'Turn data into actionable insights with intelligent dashboards.',
      features: 'Dashboard Reporting,Performance Tracking,Market Analysis,Business Insights',
      image_url: 'photo-1554224155-6726b3ff858f',
      icon_name: 'BarChart3',
      sort_order: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: 7,
      title: 'Mobile App Development',
      description: 'Develop scalable Android and iOS applications.',
      features: 'Android Apps,iOS Apps,Cross-Platform Apps,App Maintenance',
      image_url: 'photo-1571171637578-41bc2dd41cd2',
      icon_name: 'Smartphone',
      sort_order: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: 8,
      title: 'AI Solutions & Chatbots',
      description: 'Build AI-powered solutions including chatbots and RAG systems.',
      features: 'AI Chatbots,RAG Solutions,AI Agents,Workflow Automation',
      image_url: 'photo-1677442136019-21780ecad995',
      icon_name: 'Code2',
      sort_order: 8,
      created_at: new Date().toISOString(),
    },
  ],
  blogs: [
    {
      id: 1,
      title: 'Is a Digital Marketing Course in Chennai Worth it in 2026?',
      category: 'Digital Marketing',
      excerpt: 'A deep dive into career prospects, industry demand, and real-world opportunities in Chennai.',
      content: 'Digital marketing demand in Chennai has grown exponentially...',
      author_name: 'Sophia Williams',
      author_img: 'photo-1494790108377-be9c29b29330',
      image_url: 'photo-1504384308090-c894fdcc538d',
      read_time: '8 min read',
      is_published: 1,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'What Is Digital Marketing? A Complete Guide For Businesses',
      category: 'SEO & Growth',
      excerpt: 'Discover essential strategies, key channels, and how to scale brand presence online.',
      content: 'Digital marketing encompasses all online marketing efforts...',
      author_name: 'Daniel Park',
      author_img: 'photo-1507003211169-0a1dd7228f2d',
      image_url: 'photo-1460925895917-afdab827c52f',
      read_time: '7 min read',
      is_published: 1,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Types of Digital Marketing: 8 Channels You Need to Know',
      category: 'Branding',
      excerpt: 'Explore SEO, social media, content marketing, PPC, and influencer strategies.',
      content: 'Understanding the distinct channels of digital marketing...',
      author_name: 'Amara Osei',
      author_img: 'photo-1573496359142-b8d87734a5a2',
      image_url: 'photo-1486406146926-c627a92ad1ab',
      read_time: '9 min read',
      is_published: 1,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ],
  courses: [
    {
      id: 1,
      title: 'Complete Digital Marketing Program',
      track: 'Digital Marketing',
      track_subtitle: null,
      description: 'Master SEO, Google Ads, Meta Ads, Social Media, Email Marketing, and Analytics.',
      tag: 'Popular',
      image_url: 'photo-1460925895917-afdab827c52f',
      sort_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      track: 'Technology & AI',
      track_subtitle: null,
      description: 'Learn React, Node.js, APIs and databases.',
      tag: 'Career Track',
      image_url: 'photo-1571171637578-41bc2dd41cd2',
      sort_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Agentic AI Development',
      track: 'Technology & AI',
      track_subtitle: null,
      description: 'Build AI Agents, RAG Systems and Automations.',
      tag: 'Trending',
      image_url: 'photo-1677442136019-21780ecad995',
      sort_order: 3,
      created_at: new Date().toISOString(),
    },
  ],
}

let nextIds = {
  contacts: 4,
  jobs: 5,
  job_applications: 4,
  services: 9,
  blogs: 4,
  courses: 4,
}

/**
 * In-memory SQL query simulator for local dev without Neon DB
 */
function handleLocalQuery(text, params = []) {
  const sql = text.trim()
  const lower = sql.toLowerCase()

  // 1. COUNT queries
  if (lower.startsWith('select count(*)')) {
    if (lower.includes('from contacts')) {
      let filtered = memDb.contacts
      if (lower.includes('is_read = 0')) filtered = filtered.filter((c) => c.is_read === 0)
      else if (lower.includes("type ilike '%student%'")) filtered = filtered.filter((c) => (c.type || '').toLowerCase().includes('student'))
      else if (lower.includes("type ilike '%business%'")) filtered = filtered.filter((c) => (c.type || '').toLowerCase().includes('business'))
      return { rows: [{ c: filtered.length }] }
    }
    if (lower.includes('from job_applications')) {
      let filtered = memDb.job_applications
      if (lower.includes("status = 'pending'")) filtered = filtered.filter((a) => a.status === 'pending')
      else if (lower.includes("status = 'selected'")) filtered = filtered.filter((a) => a.status === 'selected')
      else if (lower.includes("status = 'waiting'")) filtered = filtered.filter((a) => a.status === 'waiting')
      else if (lower.includes("status = 'rejected'")) filtered = filtered.filter((a) => a.status === 'rejected')
      else if (lower.includes('is_read = 0')) filtered = filtered.filter((a) => a.is_read === 0)
      return { rows: [{ c: filtered.length }] }
    }
    if (lower.includes('from jobs')) return { rows: [{ c: memDb.jobs.length }] }
    if (lower.includes('from services')) return { rows: [{ c: memDb.services.length }] }
    if (lower.includes('from blogs')) return { rows: [{ c: memDb.blogs.length }] }
    if (lower.includes('from courses')) return { rows: [{ c: memDb.courses.length }] }
  }

  // 2. SELECT queries
  if (lower.startsWith('select * from')) {
    const tableName = lower.split('from')[1].trim().split(' ')[0]
    let rows = memDb[tableName] ? [...memDb[tableName]] : []

    // Filtering by parameter $1
    if (lower.includes('where type = $1') && params[0]) {
      rows = rows.filter((r) => r.type === params[0])
    } else if (lower.includes('where status = $1') && params[0]) {
      rows = rows.filter((r) => r.status === params[0])
    } else if (lower.includes('where id = $1') && params[0]) {
      rows = rows.filter((r) => r.id === parseInt(params[0]))
    } else if (lower.includes('where is_published = 1')) {
      rows = rows.filter((r) => r.is_published === 1)
    } else if (lower.includes('where is_active = 1')) {
      rows = rows.filter((r) => r.is_active === 1)
    }

    return { rows }
  }

  // 3. INSERT queries
  if (lower.startsWith('insert into')) {
    const tableName = lower.split('insert into')[1].trim().split(' ')[0]
    const newId = nextIds[tableName] ? nextIds[tableName]++ : Date.now()
    let newItem = { id: newId, created_at: new Date().toISOString() }

    if (tableName === 'contacts') {
      newItem = {
        ...newItem,
        type: params[0] || 'General',
        name: params[1],
        first_name: params[2],
        last_name: params[3],
        email: params[4],
        phone: params[5],
        company: params[6],
        course: params[7],
        service: params[8],
        qualification: params[9],
        budget: params[10],
        message: params[11],
        is_read: 0,
      }
    } else if (tableName === 'job_applications') {
      newItem = {
        ...newItem,
        job_title: params[0],
        name: params[1],
        email: params[2],
        phone: params[3],
        experience: params[4],
        linkedin: params[5],
        cover_letter: params[6],
        status: 'pending',
        is_read: 0,
      }
    } else if (tableName === 'jobs') {
      newItem = {
        ...newItem,
        title: params[0],
        dept: params[1],
        location: params[2],
        type: params[3],
        level: params[4],
        description: params[5],
        is_active: params[6] ?? 1,
      }
    } else if (tableName === 'services') {
      newItem = {
        ...newItem,
        title: params[0],
        description: params[1],
        features: params[2],
        image_url: params[3],
        icon_name: params[4],
        sort_order: params[5] ?? 0,
      }
    } else if (tableName === 'blogs') {
      newItem = {
        ...newItem,
        title: params[0],
        category: params[1],
        excerpt: params[2],
        content: params[3],
        author_name: params[4],
        author_img: params[5],
        image_url: params[6],
        read_time: params[7],
        is_published: params[8] ?? 1,
        published_at: new Date().toISOString(),
      }
    } else if (tableName === 'courses') {
      newItem = {
        ...newItem,
        title: params[0],
        track: params[1],
        track_subtitle: params[2],
        description: params[3],
        tag: params[4],
        image_url: params[5],
        sort_order: params[6] ?? 0,
      }
    }

    if (memDb[tableName]) memDb[tableName].unshift(newItem)
    return { rows: [{ id: newId }] }
  }

  // 4. UPDATE queries
  if (lower.startsWith('update')) {
    const tableName = lower.split('update')[1].trim().split(' ')[0]
    const targetId = parseInt(params[params.length - 1])
    if (memDb[tableName]) {
      const idx = memDb[tableName].findIndex((item) => item.id === targetId)
      if (idx !== -1) {
        if (lower.includes('is_read = 1')) {
          memDb[tableName][idx].is_read = 1
        }
        if (lower.includes('status = $1')) {
          memDb[tableName][idx].status = params[0]
          memDb[tableName][idx].is_read = 1
        }
      }
    }
    return { rows: [] }
  }

  // 5. DELETE queries
  if (lower.startsWith('delete from')) {
    const tableName = lower.split('delete from')[1].trim().split(' ')[0]
    const targetId = parseInt(params[0])
    if (memDb[tableName]) {
      memDb[tableName] = memDb[tableName].filter((item) => item.id !== targetId)
    }
    return { rows: [] }
  }

  return { rows: [] }
}

/**
 * Execute a query against Neon DB or Local In-Memory Fallback
 */
export async function query(text, params = []) {
  if (isNeonDb && pool) {
    const res = await pool.query(text, params)
    return res
  }
  // Local fallback when DATABASE_URL is not set
  return handleLocalQuery(text, params)
}

/**
 * Auto-initialize Neon PostgreSQL Database Schema + Seed Data
 */
export async function initDatabase() {
  if (!isNeonDb || !pool) {
    console.log('ℹ️  DATABASE_URL not set — Running with Local In-Memory Data Store for Admin & Website')
    return
  }

  try {
    console.log('⚡ Connecting to Neon PostgreSQL Database...')

    // ── Create Tables ──────────────────────────────────────────────────────────
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        company VARCHAR(255),
        course VARCHAR(255),
        service VARCHAR(255),
        qualification VARCHAR(255),
        budget VARCHAR(255),
        message TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        dept VARCHAR(255),
        location VARCHAR(255),
        type VARCHAR(255),
        level VARCHAR(255),
        description TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        features TEXT,
        image_url TEXT,
        icon_name VARCHAR(255),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        excerpt TEXT,
        content TEXT,
        author_name VARCHAR(255),
        author_img TEXT,
        image_url TEXT,
        read_time VARCHAR(255),
        is_published INTEGER DEFAULT 1,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        track VARCHAR(255),
        track_subtitle VARCHAR(255),
        description TEXT,
        tag VARCHAR(255),
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        job_title VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        experience VARCHAR(255),
        linkedin VARCHAR(255),
        cover_letter TEXT,
        status VARCHAR(255) DEFAULT 'pending',
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('✅ Neon PostgreSQL Database Schema & Seed Data Ready!')
  } catch (err) {
    console.error('❌ Neon DB Initialization Error:', err.message)
  }
}
