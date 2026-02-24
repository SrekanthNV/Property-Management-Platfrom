# 🏠 Property Management Platform

A production-oriented, mobile-integrated property management system built with **Next.js 14**, **TypeScript**, and **Android (Kotlin)** — designed for reliability, scalability, and long-term maintainability.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Kotlin](https://img.shields.io/badge/Kotlin-1.9-purple?logo=kotlin)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Android Integration](#android-integration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Overview

This Property Management Platform provides a complete solution for landlords, property managers, and tenants to manage properties, leases, maintenance requests, and payments through a unified web and mobile interface.

### Key Design Principles

- **Modular Architecture**: Loosely coupled components enabling feature additions with minimal refactoring
- **Mobile-First Design**: Responsive web UI + native Android app with shared API layer
- **End-to-End Security**: JWT authentication, encrypted payments, role-based access control
- **Real-Time Updates**: WebSocket-powered notifications for maintenance, payments, and lease events
- **Production-Ready**: CI/CD pipelines, comprehensive testing, monitoring, and logging

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                       │
│  ┌──────────────┐          ┌──────────────────────┐  │
│  │  Next.js Web  │          │  Android App (Kotlin) │  │
│  │  (React/TS)   │          │  Jetpack Compose      │  │
│  └──────┬───────┘          └──────────┬───────────┘  │
│         │                             │               │
│         └──────────┬──────────────────┘               │
│                    │                                  │
├────────────────────┼──────────────────────────────────┤
│              API Gateway / REST                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │         Next.js API Routes (Route Handlers)      │  │
│  │   /auth  /properties  /tenants  /payments  /maint│  │
│  └──────┬──────────────────────────────────────┬───┘  │
│         │                                      │      │
├─────────┼──────────────────────────────────────┼──────┤
│         │        Service Layer                 │      │
│  ┌──────┴──────┐  ┌──────────┐  ┌─────────────┴──┐  │
│  │ Auth Service │  │ Payment  │  │ Notification   │  │
│  │ (JWT/OAuth)  │  │ Service  │  │ Service (WS)   │  │
│  └──────────────┘  └──────────┘  └────────────────┘  │
│                                                       │
├───────────────────────────────────────────────────────┤
│                   Data Layer                          │
│  ┌──────────┐  ┌───────────┐  ┌─────────────────┐   │
│  │ PostgreSQL│  │   Redis   │  │  File Storage   │   │
│  │ (Prisma)  │  │  (Cache)  │  │  (S3/Cloudinary)│   │
│  └──────────┘  └───────────┘  └─────────────────┘   │
└───────────────────────────────────────────────────────┘
```

---

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (Admin, Property Manager, Tenant)
- OAuth 2.0 social login (Google, Apple)
- Session management with secure HTTP-only cookies

### 🏘️ Property Management
- Property listing with advanced search and filters
- Unit management with floor plans and photos
- Lease tracking with automated reminders
- Document management (leases, inspections, receipts)

### 👥 Tenant Management
- Tenant profiles with contact and lease history
- Application processing workflow
- Background check integration
- Communication portal

### 💳 Payment Processing
- Rent collection with Stripe integration
- Automated recurring payments
- Payment history and receipt generation
- Late payment tracking and notifications

### 🔧 Maintenance Management
- Ticket creation with photo/video attachments
- Priority-based routing and assignment
- Status tracking with real-time updates
- Vendor management and scheduling

### 🔔 Notifications
- Real-time push notifications (Web + Android)
- Email and SMS alerts
- Customizable notification preferences
- Event-driven notification pipeline

### 📊 Dashboard & Analytics
- Revenue and occupancy analytics
- Maintenance request trends
- Payment collection rates
- Exportable reports (PDF, CSV)

---

## Tech Stack

### Web Application
| Technology | Purpose |
|---|---|
| Next.js 14 | Full-stack React framework (App Router) |
| TypeScript | Type safety and developer experience |
| Tailwind CSS | Utility-first styling |
| Prisma | Type-safe ORM |
| NextAuth.js | Authentication |
| Stripe | Payment processing |
| Socket.io | Real-time communication |
| Recharts | Data visualization |
| Zod | Schema validation |
| Jest + Playwright | Testing |

### Android Application
| Technology | Purpose |
|---|---|
| Kotlin | Primary language |
| Jetpack Compose | Declarative UI |
| Retrofit + OkHttp | Network layer |
| Hilt | Dependency injection |
| Room | Local database |
| Coroutines + Flow | Async operations |
| Firebase Cloud Messaging | Push notifications |
| CameraX | Photo attachments |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 14+
- Redis (optional, for caching)
- Android Studio (for mobile development)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/property-management-platform.git
cd property-management-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/propmanage"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Notifications
FIREBASE_PROJECT_ID="your-project-id"
SENDGRID_API_KEY="your-sendgrid-key"

# Storage
AWS_S3_BUCKET="your-bucket-name"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
```

---

## Project Structure

```
property-management-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # REST API route handlers
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── properties/     # Property CRUD
│   │   │   ├── tenants/        # Tenant management
│   │   │   ├── payments/       # Payment processing
│   │   │   └── maintenance/    # Maintenance tickets
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── properties/         # Property pages
│   │   ├── tenants/            # Tenant pages
│   │   ├── payments/           # Payment pages
│   │   ├── maintenance/        # Maintenance pages
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── layout/             # Layout components
│   │   ├── forms/              # Form components
│   │   └── charts/             # Chart components
│   ├── lib/                    # Utilities and configurations
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   └── styles/                 # Global styles
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── android/                    # Android Kotlin project
│   └── ...                     # Jetpack Compose app
├── public/                     # Static assets
├── docs/                       # Documentation
├── __tests__/                  # Test files
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with credentials |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Invalidate session |

### Properties

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List all properties |
| POST | `/api/properties` | Create property |
| GET | `/api/properties/:id` | Get property details |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| GET | `/api/properties/:id/units` | List units |

### Tenants

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tenants` | List all tenants |
| POST | `/api/tenants` | Add tenant |
| GET | `/api/tenants/:id` | Get tenant details |
| PUT | `/api/tenants/:id` | Update tenant |
| GET | `/api/tenants/:id/leases` | Get tenant leases |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List payments |
| POST | `/api/payments` | Create payment |
| POST | `/api/payments/intent` | Create Stripe intent |
| GET | `/api/payments/:id/receipt` | Download receipt |

### Maintenance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/maintenance` | List tickets |
| POST | `/api/maintenance` | Create ticket |
| PUT | `/api/maintenance/:id` | Update ticket |
| PUT | `/api/maintenance/:id/assign` | Assign ticket |

---

## Android Integration

The Android app connects to the same API layer, providing native mobile features:

```kotlin
// Retrofit API service
interface PropertyApi {
    @GET("api/properties")
    suspend fun getProperties(): Response<List<Property>>

    @POST("api/maintenance")
    suspend fun createTicket(@Body ticket: MaintenanceTicket): Response<Ticket>

    @GET("api/payments")
    suspend fun getPayments(): Response<List<Payment>>
}
```

See [android/README.md](android/README.md) for full Android setup instructions.

---

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# Triggers on push to main and pull requests
- Lint & Type Check
- Unit Tests (Jest)
- Integration Tests
- E2E Tests (Playwright)
- Build Verification
- Deploy to Staging/Production
```

---

## Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
