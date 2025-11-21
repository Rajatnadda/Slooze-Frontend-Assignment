# Slooze-Frontend-Assignment
A full-stack inventory management application built using React, TailwindCSS, Context API, and a Node.js/Express API.
It includes authentication, role-based access, product management, and a clean light/dark theme toggle.

 Features
 Authentication & Authorization

Login & Register with JWT authentication.

Stores user session in localStorage.

Auto-attaches token on every API call.

Protected routes using <ProtectedRoute />.
# Slooze — Commodities Inventory

Welcome to Slooze, a small inventory management system with role-based access (Manager and Store-Keeper). This repository contains a Backend (Node/Express + MongoDB) and a Frontend (React + Vite + Tailwind) implementing authentication, role-based UI, and product management features.

---

**Quick Links**
- Backend: `Backend/`
- Frontend: `Frontend/`

---

**Status**: Ready for local development and deployed (ensure correct backend URL in `Frontend/.env`).

## Features

- Authentication (email/password) with JWT
- Role-based access control
	- Manager: access to dashboard, full product CRUD
	- Store-Keeper: view, add, edit products (delete restricted)
- Product listing with search and quantity badges
- Add / Edit product forms
- Delete confirmation modal (manager only)
- Light/Dark theme toggle (persisted in localStorage)
- Role-based menu items and protected routes

## Quick Start (Local)

Prerequisites
- Node.js 16+ and npm
- MongoDB (Atlas connection recommended)

1) Clone repository

```powershell
git clone <your-repo-url>
cd Slooze
```

2) Backend setup

```powershell
cd Backend
npm install
# create/edit .env with MONGO_URI and JWT_SECRET
# example .env keys: PORT, MONGO_URI, JWT_SECRET
npm start
```

By default the backend runs on `http://localhost:5000`.

3) Frontend setup

```powershell
cd Frontend
npm install
# update Frontend/.env to point to your backend, e.g.
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

Open `http://localhost:5173` in the browser.

## Environment Variables

Backend (`Backend/.env`)
- `PORT` (optional, default 5000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs

Frontend (`Frontend/.env`)
- `VITE_API_URL` — full base API URL (example: `http://localhost:5000/api` or the deployed backend URL)

## Test Accounts (local / dev)

You can create new users via the Register page, or use these test credentials if available in your DB:
- Store Keeper: `testsk@test.com` / `Test123!`

## API Endpoints (summary)

- POST `/api/auth/register` — register new user
- POST `/api/auth/login` — login; returns `{ token, user }`
- GET `/api/products` — list products
- GET `/api/products/:id` — get product
- POST `/api/products/add` — add product
- PUT `/api/products/:id` — update product
- DELETE `/api/products/:id` — delete product (manager only)

## Deployment Notes

- If deploying frontend (Vercel) and backend (Render/Heroku), ensure the backend CORS config includes the frontend domain and that `Frontend/.env` points to the deployed backend URL (`https://your-backend-url/api`).
- On the backend, allowed origins should list the deployed frontend origin(s).

## Project Structure

```
Backend/
	├─ controllers/
	├─ middleware/
	├─ models/
	├─ routes/
	├─ config/
	└─ server.js

Frontend/
	├─ src/
	│  ├─ pages/
	│  ├─ components/
	│  ├─ contexts/
	│  └─ api/
	└─ .env
```






