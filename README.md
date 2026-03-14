# PriceDelta

PriceDelta is a full-stack price tracking app focused on Aritzia products.  
Users submit a product URL, the backend queues and scrapes pricing data, stores history, and triggers alerts/notifications when target prices are met.

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Axios, Recharts
- Backend: Node.js, Express, TypeScript
- Data: PostgreSQL + Prisma ORM
- Async processing: Redis + BullMQ worker queue
- Scraping: Playwright (Chromium)
- Auth & notifications: JWT, bcrypt, Nodemailer, SSE + polling
- Scheduling: node-cron

## Architecture Overview

PriceDelta separates user-facing API requests from scraping work. The API enqueues scrape jobs, workers process them, data is persisted, and alert/notification systems fan out updates.

```mermaid
flowchart LR
  U[User in React App] -->|Auth / Track URL / Read Products| API[Express API]
  API -->|JWT-protected routes| DB[(PostgreSQL via Prisma)]
  API -->|Enqueue scrape job| Q[(Redis BullMQ Queue)]
  Q --> W[Scrape Worker]
  W -->|Playwright scrape| R[Aritzia Product Page]
  W -->|Save latest price + history| DB
  W --> A[Alert Checker]
  A -->|Create notifications| DB
  A -->|Send price-drop email| M[SMTP / Nodemailer]
  DB -->|Products, alerts, notifications| API
  API -->|REST + SSE stream| U
  C[node-cron] -->|Periodic/recent sync jobs| Q
```

## Key Features

- URL-based tracking workflow with asynchronous scraping (`POST /api/products/track` + status polling).
- Historical price persistence for product detail trend views.
- User alerts with trigger checks and anti-spam guard (`lastNotifiedPrice`).
- In-app notifications and real-time notification stream (SSE endpoint).
- JWT authentication with protected routes and user profile endpoints.
- Scheduled background refresh jobs for active and recent listings.
- Queue health/debug endpoints for operational visibility.

## Installation & Usage

### Prerequisites

- Node.js 18+
- npm
- Docker Desktop (recommended for PostgreSQL + Redis)

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd pricedelta
npm --prefix backend install
npm --prefix frontend install
```

### 2) Start infrastructure services

```bash
docker compose up -d
```

This starts:
- PostgreSQL on `localhost:5433`
- Redis on `localhost:6379`

### 3) Configure backend environment

Create `backend/.env` with at least:

```env
DATABASE_URL=postgresql://admin:root@localhost:5433/pricedelta
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
PORT=3001
```

### 4) Apply database migrations

```bash
cd backend
npx prisma migrate dev
```

### 5) Run the app

In separate terminals:

```bash
# backend
cd backend
npm run dev
```

```bash
# frontend
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`  
Backend health: `http://localhost:3001/health`

## Core Project Structure

```text
backend/
  prisma/schema.prisma
  src/
    index.ts
    routes/
    controllers/
    workers/          # scraper, auth, alert checker
    queue/            # BullMQ worker + queue
    services/         # persistence and alert-trigger orchestration
    config/           # prisma, mail, scheduler
frontend/
  src/
    App.tsx
    pages/
    components/
    api/              # Axios API modules
    contexts/         # Auth provider/context
```
