# Barista Engage — Web

Frontend for **Barista Engage**, an AI-native CRM and marketing intelligence platform built for coffee chains. Marketers describe business goals in natural language, AI generates high-value audiences, builds full campaign strategies, and launches outreach across WhatsApp, Email, and SMS.

The backend lives in a separate repository: **barista-engage-api** (Hono + Prisma + PostgreSQL + Gemini).

---

## Table of Contents

- [Overview](#overview)
- [Recruiter Demo Flow](#recruiter-demo-flow)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [AI Workflow](#ai-workflow)
- [Integration Status](#integration-status)
- [Hooks Reference](#hooks-reference)
- [Deployment](#deployment)
- [Demo Checklist](#demo-checklist)
- [Design & Product Docs](#design--product-docs)
- [Scripts](#scripts)

---

## Overview

Barista Engage Web is a React SPA that provides:

- **Dashboard** — KPIs, funnel, churn, RFM distribution, recent campaigns
- **Segments** — browse customer segments with rules, health, and DNA radar
- **Campaigns** — campaign registry with status, channel, and audience metrics
- **Audience Builder** — natural-language goal → AI-generated audience, strategy, and forecast
- **Campaign Studio** — audience → full campaign (overview, strategy, messages, creative, save, launch)

All live data flows through a typed service layer, TanStack Query, and DTO mappers. AI features call Gemini-backed endpoints on the API.

---

## Recruiter Demo Flow

The primary end-to-end path for demos and validation:

```
Business Goal
    ↓
Audience Builder          POST /audience-builder/generate
    ↓
Create Campaign           navigate with router state
    ↓
Campaign Studio           POST /campaign-studio/generate
    ↓
Save Campaign             POST /campaign-studio/save
    ↓
Launch Campaign           POST /campaign-studio/launch
    ↓
Campaigns Page              GET /campaigns (cache invalidation)
```

**Demo tips:**

- Always start from **Audience Builder** → **Create Campaign**. Do not open Campaign Studio from the sidebar without an audience (shows empty state).
- Avoid refreshing mid-demo. Session persistence restores Campaign Studio state on refresh, but a clean uninterrupted flow is safest.
- If Gemini image quota is exhausted, set `VITE_ENABLE_CAMPAIGN_CREATIVE=false` to hide visual generation.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Server state | TanStack Query v5 |
| Routing | React Router v7 |
| Forms / validation | React Hook Form + Zod |
| Charts | Recharts |
| HTTP | Axios |
| Icons | Lucide React |

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+
- **barista-engage-api** running locally on port `3000` for full functionality

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment (optional for local dev)

```bash
cp .env.example .env
```

Local development defaults work without a `.env` file. See [Environment Variables](#environment-variables).

### 3. Start the API

Start **barista-engage-api** on `http://localhost:3000`.

### 4. Start the dev server

```bash
npm run dev
```

App runs at **http://localhost:5173**.

Vite proxies `/api/*` → `http://localhost:3000` (see `vite.config.ts`). The browser calls `/api/audience-builder/generate`; Vite forwards it to the backend.

### 5. Verify build

```bash
npm run lint
npm run build
npm run preview    # serves dist/ at http://localhost:4173
```

---

## Environment Variables

All frontend env vars use the `VITE_` prefix (baked in at build time).

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api` | Base URL for all API requests. Use `/api` when a reverse proxy forwards to the backend on the same domain. Use a full URL (e.g. `https://api.example.com`) when API is on a separate host. |
| `VITE_ENABLE_CAMPAIGN_CREATIVE` | `true` | Set to `false` or `0` to hide Campaign Visual generation in Campaign Studio (useful when Gemini image quota is exhausted). |

Example `.env` for production with same-domain API proxy:

```env
VITE_API_BASE_URL=/api
```

Example when API is on a separate domain:

```env
VITE_API_BASE_URL=https://api.your-domain.com
```

Example to disable creative generation during a demo:

```env
VITE_ENABLE_CAMPAIGN_CREATIVE=false
```

**Important:** Changing env vars requires a **rebuild** (`npm run build`). They are not read at runtime from a server config.

---

## Project Structure

```
src/
├── components/
│   ├── cards/           # GlassCard and shared card primitives
│   ├── layout/          # AppLayout, AppSidebar, page chrome
│   └── ui/              # shadcn/ui primitives (button, table, skeleton, …)
│
├── features/
│   ├── audience-builder/
│   │   ├── components/  # Goal input, analysis state, result panels
│   │   ├── hooks/       # useAudienceAnalysis
│   │   ├── audience-builder-mappers.ts
│   │   ├── goal-suggestions.ts
│   │   ├── mock-data.ts # Analysis step labels (UI animation only)
│   │   └── types.ts
│   │
│   ├── campaign-studio/
│   │   ├── components/  # Overview, strategy, forecast, message, creative, actions
│   │   ├── hooks/       # useCampaignStudio, save/launch, message/creative mutations
│   │   ├── campaign-studio-mappers.ts
│   │   ├── campaign-studio-session.ts   # sessionStorage persistence
│   │   ├── campaign-status.ts         # Status label formatting
│   │   ├── analysis-steps.ts
│   │   └── types.ts
│   │
│   ├── campaigns/
│   │   ├── hooks/       # useCampaignsList
│   │   ├── campaign-mappers.ts
│   │   ├── campaign-list-utils.ts
│   │   └── …            # Registry table, KPI row, layout
│   │
│   ├── dashboard/
│   │   ├── hooks/       # useDashboardCampaigns, useDashboardSegments
│   │   └── …            # KPI cards, charts, recent campaigns
│   │
│   └── segments/
│       ├── hooks/       # useSegmentsList, useSegmentDetail
│       ├── segment-mappers.ts
│       ├── segment-derived-data.ts
│       └── …            # Sidebar, detail panel, radar, health
│
├── pages/
│   ├── ai/              # AudienceBuilderPage
│   ├── campaign-studio/ # CampaignStudioPage
│   ├── campaigns/       # CampaignsPage
│   ├── dashboard/       # DashboardPage
│   ├── landing/         # LandingPage
│   ├── segments/        # SegmentsPage
│   └── PlaceholderPage.tsx
│
├── routes/
│   └── index.tsx        # createBrowserRouter route table
│
├── services/
│   ├── audience-builder.service.ts
│   ├── campaign-studio.service.ts
│   ├── campaigns.service.ts
│   ├── segments.service.ts
│   ├── analytics.service.ts   # defined, not wired in UI
│   └── ai.service.ts          # legacy, unused
│
├── lib/
│   ├── api-client.ts    # Axios instance, interceptors
│   ├── api-wrapper.ts   # unwrapApiResponse, requestApiData
│   ├── env.ts           # getApiBaseUrl, isCampaignCreativeEnabled
│   ├── errors.ts        # ApiRequestError, AI error messages
│   ├── query-client.ts  # TanStack Query defaults
│   ├── query-keys.ts    # Centralized cache keys
│   ├── query-state.ts   # getQueryState, getMutationState
│   └── format-utils.ts
│
├── types/
│   ├── api.ts           # ApiResponse envelope, error codes
│   └── dtos/            # Request/response DTOs per domain
│
├── hooks/api/           # Re-exports query utilities
├── App.tsx
└── main.tsx
```

---

## Routes

| Path | Page | Layout | Notes |
|------|------|--------|-------|
| `/` | LandingPage | None | Marketing landing |
| `/dashboard` | DashboardPage | AppLayout | KPIs, charts, recent campaigns |
| `/segments` | SegmentsPage | AppLayout | Segment list + detail panel |
| `/campaigns` | CampaignsPage | AppLayout | Campaign registry |
| `/campaigns/:id` | PlaceholderPage | AppLayout | Not wired — placeholder |
| `/analytics` | PlaceholderPage | AppLayout | Not wired — hidden from sidebar |
| `/analytics/:campaignId` | PlaceholderPage | AppLayout | Orphan route |
| `/ai/audience-builder` | AudienceBuilderPage | AppLayout | AI audience generation |
| `/campaign-studio` | CampaignStudioPage | AppLayout | Requires audience router state or session restore |

### Audience Builder → Campaign Studio navigation

```typescript
navigate("/campaign-studio", {
  state: { audience: generateData },  // AudienceGenerateResponseDto
});
```

`CampaignStudioPage` validates state via `isCampaignStudioNavigationState()`, maps it with `mapAudienceGenerateToStudioRequest()`, and auto-calls `POST /campaign-studio/generate`.

Direct access to `/campaign-studio` without state shows **CampaignStudioEmpty** with a link back to Audience Builder.

---

## Architecture

### Data flow pattern

Every backend integration follows the same layers:

```
UI (page / component)
    ↓
React Query hook (useMutation / useQuery)
    ↓
Service (src/services/*.service.ts)
    ↓
API client (Axios → /api/*)
    ↓
requestApiData → unwrapApiResponse
    ↓
DTO mapper (features/*/**-mappers.ts)
    ↓
View model rendered in UI
```

### API response envelope

All endpoints return:

```typescript
// Success
{ success: true, data: T, message?: string }

// Failure
{ success: false, error: { code, message, details? } }
```

`requestApiData` unwraps `data` on success and throws `ApiRequestError` with a `userMessage` on failure. AI-specific codes include `AI_QUOTA_EXCEEDED`, `AI_UNAVAILABLE`, and `AI_NOT_CONFIGURED`.

### Query state helpers

`getQueryState()` and `getMutationState()` normalize TanStack Query status into:

`idle` | `loading` | `success` | `error` | `empty`

and expose `userMessage` for error UI.

### Campaign Studio session persistence

`campaign-studio-session.ts` stores audience, generated campaign, messages, creative, and save/launch state in `sessionStorage`. Refreshing Campaign Studio restores results without re-calling the generate API (unless arriving fresh from Audience Builder).

---

## API Integration

All paths are relative to `VITE_API_BASE_URL` (default `/api`).

### Audience Builder

| Method | Path | Service | Hook |
|--------|------|---------|------|
| POST | `/audience-builder/generate` | `audienceBuilderService.generateGoal` | `useAudienceAnalysis` |

**Request:** `{ goal: string }`

**Response:** goal, generatedAudience (name, description, filters), audiencePreview, forecast, strategy, recommendedChannel, recommendedOffer, confidence

### Campaign Studio

| Method | Path | Service | Hook / caller |
|--------|------|---------|---------------|
| POST | `/campaign-studio/generate` | `campaignStudioService.generate` | `useCampaignStudio` |
| POST | `/campaign-studio/regenerate-message` | `campaignStudioService.regenerateMessage` | `useRegenerateMessage` |
| POST | `/campaign-studio/generate-creative` | `campaignStudioService.generateCreative` | `useGenerateCreative` |
| POST | `/campaign-studio/regenerate-creative` | `campaignStudioService.regenerateCreative` | direct service call |
| POST | `/campaign-studio/save` | `campaignStudioService.save` | `useSaveCampaign` |
| POST | `/campaign-studio/launch` | `campaignStudioService.launch` | `useLaunchCampaign` |
| POST | `/campaign-studio/generate-message` | `campaignStudioService.generateMessage` | **Not wired** — initial `/generate` includes messages |

Save and launch invalidate `queryKeys.campaigns.lists()` so the Campaigns page refetches automatically.

### Campaigns

| Method | Path | Service | Hook |
|--------|------|---------|------|
| GET | `/campaigns` | `campaignsService.getCampaigns` | `useCampaignsList`, `useDashboardCampaigns` |
| GET | `/campaigns/:id` | `campaignsService.getCampaignById` | Not wired in UI |
| POST | `/campaigns/:id/send` | `campaignsService.sendCampaign` | Not wired in UI |
| POST | `/campaigns/:id/simulate` | `campaignsService.simulateCampaign` | Not wired in UI |
| GET | `/campaigns/:id/analytics` | `campaignsService.getCampaignAnalytics` | Not wired in UI |

### Segments

| Method | Path | Service | Hook |
|--------|------|---------|------|
| GET | `/segments` | `segmentsService.getSegments` | `useSegmentsList` |
| GET | `/segments/:id` | `segmentsService.getSegmentById` | `useSegmentDetail` |
| GET | `/segments` (enriched) | `segmentsService.getSegmentsWithAudience` | `useDashboardSegments` |
| POST | `/segments` | `segmentsService.createSegment` | Not wired in UI |
| POST | `/segments/preview` | `segmentsService.previewSegment` | Not wired in UI |

---

## AI Workflow

### Phase 1 — Audience Builder

1. User enters a business goal (or picks a suggestion chip).
2. `POST /audience-builder/generate` returns audience blueprint, filters, forecast, and strategy.
3. UI shows: Generated Audience, Filter chips, Preview, Strategy (why/what/how), ROI forecast.
4. **Create Campaign** navigates to Campaign Studio with `{ audience: response }`.

### Phase 2 — Campaign Studio

1. Auto-calls `POST /campaign-studio/generate` with mapped audience payload.
2. Loading animation plays while the API runs (steps are UI-only, not real backend progress).
3. Results render six sections:
   - **Campaign Overview** — name, objective, summary
   - **Strategy Cards** — audience, offer, channel, timing
   - **Forecast** — funnel + metrics
   - **Message Studio** — WhatsApp, Email, SMS tabs with edit and regenerate
   - **Creative Studio** — generate/regenerate visual (optional via env flag)
   - **Campaign Actions** — save and launch
4. **Save** persists campaign + segment via API.
5. **Launch** sends communications; status updates to `SENDING` (displayed as **Active**).

### Campaign status mapping

| Backend status | Studio UI label | Campaigns hub label |
|----------------|-----------------|---------------------|
| `DRAFT` | Draft | Draft |
| `SENDING` | Active | Active |
| `SCHEDULED` | Active | Active |
| `ACTIVE` | Active | Active (normalized to `SENDING`) |
| `COMPLETED` | Completed | Completed |

---

## Integration Status

| Area | Status | Notes |
|------|--------|-------|
| **Dashboard** | Live API | Campaigns + segments via TanStack Query; KPIs, funnel, churn, RFM, recent campaigns |
| **Segments** | Live API | List + detail panel; rules from API; health/growth/radar derived client-side |
| **Campaigns registry** | Live API | List, KPI row, registry table; save/launch invalidates cache |
| **Audience Builder** | Live API | Goal → generate → results panels → navigate to Campaign Studio |
| **Campaign Studio** | Live API | Generate, message regenerate, creative, save, launch |
| **Campaign analytics charts** | Mock / placeholder | Dashboard analytics widgets not yet on live API |
| **Campaign detail page** | Placeholder | `/campaigns/:id` route exists, not implemented |
| **Analytics page** | Placeholder | Route exists, hidden from sidebar |
| **Segment create / preview** | API only | Service methods exist, no UI |

---

## Hooks Reference

| Hook | Type | Service / endpoint | Used by |
|------|------|-------------------|---------|
| `useAudienceAnalysis()` | mutation | `POST /audience-builder/generate` | AudienceBuilderPage |
| `useCampaignStudio()` | mutation | `POST /campaign-studio/generate` | CampaignStudioPage |
| `useRegenerateMessage()` | mutation | `POST /campaign-studio/regenerate-message` | CampaignStudioPage |
| `useGenerateCreative()` | mutation | `POST /campaign-studio/generate-creative` | CampaignStudioPage |
| `useSaveCampaign()` | mutation | `POST /campaign-studio/save` | CampaignStudioPage |
| `useLaunchCampaign()` | mutation | `POST /campaign-studio/launch` | CampaignStudioPage |
| `useDashboardCampaigns()` | query | `GET /campaigns` | DashboardPage |
| `useDashboardSegments()` | query | `GET /segments` (enriched) | DashboardPage |
| `useSegmentsList()` | query | `GET /segments` | SegmentsPage |
| `useSegmentDetail(id)` | query | `GET /segments/:id` | SegmentsPage |
| `useCampaignsList()` | query | `GET /campaigns` | CampaignsPage |

---

## Deployment

### Build

```bash
npm run build
```

Output: `dist/` (static files).

### Production API routing

The Vite dev proxy does **not** run in production. Choose one:

**Option A — Same domain (recommended)**

```
https://app.example.com/       → dist/ (static)
https://app.example.com/api/*  → backend
```

Set `VITE_API_BASE_URL=/api` and configure nginx / CDN rewrite.

**Option B — Separate API host**

Set `VITE_API_BASE_URL=https://api.example.com`. Enable CORS on the backend for the frontend origin.

### SPA routing

Configure the host to serve `index.html` for all client routes:

| Platform | Config |
|----------|--------|
| **Vercel** | `vercel.json` → `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]` |
| **Netlify** | `public/_redirects` → `/* /index.html 200` |
| **nginx** | `try_files $uri $uri/ /index.html;` |

### Pre-deploy checklist

- [ ] Backend deployed and reachable
- [ ] `VITE_API_BASE_URL` set for production
- [ ] `npm run build` succeeds
- [ ] SPA rewrites configured
- [ ] `/api` reverse proxy configured (if using same domain)
- [ ] Gemini configured on backend for AI endpoints
- [ ] Optional: `VITE_ENABLE_CAMPAIGN_CREATIVE=false` if image quota limited
- [ ] Run [Demo Checklist](#demo-checklist) on live URL

---

## Demo Checklist

Run on the deployed URL before a recruiter demo:

| Step | Action | Pass |
|------|--------|------|
| 1 | Audience Builder → submit goal | Results panels appear |
| 2 | Click **Create Campaign** | Campaign Studio loads (no infinite loading) |
| 3 | Review all six sections | Overview, strategy, forecast, messages, creative, actions |
| 4 | **Save Campaign** | Success banner + Campaign ID |
| 5 | Open **Campaigns** page | New campaign in registry |
| 6 | **Launch Campaign** | Status shows Active (studio + campaigns) |
| 7 | Generate Creative | Image appears or inline error in Creative Studio |
| 8 | Browser console | No DEBUG / TEST logs |

---

## Design & Product Docs

| Document | Location | Contents |
|----------|----------|----------|
| Design system | `cursor/design.md` | Palette, spacing, typography, dark theme |
| PRD | `cursor/PRD.md` | Product requirements |
| App flow | `cursor/AppFlow.md` | User journeys |
| Tech spec | `cursor/TechSpec.md` | API contracts (may lag implementation) |

UI follows a dark enterprise dashboard aesthetic. Shared surfaces (`PremiumSurface`, `SectionEyebrow`, `MetricBlock`) live in `src/features/audience-builder/components/audience-builder-ui.tsx` and are reused in Campaign Studio.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Type-check (`tsc -b`) + production build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve production build locally (port 4173) |

---

## License

Private — Barista Engage internal project.
