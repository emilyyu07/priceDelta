# PriceDelta

_Automated Retail Intelligence Engine_

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

PriceDelta is a full-stack market intelligence platform that automates retail price tracking, ingesting high-frequency product data, visualizing historical market trends, and executing real-time alert triggers when prices fluctuate beyond user-defined thresholds.

## ✨ Key Features

### 🛒 Intelligent Tracking

- **Automated Scraper Engine:** Background workers (`ingestor.ts`) autonomously scrape and normalize product data from external sources.
- **Trend Analytics:** Interactive visualization of historical price action using Recharts, helping users identify optimal buying windows.
- **Smart Alerts:** User-defined custom price targets, with distinct `alertChecker` jobs to trigger instant email notifications when targets are met.

### 🛡️ Secure & Scalable Implementation

- **Robust Authentication:** Stateless JWT-based auth flow with secure session management and Bcrypt password hashing.
- **End-to-End Type Safety:** Strict type sharing between the Prisma database schema and React frontend ensures runtime reliability.
- **Performance Optimization:** Uses optimistic UI updates and responsive design with Tailwind CSS.

## ⚙️ System Architecture & Data Pipeline

### 🏗️ Modular Backend Design

- **Decoupled Microservices:** Utilizes a Controller-Service pattern in Express.js to strictly separate business logic from API orchestration.

- **Data Integrity:** Leverages Prisma ORM with PostgreSQL to enforce strict schema definitions across complex User, Product, and PriceHistory relations.

### 🔄 Automated Monitoring Workflow

- **Ingestion Engine:** Built a dedicated worker that fetches raw external data, normalizes it to the internal schema, and upserts it into persistent storage.

- **Scheduled Execution:** Integrated node-cron to orchestrate recurring "Price Check" jobs that detect market fluctuations at defined intervals.

- **Async Notification Logic:** Developed an independent service that evaluates price changes against watchlists, dispatching email alerts via Nodemailer only when specific thresholds are met.

## 🚀 Tech Stack

### Frontend

- **[React (Vite):](https://react.dev/) & [TypeScript:](https://www.typescriptlang.org/)** Modular architecture with strict end-to-end type safety.
- **[Tailwind CSS:](https://tailwindcss.com/)** Responsive, high-performance styling.
- **[Axios:](https://axios-http.com/)** Configured with interceptors to handle authenticated API requests and global error management.
- **[Recharts:](https://recharts.github.io/)** Interactive data visualization for historical price trends.

### Backend

- **[Node.js](https://nodejs.org/en) & [Express.js:](https://expressjs.com/)** Built a high-concurrency RESTful API using a modular architecture for efficient request handling.
- **[Prisma ORM:](https://www.prisma.io/) & [PostgreSQL:](https://www.postgresql.org/)** Type-safe ORM with strict relational schema enforcement and automated migrations.
- **[JSON Web Tokens (JWT):](https://jwt.io/) & [Bcrypt.js:](https://www.npmjs.com/package/bcryptjs)** Stateless authentication with industry-standard secure password hashing.
- **[Nodemailer:](https://nodemailer.com/) & [Node-Cron:](https://www.npmjs.com/package/node-cron)** Orchestrates background ingestion workers and automated SMTP communication for email alert dispatch.

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database instance

### Backend

1.  Navigate to the server directory:
    ```bash
    cd backend
    npm install
    ```
2.  Configure environment variables:
    - Create a `.env` file matching `.env.example`.
    - Ensure your **PostgreSQL** instance is running.
3.  Initialize the database:
    ```bash
    npx prisma migrate dev --name init
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### Frontend

1.  Navigate to the client directory:
    ```bash
    cd frontend
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```

---

## API Endpoints Overview

- **`POST /api/auth/register`**: Register a new user.
- **`POST /api/auth/login`**: Log in a user.
- **`GET /api/user/me`**: Get authenticated user's profile.
- **`PATCH /api/user/me`**: Update authenticated user's profile.
- **`GET /api/products`**: Get all products.
- **`GET /api/products/:id`**: Get a single product with price history.
- **`GET /api/alerts`**: Get all price alerts for the authenticated user.
- **`POST /api/alerts`**: Create a new price alert.
- **`DELETE /api/alerts/:id`**: Delete a price alert.
- **`GET /api/notifications`**: Get all notifications for the authenticated user.
- **`PATCH /api/notifications/:id/read`**: Mark a notification as read.
- **`GET /health`**: Health check endpoint.
- **`GET /api/ingest`**: Manually trigger data ingestion.

## Folder Structure (Simplified)

```
.
├── backend/
│   ├── .gitignore
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── generated/           # Generated Prisma client files
│   ├── node_modules/        # Project dependencies
│   ├── prisma/              # Prisma schema, migrations
│   └── src/
│       ├── config/          # Application configuration
│       ├── controllers/     # Request handlers
│       ├── generated/       # Prisma client and model definitions
│       ├── middleware/      # Express middleware
│       ├── routes/          # API route definitions
│       ├── workers/         # Background worker logic
│       └── index.ts         # Backend entry point
├── frontend/
│   ├── .gitignore
│   ├── dev.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── node_modules/        # Project dependencies
│   ├── public/              # Static assets
│   └── src/
│       ├── App.css
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx         # Frontend entry point
│       ├── api/             # API client services
│       ├── assets/          # Images and other static files
│       ├── components/      # Reusable UI components
│       ├── contexts/        # React Context providers
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Page-level components
│       ├── services/        # Frontend business logic services
│       ├── types/           # TypeScript type definitions
│       └── utils/           # Utility functions
└── README.md
```
