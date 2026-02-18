# PFMS Implementation Plan

| Field | Detail |
|-------|--------|
| **Document Version** | 1.0 |
| **Status** | Approved |
| **Author** | Benedicta Davour |
| **Date** | February 17, 2026 |
| **PRD Reference** | PRD_Poultry_Farm_Management_System.md v2.1 |

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Phase 1 — Foundation & Infrastructure](#phase-1--foundation--infrastructure)
4. [Phase 2 — Authentication, Roles & Tenant Management](#phase-2--authentication-roles--tenant-management)
5. [Phase 3 — Farm Management & Flock Setup](#phase-3--farm-management--flock-setup)
6. [Phase 4 — Egg Production & Live Stock](#phase-4--egg-production--live-stock)
7. [Phase 5 — Customers, Sales & Expenses](#phase-5--customers-sales--expenses)
8. [Phase 6 — Financial Reporting, Dashboard & Export](#phase-6--financial-reporting-dashboard--export)
9. [Phase 7 — Inventory, Purchases & Notifications](#phase-7--inventory-purchases--notifications)
10. [Phase 8 — Offline PWA, Polish & Launch](#phase-8--offline-pwa-polish--launch)
11. [Phase Summary Table](#phase-summary-table)
12. [Agent & Skill Reference Card](#agent--skill-reference-card)

---

## Overview

This document defines the phased development plan for the Poultry Farm Management System (PFMS). Each phase is a self-contained, deployable, and testable unit with a visible interface. Phases build sequentially — completing each phase unlocks the next without leaving orphaned features.

**Timeline:** 10–12 weeks
**Target:** MVP validated with launch client (Ama's poultry farm, Accra Region, Ghana)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14+ (App Router) |
| UI Library | React 18+ |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma |
| Authentication | NextAuth.js / Auth.js |
| Hosting | Vercel |
| Charts | Recharts |
| PWA / Offline | next-pwa + Workbox |
| Offline Storage | IndexedDB via Dexie.js |
| PDF Export | @react-pdf/renderer |
| Excel Export | xlsx |

---

## Phase 1 — Foundation & Infrastructure

**Duration:** Week 1 | **Priority:** P0

### Goal

Establish the project skeleton. No feature is usable yet, but the app is deployable, the full database schema is in place, and the layout shells are ready for all subsequent screens.

### Tasks

- Scaffold Next.js 14+ App Router project with TypeScript and Tailwind CSS
- Provision Neon PostgreSQL database
- Write **complete Prisma schema** covering all PRD v2.1 tables:
  - `Tenant`, `Farm`, `CustomRole`, `User`, `UserFarmAccess`
  - `Flock`, `EggProduction`, `Customer`, `Sale`, `Expense`
  - `InventoryItem`, `InventoryMovement`, `Purchase`
  - `Notification`, `NotificationSetting`
  - Include all audit fields (`updated_by`, `deleted_by`, `delete_reason`, `is_deleted`) from day one
  - Include `session` enum on `EggProduction`, `payment_method` enum on `Sale`, `category_group` enum on `Expense`
- Run initial Prisma migration
- Set up PWA manifest (`manifest.json`) and register a bare service worker shell
- Create authenticated layout (sidebar + header skeleton with farm switcher placeholder and notification bell placeholder) and unauthenticated layout (login shell)
- Configure environment variables, Vercel project, and CI/CD pipeline

### Deliverable & What to Test

> App loads on Vercel preview URL. Login page renders. Authenticated routes redirect to login when unauthenticated. Database is connected and Prisma Studio shows all tables correctly.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Neon DB provisioning | `neon-instagres` skill |
| Full Prisma schema authoring | `nodejs-backend` skill |
| Next.js scaffold + layout shells | `fullstack-developer` skill |
| PWA manifest setup | `fullstack-developer` skill |

---

## Phase 2 — Authentication, Roles & Tenant Management

**Duration:** Week 2 | **Priority:** P0

### Goal

A fully functional auth system with multi-tenant isolation and a custom role/permission model. The tenant admin can log in, create roles, and invite team members before a single piece of farm data exists.

### Tasks

- NextAuth.js credentials provider (email + password, bcrypt hashing)
- JWT session includes `tenant_id`, `user_id`, `role_id`, `is_tenant_admin`, `accessible_farm_ids`
- Prisma middleware that automatically injects `WHERE tenant_id = ?` on every query
- API-level tenant guard middleware (every Route Handler validates tenant ownership of requested resource)
- **Custom Role CRUD** — create/edit/delete roles; permission matrix UI (grouped checkboxes: Flocks, Production, Sales, Expenses, Reports, Export, User Management, Settings, Farm Management, Notifications)
- "Can do / Cannot do" role preview before saving
- **User Invitation** — send invite via email with temporary magic link; invited user sets password on first login
- **User Management screen** — list users, show Pending/Active status, edit role, deactivate account, assign farm access
- **Tenant Settings screen** — org name, currency (default GH₵), timezone (default Africa/Accra)
- Default role templates seeded: Manager, Worker, Viewer

### Deliverable & What to Test

> Login and logout work. Tenant Admin can create a custom "Accountant" role with only Reports:view and Export:access permissions. Admin can invite a user, who receives a link, sets a password, and logs in with restricted access. Navigating to a restricted screen shows a friendly "you don't have access" message. Two tenants' data is completely invisible to each other.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| NextAuth.js + Prisma middleware | `nodejs-backend` skill |
| Permission matrix UI, role builder, invite flow screens | `frontend-ui-ux` skill |
| API route guards + tenant scoping | `nodejs-backend` skill |

---

## Phase 3 — Farm Management & Flock Setup

**Duration:** Week 3 | **Priority:** P0

### Goal

The admin can create farm locations, assign team members to them, switch between farms in the header, and register flocks. This sets the context for all data entry in subsequent phases.

### Tasks

- **Farm Management screen** (Admin only) — create, edit, archive farms; each farm has name, optional location, notes
- **Persistent farm switcher** in the header — dropdown showing accessible farms with mini stat previews; always displays active farm name; hidden for single-farm tenants
- User-farm access assignment UI (within User Management — assign users to specific farms or "all farms")
- **Flocks screen** — create, edit, archive flocks; flock is scoped to the currently selected farm; shows bird count, start date, status indicator (Laying / Growing based on whether production records exist)
- Post-farm-creation guided wizard: Assign team → Add first flock → Start recording
- Farm context enforced on all API routes from this point forward

### Deliverable & What to Test

> Admin creates "Dodowa Farm" and "Tema Farm". Switches between them via the header switcher — the farm name in the header changes. Creates "Batch A" flock under Dodowa, "Batch T1" under Tema. Assigns a Worker to Tema only — they cannot see Dodowa data.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Farm + flock API routes | `nodejs-backend` skill |
| Farm switcher, farm management UI, flocks screen | `frontend-ui-ux` skill |
| Farm context enforcement middleware | `fullstack-developer` skill |

---

## Phase 4 — Egg Production & Live Stock

**Duration:** Week 3–4 | **Priority:** P0

### Goal

The core daily workflow. A user opens the app, records eggs, and the stock count on the dashboard updates immediately. This is the most-used interaction in the entire system.

### Tasks

- **Egg Production screen** — record: date (defaults today), flock selector (defaults most recent), egg count, optional session (AM / PM / Other)
- Duplicate warning: if same flock + same date already has an entry, warn user but allow saving (FR-210)
- "Save & Add Another" button keeps form open for multi-flock entry
- Egg stock calculation API — `SUM(eggs_produced) - SUM(crates_sold × 30)` per farm, strictly derived, never stored
- Production history view: filterable table by flock and date range; line chart (Recharts) showing production trend
- **Dashboard initial wiring** — Eggs on Hand card, Sellable Crates card (derived, clearly labelled), recent production mini-table (last 7 days)
- Audit trail enforcement: 10-minute edit window on production records; Admin-only edit after window; correction entry model for non-admin corrections

### Deliverable & What to Test

> Worker opens app, selects Batch A, enters 287 for the AM session. Saves. Dashboard shows 287 eggs / 9 full crates + 17 loose. Worker enters another entry for the same flock same day (PM session) — system warns but allows. Dashboard updates to 574 eggs. Trying to edit after 10 minutes shows "Admin approval required" for a non-admin user.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Stock calculation queries + production API routes | `nodejs-backend` skill |
| Egg production form, history table, production chart | `frontend-ui-ux` skill |
| Dashboard stock widgets wiring | `fullstack-developer` skill |

---

## Phase 5 — Customers, Sales & Expenses

**Duration:** Week 4–5 | **Priority:** P0

### Goal

Record the money side of the business. Sales update stock automatically, support credit and multiple payment methods, and every record has a complete audit trail.

### Tasks

- **Customers screen** — CRUD; tenant-scoped (shared across farms); searchable list; customer detail page showing purchase history, total crates, total revenue, total paid, outstanding credit
- **Sales History screen** — New Sale form with:
  - Customer (searchable dropdown + inline "Add New Customer")
  - Crates field (shows available crates alongside; turns red if exceeded)
  - Price per crate (pre-fills last price used for this customer)
  - Live total calculation displayed prominently
  - `amount_paid`, `payment_method` (Cash / MoMo / Bank / Credit), optional `payment_reference`
  - `balance` auto-displayed: total − amount_paid
- Stock validation: prevent save if `crates × 30 > eggs_on_hand`; show "Use max available" button on error
- Credit sales allowed: `balance` tracked per sale and aggregated on customer profile
- Customer totals auto-updated on each sale (total crates, revenue, paid, outstanding, last purchase date)
- **Expenses screen** — record: date, category (Operating / Production groups visible in selector UI), description, amount, optional flock link (collapsed by default); expense list with date + category filtering; daily total shown at top
- 10-minute edit window on sales and expenses; soft delete with required reason; correction entry support
- Permission enforcement: sales/expenses forms hidden from users without the relevant create permission

### Deliverable & What to Test

> Owner creates customer "Kofi Mensah". Records a sale: 10 crates at GH₵ 45, MoMo, amount paid GH₵ 300 (credit sale — balance GH₵ 150). Dashboard egg stock decreases by 300 eggs. Kofi's profile shows outstanding credit of GH₵ 150. Attempting to sell more crates than available shows a helpful error with the max available pre-filled. Owner records a Feed expense (Production Cost) of GH₵ 380.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Sale + customer + expense API routes | `nodejs-backend` skill |
| Sales form (live calc, stock validation, payment fields), customer detail, expense form | `frontend-ui-ux` skill |
| Audit trail middleware (edit window, soft delete, correction entry) | `fullstack-developer` skill |

---

## Phase 6 — Financial Reporting, Dashboard & Export

**Duration:** Week 5–6 | **Priority:** P0

### Goal

The owner opens the app and immediately understands how the business is performing — both as a business and as cash in hand. They can export a professional PDF for their accountant in under a minute.

### Tasks

- **Complete Dashboard** with all financial metric cards:
  - Eggs on Hand · Sellable Crates (derived) · Empty Crates (Physical, placeholder populated in Phase 7)
  - Gross Revenue · Cash Collected · Outstanding Credit · Total Expenses · Operational Profit · Cash Profit (all current month, clearly labelled)
  - Recent 5 sales (with balance shown where applicable) · Last 7 days production mini-chart
  - Quick action buttons: Record Eggs, New Sale, Add Expense
- **Profit Summary screen**:
  - Date range presets: This Week / This Month / Last Month / Custom
  - Farm selector: specific farm or All Farms (aggregated)
  - Side-by-side cards: **Operational Profit** (Gross Revenue − Expenses) and **Cash Profit** (Cash Collected − Expenses) with clear label explanations
  - Expense breakdown table/chart by group (Operating vs Production) with category-level detail
  - Revenue section: Gross Revenue / Cash Collected / Outstanding Credit
  - Period-over-period comparison indicator (+/− % vs previous period)
- **Export**:
  - PDF — Profit Report (farm name, date range, timestamp, all 5 metrics + expense breakdown); formatted for A4 sharing
  - Excel — Sales history, Expenses list, Egg Production records (column headers, currency and date formatting)
  - Export permission enforced via role; exports scoped to user's accessible farms only

### Deliverable & What to Test

> Owner selects "This Month" on Profit Summary — sees Gross Revenue: GH₵ 8,100, Cash Collected: GH₵ 7,500, Outstanding Credit: GH₵ 600, Expenses: GH₵ 5,650, Operational Profit: GH₵ 2,450, Cash Profit: GH₵ 1,850. Switches to "All Farms" — numbers aggregate correctly. Clicks Export PDF — downloads a clean A4 PDF with farm name and date range in the header. Worker role (no Export permission) sees the export button disabled or hidden.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Profit queries (dual profit metrics, cross-farm aggregation) | `nodejs-backend` skill |
| PDF generation + Excel export | `fullstack-developer` skill |
| Dashboard KPI layout design, metric card hierarchy | `kpi-dashboard-design` skill |
| Chart components (Recharts), Profit Summary screen | `frontend-ui-ux` skill |

---

## Phase 7 — Inventory, Purchases & Notifications

**Duration:** Week 6–7 | **Priority:** P1

### Goal

Track physical supplies on the farm, record purchases with a full movement log, and let the system proactively alert the owner before they run out of stock.

### Tasks

- **Inventory screen** — item CRUD (name, category, unit, `low_stock_threshold`); current quantity on hand; movement history per item (filterable by type and date)
- Every inventory change creates an `InventoryMovement` log entry (type: purchase / usage / adjustment; signed quantity_change; reason required for adjustments)
- **Purchases screen** — record: item, quantity, total cost; auto-increases `quantity_on_hand` + creates a movement log entry (type: purchase); optionally auto-creates an expense record with toast notification
- Usage recording — manual decrease with quantity and reason; creates movement log entry (type: usage)
- Manual stock adjustment — requires reason; creates adjustment movement entry
- **Notification system**:
  - Low egg stock alert — triggers once when `eggs_on_hand` crosses below threshold (default: 5 crates); resets when stock recovers
  - Low inventory alert — per item when `quantity_on_hand < low_stock_threshold`
  - In-app notification centre — bell icon in header with unread badge count; dropdown listing all notifications with title, message, timestamp; mark as read; actionable links (View Stock, Record Eggs)
  - Notifications scoped per farm; delivered only to users with `Notifications:receive` permission
- **Settings screen** — configure low egg stock threshold; configure per-item thresholds; update tenant currency / timezone
- **Admin Review queue** — dedicated screen listing offline sale conflicts flagged during sync; visible to Admin only

### Deliverable & What to Test

> Admin creates inventory item "Layer Mash Feed" (bags, threshold: 2 bags). Records a purchase of 5 bags — inventory shows 5 bags, movement log shows +5 (purchase), an expense was auto-created under Feed. Records usage of 1 bag — inventory shows 4 bags, log shows −1 (usage). When inventory drops to 2 bags, a notification appears on the bell icon: "Low Feed Stock: 2 bags remaining (threshold: 2 bags)" with a link to the inventory screen.

### Agents & Skills

| Task | Agent / Skill |
|------|---------------|
| Inventory + movement log + purchase API routes | `nodejs-backend` skill |
| Notification trigger logic (on-write threshold check) | `nodejs-backend` skill |
| Inventory screen, movement history, purchases screen, notification centre | `frontend-ui-ux` skill |
| Settings screen, Admin Review queue | `fullstack-developer` skill |

---

## Phase 8 — Offline PWA, Polish & Launch

**Duration:** Weeks 7–12 | **Priority:** P0

### Goal

The app works seamlessly with no internet. It is fast, installable, mobile-optimised, secure, and ready for the launch client.

---

### 8a — Offline Mode (Week 7–8)

**Tasks:**

- Service worker (Workbox via `next-pwa`):
  - Cache-first for app shell (JS, CSS, fonts)
  - Network-first for API data
  - Stale-while-revalidate for static assets
- Dexie.js IndexedDB:
  - Offline sync queue (`entity_type`, `payload`, `status`)
  - Local cache of recent dashboard/stock data for read-while-offline
- Offline forms: egg production, sales (with cached stock + staleness warning), expenses — identical form experience online and offline
- Local save shows "Saved locally — will sync when internet returns" toast; pending sync badge count in header
- Background sync on reconnection: processes queue in order; if a synced sale causes negative stock, creates a conflict record → flags for Admin Review queue (Phase 7)
- Online/offline indicator: calm amber bar "Offline — data entry works normally"; green confirmation toast on reconnect

**Deliverable & What to Test:**

> Power goes out. Kwame opens the app — amber "Offline" bar appears. He records eggs for Batch A and Batch B — both save locally with "2 pending" badge. Power returns — within 30 seconds both entries sync; badge disappears; dashboard updates with fresh stock numbers.

**Agents & Skills:**

| Task | Agent / Skill |
|------|---------------|
| Service worker + Workbox strategy config | `fullstack-developer` skill |
| Dexie.js IndexedDB queue + background sync logic | `fullstack-developer` skill |
| Offline/online indicator, sync badge, pending queue UI | `frontend-ui-ux` skill |

---

### 8b — Mobile Polish & Accessibility (Week 8–9)

**Tasks:**

- Responsive layout finalisation: sidebar on desktop, bottom nav bar on mobile; no horizontal scrolling at 360px+
- Minimum 44px tap targets on all interactive elements
- Numeric keyboard auto-opens on all number input fields
- PWA "Add to Home Screen" prompt on first eligible visit
- Simplified worker dashboard: shows only permitted actions; friendly restriction messages on locked screens
- Lighthouse audit pass: target ≥ 90 Performance, ≥ 90 Accessibility, PWA badge
- Minimum 4.5:1 contrast ratio on all text elements

**Deliverable & What to Test:**

> App is installable on Android Chrome from a prompt. All screens are usable on a 360px wide screen without horizontal scrolling. Numeric fields open the numeric keyboard automatically. Worker logs in — sees a simplified dashboard with only Egg Production and Inventory actions visible.

**Agents & Skills:**

| Task | Agent / Skill |
|------|---------------|
| Mobile responsiveness, bottom nav, PWA install prompt | `ui-ux-pro-max` skill |
| Lighthouse optimisation, contrast + accessibility pass | `ui-ux-pro-max` skill |
| Worker-scoped simplified dashboard view | `frontend-ui-ux` skill |

---

### 8c — Testing & Security Hardening (Weeks 10–11)

**Tasks:**

- **Cross-tenant isolation testing** — verify no API endpoint returns data from another tenant's ID
- **Permission matrix testing** — test every permission combination; verify client UI hiding matches API rejection
- **Offline sync testing** — simulate conflict scenarios (offline sale → negative stock on sync); verify Admin Review queue is populated correctly
- **Multi-farm data integrity** — verify stock, profit, and reports scope correctly per farm; no cross-farm data leakage
- **Edit window enforcement** — verify 10-minute lock is enforced server-side, not only client-side
- Penetration testing pass on tenant isolation and authentication endpoints

**Agents & Skills:**

| Task | Agent / Skill |
|------|---------------|
| Running test suites and integration checks | `Bash` agent |
| Code review for security vulnerabilities | `fullstack-developer` skill |

---

### 8d — UAT & Launch (Week 12)

**Tasks:**

- Deploy to production on Vercel
- Provision launch client's tenant: create org, add farms, seed initial flocks, create team accounts with appropriate roles
- Parallel run period: launch client uses PFMS alongside paper records for 1–2 weeks to validate accuracy
- Rapid bug fix cycle based on UAT feedback
- Confirm all Go/No-Go criteria from PRD Section 9.3 pass
- Tenant confirmed stable → expand onboarding to additional tenants

**Agents & Skills:**

| Task | Agent / Skill |
|------|---------------|
| Production deployment + Vercel config | `Bash` agent |
| Tenant provisioning scripts | `nodejs-backend` skill |

---

## Phase Summary Table

| Phase | Weeks | Key Deliverable | Screens Unlocked |
|-------|-------|-----------------|-----------------|
| 1 — Foundation | 1 | App scaffold, full DB schema, PWA shell | Login page, layout shell |
| 2 — Auth & Tenancy | 2 | Login, roles, invitations, tenant settings | User Management, Role Management, Settings |
| 3 — Farm & Flocks | 3 | Multi-farm navigation, flock registry | Farm Management, Flocks |
| 4 — Egg Production & Stock | 3–4 | Daily egg entry, live stock on dashboard | Egg Production, Dashboard (stock cards) |
| 5 — Sales, Customers & Expenses | 4–5 | Full commerce loop with credit support | Customers, Sales History, Expenses |
| 6 — Reporting & Export | 5–6 | Dual profit metrics, export PDF/Excel | Profit Summary, complete Dashboard |
| 7 — Inventory & Notifications | 6–7 | Movement log, purchases, live alerts | Inventory, Purchases, Notifications |
| 8a — Offline Mode | 7–8 | Offline-first data entry + background sync | All screens work offline |
| 8b — Mobile Polish | 8–9 | Installable PWA, mobile-optimised | All screens — mobile layout |
| 8c — Testing & Security | 10–11 | Tenant isolation + permission hardening | — |
| 8d — UAT & Launch | 12 | Production deployment, live tenant | All screens — production |

---

## Agent & Skill Reference Card

| Agent / Skill | Use When |
|---|---|
| `neon-instagres` skill | Provisioning and configuring the Neon Postgres database |
| `nodejs-backend` skill | Writing API routes, Prisma queries, middleware, business logic, notification triggers |
| `fullstack-developer` skill | Connecting frontend to backend, Next.js App Router patterns, full feature wiring, offline sync logic |
| `frontend-ui-ux` skill | Building screens and components from scratch without design mockups |
| `ui-ux-pro-max` skill | Mobile polish, accessibility audit, Lighthouse optimisation, PWA install experience |
| `kpi-dashboard-design` skill | Dashboard KPI layout, metric card hierarchy, chart type selection |
| `Plan` agent | Architecture review and implementation planning before starting a new phase |
| `Explore` agent | Searching the existing codebase for patterns before adding new features |
| `Bash` agent | Running Prisma migrations, test suites, builds, linting, and deployment commands |
