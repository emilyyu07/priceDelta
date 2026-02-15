# PriceDelta — Project Overview & Resume Bullets

## One-paragraph project summary

**PriceDelta** is a full-stack **retail price-tracking and alerting platform** built with **TypeScript, React (Vite), Node.js/Express, PostgreSQL, and Prisma**. It ingests product data from an external API on a schedule (node-cron), stores products, retailers, and time-series price history in a relational database, and lets authenticated users browse products, set target-price alerts, and receive email notifications when prices drop. The backend exposes a REST API with JWT auth, protected routes, and a global error handler; the frontend uses React Router, shared TypeScript types, Axios interceptors for auth, and Recharts for price-history visualization. Background workers handle ingestion (upsert + price-history writes) and alert evaluation (Prisma transactions + Nodemailer), making it a solid example of **full-stack development, API design, scheduled jobs, and auth**.

---

## Tech stack (for “Skills” or “Technologies” on resume)

| Layer                  | Technologies                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Frontend**           | React 19, TypeScript, Vite, React Router, Tailwind CSS v4, Axios, Recharts, Lucide React |
| **Backend**            | Node.js, Express 5, TypeScript, Prisma ORM, PostgreSQL                                   |
| **Auth**               | JWT (jsonwebtoken), Bcrypt.js, Bearer token in Authorization header                      |
| **Background / async** | node-cron (scheduled ingestion), Nodemailer (SMTP email alerts)                          |
| **Data**               | PostgreSQL, Prisma (migrations, relations, transactions, Decimal types)                  |

---

## What you actually built (for accuracy in bullets)

- **Backend**
  - Express app with CORS, JSON body parser, and global error-handling middleware.
  - REST API: auth (register/login), user (get/update profile), products (list + by id with listings & price history), alerts (CRUD, protected), notifications (list + mark read), health check, manual ingest trigger.
  - JWT auth: sign on login/register, verify in `protect` middleware; Bcrypt for password hashing.
  - Prisma schema: User, Product, Retailer, ProductListing, PriceHistory, PriceAlert, Notification, SavedSearch, IngestionLog — with relations, indexes, and cascades.
  - Ingestion worker: fetches from Fake Store API, upserts Retailer/Product/ProductListing, appends PriceHistory only when price changes, then invokes alert checker per product.
  - Alert checker: finds alerts where target price ≥ current price and not yet notified (or new low), sends email via Nodemailer, then in one Prisma transaction updates PriceAlert (lastNotifiedPrice/At) and creates Notification.
  - Scheduler: node-cron runs ingestion every 5 minutes (configurable).
- **Frontend**
  - SPA with React Router: public routes (login, register), protected routes (home, dashboard, products, product detail, alerts, notifications, profile) wrapped in a layout with header.
  - Auth: React Context (AuthProvider) + custom hook (useAuth); token in localStorage; Axios interceptor adds Bearer token.
  - Pages: login/register forms, home (hero + dynamic stats from alerts/notifications APIs), dashboard (featured products grid), products list with search UI, product detail with Recharts line chart and “set alert” form, alerts list (create/delete), notifications list (mark read), profile (update name).
  - Reusable components: Layout, Header, Button, Input, Card, ProductCard, ProductGrid.
  - Shared TypeScript types (Product, PriceAlert, Notification, etc.) and API modules (alerts, notifications, products, user, auth service).
- **Data flow**
  - Cron → ingest worker → external API → Prisma upserts + price history → alert checker → Nodemailer + Prisma transaction (alert update + notification insert).
  - User actions (set alert, view products, etc.) → Axios → Express routes → Prisma → JSON response → React state/UI.

---

## Draft resume bullets (software engineering focus)

Use these as a starting point; pick 2–4 depending on space and role focus. Adjust past tense if you’re still actively developing.

### Option A — Full-stack + systems

1. **Built a full-stack price-tracking platform** (React, TypeScript, Node.js, Express, PostgreSQL) enabling users to set target-price alerts and receive email notifications when prices drop, with end-to-end JWT authentication and protected REST APIs.

2. **Designed and implemented a scheduled data pipeline** that ingests product data from an external API every 5 minutes, upserts normalized records with Prisma, maintains time-series price history, and triggers an alert service that evaluates user watchlists and sends SMTP notifications via Nodemailer.

3. **Developed a type-safe backend** using Prisma ORM and PostgreSQL with 9 relational models (User, Product, Retailer, PriceHistory, PriceAlert, Notification, etc.), JWT middleware for route protection, and transactional updates for alert state and in-app notifications.

4. **Built a responsive React SPA** with React Router, shared TypeScript types, Axios interceptors for auth, and Recharts for interactive price-history visualization; implemented role-based route guards and a context-based auth flow for login, registration, and profile management.

### Option B — Shorter / impact-focused

1. **Full-stack price-tracking app**: React + TypeScript frontend and Node/Express/PostgreSQL backend with JWT auth, REST APIs for products/alerts/notifications, and scheduled ingestion with automated email alerts on price drops.

2. **Implemented background ingestion and alert engine**: node-cron–driven worker fetches external API data, normalizes and stores it with Prisma, maintains price history, and runs an alert checker that sends emails and records notifications in a single database transaction.

3. **Designed relational schema and API layer**: 9-table PostgreSQL schema with Prisma (users, products, retailers, price history, alerts, notifications), protected routes, and a modular Express API used by a React SPA with shared types and auth context.

### Option C — One-liner for “Projects” section

- **PriceDelta**: Full-stack retail price-tracking platform (React, TypeScript, Node.js, Express, PostgreSQL, Prisma) with JWT auth, scheduled data ingestion, time-series price history, and automated email alerts when user-defined price targets are met.

---

## Feedback and suggestions

### What’s strong (keep highlighting)

- **Full stack**: You own frontend, backend, DB, and background jobs — good for “full-stack” or “backend + frontend” roles.
- **Auth**: JWT + Bcrypt + protected routes + React context is a standard, interview-friendly pattern.
- **Data modeling**: Multiple related entities, indexes, cascades, and transactions show you can design and use a real schema.
- **Async/background work**: Cron + worker + email + transactional side effects is the kind of “system” thinking SWE roles care about.
- **TypeScript end-to-end**: Same types/concepts from DB to API to React — demonstrates type-safety and consistency.

### How to strengthen bullets (and the project)

1. **Add numbers where you can**
   - “REST API with **12+** endpoints across auth, products, alerts, and notifications.”
   - “Scheduled worker processes **20+** products per run and triggers alert checks on price change.”
   - If you add tests: “**Unit tests** for alert-evaluation logic; **integration tests** for auth and product APIs.”

2. **Use strong verbs**
   - Prefer: _Designed, Implemented, Built, Architected, Integrated, Orchestrated, Automated._
   - Avoid: _Helped with, Worked on, Used_ (unless you’re clearly part of a team).

3. **Tie to outcomes**
   - “so users receive real-time price-drop notifications” / “reducing manual price checking.”
   - “ensuring alert state and notifications stay consistent under concurrent updates.”

4. **Optional project improvements (then you can say you did them)**
   - **Testing**: Jest (or Vitest) for `checkAlerts` and auth helpers; Supertest for a few API routes. Then: “Wrote unit and API integration tests for alert logic and auth flows.”
   - **README**: Add 1–2 sentences on “what problem it solves” and “how to run it” (you already have structure). Makes the project easier to evaluate.
   - **Error handling**: You have a global handler; you could mention “centralized error handling returning consistent JSON to the client.”
   - **Cron note**: README says “30 minutes”; code uses `*/5` (5 minutes). Align them or call out “configurable interval” in a bullet.

5. **Tailor to the role**
   - **Backend-leaning**: Lead with API design, Prisma/schema, cron/workers, transactions, email.
   - **Frontend-leaning**: Lead with React, TypeScript, routing, auth context, Recharts, Tailwind, component structure.
   - **Full-stack / generalist**: Balance both; mention “end-to-end ownership” or “full development lifecycle.”

6. **Be precise**
   - “Prisma ORM” and “PostgreSQL” are better than “a database.”
   - “JWT-based stateless auth with Bcrypt” is better than “user authentication.”
   - “Scheduled ingestion with node-cron” is better than “background tasks.”

7. **Spelling**
   - Fix “execututing” → “executing” in README if it’s still there.

---

## Suggested final picks (2–3 bullets)

If you only have room for **2 bullets**:

1. **Built a full-stack price-tracking platform** (React, TypeScript, Node.js, Express, PostgreSQL, Prisma) with JWT authentication, REST APIs for products/alerts/notifications, and a scheduled ingestion pipeline that maintains time-series price data and triggers email alerts when user-defined targets are met.

2. **Implemented a background ingestion and alert engine** using node-cron and Prisma: normalized external API data into a relational schema, wrote price history only on change, and ran an alert checker that sends SMTP notifications and updates alert state in a single transaction.

If you have room for **3**, add:

3. **Developed a responsive React SPA** with React Router, shared TypeScript types, Axios auth interceptors, and Recharts for price-history charts; added protected routes, context-based auth, and dynamic dashboard stats from alerts/notifications APIs.

Use the **one-liner** in a “Projects” or “Side projects” section when you need a single line per project.

Good luck with your internship search.
