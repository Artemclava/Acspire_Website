import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'acspire.db')

const db = new Database(DB_PATH)

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ── Create tables ──────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    type        TEXT NOT NULL,
    name        TEXT,
    first_name  TEXT,
    last_name   TEXT,
    email       TEXT NOT NULL,
    phone       TEXT,
    company     TEXT,
    course      TEXT,
    service     TEXT,
    qualification TEXT,
    budget      TEXT,
    message     TEXT,
    is_read     INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    dept        TEXT,
    location    TEXT,
    type        TEXT,
    level       TEXT,
    description TEXT,
    is_active   INTEGER DEFAULT 1,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS services (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    features    TEXT,
    image_url   TEXT,
    icon_name   TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    category    TEXT,
    excerpt     TEXT,
    content     TEXT,
    author_name TEXT,
    author_img  TEXT,
    image_url   TEXT,
    read_time   TEXT,
    is_published INTEGER DEFAULT 1,
    published_at TEXT DEFAULT (datetime('now','localtime')),
    created_at  TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS courses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    track       TEXT,
    track_subtitle TEXT,
    description TEXT,
    tag         TEXT,
    image_url   TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title    TEXT NOT NULL,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    experience   TEXT,
    linkedin     TEXT,
    cover_letter TEXT,
    status       TEXT DEFAULT 'pending',
    is_read      INTEGER DEFAULT 0,
    created_at   TEXT DEFAULT (datetime('now','localtime'))
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS homepage_settings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    hero_image  TEXT,
    hero_badge  TEXT DEFAULT '#1 Digital Growth Partner',
    hero_title  TEXT DEFAULT 'Your Trusted Partner for Digital Growth',
    hero_subtitle TEXT DEFAULT 'ACSPIRE is a premium digital growth partner helping ambitious businesses scale through expert web development, strategic marketing, AI solutions, and world-class design.',
    hero_cta1   TEXT DEFAULT 'Start Your Journey',
    hero_cta2   TEXT DEFAULT 'Explore Services',
    about_image TEXT,
    updated_at  TEXT DEFAULT (datetime('now','localtime'))
  );
`)

// Safe migration: add track_subtitle if it doesn't exist yet
try { db.exec(`ALTER TABLE courses ADD COLUMN track_subtitle TEXT`) } catch (_) {}

// Seed homepage settings if empty
const homeCount = db.prepare('SELECT COUNT(*) as c FROM homepage_settings').get()
if (homeCount.c === 0) {
  db.prepare(`INSERT INTO homepage_settings (hero_image, about_image) VALUES (?, ?)`).run(null, null)
}

// ── Seed initial data if tables are empty ─────────────────────────────────────

const jobCount = db.prepare('SELECT COUNT(*) as c FROM jobs').get()
if (jobCount.c === 0) {
  const insertJob = db.prepare(`
    INSERT INTO jobs (title, dept, location, type, level, description) VALUES (?,?,?,?,?,?)
  `)
  const jobs = [
    ['Senior Full-Stack Developer', 'Engineering', 'Chennai', 'Full-Time', 'Senior', 'Build and scale our client web applications using React, Node.js, and PostgreSQL. Lead technical architecture decisions and mentor junior developers.'],
    ['Digital Marketing Manager', 'Marketing', 'Chennai', 'Full-Time', 'Mid-Senior', 'Drive multi-channel digital marketing campaigns for 10+ client accounts. Expert in SEO, PPC, and marketing analytics.'],
    ['AI & Automation Specialist', 'Engineering', 'Chennai', 'Full-Time', 'Senior', 'Develop cutting-edge AI agents, RAG workflows, and enterprise automation solutions for our clients.'],
    ['Business Analyst', 'Engineering', 'Chennai', 'Full-Time', 'Senior', 'Drive new client acquisition in the Middle East and South Asia markets. Strong network and enterprise sales track record preferred.'],
    ['SEO Specialist', 'Marketing', 'Chennai', 'Full-Time', 'Senior', 'Lead SEO strategy and execution for multiple client accounts. Deep expertise in technical SEO, content strategy, and analytics.'],
  ]
  jobs.forEach((j) => insertJob.run(...j))
}

const serviceCount = db.prepare('SELECT COUNT(*) as c FROM services').get()
if (serviceCount.c === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (title, description, features, image_url, icon_name, sort_order) VALUES (?,?,?,?,?,?)
  `)
  const services = [
    ['Digital Marketing', 'Grow your brand with data-driven digital marketing strategies that increase visibility, engagement, and qualified leads.', 'Social Media Marketing,Content Strategy,Brand Management,Campaign Analytics', 'photo-1460925895917-afdab827c52f', 'BarChart3', 1],
    ['SEO & Content Marketing', 'Improve search visibility and organic growth with strategic SEO, content optimization, and digital marketing.', 'Technical SEO,Keyword Research,Content Marketing,Local SEO', 'photo-1551288049-bebda4e38f71', 'Search', 2],
    ['Performance Marketing', 'Maximize ROI with high-performing advertising campaigns across Google, Meta, and other digital platforms.', 'Google Ads,Meta Ads,Lead Generation,Campaign Optimization', 'photo-1552664730-d307ca884978', 'TrendingUp', 3],
    ['Branding & Creative Strategy', 'Build a strong brand identity through creative design, visual storytelling, and impactful marketing strategies.', 'Logo Design,Brand Identity,Creative Campaigns,Marketing Creatives', 'photo-1522542550221-31fd19575a2d', 'Palette', 4],
    ['Website Development', 'Create responsive, high-performance websites that strengthen your online presence and deliver exceptional user experiences.', 'Corporate Websites,Landing Pages,E-Commerce,Website Maintenance', 'photo-1504384308090-c894fdcc538d', 'Globe', 5],
    ['Business Analytics', 'Turn business data into actionable insights with intelligent dashboards, reporting, and performance analytics.', 'Dashboard Reporting,Performance Tracking,Market Analysis,Business Insights', 'photo-1554224155-6726b3ff858f', 'BarChart3', 6],
    ['Mobile App Development', 'Develop scalable Android and iOS applications that deliver seamless experiences and support business growth.', 'Android Apps,iOS Apps,Cross-Platform Apps,App Maintenance', 'photo-1571171637578-41bc2dd41cd2', 'Smartphone', 7],
    ['AI Solutions & Chatbots', 'Build intelligent AI-powered solutions including chatbots, RAG systems, AI agents, and workflow automation.', 'AI Chatbots,RAG Solutions,AI Agents,Workflow Automation', 'photo-1677442136019-21780ecad995', 'Code2', 8],
  ]
  services.forEach((s) => insertService.run(...s))
}

const blogCount = db.prepare('SELECT COUNT(*) as c FROM blogs').get()
if (blogCount.c === 0) {
  const insertBlog = db.prepare(`
    INSERT INTO blogs (title, category, excerpt, author_name, image_url, read_time) VALUES (?,?,?,?,?,?)
  `)
  const blogs = [
    ['Is a Digital Marketing Course in Chennai Worth it in 2026?', 'Digital Marketing', 'A deep dive into career prospects, industry demand, essential skills, and real-world opportunities in Chennai in 2026.', 'Sophia Williams', 'photo-1504384308090-c894fdcc538d', '8 min read'],
    ['What Is Digital Marketing? A Complete Guide For Businesses', 'SEO & Growth', 'Discover essential strategies, key channels, and how to scale brand presence online.', 'Daniel Park', 'photo-1460925895917-afdab827c52f', '7 min read'],
    ['Types of Digital Marketing: 8 Channels You Need to Know', 'Branding', 'Explore SEO, social media, content marketing, PPC, and influencer strategies that scale.', 'Amara Osei', 'photo-1486406146926-c627a92ad1ab', '9 min read'],
    ['Top Reasons to Learn Digital Marketing in 2026', 'Web Development', 'High industry demand, remote freelancing, career roles, and entrepreneurial benefits.', 'Amara Osei', 'photo-1561070791-2526d30994b5', '10 min read'],
    ['The Digital Marketing Ecosystem: Connecting All Channels', 'AI & Technology', 'Learn how SEO, paid ads, email marketing, and social media work together seamlessly.', 'Mei Lin', 'photo-1524178232363-1fb2b075b655', '6 min read'],
  ]
  blogs.forEach((b) => insertBlog.run(...b))
}

const courseCount = db.prepare('SELECT COUNT(*) as c FROM courses').get()
if (courseCount.c === 0) {
  const insertCourse = db.prepare(`
    INSERT INTO courses (title, track, description, tag, image_url, sort_order) VALUES (?,?,?,?,?,?)
  `)
  const courses = [
    ['Complete Digital Marketing Program', 'Digital Marketing', 'Master SEO, Google Ads, Meta Ads, Social Media, Email Marketing, and Analytics.', 'Popular', 'photo-1460925895917-afdab827c52f', 1],
    ['Performance Marketing', 'Digital Marketing', 'Drive measurable growth with data-driven advertising strategies.', 'Advanced', 'photo-1516321318423-f06f85e504b3', 2],
    ['Meta Ads & Google Ads', 'Digital Marketing', 'Create and optimize high-performing advertising campaigns.', 'Hands-on', 'photo-1516321497487-e288fb19713f', 3],
    ['SEO Mastery', 'Digital Marketing', 'Improve search visibility with advanced SEO techniques.', 'Essential', 'photo-1432888622747-4eb9a8efeb07', 4],
    ['Full Stack Web Development', 'Technology & AI', 'Learn React, Node.js, APIs and databases.', 'Career Track', 'photo-1571171637578-41bc2dd41cd2', 5],
    ['Agentic AI Development', 'Technology & AI', 'Build AI Agents, RAG Systems and Automations.', 'Trending', 'photo-1677442136019-21780ecad995', 6],
    ['Business Analytics', 'Technology & AI', 'Learn dashboards and business intelligence.', 'High Demand', 'photo-1551288049-bebda4e38f71', 7],
    ['Human Resources Development', 'Business & Leadership', 'Develop leadership and HR skills.', 'Management', 'photo-1521791136064-7986c2920216', 8],
    ['Sales & Marketing', 'Business & Leadership', 'Master sales and customer acquisition.', 'Growth', 'photo-1552664730-d307ca884978', 9],
    ['Finance Management', 'Business & Leadership', 'Learn finance and business planning.', 'Leadership', 'photo-1554224155-6726b3ff858f', 10],
  ]
  courses.forEach((c) => insertCourse.run(...c))
}

export default db
