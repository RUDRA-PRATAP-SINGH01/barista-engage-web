# Barista Engage — Web

Frontend for **Barista Engage**, an AI-native CRM & marketing intelligence platform for coffee chains. Marketers discover customer audiences (manually or via natural language), launch campaigns across WhatsApp / Email / SMS, simulate delivery outcomes, and get AI-powered analysis of campaign performance.

The backend lives in a separate repo: [`barista-engage-api`](https://github.com/) (Hono + Prisma + PostgreSQL + Gemini).

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

The app runs at http://localhost:5173. API calls to `/api/*` are proxied to the backend at `http://localhost:3000` (see `vite.config.ts`), so start **barista-engage-api** alongside for full functionality.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## Project structure

```
src/
  components/     # layout, shared, cards, shadcn ui primitives
  features/       # feature modules (dashboard, segments, campaigns, ai)
    dashboard/    # KPI cards, charts, React Query hooks
    segments/     # sidebar, detail panel, DTO mappers, derived view models
    campaigns/    # campaign registry, KPI row, hub layout
  pages/          # route-level pages
  routes/         # router configuration
  services/       # API layer (all HTTP calls go through here)
  lib/            # query client, query keys, query state, format utils, api client
  types/dtos/     # shared API DTO types
  hooks/api/      # re-exports for query utilities
```

## Data layer

All backend communication follows the same pattern:

1. **Services** (`src/services/`) — thin wrappers around the API client (`campaignsService`, `segmentsService`, etc.)
2. **Raw DTOs** (`src/types/dtos/`) — shapes returned by the backend (`*ApiDto`)
3. **Mappers** (`src/features/*/ *-mappers.ts`) — normalize raw API responses into frontend models (e.g. `audienceSize` fallbacks, rule formatting)
4. **React Query hooks** — fetch data with shared `queryKeys` and `getQueryState()` for loading / error / empty handling
5. **Derived data** — client-side view models where the API does not yet expose a field (e.g. segment health tiers, radar DNA scores)

## Integration status

| Area | Status | Notes |
|------|--------|-------|
| **Dashboard** | Live API | Campaigns + segments via TanStack Query; KPIs, funnel, churn donut, RFM distribution, recent campaigns, AI recommendations |
| **Segments** | Live API | List + detail panel; rules from API; health/growth/radar derived from segment name |
| **Campaigns (registry)** | Live API | Campaign list, KPI row, registry table via `useCampaignsList()` |
| **Campaigns (analytics charts)** | Mock data | Status donut, channel performance, trends, insights still use placeholders |
| **AI tools** | Not wired | Audience builder & campaign analyst pending |

## Key hooks

| Hook | Service | Used by |
|------|---------|---------|
| `useDashboardCampaigns()` | `campaignsService.getCampaigns()` | Dashboard |
| `useDashboardSegments()` | `segmentsService.getSegmentsWithAudience()` | Dashboard |
| `useSegmentsList()` | `segmentsService.getSegments()` + detail enrichment | Segments page sidebar |
| `useSegmentDetail(id)` | `segmentsService.getSegmentById(id)` | Segments detail panel |
| `useCampaignsList()` | `campaignsService.getCampaigns()` | Campaigns hub |

## Environment

No frontend `.env` is required for local development — the Vite proxy forwards `/api` to `http://localhost:3000`. See `vite.config.ts` and `src/lib/env.ts` for configuration details.
