Intentionally vulnerable demo target for Flagd. All secrets are fake. Do not deploy.

# Acme Plumbing — Client Portal

Customer portal for Acme Plumbing & Heating. Customers sign in, book repair
visits, follow job notes from the technician and pay invoices online.

## Stack

- Next.js 15 (App Router) + TypeScript
- Supabase (auth + Postgres)
- Payments via our processor's REST API

## Getting started

```bash
npm install
cp .env .env.local   # then fill in your own keys
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/app/dashboard` — signed-in customer dashboard
- `src/app/api/*` — route handlers for bookings, invoices, customers and search
- `src/lib/supabase` — browser and server Supabase clients
- `src/components` — UI components
