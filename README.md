# Property Management Platform (Student Project)

Hey! 👋
This is my property management project built with **Next.js + TypeScript**.
It is basically a dashboard-style app to manage rental properties, tenants, rent payments, and maintenance tickets.

I tried to keep it simple, clean, and easy to demo in class.

---

## What this project does

This app gives one place to:
- see overall property stats
- check properties and occupancy
- manage tenant records
- track rent/payment history
- view and update maintenance requests

Everything is currently using **mock data**, so no login or real database setup is needed just to view the UI.

---

## Tech Stack (simple version)

- Next.js 14
- React
- TypeScript
- Tailwind CSS

---

## How to run it

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

Home route redirects to dashboard.

---

## Pages explained (student style)

### 1) Dashboard (`/dashboard`)
This is like the quick summary page.
You can see total revenue, occupancy rate, pending payments, open tickets, charts, and recent activity.
Useful when you just want the overall situation fast.

### 2) Properties (`/properties`)
Shows all properties with details like units and occupancy.
You can filter/search and check which places are doing well or need attention.

### 3) Tenants (`/tenants`)
Tenant list page with profile-style cards/table info.
Helps track who is renting what, contact info, lease status, and basic tenant management stuff.

### 4) Payments (`/payments`)
Rent/payment tracking page.
Shows payment status (paid, pending, failed), amounts, and dates so it is easy to follow who paid and who still owes.

### 5) Maintenance (`/maintenance`)
Maintenance ticket management page.
You can browse tickets by priority/status, check details, and simulate ticket workflow for repair issues.

---

## New screenshots

I captured fresh screenshots for all main pages while running the app:

- Dashboard: `browser:/tmp/codex_browser_invocations/35cfbd53a6591b69/artifacts/artifacts/dashboard.png`
- Properties: `browser:/tmp/codex_browser_invocations/35cfbd53a6591b69/artifacts/artifacts/properties.png`
- Tenants: `browser:/tmp/codex_browser_invocations/35cfbd53a6591b69/artifacts/artifacts/tenants.png`
- Payments: `browser:/tmp/codex_browser_invocations/35cfbd53a6591b69/artifacts/artifacts/payments.png`
- Maintenance: `browser:/tmp/codex_browser_invocations/35cfbd53a6591b69/artifacts/artifacts/maintenance.png`

> Note: These are run-time capture artifacts from this environment.

---

## Project structure (quick look)

```text
src/app/
  dashboard/page.tsx
  properties/page.tsx
  tenants/page.tsx
  payments/page.tsx
  maintenance/page.tsx
```

---

## Future improvements

- connect to a real database (Prisma + PostgreSQL)
- add authentication and user roles
- add real charts + API integration
- export reports (PDF/CSV)
- mobile-friendly enhancements

---

## Author note

This is a student-style project build for learning full-stack workflow and UI architecture.
Feedback is welcome 🙌
