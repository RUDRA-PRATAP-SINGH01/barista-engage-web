# Barista Engage — Web

Frontend for **Barista Engage**, an AI-native CRM & marketing intelligence platform for coffee chains. Marketers discover customer audiences (manually or via natural language), launch campaigns across WhatsApp / Email / SMS, simulate delivery outcomes, and get AI-powered analysis of campaign performance.

Backend lives in a separate repo: `barista-engage-api` (Hono + Prisma + PostgreSQL + Gemini).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 + shadcn/ui
- TanStack Query (server state) · React Router
- React Hook Form + Zod
- Recharts · Lucide · Axios

## Design

Dark-only enterprise dashboard styled after the Urban Sound reference (`Urban Sound dashboard _ Fiverr Solutions.jpeg`). Palette, spacing, radii, and typography rules live in `cursor/design.md`. Product and technical specs are in `cursor/PRD.md`, `cursor/AppFlow.md`, and `cursor/TechSpec.md`.

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:5173. API calls to `/api/*` are proxied to the backend at `http://localhost:3000` (see `vite.config.ts`), so start `barista-engage-api` alongside for full functionality.

## Project structure

```
src/
  components/   # layout, shared, cards, shadcn ui primitives
  features/     # feature modules (dashboard, segments, campaigns, ai)
  pages/        # route-level pages
  routes/       # router configuration
  services/     # API layer (all axios calls go through here)
  lib/          # query client, utils
  types/        # shared DTO types
```

## Status

Application shell and dashboard are built with mock data. Backend integration (segments, campaigns, analytics, AI tools) is in progress.
