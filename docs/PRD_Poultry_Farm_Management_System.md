# Product Requirements Document: Poultry Farm Management System (PFMS)

| Field | Detail |
|-------|--------|
| **Document Version** | 2.1 |
| **Status** | Draft |
| **Author** | Benedicta Davour |
| **Date** | February 17, 2026 |
| **Change Summary** | v2.1: Applied client MVP decisions — offline sales conflict model, crate definition distinction, payment methods & credit sales, edit rules & audit trail, production session field, inventory movement log, offline security scope, and dual profit metrics (Operational + Cash) |
| **Default Currency** | GHS (Ghanaian Cedi - GH₵) — configurable per tenant |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Users & Personas](#3-users--personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [User Experience](#6-user-experience)
7. [Data Requirements](#7-data-requirements)
8. [Technical Architecture](#8-technical-architecture)
9. [Launch Plan](#9-launch-plan)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Open Questions](#11-open-questions)
12. [Appendix](#12-appendix)

---

## 1. Overview

### 1.1 Purpose

This Product Requirements Document defines the scope, features, technical architecture, and success criteria for the Poultry Farm Management System (PFMS). It serves as the single source of truth for all stakeholders involved in the design, development, and launch of the platform.

The document covers all functional and non-functional requirements needed to deliver a Minimum Viable Product (MVP) within a 10-12 week timeline.

### 1.2 Product Vision

PFMS is a **multi-tenant SaaS platform** for poultry farm management. While the MVP is validated with a single launch client (a poultry farm in the Accra Region, Ghana), the system is architected from day one to support multiple independent organizations (tenants), each managing one or more farm locations with their own teams, data, and configurations.

**First client (launch partner):** Ama's poultry farm — used as the primary use case and validation benchmark for all MVP features.

### 1.3 Problem Statement

Poultry farm owners across Ghana and similar markets currently rely on manual record-keeping methods — paper notebooks, scattered spreadsheets, and memory — to track daily operations including egg production, sales, expenses, inventory, and customer transactions.

This approach leads to:

- **Data loss and inaccurate records** due to misplaced notebooks or human error
- **Calculation errors** when determining profit, stock levels, or customer balances
- **No real-time visibility** into farm performance or financial health
- **Inability to quickly answer** questions like "How many eggs do I have?" or "What was my profit last month?"
- **Time wasted** reconciling numbers across multiple paper records
- **No delegation** — farm owners cannot empower staff to enter data without risking data integrity
- **No connectivity resilience** — rural farms often face unreliable internet, making cloud-only tools impractical

These problems result in poor decision-making, missed revenue opportunities, and unnecessary financial stress for farm owners.

### 1.4 Proposed Solution

The Poultry Farm Management System (PFMS) is a **multi-tenant, mobile-first web application** (PWA) that replaces manual record-keeping with a centralized digital platform. It provides:

- **Multi-tenant architecture:** Each organization (farm business) operates in an isolated data environment
- **Multi-farm support:** A single organization can manage multiple farm locations with independent stock, production, and financial tracking
- **Custom roles & permissions:** Farm owners define roles with granular permissions tailored to their team structure
- **Automated tracking:** Daily egg production recording with derived stock calculations
- **Financial recording:** Complete sales and expense logging with customer tracking
- **Instant reporting:** Real-time profit calculations for any date range, with export to Excel/PDF
- **Offline-first PWA:** Reliable data entry even without internet, with automatic background sync when connectivity returns
- **Notifications & alerts:** Proactive low-stock alerts and operational reminders
- **Mobile-first design:** Simple, fast forms optimized for mobile data entry

---

## 2. Goals & Success Metrics

### 2.1 Objectives

| ID | Objective | Priority |
|----|-----------|----------|
| OBJ-01 | Enable accurate daily recording of egg production per flock, per farm | P0 |
| OBJ-02 | Track egg stock availability automatically per farm (derived, never manual) | P0 |
| OBJ-03 | Record sales and expenses reliably with full audit trail and user attribution | P0 |
| OBJ-04 | Provide clear profit visibility over any selected time period, per farm or across all farms | P0 |
| OBJ-05 | Eliminate data loss, calculation errors, and manual tracking overhead | P0 |
| OBJ-06 | Deliver a mobile-friendly, offline-capable PWA with no feature loss on mobile | P0 |
| OBJ-07 | Support multi-tenant data isolation so each organization's data is completely separate | P0 |
| OBJ-08 | Enable farm owners to manage multiple farm locations from a single account | P0 |
| OBJ-09 | Allow farm owners to define custom roles with granular permissions for their team | P0 |

### 2.2 Key Results

| KPI | Target | Measurement Method |
|-----|--------|--------------------|
| Stock accuracy | 100% of egg stock changes are system-generated per farm | Audit log review |
| Financial reconciliation | Sales and expenses reconcilable without external spreadsheets | User validation |
| Profit reporting | Farm owner can determine profit for any date range in < 30 seconds | Usability testing |
| Mobile usability | All features accessible on mobile without horizontal scrolling | Responsive testing |
| Page load time | Under 2 seconds on average mobile connection (3G) | Lighthouse audit |
| Offline reliability | Data entry works without internet; syncs within 30 seconds of reconnection | Sync testing |
| Tenant isolation | Zero cross-tenant data leakage in security testing | Penetration testing |
| Daily adoption | Launch client enters data daily for 30 consecutive days post-launch | Usage analytics |

### 2.3 Non-Goals (Out of Scope for MVP)

| Item | Rationale |
|------|-----------|
| Payroll processing | Complexity not justified at this stage; use separate payroll tool |
| Advanced accounting (depreciation, tax) | Users value simplicity over accounting depth |
| Analytics & forecasting | Future enhancement after sufficient data is collected across tenants |
| Billing & subscription management | MVP is free for launch client; monetization in v2 |
| Tenant self-registration | MVP tenants are onboarded manually; self-service signup in v2 |
| White-labeling / custom branding per tenant | All tenants use PFMS branding for MVP |

---

## 3. Users & Personas

### 3.1 Target Users

The system supports a multi-tenant model where each organization (tenant) has its own users, farms, and data. Users belong to a single tenant and may be assigned one or more custom roles defined by the tenant's admin.

| User Type | Description | Default Access Level |
|-----------|-------------|---------------------|
| Tenant Admin (Owner) | The farm business owner who created the organization. Cannot be removed or demoted. | Full access — all features, all farms, role management, tenant settings |
| Custom Role Users | Team members assigned roles created by the Tenant Admin | Defined per role — any combination of permissions (e.g., "Manager", "Worker", "Accountant") |

**Default Roles (Pre-configured, editable by Admin):**

The system ships with three default role templates that the Tenant Admin can use as-is, modify, or supplement with entirely custom roles:

| Default Role | Default Permissions | Editable |
|-------------|-------------------|----------|
| Manager | Read/write production, sales, expenses, inventory; view reports; no user management, export, or settings | Yes |
| Worker | Record egg production and inventory usage; read-only for sales and reports | Yes |
| Viewer | Read-only access to all operational data; no create/edit/delete | Yes |

### 3.2 User Persona (Launch Client)

**Persona: Ama — Poultry Farm Owner (First Client / Launch Partner)**

| Attribute | Detail |
|-----------|--------|
| Age | 35-55 |
| Technical skill | Non-technical; comfortable with WhatsApp and basic smartphone use |
| Devices | Primary: Android smartphone; Secondary: occasional laptop/desktop |
| Daily routine | Collects eggs, records counts, manages sales to regular customers, purchases feed and supplies |
| Pain points | Loses track of egg counts; cannot quickly calculate profit; forgets customer purchase history; spends evenings reconciling paper records |
| Goals | Know exactly how many eggs/crates are available at any moment; understand weekly/monthly profit; spend less time on paperwork |
| Motivations | Growing the business, reducing waste, making data-driven decisions about flock performance |

### 3.3 User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-01 | As a farm owner, I want to record daily egg production per flock so I can track which flocks are performing well. | P0 |
| US-02 | As a farm owner, I want to see my current egg stock (eggs and crates) at a glance so I know what I have available to sell. | P0 |
| US-03 | As a farm owner, I want to record a sale by selecting a customer, entering crates sold and price, so the system automatically updates my stock. | P0 |
| US-04 | As a farm owner, I want to be prevented from selling more eggs than I have in stock so I never over-commit. | P0 |
| US-05 | As a farm owner, I want to record expenses by category so I can see where my money goes. | P0 |
| US-06 | As a farm owner, I want to see my net profit for any date range so I can understand my financial performance. | P0 |
| US-07 | As a farm owner, I want to manage my customer list and see each customer's purchase history and total spending. | P0 |
| US-08 | As a farm owner, I want to track inventory (feed, medicine, crates) so I know when to reorder. | P1 |
| US-09 | As a farm owner, I want to see a dashboard with key metrics when I open the app so I get an instant overview. | P0 |
| US-10 | As a farm owner, I want to manage multiple flocks with different start dates and bird counts. | P0 |
| US-11 | As a farm owner, I want to create custom roles with specific permissions so I can control exactly what each team member can access. | P0 |
| US-12 | As a farm owner, I want to invite team members and assign them a custom role so they can help with data entry without seeing sensitive data. | P0 |
| US-13 | As a farm owner, I want to export my sales, expenses, and profit reports to Excel or PDF so I can share them with my accountant or keep offline records. | P0 |
| US-14 | As a farm owner, I want to receive notifications when egg stock or inventory items fall below a threshold so I can reorder in time. | P0 |
| US-15 | As a farm owner, I want to manage multiple farm locations from a single account so I can track production and profit per farm and across all farms. | P0 |
| US-16 | As a farm owner, I want to switch between my farms easily so I can check on each location without logging out. | P0 |
| US-17 | As a farm owner, I want to see a consolidated view of all farms' performance so I can compare and make business decisions. | P1 |
| US-18 | As a team member, I want to record data even when the internet is down so farm operations are never blocked by connectivity. | P0 |
| US-19 | As a team member, I want my offline entries to sync automatically when the internet comes back so I don't have to re-enter anything. | P0 |
| US-20 | As a team member, I want to install the app on my phone's home screen so I can open it like a native app. | P0 |
| US-21 | As a team member, I want to record daily egg production quickly so I can focus on farm tasks. | P0 |
| US-22 | As a team member with a manager role, I want to record sales and expenses on behalf of the owner so operations continue when she is away. | P0 |

---

## 4. Functional Requirements

### 4.1 Flocks Management

The system must support multiple flocks within each farm. Flocks are the organizational unit for tracking egg production and optionally linking expenses. Each flock belongs to a specific farm within the tenant.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-101 | Create a new flock with name, start date, number of birds, and optional notes | P0 | |
| FR-102 | Edit flock details (name, bird count, notes) | P0 | Start date should not be editable after creation |
| FR-103 | View list of all flocks with summary info | P0 | Show bird count, start date, total eggs produced |
| FR-104 | View individual flock detail page | P0 | Show production history, linked expenses |
| FR-105 | Flocks must be selectable when recording egg production | P0 | Dropdown/selector in production form |
| FR-106 | Flocks may be optionally linked to expenses | P1 | Optional flock field on expense form |
| FR-107 | Deactivate/archive a flock (soft delete) | P1 | Archived flocks hidden from active lists but data preserved |

### 4.2 Egg Production Tracking

Daily egg production is the core data entry operation. Each record ties to a specific flock and date.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-201 | Record egg production with: date, flock, number of eggs laid | P0 | |
| FR-202 | Each production record must automatically increase total egg stock | P0 | System-calculated, not manual |
| FR-203 | All production records must be stored historically | P0 | Never deleted, audit trail |
| FR-204 | View egg production per flock (filterable) | P0 | Table view with date, count |
| FR-205 | View egg production over time (table and/or chart) | P0 | Line chart recommended |
| FR-206 | Production records are editable within 10 minutes of creation; after that, only a Tenant Admin can edit, or a correction entry must be used | P0 | See Section 4.16 for edit rules and correction entry |
| FR-207 | Validate: eggs laid must be a positive integer | P0 | Input validation |
| FR-208 | Validate: date cannot be in the future | P0 | Default to today |
| FR-209 | Optional session field on each production record: AM / PM / Other | P0 | Supports farms that collect eggs multiple times per day |
| FR-210 | If a record exists for the same flock + same date, warn the user but allow saving | P0 | Multiple sessions per day are valid; warning shown, not blocked |

**Business Rules:**

- Egg stock is derived, not manually editable
- Egg stock = Total eggs produced - Total eggs sold
- Production records feed into the stock calculation automatically

### 4.3 Egg Stock Management

Egg stock must always reflect the true number of eggs available. It is a derived value, never directly edited.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-301 | Display total eggs on hand | P0 | Derived: total produced - total sold |
| FR-302 | Display total full crates available | P0 | Calculated: floor(eggs on hand / 30) |
| FR-303 | Display remaining loose eggs | P0 | Calculated: eggs on hand mod 30 |
| FR-304 | Conversion rule: 1 crate = 30 eggs | P0 | System constant |
| FR-305 | Egg stock updates automatically when eggs are recorded as laid | P0 | Triggered by production entry |
| FR-306 | Egg stock updates automatically when eggs are sold | P0 | Triggered by sale entry |
| FR-307 | Manual egg stock edits are not allowed | P0 | No manual override UI |

**Business Rules:**

- Egg stock is calculated per farm: Total eggs produced - Total eggs sold (across all flocks within that farm)
- 1 crate = 30 eggs (system-wide constant)
- Stock must never go negative (enforced by sales validation)
- Stock is not shared across farms — each farm maintains independent egg stock

### 4.4 Customer Management

Store and display customer information and purchase history to support relationship management and sales tracking.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-401 | Store customer name | P0 | Required field |
| FR-402 | Store customer contact details (phone number) | P0 | At least one contact method |
| FR-403 | Display last purchase date per customer | P0 | Auto-derived from sales records |
| FR-404 | Display total crates purchased per customer | P0 | Auto-derived from sales records |
| FR-405 | Display total amount spent per customer (GH₵) | P0 | Auto-derived from sales records |
| FR-406 | Customers must be selectable when recording sales | P0 | Searchable dropdown |
| FR-407 | Edit customer details | P0 | |
| FR-408 | View customer list with search/filter | P0 | Search by name |
| FR-409 | View individual customer detail page with purchase history | P1 | List of all sales to this customer |

### 4.5 Sales Management

Record and track egg sales. Sales are recorded in crates and automatically reduce egg stock.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-501 | Record sale with: date, customer, number of crates sold, price per crate, amount paid, payment method, and optional payment reference/notes | P0 | |
| FR-502 | Auto-calculate total sale amount (crates x price per crate) and balance (total amount − amount paid) | P0 | Display in GH₵ |
| FR-503 | Sales must reduce egg stock automatically (crates x 30 eggs) | P0 | Triggered on save |
| FR-504 | Sales must update customer totals automatically | P0 | Total crates, total revenue, total paid, outstanding balance, last purchase date |
| FR-505 | Prevent sale if insufficient egg stock exists | P0 | Validate: crates x 30 <= eggs on hand |
| FR-506 | Sales quantities are recorded in crates only (not individual eggs) | P0 | UX: only crate input |
| FR-507 | Payment method must be one of: Cash, MoMo, Bank, Credit | P0 | Required field; Credit means amount_paid = 0 or partial |
| FR-508 | Credit sales are allowed: amount_paid may be less than total_amount | P0 | Balance = total_amount − amount_paid; balance tracked per sale |
| FR-509 | View sales history with date filtering | P0 | Table with date, customer, crates, total, paid, balance, method |
| FR-510 | View sales summary for date range | P1 | Total crates sold, gross revenue, cash collected, outstanding credit |
| FR-511 | Sales records are editable within 10 minutes of creation; after that, only Admin can edit or a correction entry must be used | P0 | See Section 4.16 for edit rules |

**Business Rules:**

- System must prevent sales if insufficient egg stock exists
- Sales quantities are recorded in crates only (1 crate = 30 eggs)
- total_amount = crates_sold × price_per_crate
- balance = total_amount − amount_paid
- Credit sales are allowed; balance may be positive
- Payment method is required on every sale record

### 4.6 Inventory Management

Track all physical inventory used on the farm beyond eggs. The system uses a **hybrid model**: `quantity_on_hand` is stored on the item for fast display, and every change to inventory creates a corresponding **Inventory Movement** log entry for full traceability.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-601 | Track inventory for: Feed, Medicines, Egg crates (empty/physical), Other farm items | P1 | Configurable item types; Empty Crates is distinct from derived sellable crates |
| FR-602 | Display current quantity on hand for each item | P1 | Stored value on item; updated on every movement |
| FR-603 | Increase inventory when items are purchased; create a movement log entry (type: purchase) | P1 | Linked to purchase record |
| FR-604 | Decrease inventory when items are used or consumed; create a movement log entry (type: usage) | P1 | Manual usage entry |
| FR-605 | Allow manual stock adjustments with a required reason; create a movement log entry (type: adjustment) | P1 | Reason required; stored on movement log |
| FR-606 | View inventory list with current quantities | P1 | |
| FR-607 | View inventory movement history per item (full log of all changes) | P1 | Filterable by date and type |

### 4.7 Purchases

Record purchases of inventory items. Purchases increase inventory and are tracked as expenses.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-701 | Record purchase with: date, item, quantity, total cost (GH₵) | P1 | |
| FR-702 | Purchases must increase relevant inventory automatically | P1 | Linked to inventory item |
| FR-703 | View purchase history with date filtering | P1 | |
| FR-704 | Purchases should optionally create an expense record | P1 | Auto-categorize as Feed, Medication, etc. |

### 4.8 Expenses Management

Record all farm expenses for financial tracking and profit calculation.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-801 | Record expense with: date, category, description, amount (GH₵) | P0 | |
| FR-802 | Optional flock link on expense record | P1 | For flock-level cost analysis |
| FR-803 | Expense categories are grouped into two types: **Operating Expenses** (Salaries, Utilities, Transport, Maintenance, Miscellaneous) and **Production Costs** (Feed, Medication). Each expense must be assigned a category within one of these groups | P0 | Pre-defined list; grouping used in financial reports |
| FR-804 | View expense list with date and category filtering | P0 | |
| FR-805 | View expense summary by category for date range | P1 | Breakdown chart/table |
| FR-806 | Edit and delete expense records | P0 | With confirmation dialog |

### 4.9 Profit & Reporting

Provide financial visibility and profitability tracking. The system tracks both accrual revenue (total sales value including credit) and cash received, enabling two distinct profit views.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-901 | Display **Gross Revenue** for selected period: total sales value including credit (GH₵) | P0 | Sum of all sale total_amount |
| FR-902 | Display **Cash Collected** for selected period: money actually received (GH₵) | P0 | Sum of all sale amount_paid |
| FR-903 | Display **Outstanding Credit** for selected period: unpaid balances (GH₵) | P0 | Sum of all sale balance |
| FR-904 | Display **Total Expenses** for selected period, split by group (GH₵) | P0 | Operating Expenses subtotal + Production Costs subtotal |
| FR-905 | Display **Operational Profit**: Gross Revenue − Total Expenses | P0 | Business performance view |
| FR-906 | Display **Cash Profit**: Cash Collected − Total Expenses | P0 | Cash-in-hand view — what the owner actually feels |
| FR-907 | Both profit metrics displayed together on the Profit Summary screen | P0 | Side-by-side or stacked cards with clear labels |
| FR-908 | Filter by date range (custom start/end dates) with presets: This Week, This Month, Last Month, Custom | P0 | Date picker UI |
| FR-909 | Filter by farm (specific farm or all farms aggregated) | P0 | Cross-farm view sums revenue and expenses |
| FR-910 | Filter by flock (optional) | P1 | Only shows expenses linked to flock + proportional sales |
| FR-911 | Display expense breakdown by category group (Operating vs Production) for selected period | P0 | Table or chart |
| FR-912 | Display profit trend over time (chart) | P1 | Monthly bar/line chart; show both profit types |

**Business Rules:**

- Gross Revenue = SUM(sale.total_amount) — total value of all sales including credit
- Cash Collected = SUM(sale.amount_paid) — money actually received
- Outstanding Credit = SUM(sale.balance) — unpaid portion of credit sales
- Operational Profit = Gross Revenue − Total Expenses (business performance indicator)
- Cash Profit = Cash Collected − Total Expenses (cash-in-hand indicator)
- Both profit metrics must be available and clearly labelled on all financial reports
- Operating Expenses: Salaries, Utilities, Transport, Maintenance, Miscellaneous
- Production Costs: Feed, Medication
- All monetary values displayed in the tenant's configured currency (default: GH₵)

### 4.10 Custom User Roles & Permissions

The system must support multiple users with a **custom role-based access control** system. The Tenant Admin defines roles with granular permissions, rather than relying on fixed system roles. The system ships with three default role templates (Manager, Worker, Viewer) that can be used as-is, modified, or supplemented.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1001 | Tenant Admin can create custom roles with a name and a set of permissions | P0 | Permissions are granular (see permission list below) |
| FR-1002 | System provides three default role templates: Manager, Worker, Viewer | P0 | Editable; can be renamed, modified, or deleted |
| FR-1003 | Admin can invite users via email with an assigned role | P0 | Invitation link with temporary password or magic link |
| FR-1004 | Admin can view, edit roles of, and deactivate user accounts | P0 | Deactivated users cannot log in; data preserved |
| FR-1005 | Admin can assign users to specific farms or grant access to all farms | P0 | User-farm assignment; some users may only see Farm A |
| FR-1006 | Admin can edit and delete custom roles | P0 | Deleting a role requires reassigning affected users |
| FR-1007 | Tenant Admin role is built-in and cannot be deleted or demoted | P0 | Always has full access; at least one per tenant |
| FR-1008 | All data entry records must store the user who created them (audit trail) | P0 | created_by field on all transactional records |
| FR-1009 | Admin can view an activity log of actions performed by each user | P1 | Filterable by user, date, action type, farm |
| FR-1010 | Permissions are enforced on both client (UI visibility) and server (API) | P0 | No client-only permission checks |

**Permission Model:**

Permissions are defined per resource and per action. The Admin selects which permissions to include in each custom role.

| Resource | Available Actions |
|----------|-----------------|
| Flocks | view, create, edit, archive |
| Egg Production | view, create, edit |
| Sales | view, create, edit, delete |
| Customers | view, create, edit, archive |
| Expenses | view, create, edit, delete |
| Inventory | view, create, edit, adjust |
| Purchases | view, create |
| Reports (Profit Summary) | view |
| Export (Excel/PDF) | access |
| User Management | view, invite, edit_roles, deactivate |
| Settings | view, edit |
| Notifications | receive, configure_thresholds |
| Farm Management | view, create, edit, archive |

**Business Rules:**

- Only the Tenant Admin can create, modify, or delete custom roles
- Only the Tenant Admin can invite, modify, or deactivate users
- Deactivating a user preserves all their historical data entries
- Each record stores the user who created it for accountability
- A tenant must always have at least one Admin user (the owner)
- Users can be scoped to specific farms or granted access to all farms within the tenant

### 4.11 Export to Excel/PDF

The system must allow the farm owner to export key reports and data tables for offline record-keeping, sharing with accountants, or regulatory purposes.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1101 | Export profit report (revenue, expenses, net profit) for a selected date range | P0 | PDF and Excel formats |
| FR-1102 | Export sales history for a selected date range | P0 | Excel format with all sale fields |
| FR-1103 | Export expense records for a selected date range | P0 | Excel format with all expense fields |
| FR-1104 | Export egg production records for a selected date range | P1 | Excel format, filterable by flock |
| FR-1105 | Export customer list with purchase summaries | P1 | Excel format |
| FR-1106 | PDF export must include farm name, date range, and generation timestamp | P0 | Professional formatting suitable for sharing |
| FR-1107 | Export action restricted to users with the "Export" permission in their role | P0 | Configurable per custom role |
| FR-1108 | Exports are scoped to the user's accessible farms | P0 | A user with access to Farm A only cannot export Farm B data |

**Business Rules:**

- Export is available to users whose custom role includes the "Export: access" permission
- PDF reports are formatted for A4 printing with tenant and farm branding (name/header)
- Excel exports include column headers and proper data formatting (currency, dates)
- All monetary values exported in the tenant's configured currency (default: GH₵) with two decimal places
- Exports are scoped to the farms the user has access to

### 4.12 Notifications & Alerts

The system must proactively notify the farm owner (and optionally managers) of important operational events, reducing the risk of missed actions or stock-outs.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1201 | Low egg stock alert: notify when total eggs on hand falls below a configurable threshold | P0 | Default threshold: 5 crates (150 eggs) |
| FR-1202 | Low inventory alert: notify when any inventory item falls below its configured minimum level | P0 | Threshold set per item by Admin |
| FR-1203 | In-app notification center: display all notifications in a bell icon dropdown | P0 | Unread count badge; mark as read |
| FR-1204 | Notifications delivered via in-app alerts (banner/toast + notification center) | P0 | Real-time when user is active |
| FR-1205 | Admin can configure notification thresholds in Settings | P0 | Per inventory item and for egg stock |
| FR-1206 | Notifications delivered to users whose role includes the "Notifications: receive" permission | P0 | Configurable per custom role |
| FR-1207 | Daily production reminder: prompt if no egg production has been recorded by a configurable time | P1 | Default: reminder at 12:00 PM if no entry for today |
| FR-1208 | Weekly summary notification: brief summary of the week's production, sales, and profit | P1 | Delivered every Sunday evening |

**Business Rules:**

- Low stock alerts trigger once when the threshold is crossed, not repeatedly
- Alerts reset when stock is replenished above the threshold
- Notification thresholds are configurable by users with the "Notifications: configure_thresholds" permission
- In-app notifications persist until dismissed or marked as read
- Notifications are scoped per farm — a low stock alert on Farm A only goes to users with access to Farm A

### 4.13 Multi-Farm Management

The system must support multiple farm locations within a single tenant (organization). Each farm maintains independent stock, production records, and financial data while the tenant admin can view consolidated cross-farm reports.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1301 | Tenant Admin can create multiple farms within the organization | P0 | Each farm has a name, location (optional), and notes |
| FR-1302 | All operational data (flocks, production, sales, expenses, inventory) is scoped to a specific farm | P0 | No cross-farm data mixing |
| FR-1303 | Users can switch between farms they have access to via a farm switcher | P0 | Persistent in header/nav; current farm always visible |
| FR-1304 | Egg stock is calculated independently per farm | P0 | Farm A stock is unaffected by Farm B sales |
| FR-1305 | Users can be assigned access to specific farms or all farms | P0 | Managed by Tenant Admin in User Management |
| FR-1306 | Profit Summary supports per-farm and cross-farm (all farms) views | P1 | Cross-farm view aggregates revenue and expenses |
| FR-1307 | Dashboard shows metrics for the currently selected farm | P0 | Farm switcher changes dashboard context |
| FR-1308 | Customers can be shared across farms within a tenant | P0 | A customer may buy from multiple farm locations |
| FR-1309 | Edit and archive (soft delete) farms | P0 | Archived farms hidden from active lists; data preserved |

**Business Rules:**

- Each farm operates as an independent unit for stock, production, and inventory
- Customers are shared at the tenant level (not farm-specific) to support cross-farm sales
- Profit reports can be viewed per farm or consolidated across all farms
- Flocks, inventory items, and sales belong to a specific farm
- A tenant must have at least one active farm

### 4.14 Offline Mode (PWA)

The system must function as a Progressive Web App (PWA) that allows core data entry operations without internet connectivity. Data entered offline is stored locally and synchronized automatically when connectivity is restored.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1401 | App is installable as a PWA on mobile devices (Add to Home Screen) | P0 | Service worker with app manifest |
| FR-1402 | Core data entry forms work offline: egg production, expenses, inventory usage | P0 | Forms save to local storage (IndexedDB) |
| FR-1403 | Sales recording works offline with locally cached stock data | P0 | Stock validation uses last-synced stock level with warning |
| FR-1404 | Offline entries are queued and sync automatically when connectivity returns | P0 | Background sync via Service Worker |
| FR-1405 | Visual indicator showing online/offline status | P0 | Persistent banner or icon in header |
| FR-1406 | Visual indicator showing number of pending (unsynced) entries | P0 | Badge count on sync icon |
| FR-1407 | Conflict resolution: if an offline sale or entry causes negative stock upon sync, it is flagged for Admin Review — it is NOT silently deleted or rejected. Server recalculates stock from source records and surfaces conflicts to the Admin for resolution | P0 | Flag-and-review model; never silent failure or automatic deletion |
| FR-1408 | Dashboard displays cached data when offline with "Last synced: X minutes ago" indicator | P0 | Read from IndexedDB cache |
| FR-1409 | User can manually trigger a sync when online | P1 | "Sync Now" button in settings or header |
| FR-1410 | App shell (navigation, empty forms) loads instantly from cache even on slow connections | P0 | Service worker caching strategy |

**Business Rules:**

- Offline mode supports all create operations (production, sales, expenses, inventory usage)
- Read operations show cached data with a clear "last synced" timestamp
- Stock validation offline uses last-synced stock level; a warning is shown: "Stock data may be outdated (last synced X minutes ago)"
- If an offline sale would result in negative stock once synced, the system flags it for admin review rather than rejecting it retroactively
- Sync happens automatically in the background; manual sync is also available
- Offline data is stored locally and protected via app authentication and device security. Advanced offline encryption is planned for a future version.

### 4.16 Edit Rules, Correction Entries & Audit Trail

All transactional records (egg production, sales, expenses, purchases, inventory adjustments) follow a consistent edit policy to balance operational flexibility with data integrity.

#### Edit Window Policy

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1601 | Any user may edit their own record within 10 minutes of creation | P0 | Time window calculated from created_at |
| FR-1602 | After 10 minutes, only a Tenant Admin can edit a record directly | P0 | Enforced on both client and API |
| FR-1603 | Non-admin users who need to correct a record after 10 minutes must use a Correction Entry | P0 | Original record is preserved; correction is linked |
| FR-1604 | Soft deletes only — no records are permanently deleted. Deleted records store deleted_by and delete_reason | P0 | delete_reason is required; shown in audit log |
| FR-1605 | Deleting a sale after 10 minutes requires Admin permission | P0 | Same 10-minute policy applies |

#### Correction Entry

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1606 | A Correction Entry is a new record that references the original record's ID | P0 | Stores original_record_id and correction_reason |
| FR-1607 | The correction record contains the correct values; the original record is preserved unchanged | P0 | Both records visible in audit log |
| FR-1608 | The system calculates derived values (stock, profit) using both the original and correction records | P0 | Net effect is applied; no double-counting |
| FR-1609 | Users can view the correction history for any record | P1 | Shown in record detail view |

#### Audit Trail

Every transactional record must store the following fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| created_by | UUID (FK) | Yes | User who created the record |
| created_at | Timestamp | Yes | Auto-generated |
| updated_by | UUID (FK) | No | Last user who edited the record; null if never edited |
| updated_at | Timestamp | No | Timestamp of last edit; null if never edited |
| deleted_by | UUID (FK) | No | User who soft-deleted the record; null if active |
| deleted_at | Timestamp | No | When the record was soft-deleted; null if active |
| delete_reason | String | No | Required when deleted_by is set |
| is_deleted | Boolean | Yes | Default false; true when soft-deleted |

These fields apply to: EggProduction, Sale, Expense, Purchase, InventoryItem, InventoryMovement.

**Business Rules:**

- No record is ever permanently deleted from the database
- Deleted records are excluded from all calculations and list views unless Admin views the audit log
- The 10-minute edit window is calculated server-side to prevent client-side manipulation
- All edits by Admin after the edit window must include an edit reason (stored in updated notes or audit log)
- Correction entries are linked to the original via original_record_id; the system treats them as a pair

---

### 4.15 Tenant / Organization Management

The system must support isolated multi-tenant operations where each organization (tenant) has its own data, users, farms, roles, and configuration.

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1501 | Each tenant has a unique organization name and identifier | P0 | Set during onboarding |
| FR-1502 | All data (farms, users, flocks, sales, etc.) is scoped to a tenant | P0 | Tenant ID on every table; enforced at query level |
| FR-1503 | Tenant Admin can configure organization settings: name, currency, timezone | P0 | Default currency: GH₵; configurable |
| FR-1504 | Tenant data is completely isolated — no cross-tenant queries or data visibility | P0 | Row-level security or query-level filtering |
| FR-1505 | A user belongs to exactly one tenant | P0 | No cross-tenant user accounts in MVP |
| FR-1506 | Tenant onboarding is manual for MVP (admin-provisioned) | P0 | Self-service registration in v2 |

**Business Rules:**

- Tenant data isolation is absolute — no API endpoint or query can return data from another tenant
- All database queries must include tenant_id filtering (enforced at the ORM/middleware level)
- Deleting a tenant requires explicit confirmation and is irreversible (or soft-delete with data retention period)
- Currency and timezone are configurable per tenant; all monetary displays and exports use the tenant's currency

---

## 5. Non-Functional Requirements

| Category | ID | Requirement | Priority |
|----------|----|-------------|----------|
| Performance | NFR-01 | Page load under 2 seconds on average mobile connection (3G) | P0 |
| Performance | NFR-02 | Form submissions complete within 1 second | P0 |
| Performance | NFR-03 | Dashboard loads all metrics within 3 seconds | P0 |
| Usability | NFR-04 | Mobile-first responsive design (works on 360px+ screens) | P0 |
| Usability | NFR-05 | Simple, form-based data entry with minimal taps | P0 |
| Usability | NFR-06 | Clear numeric displays with proper formatting (GH₵ 1,234.00) | P0 |
| Usability | NFR-07 | Touch-friendly UI elements (min 44px tap targets) | P0 |
| Security | NFR-08 | Authentication required to access any data | P0 |
| Security | NFR-09 | Custom role-based permissions enforced on both client and server | P0 |
| Security | NFR-10 | Secure data storage with encryption at rest (server and offline local storage) | P0 |
| Security | NFR-11 | HTTPS enforced for all connections | P0 |
| Multi-tenancy | NFR-12 | Complete tenant data isolation — no cross-tenant data leakage | P0 |
| Multi-tenancy | NFR-13 | Tenant ID enforced at ORM/middleware level on every query | P0 |
| Multi-tenancy | NFR-14 | Farm-level data scoping within tenant — users only see farms they have access to | P0 |
| Reliability | NFR-15 | Automatic calculations must be consistent (no desync) | P0 |
| Reliability | NFR-16 | Inventory and stock must never desync from source records | P0 |
| Reliability | NFR-17 | Data backups (daily automated via Neon) | P0 |
| Offline | NFR-18 | Core data entry works without internet connectivity | P0 |
| Offline | NFR-19 | Offline data syncs within 30 seconds of connectivity restoration | P0 |
| Offline | NFR-20 | App shell loads from cache in under 1 second even on offline/slow connections | P0 |
| Offline | NFR-21 | Offline data is stored locally and protected via app authentication and HTTPS. Advanced offline encryption (IndexedDB at-rest) is planned for a future version. | P1 |
| Accessibility | NFR-22 | Minimum contrast ratio of 4.5:1 for text | P1 |
| Accessibility | NFR-23 | Keyboard navigable for desktop use | P1 |

---

## 6. User Experience

### 6.1 Screens & Navigation

The application consists of primary screens accessible via a sidebar navigation (desktop) or bottom navigation bar (mobile). A **farm switcher** is persistently visible in the header, allowing users to change context between their accessible farms. An **online/offline indicator** is also persistent in the header.

| Screen | Purpose | Primary Actions | Permission Required |
|--------|---------|-----------------|---------------------|
| Dashboard | At-a-glance overview of selected farm | View key metrics, quick links to common actions | Any authenticated user |
| Farm Switcher | Switch between farms | Select active farm; view cross-farm summary | Access to 2+ farms |
| Flocks | Manage flock records within selected farm | Create, view, edit flocks | Flocks: view/create/edit |
| Egg Production | Record and view daily egg counts | Add production record, view history/charts | Egg Production: view/create |
| Customers | Manage customer directory (tenant-wide) | Add/edit customers, view purchase history | Customers: view/create/edit |
| Sales History | Record and review egg sales for selected farm | Record sale, view sales table with filters | Sales: view/create |
| Inventory | Track farm supplies for selected farm | View stock levels, record usage | Inventory: view/create/edit |
| Purchases | Record supply purchases for selected farm | Add purchase, view purchase history | Purchases: view/create |
| Expenses | Track all farm costs for selected farm | Add expense, view/filter expense list | Expenses: view/create |
| Profit Summary | Financial reporting per farm or cross-farm | View revenue, expenses, net profit by date range | Reports: view |
| User Management | Invite and manage team | Invite users, create/assign custom roles, deactivate accounts | User Management: view/invite |
| Role Management | Create and configure custom roles | Define roles, set permissions per role | User Management: edit_roles |
| Farm Management | Create and configure farm locations | Add farms, edit details, archive farms | Farm Management: view/create/edit |
| Notifications | View and manage alerts | View notifications, mark as read | Notifications: receive |
| Settings | Configure organization and preferences | Set currency, timezone, notification thresholds | Settings: view/edit |

### 6.2 Dashboard Specification

The dashboard is the landing screen and must provide immediate operational awareness.

**Dashboard Cards:**

- **Eggs on Hand:** Total eggs on hand for the selected farm
- **Sellable Crates:** Derived — floor(eggs_on_hand / 30). This is NOT physical inventory; it represents how many full crates could be packed from current egg stock
- **Empty Crates (Physical):** Physical egg trays available for packing — tracked as an inventory item, separate from the derived sellable crate count
- **Recent Egg Production:** Last 7 days of egg production (mini table or chart)
- **Recent Sales:** Last 5 sales transactions (showing total, amount paid, and balance where applicable)
- **Financial Snapshot (current month):**
  - Gross Revenue (total sales value)
  - Cash Collected (money received)
  - Outstanding Credit (unpaid balances)
  - Total Expenses
  - Operational Profit (Gross Revenue − Expenses)
  - Cash Profit (Cash Collected − Expenses)

> **Note:** "Sellable Crates" and "Empty Crates (Physical)" are two distinct concepts and must be clearly labelled differently everywhere in the UI to avoid confusion.

### 6.3 Key User Flows

**Flow 1: Record Daily Egg Production**

1. User opens app -> Dashboard
2. Taps "Record Eggs" (quick action) or navigates to Egg Production
3. Selects flock from dropdown (defaults to most recent flock)
4. Enters date (defaults to today) and number of eggs
5. Taps "Save" -> confirmation toast
6. Egg stock on dashboard updates immediately

**Flow 2: Record a Sale**

1. User navigates to Sales
2. Taps "New Sale"
3. Selects customer (searchable dropdown, or "Add New Customer" inline)
4. Enters number of crates and price per crate
5. System shows total amount (auto-calculated) and validates stock availability
6. If insufficient stock -> error message with available quantity shown
7. Taps "Save" -> stock decreases, customer totals update, sale appears in history

**Flow 3: Check Profit**

1. User navigates to Profit Summary
2. Selects date range (presets: This Week, This Month, Last Month, Custom)
3. System displays: Total Revenue, Total Expenses, Net Profit
4. Optional: filter by flock to see flock-level profitability

### 6.4 Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Sale exceeds available stock | Block sale, show error: "Insufficient stock. You have X crates (Y eggs) available." |
| Recording production for past date | Allow it (with date picker) but validate date is not in the future |
| Customer with no purchases | Show "No purchases yet" on customer detail; last purchase date shows "-" |
| Zero eggs produced in a day | Allow recording 0 eggs (valid data point for tracking flock health) |
| Deleting a customer with sales history | Prevent deletion; show warning. Offer to archive instead. |
| Negative expense amount | Block entry; show validation error "Amount must be positive" |
| Duplicate production entry (same flock, same date) | Warn user but allow (some farms collect twice daily) |
| Very large numbers (10,000+ eggs) | Accept but show confirmation dialog for unusually large entries |

---

## 7. Data Requirements

### 7.1 Data Models

**Tenant (Organization)**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key, auto-generated |
| name | String | Yes | Organization name |
| slug | String | Yes | Unique URL-safe identifier |
| currency | String | Yes | Default: GHS; ISO 4217 currency code |
| timezone | String | Yes | Default: Africa/Accra; IANA timezone |
| is_active | Boolean | Yes | Default true |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**Farm**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| name | String | Yes | Farm name/location |
| location | String | No | Address or region description |
| notes | Text | No | Optional notes |
| is_active | Boolean | Yes | Default true; false when archived |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**Custom Role**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| name | String | Yes | Role name (e.g., "Manager", "Egg Collector") |
| description | String | No | What this role is for |
| permissions | JSONB | Yes | Array of permission strings (e.g., ["flocks:view", "egg_production:create"]) |
| is_system | Boolean | Yes | True for the built-in Admin role; cannot be deleted |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**Flock**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key, auto-generated |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| name | String | Yes | Flock name/identifier |
| start_date | Date | Yes | When the flock started |
| bird_count | Integer | Yes | Number of birds in flock |
| notes | Text | No | Optional notes |
| is_active | Boolean | Yes | Default true; false when archived |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**Egg Production**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| flock_id | UUID (FK) | Yes | References Flock |
| date | Date | Yes | Production date |
| eggs_count | Integer | Yes | Number of eggs laid; must be >= 0 |
| session | Enum | No | AM / PM / Other — optional; supports multiple collections per day |
| original_record_id | UUID (FK) | No | Set if this is a Correction Entry linked to an original record |
| correction_reason | String | No | Required when original_record_id is set |
| created_by | UUID (FK) | Yes | References User who recorded the entry |
| created_at | Timestamp | Yes | Auto-generated |
| updated_by | UUID (FK) | No | Last User who edited; null if never edited |
| updated_at | Timestamp | No | Timestamp of last edit; null if never edited |
| deleted_by | UUID (FK) | No | User who soft-deleted; null if active |
| deleted_at | Timestamp | No | When soft-deleted; null if active |
| delete_reason | String | No | Required when deleted_by is set |
| is_deleted | Boolean | Yes | Default false |
| synced_at | Timestamp | No | When this record was synced from offline; null if created online |

**Customer**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant (shared across farms within tenant) |
| name | String | Yes | Customer name |
| phone | String | No | Contact phone number |
| email | String | No | Contact email |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**Sale**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| customer_id | UUID (FK) | Yes | References Customer |
| date | Date | Yes | Sale date |
| crates_sold | Integer | Yes | Number of crates; must be > 0 |
| price_per_crate | Decimal | Yes | Price per crate in tenant currency |
| total_amount | Decimal | Yes | Auto-calculated: crates_sold × price_per_crate |
| amount_paid | Decimal | Yes | Amount received at time of sale; may be 0 for full credit |
| balance | Decimal | Yes | Auto-calculated: total_amount − amount_paid |
| payment_method | Enum | Yes | Cash / MoMo / Bank / Credit |
| payment_reference | String | No | Optional reference (e.g., MoMo transaction ID, cheque number) |
| original_record_id | UUID (FK) | No | Set if this is a Correction Entry linked to an original sale |
| correction_reason | String | No | Required when original_record_id is set |
| created_by | UUID (FK) | Yes | References User who recorded the sale |
| created_at | Timestamp | Yes | Auto-generated |
| updated_by | UUID (FK) | No | Last User who edited; null if never edited |
| updated_at | Timestamp | No | Timestamp of last edit; null if never edited |
| deleted_by | UUID (FK) | No | User who soft-deleted; null if active |
| deleted_at | Timestamp | No | When soft-deleted; null if active |
| delete_reason | String | No | Required when deleted_by is set |
| is_deleted | Boolean | Yes | Default false |
| synced_at | Timestamp | No | When synced from offline; null if created online |

**Expense**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| date | Date | Yes | Expense date |
| category | Enum | Yes | Operating: Salaries, Utilities, Transport, Maintenance, Miscellaneous; Production: Feed, Medication |
| category_group | Enum | Yes | Operating or Production — derived from category |
| description | String | Yes | Expense description |
| amount | Decimal | Yes | Amount in tenant currency; must be > 0 |
| flock_id | UUID (FK) | No | Optional link to flock |
| created_by | UUID (FK) | Yes | References User who recorded the expense |
| created_at | Timestamp | Yes | Auto-generated |
| updated_by | UUID (FK) | No | Last User who edited; null if never edited |
| updated_at | Timestamp | No | Timestamp of last edit; null if never edited |
| deleted_by | UUID (FK) | No | User who soft-deleted; null if active |
| deleted_at | Timestamp | No | When soft-deleted; null if active |
| delete_reason | String | No | Required when deleted_by is set |
| is_deleted | Boolean | Yes | Default false |
| synced_at | Timestamp | No | When synced from offline; null if created online |

**Inventory Item**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| name | String | Yes | Item name (Feed, Medicine, Empty Crates, etc.) |
| category | Enum | Yes | Feed, Medicines, Empty Crates, Other |
| quantity_on_hand | Decimal | Yes | Current stock level; updated on every movement for performance |
| unit | String | Yes | Unit of measure (bags, bottles, pieces) |
| low_stock_threshold | Decimal | No | Alert when quantity falls below this level |
| updated_at | Timestamp | Yes | Auto-updated |

**Inventory Movement** *(movement log — one entry per stock change)*

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| item_id | UUID (FK) | Yes | References Inventory Item |
| type | Enum | Yes | purchase / usage / adjustment |
| quantity_change | Decimal | Yes | Positive = stock in, Negative = stock out |
| reason | String | No | Required when type = adjustment |
| reference_id | UUID | No | References the triggering Purchase record (if type = purchase) |
| created_by | UUID (FK) | Yes | References User who made the change |
| created_at | Timestamp | Yes | Auto-generated |

**User**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| name | String | Yes | Full name |
| email | String | Yes | Unique within tenant; used for login |
| password_hash | String | Yes | Hashed password |
| role_id | UUID (FK) | Yes | References Custom Role |
| is_tenant_admin | Boolean | Yes | True for the tenant owner; cannot be changed |
| is_active | Boolean | Yes | Default true; false when deactivated |
| invited_by | UUID (FK) | No | References User (the admin who invited) |
| created_at | Timestamp | Yes | Auto-generated |
| updated_at | Timestamp | Yes | Auto-updated |

**User Farm Access**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| user_id | UUID (FK) | Yes | References User |
| farm_id | UUID (FK) | Yes | References Farm |
| created_at | Timestamp | Yes | Auto-generated |

*Note: If a user has no entries in this table but is_tenant_admin is true, they have access to all farms. Otherwise, access is restricted to the farms listed.*

**Notification**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | No | References Farm (null for tenant-wide notifications) |
| user_id | UUID (FK) | Yes | References User (recipient) |
| type | Enum | Yes | low_egg_stock, low_inventory, production_reminder, weekly_summary |
| title | String | Yes | Short notification title |
| message | Text | Yes | Notification body |
| is_read | Boolean | Yes | Default false |
| created_at | Timestamp | Yes | Auto-generated |

**Notification Setting**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | No | References Farm (null for tenant-wide settings) |
| setting_key | String | Yes | e.g., low_egg_stock_threshold, low_feed_threshold |
| setting_value | String | Yes | Threshold value |
| updated_by | UUID (FK) | Yes | References User who set it |
| updated_at | Timestamp | Yes | Auto-updated |

**Offline Sync Queue (Client-side — IndexedDB)**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Client-generated UUID |
| entity_type | String | Yes | e.g., egg_production, sale, expense |
| payload | JSON | Yes | Full record data to be synced |
| status | Enum | Yes | pending, syncing, synced, failed |
| created_at | Timestamp | Yes | When entry was created offline |
| synced_at | Timestamp | No | When successfully synced to server |

**Purchase**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| tenant_id | UUID (FK) | Yes | References Tenant |
| farm_id | UUID (FK) | Yes | References Farm |
| item_id | UUID (FK) | Yes | References Inventory Item |
| date | Date | Yes | Purchase date |
| quantity | Decimal | Yes | Quantity purchased |
| total_cost | Decimal | Yes | Total cost in tenant currency |
| created_by | UUID (FK) | Yes | References User who recorded the purchase |
| created_at | Timestamp | Yes | Auto-generated |
| updated_by | UUID (FK) | No | Last User who edited; null if never edited |
| updated_at | Timestamp | No | Timestamp of last edit; null if never edited |
| deleted_by | UUID (FK) | No | User who soft-deleted; null if active |
| deleted_at | Timestamp | No | When soft-deleted; null if active |
| delete_reason | String | No | Required when deleted_by is set |
| is_deleted | Boolean | Yes | Default false |
| synced_at | Timestamp | No | When synced from offline; null if created online |

### 7.2 Derived Data (Not Stored, Calculated)

All derived calculations are scoped by `tenant_id` and `farm_id` unless explicitly cross-farm. Soft-deleted records (`is_deleted = true`) are excluded from all calculations.

| Metric | Calculation | Scope | Source Tables |
|--------|-------------|-------|---------------|
| Total eggs on hand (per farm) | SUM(egg_production.eggs_count) − SUM(sale.crates_sold × 30) WHERE farm_id = X | Farm | egg_production, sale |
| Sellable crates (per farm) | FLOOR(eggs_on_hand / 30) | Farm | Derived from eggs on hand |
| Loose eggs | eggs_on_hand MOD 30 | Farm | Derived from eggs on hand |
| Customer total crates | SUM(sale.crates_sold) WHERE customer_id = X | Tenant | sale |
| Customer total revenue | SUM(sale.total_amount) WHERE customer_id = X | Tenant | sale |
| Customer total paid | SUM(sale.amount_paid) WHERE customer_id = X | Tenant | sale |
| Customer outstanding credit | SUM(sale.balance) WHERE customer_id = X | Tenant | sale |
| Customer last purchase | MAX(sale.date) WHERE customer_id = X | Tenant | sale |
| Gross Revenue (period, per farm) | SUM(sale.total_amount) for date range WHERE farm_id = X | Farm | sale |
| Cash Collected (period, per farm) | SUM(sale.amount_paid) for date range WHERE farm_id = X | Farm | sale |
| Outstanding Credit (period, per farm) | SUM(sale.balance) for date range WHERE farm_id = X | Farm | sale |
| Total Expenses (period, per farm) | SUM(expense.amount) for date range WHERE farm_id = X | Farm | expense |
| Operating Expenses (period) | SUM(expense.amount) WHERE category_group = 'Operating' for date range | Farm | expense |
| Production Costs (period) | SUM(expense.amount) WHERE category_group = 'Production' for date range | Farm | expense |
| Operational Profit (period, per farm) | Gross Revenue − Total Expenses | Farm | sale, expense |
| Cash Profit (period, per farm) | Cash Collected − Total Expenses | Farm | sale, expense |
| Gross Revenue (period, all farms) | SUM(sale.total_amount) for date range WHERE tenant_id = X | Tenant | sale |
| Cash Collected (period, all farms) | SUM(sale.amount_paid) for date range WHERE tenant_id = X | Tenant | sale |
| Operational Profit (period, all farms) | Gross Revenue (all farms) − Total Expenses (all farms) | Tenant | sale, expense |
| Cash Profit (period, all farms) | Cash Collected (all farms) − Total Expenses (all farms) | Tenant | sale, expense |

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend Framework | Next.js 14+ (App Router) | Server-side rendering, file-based routing, optimized for Vercel deployment |
| UI Library | React 18+ | Component-based UI, large ecosystem |
| Styling | Tailwind CSS | Utility-first CSS, fast prototyping, mobile-first |
| Database | Neon (Vercel Postgres) | Serverless PostgreSQL, native Vercel integration, generous free tier |
| ORM | Prisma | Type-safe database queries, auto-generated migrations, great DX |
| Authentication | NextAuth.js / Auth.js | Simple auth for Next.js, supports email/password and OAuth |
| Hosting | Vercel | Zero-config Next.js deployment, edge functions, analytics |
| Charts | Recharts or Chart.js | Lightweight charting for production trends and profit charts |
| Language | TypeScript | Type safety, better DX, fewer runtime errors |
| PWA / Offline | next-pwa + Workbox | Service worker management, IndexedDB caching, background sync |
| Offline Storage | IndexedDB (via idb or Dexie.js) | Client-side structured storage for offline data queue and cache |

### 8.2 Architecture Overview

The application follows a multi-tenant Next.js App Router architecture with offline-first PWA capabilities:

- **Frontend:** Next.js App Router with Server Components for data fetching, Client Components for interactivity, and PWA service worker for offline support
- **API Layer:** Next.js API Routes (Route Handlers) with tenant-scoped middleware that injects `tenant_id` into every query
- **Database:** Prisma ORM connecting to Neon PostgreSQL with row-level tenant isolation via middleware
- **Auth:** NextAuth.js with credentials provider (email/password); session includes `tenant_id`, `role_id`, and `farm_access` claims
- **Multi-tenancy:** Shared database with `tenant_id` column on every table; enforced at Prisma middleware level
- **Offline:** Service worker caches app shell; IndexedDB stores offline data entries; background sync pushes to server on reconnection
- **Deployment:** Vercel with automatic preview deployments and production CD

### 8.3 Multi-Tenancy Strategy

- **Approach:** Shared database, shared schema, tenant isolation via `tenant_id` column
- **Enforcement:** Prisma middleware automatically injects `WHERE tenant_id = ?` on every query
- **Auth context:** JWT/session token includes `tenant_id`, `user_id`, `role_id`, and list of accessible `farm_ids`
- **API protection:** Every API route validates that the requested resource belongs to the authenticated user's tenant
- **Indexing:** Composite indexes on `(tenant_id, farm_id)` for all farm-scoped tables

### 8.4 Offline Architecture

- **Service Worker:** Caches static assets (app shell, CSS, JS) for instant offline loading
- **IndexedDB:** Stores offline data entries in a sync queue; also caches recent read data for offline display
- **Background Sync:** When connectivity returns, the service worker triggers sync of queued entries to the server API
- **Conflict Resolution:** Server-side stock calculations always take precedence; if an offline sale conflicts with actual stock, it's flagged for admin review
- **Sync Status:** Client tracks sync state per record (pending, syncing, synced, failed) and displays to user

### 8.5 Dependencies

- Neon database service (upgrade from free tier expected as tenants grow)
- Vercel hosting (Pro tier recommended for multi-tenant production)
- Internet connectivity for initial load and sync (offline mode for data entry between syncs)

### 8.6 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Incorrect stock calculations due to race conditions | Medium | High | Use database transactions for all stock-affecting operations; derive stock from source records, never cache |
| Cross-tenant data leakage | Low | Critical | Prisma middleware enforces tenant_id on every query; penetration testing before launch |
| Neon limits exceeded with multiple tenants | Medium | Medium | Monitor usage; plan for Neon Pro tier as tenants scale |
| Slow queries on large multi-tenant datasets | Medium | Medium | Composite indexes on (tenant_id, farm_id, date); paginate all list views |
| Offline sync conflicts (stock desync) | Medium | High | Server-side stock recalculation on sync; flag conflicts for admin review; never reject synced data silently |
| PWA service worker caching issues | Medium | Medium | Version service worker with app deploys; clear stale caches on update |
| Data entry errors by user | High | Medium | Input validation, confirmation dialogs for large values, edit/delete capability for expenses |
| Mobile browser PWA compatibility | Medium | Medium | Test on Chrome, Safari, Samsung Internet; fallback to online-only if service worker not supported |

---

## 9. Launch Plan

### 9.1 Milestones (10-12 Week Timeline)

| Week | Milestone | Deliverables |
|------|-----------|-------------|
| Week 1 | Foundation & Multi-Tenant Core | Project setup, DB schema with tenant/farm isolation, Prisma middleware for tenant scoping, PWA manifest & service worker shell |
| Week 2 | Auth, Custom Roles & Tenant Management | Multi-tenant auth (NextAuth.js), custom role system with permission model, user invitation flow, tenant settings (currency, timezone) |
| Week 3 | Multi-Farm & Core Data Entry | Farm CRUD, farm switcher UI, Flocks CRUD (farm-scoped), Egg Production recording, Egg stock display (derived per farm) |
| Week 4 | Sales, Customers & Expenses | Customer CRUD (tenant-scoped), Sales recording with per-farm stock validation, Expense recording, permission enforcement on all forms |
| Week 5 | Reporting, Dashboard & Export | Profit summary with per-farm and cross-farm views, Dashboard with farm-contextual metrics, Export to Excel/PDF |
| Week 6 | Inventory, Purchases & Notifications | Inventory management (farm-scoped), Purchase recording, Notification system (low stock alerts, in-app notification center, configurable thresholds per farm) |
| Week 7 | Offline Mode (PWA) | IndexedDB offline storage, offline data entry forms, background sync, conflict resolution, online/offline indicator, sync status UI |
| Week 8 | Integration Testing & Multi-Tenant Validation | Cross-tenant isolation testing, permission matrix testing, offline sync testing, multi-farm data integrity validation |
| Week 9 | UI Polish & Mobile Optimization | Responsive design finalization, PWA install experience, performance optimization, touch-friendly refinements |
| Week 10 | User Acceptance Testing | UAT with launch client (Ama), role-based testing with sample team accounts, multi-farm simulation, offline scenario testing |
| Week 11 | Bug Fixes & Security Hardening | Fix UAT issues, penetration testing for tenant isolation, security review, performance benchmarking |
| Week 12 (Buffer) | Launch Prep & Deployment | Production deployment, launch client onboarding, tenant provisioning, documentation |

### 9.2 Release Strategy

- **Launch client first:** Deploy to production on Vercel; provision Ama's tenant with her farms and team
- **Parallel run:** Launch client uses the app alongside existing paper records for 1-2 weeks
- **Offline validation:** Specifically test offline workflows during the parallel run period
- **Monitoring:** Monitor for calculation accuracy, tenant isolation, sync reliability, and usability issues
- **Rapid iteration:** Address critical bugs and usability feedback within 1 week of launch
- **Tenant expansion:** After launch client validation (4+ weeks stable), begin onboarding additional tenants

### 9.3 Go/No-Go Criteria

All of the following must be true before launch:

- [ ] Egg production recording works correctly and updates stock per farm
- [ ] Sales recording works correctly with per-farm stock validation
- [ ] Egg stock is accurately derived per farm (never desynced)
- [ ] Profit calculation is correct per farm and cross-farm for any date range
- [ ] Authentication works (login/logout) with tenant-scoped sessions
- [ ] Custom role permissions enforced — users cannot access features outside their role
- [ ] User invitation with custom role assignment works end-to-end
- [ ] Multi-farm switching works correctly; data context changes with farm selection
- [ ] Tenant data isolation verified — zero cross-tenant data leakage
- [ ] Export to Excel and PDF generates correct, farm-scoped files
- [ ] Low stock and low inventory notifications trigger correctly per farm at configured thresholds
- [ ] In-app notification center displays and clears notifications
- [ ] PWA installs correctly on Android and iOS
- [ ] Offline data entry works for production, sales, and expenses
- [ ] Offline entries sync correctly when connectivity returns; no data loss
- [ ] All screens are usable on mobile (Android Chrome)
- [ ] Page load is under 3 seconds on 3G connection; app shell loads from cache offline
- [ ] No data loss scenarios in normal operation (online or offline)

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Incorrect stock calculations | Medium | High | Use derived values instead of stored totals; database transactions; per-farm isolation |
| Cross-tenant data leakage | Low | Critical | Prisma middleware enforces tenant_id on every query; penetration testing; code review mandate |
| Offline sync conflicts (stock desync) | Medium | High | Server-side recalculation on sync; flag conflicts for admin review; never silently reject data |
| Data entry errors | High | Medium | Input validation, confirmation dialogs, ability to edit/delete records |
| Feature creep during development | High | High | Strict adherence to PRD scope; non-goals clearly defined; SaaS features deferred to v2 |
| User adoption challenges | Medium | High | Mobile-first design, minimal taps, offline support, parallel run with paper records |
| Permission bypass via custom roles | Low | High | Permissions enforced on both client and server; test all permission combinations |
| Worker misuse of shared credentials | Medium | Medium | Individual accounts per user; audit trail on all records (created_by) |
| Notification fatigue | Medium | Low | Configurable thresholds per farm; alerts trigger once per threshold crossing |
| PWA service worker issues | Medium | Medium | Version service workers with deploys; clear stale caches; fallback to online-only |
| Multi-farm complexity overwhelming users | Medium | Medium | Default to single farm; multi-farm UI progressive disclosure; guided setup |
| Timeline overrun (10-12 weeks) | Medium | Medium | Buffer week included; prioritize P0 features; defer P1 if needed |

---

## 11. Open Questions

| # | Question | Impact | Status |
|---|---------|--------|--------|
| 1 | Should production records be editable after entry, or locked (soft lock)? | Data integrity | Recommend: allow edit within 24 hours, then lock |
| 2 | Should the system support partial crate sales (e.g., 15 eggs instead of full crate)? | Sales flexibility | Recommend: crates only for MVP; add loose egg sales in v2 |
| 3 | Should purchases automatically create expense records, or are they separate? | Data entry UX | Recommend: auto-create expense with option to unlink |
| 4 | What authentication method is preferred (email/password, Google sign-in, phone OTP)? | Auth implementation | Recommend: email/password for MVP; add Google/OTP in v2 |
| 5 | Should there be a "Quick Add" widget on the dashboard for common actions? | UX efficiency | Recommend: yes, for egg production and sales |
| 6 | Is there a need for data seeding / import of historical records? | Onboarding | Clarify with launch client |
| 7 | What is the expected volume of data per tenant? | Database design | Assumption: < 10 flocks per farm, < 5 farms per tenant, < 50 customers, < 1000 records/year per farm |
| 8 | How long should offline data be retained before forcing a sync? | Offline reliability | Recommend: queue indefinitely; warn after 24 hours of no sync |
| 9 | Should tenants be able to transfer egg stock between farms? | Multi-farm operations | Recommend: not in MVP; add inter-farm transfer in v2 |
| 10 | What is the tenant onboarding process for new clients after the launch partner? | Growth strategy | MVP: manual provisioning by system admin; v2: self-service registration |
| 11 | Should custom roles support farm-specific permissions (different role per farm)? | Permission complexity | Recommend: one role per user for MVP; farm-specific roles in v2 |

---

## 12. Appendix

### 12.1 Glossary

| Term | Definition |
|------|-----------|
| Tenant | An independent organization (farm business) using the platform; all data is isolated per tenant |
| Farm | A physical farm location within a tenant; each farm has independent stock, production, and financials |
| Custom Role | A named set of permissions defined by the Tenant Admin, assigned to users |
| Permission | A granular access right (e.g., "sales:create", "reports:view") assigned to custom roles |
| Sellable Crates | Derived value — floor(eggs_on_hand / 30). Represents how many full crates could be packed; NOT physical inventory |
| Empty Crates (Physical) | Physical egg trays tracked as an inventory item; distinct from derived sellable crates |
| Crate | A standard egg crate containing 30 eggs |
| Gross Revenue | Total value of all sales including credit (sum of total_amount) |
| Cash Collected | Money actually received (sum of amount_paid) |
| Outstanding Credit | Unpaid portion of credit sales (sum of balance) |
| Operational Profit | Gross Revenue − Total Expenses (business performance view) |
| Cash Profit | Cash Collected − Total Expenses (cash-in-hand view) |
| Correction Entry | A new record linked to an original record used to adjust values without rewriting history |
| Inventory Movement | A log entry recording every change to inventory stock (purchase, usage, or adjustment) |
| Flock | A group of birds managed together within a farm, typically by age or batch |
| Derived value | A value calculated from source records, not stored or manually edited |
| Cash-based accounting | Revenue and expenses are recorded when money is received or paid, not when earned or incurred |
| PWA | Progressive Web App — a web application that can be installed on devices and works offline |
| Service Worker | A browser script that intercepts network requests, enabling offline caching and background sync |
| IndexedDB | A client-side database in the browser used for offline data storage |
| Background Sync | A service worker feature that defers actions until the user has stable connectivity |
| GH₵ | Ghanaian Cedi, the official currency of Ghana (default currency; configurable per tenant) |
| MVP | Minimum Viable Product — the initial version with core features only |
| P0 / P1 / P2 | Priority levels: P0 = must have for launch, P1 = important (soon after), P2 = nice to have |

### 12.2 Future Enhancements (Post-MVP)

| Feature | Description | Target Version |
|---------|-------------|---------------|
| Tenant self-registration | Self-service signup and onboarding for new organizations | v2 |
| Billing & subscription management | Monetization via subscription tiers; payment processing | v2 |
| Analytics & forecasting | Production trends, seasonal analysis, revenue forecasting | v2 |
| WhatsApp integration | Send sale receipts or summaries via WhatsApp | v2 |
| Mortality tracking | Track bird deaths per flock for health monitoring | v2 |
| Push notifications (mobile/email) | Extend in-app notifications to email and mobile push | v2 |
| Inter-farm stock transfers | Transfer egg stock between farms within a tenant | v2 |
| Farm-specific roles | Different role assignments per farm for the same user | v2 |
| White-labeling | Custom branding per tenant (logo, colors, domain) | v3 |
| API access for tenants | Public API for tenants to integrate with external systems | v3 |
| Multi-language support | Localization for different languages/regions | v3 |
