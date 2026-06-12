# Design System & Visual Direction

## Design Source of Truth

The attached Urban Sound dashboard reference image is the primary design reference for the entire frontend.

This is not merely inspiration.

The visual language, spacing system, card hierarchy, navigation structure, typography scale, and color palette should closely follow the reference.

Any new screen should feel like it belongs in the same product family.

---

# Product Personality

Barista Engage should feel:

* Premium
* Modern
* AI-native
* Enterprise SaaS
* Data-heavy
* Trustworthy
* Minimal

It should not feel:

* Playful
* Cartoonish
* Crypto-inspired
* Gaming-inspired
* Neon-heavy
* Over-designed

The target impression is:

"An internal marketing intelligence platform used by a large coffee chain."

---

# Reference Image

The Urban Sound dashboard image attached in this repository is the canonical visual reference.

Whenever design decisions are unclear, follow the reference image.

Priority:

1. Reference Image
2. This Design Document
3. General UI best practices

---

# Color Palette

Use the exact visual palette from the Urban Sound dashboard.

Do not introduce additional accent colors unless explicitly required.

## Background

Primary Background

Very dark graphite

```css
#1E1F24
```

## Surface

Dashboard cards

```css
#23252B
```

## Elevated Surface

Hover states and highlighted cards

```css
#2A2D34
```

## Borders

Subtle borders only

```css
#343843
```

## Primary Accent

Urban Sound blue

```css
#4B8CFF
```

Use for:

* Active navigation
* KPI highlights
* Charts
* AI actions
* Important metrics

## Accent Variations

```css
#72A5FF
#8CB8FF
```

Use only for chart gradients and data visualization.

## Text

Primary

```css
#FFFFFF
```

Secondary

```css
#A3A7B2
```

Muted

```css
#6E7482
```

## Success

```css
#4ADE80
```

## Warning

```css
#FBBF24
```

## Error

```css
#F87171
```

---

# Layout System

## Sidebar

Fixed left navigation.

Width:

```text
280px
```

Contains:

* Logo
* Navigation
* AI tools section
* User profile

Must visually match the reference.

---

## Content Area

Full height layout.

Structure:

Header
↓
KPI Row
↓
Analytics Grid
↓
Tables / Detailed Views

---

# Spacing System

Use an 8px spacing scale.

Allowed values:

```text
4
8
12
16
24
32
40
48
64
```

Avoid arbitrary spacing values.

---

# Border Radius

Cards

```text
16px
```

Buttons

```text
10px
```

Inputs

```text
10px
```

Modals

```text
20px
```

Do not exceed these values.

---

# Shadows

Very subtle.

Use depth through contrast, not large shadows.

Preferred:

```css
box-shadow:
0 1px 2px rgba(0,0,0,.25);
```

Avoid:

* Floating cards
* Large glows
* Neon effects

---

# Typography

Font:

Inter

Weights:

```text
400
500
600
700
```

Avoid:

```text
800
900
```

for regular UI.

---

# Dashboard Design

Dashboard is the most important screen.

Structure:

Top Row

* Total Customers
* Segments
* Campaigns
* Delivery Rate

Second Row

* Campaign Funnel
* Churn Distribution
* Segment Distribution

Third Row

* Recent Campaigns
* AI Recommendations

Must resemble the visual density of the Urban Sound dashboard.

---

# AI Features

AI functionality should feel native.

Use the same blue accent.

Do not introduce purple gradients.

AI cards should look like regular product features.

Avoid:

"magic AI" styling.

Prefer:

"professional intelligence tool" styling.

---

# Charts

Use:

* Recharts

Charts should follow the reference image:

* Thin lines
* Subtle grids
* Muted axes
* Blue primary data series

No rainbow charts.

No unnecessary gradients.

---

# Tables

Tables should be:

* Dense
* Readable
* Enterprise style

Follow the lower sections of the reference image.

Prioritize information density.

---

# Animations

Use only:

* Hover transitions
* Fade transitions
* Expand/collapse transitions

Duration:

```text
150ms–250ms
```

Avoid:

* Parallax
* Large motion
* Bouncy animations
* Scroll-triggered theatrics

---

# Responsive Design

Desktop-first.

Primary target:

```text
1440px+
```

Secondary:

```text
1024px+
```

Mobile support is required but not a design priority for the assignment.

---

# Non-Negotiable Rules

Do not redesign screens unnecessarily.

Do not experiment with alternate color palettes.

Do not introduce glassmorphism.

Do not introduce crypto-dashboard aesthetics.

Do not introduce neon effects.

Do not introduce random gradients.

Every screen should feel like a natural extension of the Urban Sound dashboard reference.

refer to the Urban Sound dasboard_Fiverr.jpeg