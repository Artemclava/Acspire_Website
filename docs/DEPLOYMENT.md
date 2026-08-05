# ACSPIRE — Netlify & Railway Deployment Guide 🚀

This document describes how to deploy the ACSPIRE Monorepo layout:
- **Netlify**: Deploying `apps/website` and `apps/admin` (Frontend SPA Apps)
- **Railway**: Deploying `server` (Express Backend API) with **Neon PostgreSQL DB**

---

## 1. Netlify Setup (Frontend Apps)

1. Connect your Git repository on [Netlify](https://app.netlify.com).
2. Base directory: `/` or `apps/website`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Environment Variables:
   - `VITE_API_URL=https://your-railway-api.up.railway.app`
   - `VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

---

## 2. Railway Setup (Express Backend API)

1. Create a new service on [Railway](https://railway.app).
2. Select your GitHub repository.
3. Set Environment Variables:
   - `PORT=3001`
   - `DATABASE_URL=postgres://user:pass@ep-xyz.neon.tech/neondb?sslmode=require`
   - `ALLOWED_ORIGINS=https://acspire.in,https://admin.acspire.in`
   - `JWT_SECRET=super_secret_64_character_key`
   - `ADMIN_EMAIL=admin@acspire.com`
   - `ADMIN_PASSWORD=Acspire@2026`
   - `CLOUDINARY_CLOUD_NAME=xxxx`
   - `CLOUDINARY_API_KEY=xxxx`
   - `CLOUDINARY_API_SECRET=xxxx`
4. Railway will automatically detect `server/railway.json` and deploy your API!

🎉 **All systems go!**
