Poultry Farm Management Web Application
1. Product Overview
1.1 Product Name

Poultry Farm Management System (PFMS)

1.2 Purpose

The Poultry Farm Management System is a multi-tenant SaaS platform designed to help poultry farm organizations centrally manage farm operations, including egg production, inventory, sales, expenses, customers, flocks, and profitability.

The system is built for multiple organizations from day one. The first launch partner is a poultry farm in Accra, Ghana. Each tenant (organization) can manage multiple farms, invite team members with custom roles, and maintain complete data isolation from other tenants.

The platform aims to replace manual record-keeping with a single source of truth that provides real-time operational and financial visibility for each organization.

2. Goals & Success Metrics
2.1 Primary Goals

Enable accurate daily recording of egg production

Track egg stock availability automatically

Record sales and expenses reliably

Provide clear profit visibility over time

Reduce data loss, calculation errors, and manual tracking

2.2 Success Metrics

100% of egg stock changes are system-generated (no manual edits)

Sales and expenses can be reconciled without external spreadsheets

Farm owner can determine profit for any selected date range

System usable on mobile devices without feature loss

3. Target User
3.1 Users

Tenant Admin (Owner) — Primary user with full access to all features, user management, farm management, and settings. Cannot be removed from the tenant.

Custom Role Users — Team members assigned roles created by the Tenant Admin. Each role defines granular permissions for what the user can access and modify.

Note: The system ships with default role templates (Manager, Worker, Viewer) that are fully editable by the Tenant Admin.

3.2 User Characteristics

Primary user is non-technical

All users access the system via mobile and desktop

3.3 Primary User Characteristics

Performs daily operational data entry

Needs fast, simple forms

Values clarity over advanced accounting detail

4. Scope
4.1 In Scope

Multi-farm support (multiple farms per organization)

Custom user roles with granular permissions

Egg production tracking

Inventory management

Sales and customer tracking

Expense tracking

Profit reporting

Export to Excel/PDF

Notifications and alerts (low stock, reminders)

Mobile-friendly web application

Offline mode (PWA with background sync)

Multi-tenant architecture with data isolation

4.2 Out of Scope

Payroll processing

Advanced accounting features (depreciation, tax reporting)

Billing & subscription management

Tenant self-registration

White-labeling per tenant

5. Functional Requirements
5.1 Flocks Management
Description

The system must support multiple flocks within each farm. Flocks are scoped to a specific farm within the tenant.

Functional Requirements

Create, edit, and view flocks

Each flock must store:

Flock name / ID

Start date

Number of birds

Optional notes

Flocks must be selectable when recording egg production

Flocks may be optionally linked to expenses

5.2 Egg Production Tracking
Description

Record daily egg production per flock.

Functional Requirements

Record:

Date

Flock

Number of eggs laid

Each record must:

Increase total egg stock

Be stored historically

Users must be able to:

View egg production per flock

View egg production over time (table and/or chart)

Business Rules

Egg production records cannot be edited once finalized (optional soft lock)

Egg stock is derived, not manually editable

5.3 Egg Stock Management
Description

Egg stock must always reflect the true number of eggs available per farm.

Functional Requirements

Display:

Total eggs on hand (per farm)

Total full crates available (per farm)

Conversion rule:

1 crate = 30 eggs

Egg stock must update automatically when:

Eggs are recorded as laid

Eggs are sold

Business Rules

Manual egg stock edits are not allowed

Egg stock = total eggs produced − total eggs sold (per farm)

Stock is independent per farm — not shared across farms

5.4 Customer Management
Description

Store and display customer information and purchase history. Customers are shared across farms within a tenant.

Functional Requirements

Store:

Customer name

Contact details

Display:

Last purchase date

Total crates purchased

Total amount spent

Customers must be selectable when recording sales

5.5 Sales Management
Description

Record and track egg sales.

Functional Requirements

Record:

Date

Customer

Number of crates sold

Price per crate

Total sale amount (auto-calculated)

Sales must:

Reduce egg stock automatically (per farm)

Update customer totals

Business Rules

System must prevent sales if insufficient egg stock exists

Sales quantities are recorded in crates only

5.6 Inventory Management
Description

Track all physical inventory used on the farm. Inventory is scoped per farm.

Inventory Types

Feed

Medicines

Egg crates

Empty egg crates

Other farm items

Functional Requirements

Display current quantity on hand for each item

Increase inventory when items are purchased

Decrease inventory when items are used or consumed

Allow manual stock adjustments with reason

5.7 Purchases
Description

Record purchases of inventory items.

Functional Requirements

Record:

Date

Item

Quantity

Total cost

Purchases must:

Increase relevant inventory automatically

5.8 Expenses Management
Description

Record all farm expenses. Expenses are scoped per farm.

Functional Requirements

Record:

Date

Category

Description

Amount

Optional flock link

Expense categories may include:

Salaries

Feed

Medication

Utilities

Maintenance

Transport

Miscellaneous

5.9 Profit & Reporting
Description

Provide financial visibility and profitability tracking per farm and cross-farm.

Functional Requirements

Display:

Total sales revenue

Total expenses

Net profit

Allow filtering by:

Date range

Farm (specific farm or all farms)

Optional flock

Business Rules

Profit calculation:

Net Profit = Total Sales − Total Expenses

System uses cash-based accounting

Reports can be scoped per farm or aggregated across all farms

5.10 Custom User Roles & Permissions
Description

Support multiple users with custom role-based access control per tenant.

Custom Roles

The Tenant Admin creates and manages custom roles with granular permissions. Each role defines exactly which features and actions a user can access.

The system provides default role templates that can be used as-is or customized:

Manager — Read/write access to production, sales, expenses, inventory; no user management or export by default

Worker — Record egg production and inventory usage; read-only for sales and reports by default

Viewer — Read-only access to all operational data by default

Functional Requirements

Tenant Admin can create, edit, and delete custom roles with granular permissions

Tenant Admin can invite users via email with an assigned role

Tenant Admin can assign users to specific farms or all farms

Tenant Admin can view, edit roles, and deactivate user accounts

All data entry records store the user who created them (audit trail)

Role-based permissions enforced on both client and server

5.11 Export to Excel/PDF
Description

Allow users with the appropriate permission to export reports and data for offline use or sharing.

Functional Requirements

Export profit report for a selected date range (PDF and Excel)

Export sales history, expense records, and production records (Excel)

Export customer list with purchase summaries (Excel)

PDF exports include tenant name, farm name, date range, and generation timestamp

Export restricted to users with the Export permission in their custom role

Exports scoped to the user's accessible farms

5.12 Notifications & Alerts
Description

Proactively notify users of important operational events per farm.

Functional Requirements

Low egg stock alert when total eggs fall below configurable threshold (per farm)

Low inventory alert when any item falls below its configured minimum (per farm)

In-app notification center with unread count badge

Admin can configure notification thresholds in Settings (per farm)

Users with the Notifications: receive permission in their role receive notifications

Daily production reminder if no eggs recorded by a configurable time (P1)

Weekly summary notification (P1)

5.13 Multi-Farm Management
Description

Support multiple farms within a single tenant (organization).

Functional Requirements

Tenant Admin can create multiple farms within the organization

All operational data (production, sales, expenses, inventory) is scoped per farm

Farm switcher in UI allows users to navigate between accessible farms

Egg stock is calculated independently per farm

Customers are shared across farms within the same tenant

Profit reports available per-farm and cross-farm (aggregated)

Users can be assigned access to specific farms or all farms

5.14 Offline Mode (PWA)
Description

Support offline usage for environments with intermittent connectivity.

Functional Requirements

Application is installable as a Progressive Web App (PWA)

Core data entry works offline (production, expenses, inventory usage)

Sales work offline with cached stock data (with warning that stock may be stale)

Background sync automatically pushes queued changes when connectivity returns

Online/offline status indicator visible in the UI

Pending sync count visible to user

Conflict resolution: server wins for stock calculations; conflicts flagged for admin review

5.15 Tenant / Organization Management
Description

Manage tenant-level configuration and data isolation.

Functional Requirements

Each tenant has a unique name, configurable currency, and configurable timezone

All data is scoped by tenant_id — no cross-tenant data access

Complete tenant data isolation enforced at database and application layers

Manual onboarding for MVP (no self-registration)

6. Screens & Navigation
Required Screens

Dashboard

Farm Switcher

Flocks

Egg Production

Customers

Sales History

Inventory

Purchases

Expenses

Profit Summary

User Management (Admin only)

Role Management (Admin only)

Farm Management (Admin only)

Notifications

Settings (Admin only)

Note: Online/offline status indicator and farm context displayed in the header across all screens.

Dashboard Highlights

Eggs on hand (current farm)

Crates available (current farm)

Recent egg production

Recent sales

Profit snapshot

7. Non-Functional Requirements
Performance

Page load under 2 seconds on average mobile connection

App shell loads from cache in under 1 second (offline/slow connections)

Usability

Mobile-first responsive design

Simple, form-based data entry

Clear numeric displays

Security

Authentication required

Custom role-based permissions with tenant data isolation

Secure data storage (server and offline local storage)

Multi-tenant data isolation — zero cross-tenant data leakage

Reliability

Automatic calculations must be consistent

Inventory and stock must never desync

Offline data entry with automatic background sync

8. Assumptions & Constraints

Multiple farms per tenant

Multiple users with custom role-based access per tenant

Intermittent internet connectivity (offline mode supported)

9. Risks & Mitigations
Risk	Mitigation
Incorrect stock calculations	Use derived values instead of stored totals; per-farm isolation
Data entry errors	Input validation and confirmations
Feature creep	Stick strictly to PRD scope
Cross-tenant data leakage	Prisma middleware enforces tenant_id on all queries; penetration testing
Offline sync conflicts	Server recalculates on sync; flags conflicts for admin review
Custom role complexity	Default templates provided; permission UI with clear descriptions

10. Future Enhancements (Not in MVP)

Tenant self-registration

Billing & subscriptions

Analytics & forecasting

WhatsApp integration

Mortality tracking

Push notifications (mobile/email)

Inter-farm stock transfers

White-labeling

Multi-language support
