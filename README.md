# ACSPIRE — Production Monorepo Codebase 🚀

Production-ready architecture for ACSPIRE website and admin portal powered by React, Express, Neon PostgreSQL DB, and Cloudinary.

## 📁 Repository Directory Layout

```
acspire/
├── apps/
│   ├── website/                  # Public Website (React + Vite + Netlify)
│   └── admin/                    # Admin Portal (React + Vite + Netlify)
├── server/                       # Backend API Server (Express + Neon DB + Railway)
│   ├── config/                   # Database, Cloudinary, CORS & JWT config
│   ├── controllers/              # Route Controllers
│   ├── services/                 # Business Services
│   ├── routes/                   # Router Registry
│   ├── middleware/               # Auth, Security, Rate Limiter & Logger
│   ├── validators/               # Payload Validators
│   ├── database/                 # Auto-migrations & Seeding
│   ├── utils/                    # Response, Logger & Helper Utilities
│   └── railway.json              # Railway Deployment Config
├── shared/                       # Shared Constants & Types
├── docs/                         # Deployment Documentation
└── package.json                  # Monorepo Workspaces
```

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```
