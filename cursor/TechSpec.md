# Technical Specification

## Frontend Stack

Framework:

* React 19
* TypeScript
* Vite

Routing:

* React Router DOM

Styling:

* Tailwind CSS
* shadcn/ui

State Management:

* TanStack Query
* React Context (theme and UI-only state)

Forms:

* React Hook Form
* Zod
* @hookform/resolvers

Charts:

* Recharts

Icons:

* Lucide React

HTTP Client:

* Axios

Utilities:

* clsx
* tailwind-merge

---

# Architecture

```text
src/

assets/

components/
  layout/
  shared/
  charts/
  tables/
  cards/

features/
  dashboard/
  segments/
  campaigns/
  analytics/
  ai/

hooks/

lib/
  api.ts
  query-client.ts
  utils.ts

pages/
  dashboard/
  segments/
  campaigns/
  analytics/
  ai/

routes/

services/
  ai.service.ts
  campaigns.service.ts
  segments.service.ts

types/

App.tsx
main.tsx
```

---

# Application Architecture

Frontend is a pure client-side SPA.

The frontend never contains business logic.

All business logic remains in the backend.

Frontend responsibilities:

* display data
* collect user input
* validate forms
* call APIs
* render analytics
* present AI outputs

Backend responsibilities:

* segmentation logic
* campaign execution
* analytics generation
* delivery simulation
* AI reasoning

---

# Feature Modules

## Dashboard

Responsibilities:

* KPI cards
* Customer overview
* Churn distribution
* Segment distribution
* Recent campaigns
* Platform summary

Future widgets:

* AI recommendations
* Campaign health overview

API Dependencies:

GET /campaigns

GET /segments

---

## Segments

Responsibilities:

* Segment list
* Segment creation
* Segment preview
* Audience samples

API Dependencies:

POST /segments

POST /segments/preview

GET /segments

GET /segments/:id

---

## AI Audience Builder

Responsibilities:

* Natural language audience discovery
* Generated filters display
* Audience size preview
* Sample customer preview

API Dependencies:

POST /ai/audience-builder

Example:

Find cold brew lovers who haven't visited in two months

↓

Generated Filters

↓

Audience Size

↓

Sample Customers

---

## Campaigns

Responsibilities:

* Campaign list
* Campaign creation
* Campaign detail page
* Send campaign
* Simulate campaign

API Dependencies:

POST /campaigns

GET /campaigns

GET /campaigns/:id

POST /campaigns/:id/send

POST /campaigns/:id/simulate

---

## Campaign Analytics

Responsibilities:

* Delivery funnel
* Open rate
* Click rate
* Segment breakdown
* Channel performance

API Dependencies:

GET /campaigns/:id/analytics

GET /campaigns/:id/communications

---

## AI Campaign Analyst

Responsibilities:

* Analyze completed campaigns
* Display summary
* Display key insights
* Display recommendations

API Dependencies:

POST /ai/campaign-analyst

---

## Future AI Campaign Generator

Responsibilities:

* Generate campaign drafts
* Generate offers
* Generate marketing copy
* Generate image concepts

API Dependencies:

POST /ai/campaign-generator

Not part of MVP.

---

# Routing

```text
/

Dashboard

/segments

/campaigns

/campaigns/:id

/ai/audience-builder

/analytics/:campaignId

/ai/campaign-analyst
```

---

# State Management Rules

## Server State

Use:

TanStack Query

Examples:

* campaigns
* segments
* analytics
* AI responses

Never duplicate server data in Context.

---

## Local UI State

Use:

React State

Examples:

* modal open state
* selected tab
* filter panel state
* form draft state

---

## Global State

Use Context only for:

* theme
* sidebar collapse state

Nothing else.

---

# API Layer

All API calls must go through:

```text
services/
```

Never call axios directly from components.

Example:

```ts
campaignsService.getCampaigns()

segmentsService.previewSegment()

aiService.buildAudience()
```

---

# Error Handling

Every page must handle:

* loading
* empty
* success
* error

states.

Never show blank screens.

---

## AI Error Handling

Handle:

429

Display:

AI quota exceeded.
Please try again later.

Handle:

502

Display:

AI service temporarily unavailable.

Handle:

503

Display:

AI service is not configured.

Never expose raw backend messages.

---

# Type Safety

Rules:

* No any
* No ts-ignore
* No unchecked API responses
* All request/response DTOs typed

Shared types preferred.

---

# Data Visualization

Use Recharts.

Preferred Charts:

* Area Chart
* Line Chart
* Bar Chart
* Pie Chart

Avoid:

* 3D charts
* radial gimmicks
* gauge widgets

Charts should match the Urban Sound reference design.

---

# Performance Targets

Initial Load:

< 2s

Route Navigation:

< 300ms

AI Response Loading:

Immediate visual feedback

Chart Rendering:

< 100ms

---

# Accessibility

All buttons must:

* have labels
* have hover states
* have focus states

Forms must:

* show validation errors
* support keyboard navigation

---

# Code Quality Rules

* Keep components small
* Prefer composition over inheritance
* Prefer reusable UI primitives
* No duplicated API logic
* No business logic inside components
* No premature optimization

Frontend exists to present and orchestrate the CRM platform, not to replicate backend behavior.
