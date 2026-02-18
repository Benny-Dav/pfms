# PFMS Design Plan
## UI/UX Implementation Guide — All Phases

> **Document status:** v1.0 — covers Phases 3–8
> **Design system version:** established in Phase 1
> **Rule:** PRD documentation requirements override mockup designs.
> **Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS · Recharts · Lucide React

---

## 1. Design System Reference

### 1.1 Tokens (tailwind.config.ts)

| Token | Value | Usage |
|-------|-------|-------|
| `primary-500` | `#22c55e` | Active icons, tags, highlights |
| `primary-600` | `#16c653` | CTA button fill, featured card bg |
| `primary-50/100` | light tints | Badge backgrounds, active nav bg |
| `surface` | `#f0f2f0` | Page background |
| `card` | `#ffffff` | Card background |
| `rounded-card` | `16px` | Cards, modals, featured card |
| `rounded-input` | `12px` | All inputs, selects, textareas |
| `rounded-btn` | `12px` | Buttons, icon buttons, chips |
| `shadow-card` | subtle 2-layer | Card elevation |

### 1.2 Additional Tokens Needed

Add these to `tailwind.config.ts` → `theme.extend` for Phase 3+:

```ts
// Status colors (inventory, payments, flocks)
colors: {
  // existing primary, surface, card ...
  status: {
    paid:    { bg: "#dcfce7", text: "#15803d" }, // green
    partial: { bg: "#fef9c3", text: "#854d0e" }, // amber
    credit:  { bg: "#fee2e2", text: "#b91c1c" }, // red
    active:  { bg: "#dbeafe", text: "#1d4ed8" }, // blue
    closed:  { bg: "#f1f5f9", text: "#64748b" }, // gray
    instock: { bg: "#dcfce7", text: "#15803d" }, // green
    low:     { bg: "#fef9c3", text: "#854d0e" }, // amber
    out:     { bg: "#fee2e2", text: "#b91c1c" }, // red
  }
}
```

Or use Tailwind's existing color scale directly (simpler):
- `badge-green` → existing class (bg-primary-100 text-primary-700)
- `badge-amber` → existing class (bg-amber-100 text-amber-700)
- `badge-red` → existing class (bg-red-100 text-red-700)
- `badge-blue` → existing class (bg-blue-100 text-blue-700)
- `badge-gray` → existing class (bg-gray-100 text-gray-600)

### 1.3 Component Classes to Add (globals.css)

```css
/* ── Stepper input (+/−) ────────────────────── */
.stepper {
  @apply flex items-center gap-0;
}
.stepper-btn {
  @apply w-11 h-11 flex items-center justify-center rounded-btn bg-gray-100
         hover:bg-gray-200 active:bg-gray-300 transition-colors
         text-gray-700 font-bold text-xl select-none cursor-pointer;
}
.stepper-value {
  @apply w-16 h-11 text-center text-lg font-bold text-gray-900
         border-y border-gray-200 bg-white;
}

/* ── Payment method chip selector ───────────── */
.payment-chip {
  @apply flex items-center justify-center gap-1.5 px-3 py-2 rounded-btn
         text-sm font-semibold border border-gray-200 cursor-pointer
         transition-colors min-h-[44px] min-w-[72px];
}
.payment-chip-active {
  @apply bg-primary-600 border-primary-600 text-white;
}
.payment-chip-inactive {
  @apply bg-white text-gray-600 hover:bg-gray-50;
}

/* ── List item row ───────────────────────────── */
.list-row {
  @apply flex items-center gap-3 px-4 py-3.5 border-b border-gray-50
         last:border-0 hover:bg-gray-50 transition-colors cursor-pointer;
}

/* ── Form field wrapper ──────────────────────── */
.field {
  @apply flex flex-col gap-1.5;
}
.field-error {
  @apply text-xs font-medium text-red-600 flex items-center gap-1 mt-1;
}

/* ── Skeleton loader ─────────────────────────── */
.skeleton {
  @apply bg-gray-200 rounded animate-pulse;
}

/* ── Offline banner ──────────────────────────── */
.offline-banner {
  @apply w-full bg-amber-50 border-b border-amber-200
         flex items-center justify-center gap-2
         px-4 py-2 text-xs font-semibold text-amber-800;
}

/* ── Section divider ─────────────────────────── */
.divider {
  @apply border-t border-gray-100 my-4;
}

/* ── Detail row (label + value) ──────────────── */
.detail-row {
  @apply flex items-start justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0;
}
.detail-label {
  @apply text-xs font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0;
}
.detail-value {
  @apply text-sm font-semibold text-gray-900 text-right;
}
```

### 1.4 Typography Scale

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `text-xl font-bold` | 20px / 700 | Page title (h1) |
| `text-lg font-bold` | 18px / 700 | Card title, section heading |
| `text-sm font-semibold` | 14px / 600 | List item primary text |
| `text-sm` | 14px / 400 | Body text, secondary info |
| `text-xs font-semibold` | 12px / 600 | Labels, badges, metadata |
| `text-xs` | 12px / 400 | Captions, helper text |
| `text-2xl font-bold` | 24px / 700 | Metric values (large) |
| `text-3xl font-bold` | 30px / 700 | Featured card hero number |

### 1.5 Iconography

All icons from **Lucide React** (`lucide-react`). Standard sizes:
- Navigation: `w-5 h-5`
- Inline/list: `w-4 h-4`
- Empty state: `w-10 h-10 text-gray-200`
- Hero/featured card: `w-6 h-6`
- Icon buttons: `w-5 h-5`

---

## 2. Shared Pattern Library

### 2.1 Page Shell

Every page inside `(dashboard)` follows this structure:

```tsx
<div className="space-y-5 pb-24 lg:pb-8">
  {/* Page header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-xl font-bold text-gray-900">Page Title</h1>
      <p className="text-sm text-gray-500 mt-0.5">Subtitle or context</p>
    </div>
    {/* Optional: primary action button */}
    <Link href="/page/new" className="btn-primary">
      <Plus className="w-4 h-4 mr-1.5" /> Add Item
    </Link>
  </div>

  {/* Content sections */}
</div>
```

`pb-24` ensures content clears the mobile bottom nav (64px nav + 16px buffer). `lg:pb-8` reverts on desktop.

### 2.2 List Page Pattern

```
┌─────────────────────────────────┐
│ Page Title            [+ Add]   │  ← page header
├─────────────────────────────────┤
│ [Search / Filter bar]           │  ← optional
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ card                        │ │
│ │  list-row (item 1)          │ │
│ │  list-row (item 2)          │ │
│ │  list-row (item 3)          │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

Each `list-row`:
- **Left**: icon avatar OR date pill → primary text → secondary text
- **Right**: badge (status) + chevron

### 2.3 Detail Page Pattern

```
┌─────────────────────────────────┐
│ ← Back    Item Title  [Edit]    │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ card — Summary              │ │
│ │  detail-row x N             │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ card — Related / History    │ │
│ └─────────────────────────────┘ │
│ [Danger zone — Delete / Close]  │
└─────────────────────────────────┘
```

### 2.4 Form Page Pattern

```
┌─────────────────────────────────┐
│ ← Back    Form Title            │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ card p-5                    │ │
│ │  field (label + input)      │ │
│ │  field (label + stepper)    │ │
│ │  field (label + chips)      │ │
│ │  [Submit btn — full width]  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

All forms live inside a single `card`. Submit button is always `btn-primary w-full` at the bottom.

### 2.5 Stepper Component (+/−)

```tsx
// StepperInput.tsx
<div className="stepper">
  <button type="button" className="stepper-btn" onClick={decrement}>−</button>
  <input
    type="number"
    className="stepper-value"
    value={value}
    readOnly
    aria-label={label}
  />
  <button type="button" className="stepper-btn" onClick={increment}>+</button>
</div>
```

- Minimum value: 0 (eggs), enforce in decrement handler
- Haptic feedback: use `navigator.vibrate(10)` on mobile tap (optional, graceful degradation)
- Large tap targets: `w-11 h-11` (44×44px)

### 2.6 Payment Method Selector

```tsx
const methods = ["CASH", "MOMO", "BANK", "CREDIT"];

<div className="flex gap-2 flex-wrap">
  {methods.map((m) => (
    <button
      key={m}
      type="button"
      onClick={() => setMethod(m)}
      className={cn(
        "payment-chip",
        method === m ? "payment-chip-active" : "payment-chip-inactive"
      )}
    >
      {m}
    </button>
  ))}
</div>
```

- CASH/MOMO/BANK → green active (primary-600)
- CREDIT → red active (`bg-red-600 border-red-600`) to visually signal credit risk

### 2.7 Category Selector (Grouped)

Use a `<select>` with `<optgroup>` for the native experience:

```tsx
<select className="input">
  <optgroup label="Operating Expenses">
    <option value="SALARY">Salaries</option>
    <option value="UTILITIES">Utilities</option>
    <option value="TRANSPORT">Transport</option>
    <option value="MAINTENANCE">Maintenance</option>
    <option value="MISC">Miscellaneous</option>
  </optgroup>
  <optgroup label="Production Expenses">
    <option value="FEED">Feed</option>
    <option value="MEDICATION">Medication</option>
  </optgroup>
</select>
```

Category badge color mapping:
| Category | Badge class |
|----------|-------------|
| SALARY, UTILITIES, TRANSPORT, MAINTENANCE, MISC | `badge-blue` |
| FEED, MEDICATION | `badge-green` |

### 2.8 Flock Picker

A `<select className="input">` listing active flocks:

```tsx
<select className="input">
  <option value="">Select flock…</option>
  {activeFlocks.map(f => (
    <option key={f.id} value={f.id}>
      {f.name} — {f.bird_count.toLocaleString()} birds
    </option>
  ))}
</select>
```

### 2.9 Validation Error Display

```tsx
{/* Inline field error */}
{errors.eggs && (
  <p className="field-error">
    <AlertCircle className="w-3 h-3" />
    {errors.eggs.message}
  </p>
)}
```

Use `border-red-400 ring-red-400` on the input when invalid:
```tsx
className={cn("input", errors.eggs && "border-red-400 focus:ring-red-400")}
```

### 2.10 10-Minute Edit Window UI

On detail pages within the edit window, show:
```tsx
<div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-btn mb-4">
  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
  <span>Editable for <CountdownTimer until={createdAt + 10min} /> more</span>
</div>
```

After window closes, show:
```tsx
<div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-btn mb-4">
  <Lock className="w-3.5 h-3.5" />
  <span>Record locked. Admin can create a Correction Entry.</span>
</div>
```

### 2.11 Empty State Pattern

```tsx
<div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
  <Icon className="w-10 h-10 text-gray-200" />
  <div>
    <p className="text-sm font-semibold text-gray-400">{title}</p>
    <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
  </div>
  {/* Optional CTA */}
  <Link href={ctaHref} className="btn-primary mt-2">{ctaLabel}</Link>
</div>
```

Empty state copy by page:
| Page | Icon | Title | Subtitle |
|------|------|-------|----------|
| /flocks | `Bird` | "No flocks yet" | "Add your first flock to start tracking production." |
| /production | `Egg` | "No production records" | "Record today's egg collection to begin." |
| /sales | `ShoppingCart` | "No sales yet" | "Record your first sale when eggs are ready." |
| /expenses | `Wallet` | "No expenses recorded" | "Track costs to see your real profitability." |
| /inventory | `Package` | "Inventory empty" | "Add items to track your stock levels." |
| /customers | `Users` | "No customers yet" | "Add customers to track credit and sales history." |

### 2.12 Skeleton Loader Pattern

Use for list and metric card loading states:

```tsx
{/* Metric card skeleton */}
<div className="metric-card gap-3">
  <div className="skeleton w-8 h-8 rounded-btn" />
  <div className="skeleton h-3 w-20 rounded" />
  <div className="skeleton h-6 w-16 rounded" />
</div>

{/* List row skeleton */}
<div className="list-row gap-3">
  <div className="skeleton w-10 h-10 rounded-btn flex-shrink-0" />
  <div className="flex-1 space-y-2">
    <div className="skeleton h-3 w-32 rounded" />
    <div className="skeleton h-2.5 w-20 rounded" />
  </div>
  <div className="skeleton h-5 w-14 rounded-full" />
</div>
```

---

## 3. Page-by-Page Specifications

---

### 3.1 Phase 3 — Flock Management

#### `/flocks` — Flock List

**Layout:**
```
Page header: "Flocks"                     [+ Add Flock]
card
  list-row: bird icon | Name · Breed      [Active badge] >
            Count · Age
  ...
empty state (if no flocks)
```

**list-row anatomy:**
- Avatar: `w-10 h-10 bg-primary-50 rounded-btn` with `Bird` icon in `text-primary-600`
- Primary text: `{flock.name}` — `text-sm font-semibold text-gray-900`
- Secondary: `{flock.bird_count.toLocaleString()} birds · {flock.breed}` — `text-xs text-gray-500`
- Right: Status badge + `ChevronRight w-4 h-4 text-gray-300`

**Status badge mapping:**
- Active → `badge-green`
- Closed → `badge-gray`

**Interaction:** Tap row → `/flocks/[id]`

**Responsive:** Single column list on all breakpoints. No grid needed.

---

#### `/flocks/new` — Add Flock Form

**Fields:**
1. Flock Name (text input, required)
2. Breed (text input, optional — e.g. "Hy-Line Brown")
3. Bird Count (stepper, min 1)
4. Date Acquired (date input)
5. Notes (textarea, optional)

**Submit:** `btn-primary w-full` — "Add Flock"

---

#### `/flocks/[id]` — Flock Detail

**Sections:**
1. **Summary card** — detail-rows: Name, Breed, Count, Date Acquired, Age, Status
2. **Production Stats card** — metric grid (2-col): Total Eggs Produced, Avg Eggs/Day, Best Day
3. **Production History** — mini bar chart (Recharts, last 14 days, see §5)
4. **Danger zone** — "Close Flock" button (`btn-danger w-full`) — confirm dialog required

**10-min edit window** banner at top when within window.

---

### 3.2 Phase 4 — Egg Production

#### `/production` — Production List

**Layout:**
```
Page header: "Egg Production"             [+ Record]
[Filter row: date range or "This Week"]
card
  list-row: date+session | Flock name    [crates badge] >
            eggs count
```

**list-row anatomy:**
- Left avatar: date pill `text-xs font-bold bg-gray-100 rounded-btn w-12 text-center py-2`
  - Line 1: Day number (e.g. "17")
  - Line 2: Month abbr (e.g. "FEB")
- Session chip next to date: `badge-blue` for AM, `badge-amber` for PM, `badge-gray` for OTHER
- Primary: Flock name
- Secondary: `{eggs.toLocaleString()} eggs · {crates} crates`
- Right badge: crates count in `badge-green`

**Sort:** Newest first (default). No pagination needed for MVP (Vercel/Neon handles query).

---

#### `/production/new` — Record Eggs Form

**Fields (in order):**
1. **Flock** — flock picker select (required)
2. **Date** — date input, defaults to today
3. **Session** — 3-chip selector: `[AM] [PM] [OTHER]`, same pattern as payment chips
   - AM → `badge-blue` active; PM → `badge-amber` active; OTHER → `badge-gray` active
4. **Eggs Collected** — stepper (large, centered), step: 1, min: 0
5. **Derived Crates** — read-only display below stepper: `= {Math.floor(eggs/30)} crates + {eggs%30} loose`
   - Style: `text-center text-sm text-gray-500 font-medium`
6. **Notes** — textarea, optional, 3 rows

**Submit:** "Save Production Record"

**Visual hierarchy tip:** Give the stepper section extra vertical padding (`py-8`) to make it feel like the hero interaction.

---

#### `/production/[id]` — Production Detail

**Sections:**
1. Detail card: Flock, Date, Session, Eggs, Crates, Loose Eggs, Notes, Recorded by, Recorded at
2. Edit window banner (§2.10)
3. If corrected: show `badge-amber "Corrected"` + link to correction entry

---

### 3.3 Phase 5 — Sales & Customers

#### `/sales` — Sales List

**list-row anatomy:**
- Left: date pill (same as production)
- Primary: Customer name (or "Walk-in" if no customer)
- Secondary: `{crates} crates · {payment_method}`
- Right top: `GH₵ {total_amount}` — `text-sm font-bold`
- Right bottom: payment badge
  - PAID (balance = 0) → `badge-green`
  - PARTIAL (0 < balance < total) → `badge-amber "Partial"`
  - CREDIT (amount_paid = 0) → `badge-red "Credit"`

**Filter bar (horizontal scroll):** `[All] [Paid] [Partial] [Credit]` — pill toggle group

---

#### `/sales/new` — New Sale Form

**Fields (in order):**
1. **Customer** — select (with option "Walk-in / No customer")
2. **Date** — date input, defaults today
3. **Crates** — stepper, min 1
4. **Unit Price (GH₵/crate)** — numeric input, keyboard: decimal
5. **Total Amount** — read-only computed: `crates × unit_price`, displayed large below inputs
   ```
   Total:  GH₵ 240.00
   ```
   Style: `text-xl font-bold text-gray-900 text-center py-3 bg-gray-50 rounded-input`
6. **Amount Paid** — numeric input (defaults to total for full payment, 0 for credit)
7. **Balance** — read-only computed: `total − amount_paid`
   - If balance > 0: `text-red-600 font-bold`
   - If balance = 0: `text-primary-600 font-bold`
8. **Payment Method** — chip selector (CASH / MOMO / BANK / CREDIT)
   - When CREDIT is selected, auto-set amount_paid to 0
9. **Payment Reference** — text input, shown conditionally only for MOMO/BANK
10. **Notes** — textarea, optional

**Submit:** "Record Sale"

---

#### `/sales/[id]` — Sale Detail

**Sections:**
1. Status banner at top: paid/partial/credit with color strip
2. Detail card: Customer, Date, Crates, Unit Price, Total, Paid, Balance, Method, Reference, Notes
3. Edit window banner
4. Financial summary mini-card:
   ```
   Total Amount:  GH₵ 240.00
   Amount Paid:   GH₵ 120.00
   Balance:       GH₵ 120.00  [red]
   ```

---

#### `/customers` — Customer List

**list-row anatomy:**
- Left avatar: initials circle `w-10 h-10 rounded-full bg-primary-100 text-primary-700`
- Primary: Customer name, phone
- Right: Outstanding credit in `text-red-600 font-bold` if > 0, else `text-gray-400 "No balance"`

**Sort:** By outstanding credit desc (most owed first).

---

#### `/customers/new` and `/customers/[id]`

**New form fields:** Name (required), Phone, Location/Address, Notes

**Detail sections:**
1. Contact info card (detail-rows)
2. Sales history list (last 10)
3. Outstanding balance summary card

---

### 3.4 Phase 6 — Expenses & Inventory

#### `/expenses` — Expense List

**Group by month** using sticky section headers:
```
── February 2026 ──────────────
list-row: category badge | Description    GH₵ amount >
          date · payment method
```

**list-row anatomy:**
- Left: category badge pill (color by group — see §2.7)
- Primary: description
- Secondary: `{date} · {payment_method}`
- Right: `GH₵ {amount}` `text-sm font-bold text-gray-900`

Monthly total at bottom of each month group:
```
Month Total: GH₵ 1,240.00   (small, gray, right-aligned)
```

---

#### `/expenses/new` — New Expense Form

**Fields:**
1. **Category** — grouped select (§2.7)
2. **Description** — text input
3. **Amount (GH₵)** — numeric input
4. **Date** — date input, defaults today
5. **Payment Method** — chip selector (CASH / MOMO / BANK / CREDIT)
6. **Notes** — textarea, optional

---

#### `/inventory` — Inventory List

**Layout:** Grid (2-col on mobile, 3-col on lg):

```
┌──────────────┐ ┌──────────────┐
│ item card    │ │ item card    │
│ Icon + name  │ │ Icon + name  │
│ qty + unit   │ │ qty + unit   │
│ [IN STOCK]   │ │ [LOW STOCK]  │
└──────────────┘ └──────────────┘
```

**Item card:**
```tsx
<div className="card p-4 flex flex-col gap-2">
  <div className="w-10 h-10 bg-gray-100 rounded-btn flex items-center justify-center">
    <Package className="w-5 h-5 text-gray-500" />
  </div>
  <p className="text-sm font-bold text-gray-900">{item.name}</p>
  <p className="text-xs text-gray-500">{item.quantity} {item.unit}</p>
  <span className={statusBadge}>{statusLabel}</span>
</div>
```

**Status logic:**
- `quantity === 0` → `badge-red "OUT OF STOCK"`
- `quantity <= reorder_point` → `badge-amber "LOW STOCK"`
- else → `badge-green "IN STOCK"`

**Filter chips (horizontal scroll):** `[All] [In Stock] [Low Stock] [Out of Stock]`

---

#### `/inventory/[id]` — Inventory Detail

**Sections:**
1. Summary card: Name, Category, Quantity, Unit, Reorder Point, Status badge
2. Movement History card:
   - Table (or stacked list on mobile): Date | Type | Qty change | Notes | By
   - Movement type badges: PURCHASE → `badge-green`, USAGE → `badge-amber`, ADJUSTMENT → `badge-blue`
3. `[+ Record Movement]` button → modal or `/inventory/[id]/movement/new`

---

#### `/purchases` — Purchase List

Same list-row pattern as expenses. Group by date. Fields: item name, quantity, unit cost, total cost, supplier.

---

### 3.5 Phase 7 — Reports & Notifications

#### `/profit` — Profit Summary

**Layout:**

```
Page header: "Profit Summary"
[Date range picker — "This Month" / "Last Month" / Custom]

┌──────────────┐ ┌──────────────┐
│ Gross Revenue│ │ Cash Collected│   metric-card (2-col)
├──────────────┤ ├──────────────┤
│ Outstanding  │ │ Total Expenses│  metric-card (2-col)
├──────────────┘ └──────────────┤
│ Operational Profit             │  featured metric card (full width, green if positive)
│ Cash Profit                    │  featured metric card (full width)
└────────────────────────────────┘

[Revenue vs Expenses — Bar Chart]    card full width
[Expense Breakdown — Donut Chart]    card full width
```

**Featured metric card (full-width, large):**
```tsx
<div className={cn(
  "card p-5 flex items-center justify-between",
  value >= 0 ? "border-l-4 border-primary-500" : "border-l-4 border-red-500"
)}>
  <div>
    <p className="metric-label">{label}</p>
    <p className="text-2xl font-bold" style={{ color: value >= 0 ? '#16c653' : '#dc2626' }}>
      GH₵ {value.toLocaleString()}
    </p>
  </div>
  <TrendingUp className={value >= 0 ? "text-primary-500" : "text-red-500"} />
</div>
```

---

#### Notification Bell Dropdown

Position: `absolute right-0 top-14` off the header bell button.

```
┌────────────────────────────────────┐
│ Notifications               [Clear]│
├────────────────────────────────────┤
│ 🔴 [Low Stock] Feed running low    │
│    30 min ago                      │
├────────────────────────────────────┤
│ 🟡 [Credit] Kwame owes GH₵ 240     │
│    2 hours ago                     │
└────────────────────────────────────┘
```

- Card shadow elevated: `shadow-lg ring-1 ring-gray-100`
- Width: `w-80` (320px), max-height: `max-h-96 overflow-y-auto`
- Empty: "You're all caught up" with `Bell` icon

---

### 3.6 Phase 8a — Offline PWA

#### Offline Banner

Renders below `<Header>` inside the dashboard layout when `navigator.onLine === false`:

```tsx
<div className="offline-banner">
  <WifiOff className="w-3.5 h-3.5" />
  <span>You&apos;re offline — changes will sync when connection returns</span>
  {pendingCount > 0 && (
    <span className="font-bold ml-1">({pendingCount} pending)</span>
  )}
</div>
```

#### Conflict Review Queue (`/admin/conflicts`)

Shown only to Admin role users. Lists flagged records for manual review:

```
list-row: [⚠ amber icon] | Record type + ID    [Review] >
          Conflict reason · Created at
```

Each review action: "Accept Local" / "Accept Server" / "Merge" (simplified for MVP: just "Keep this version" vs "Discard").

---

### 3.7 Admin Pages

#### `/farms` — Farm List & Management

Same list pattern. Farm card shows: name, location, flock count, active status.

#### `/users` — Users & Roles

**list-row:** Avatar initials → Name + Email → Role badge (`badge-blue "Admin"`, `badge-green "Manager"`, `badge-gray "Viewer"`) → status badge (Active/Pending invite)

**Invite flow:** `[+ Invite User]` → modal with email input + role select.

#### `/settings` — Farm Settings

Section cards:
- Farm Details (name, location, currency)
- Notification Preferences (toggle list)
- Account (change password link)
- Danger Zone (delete farm — `btn-danger`)

---

## 4. Data Visualization (Recharts)

### 4.1 Revenue vs Expenses Bar Chart

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={240}>
  <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
           tickFormatter={(v) => `₵${(v/1000).toFixed(0)}k`} />
    <Tooltip
      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
      formatter={(value: number) => [`GH₵ ${value.toLocaleString()}`, '']}
    />
    <Legend wrapperStyle={{ fontSize: 12 }} />
    <Bar dataKey="revenue"  name="Revenue"  fill="#22c55e" radius={[4,4,0,0]} />
    <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4,4,0,0]} />
  </BarChart>
</ResponsiveContainer>
```

### 4.2 Expense Breakdown Donut Chart

```tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

<ResponsiveContainer width="100%" height={220}>
  <PieChart>
    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
         dataKey="value" nameKey="category" paddingAngle={2}>
      {data.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(v: number) => `GH₵ ${v.toLocaleString()}`}
             contentStyle={{ borderRadius: 12, border: 'none' }} />
    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
  </PieChart>
</ResponsiveContainer>
```

### 4.3 Production Trend Line Chart (Flock Detail)

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={160}>
  <LineChart data={last14days} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
    <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
    <Line type="monotone" dataKey="eggs" stroke="#22c55e" strokeWidth={2}
          dot={{ fill: '#22c55e', r: 3 }} activeDot={{ r: 5 }} />
  </LineChart>
</ResponsiveContainer>
```

### 4.4 Recharts General Config Rules

- Always wrap in `<ResponsiveContainer width="100%">` — never fixed px width
- Remove axis lines: `axisLine={false} tickLine={false}`
- Remove vertical grid lines: `<CartesianGrid vertical={false}>`
- Rounded bar tops: `radius={[4,4,0,0]}`
- Tooltip: `borderRadius: 12, border: 'none'`
- Font size on axes: `fontSize: 11` (smaller than body text)
- Chart height on mobile: 160–240px; on desktop: 280–320px (use `lg:h-72` utility class)

---

## 5. Mobile-First Responsive Rules

| Breakpoint | Width | Layout behavior |
|------------|-------|-----------------|
| (default) | 0px+ | Single column, BottomNav visible, Header farm-switcher visible |
| `sm` | 640px | Grid expands (2-col for metric cards) |
| `lg` | 1024px | Sidebar appears, BottomNav hidden, Header farm-switcher hidden, `pl-64` offset on main |

### Breakpoint rules per layout type:

**List pages:** Always single column (never grid — lists are better on mobile).

**Metric grids:**
- Stock: `grid-cols-3` (always 3 items — ok at default, small cards)
- Financial: `grid-cols-2` → `lg:grid-cols-3`

**Form pages:**
- Single column, full width
- On `lg`: constrain to `max-w-xl mx-auto` to avoid ultra-wide forms

**Inventory grid:**
- `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`

**Charts:**
- Full width always; height: `h-40 lg:h-72`

**Dashboard recent activity:**
- `grid-cols-1 lg:grid-cols-2`

---

## 6. Accessibility & Touch Targets (WCAG AA)

### 6.1 Touch Target Checklist

- [ ] All buttons: `min-h-[44px]` enforced via `.btn` class ✓
- [ ] All inputs: `min-h-[44px]` enforced via `.input` class ✓
- [ ] Stepper buttons: `w-11 h-11` (44×44px) ✓
- [ ] Bottom nav items: full cell height (64px) via `h-16` grid ✓
- [ ] List rows: `min-h-[56px]` via padding ✓
- [ ] Icon-only buttons: `min-h-[44px] min-w-[44px]` (Header bell, logout) ✓

### 6.2 Color Contrast

All text must meet 4.5:1 ratio on their background:
- `text-gray-900` on `#ffffff` → ✓ (21:1)
- `text-gray-700` on `#ffffff` → ✓ (8.6:1)
- `text-gray-500` on `#ffffff` → ✓ (4.6:1) — borderline, ok for small text
- `text-primary-600 (#16c653)` on `#ffffff` → must verify; if fails use `text-primary-700 (#15803d)` (10:1) ✓
- White text on `primary-600` button → verify; use `primary-700` background if needed

### 6.3 Focus States

Every interactive element must have a visible focus ring. Tailwind's `focus:ring-2 focus:ring-primary-500 focus:ring-offset-2` is already applied to `.btn` and `.input`. Ensure custom elements (payment chips, nav items, steppers) also have explicit focus styles.

```css
/* Add to globals.css @layer base */
:focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}
```

### 6.4 ARIA Labels

- Farm switcher button: `aria-label="Switch farm"`
- Stepper decrement: `aria-label="Decrease {fieldName}"`
- Stepper increment: `aria-label="Increase {fieldName}"`
- Stepper input: `aria-label="{fieldName}" aria-live="polite"`
- Payment chips: `role="radio"` group with `aria-checked`
- Session chips: `role="radio"` group
- Notification bell: `aria-label="Notifications"` ✓
- Close/dismiss buttons: `aria-label="Close"`

### 6.5 Form Accessibility

- Every input has a `<label>` with `htmlFor` matching input `id` ✓ (enforced by `.label` pattern)
- Error messages use `role="alert"` or `aria-live="polite"`
- Required fields: `required` attribute + "(required)" in label for screen readers
- Disabled submit during loading: `disabled` + `aria-busy="true"`

### 6.6 Reduced Motion

```css
/* Add to globals.css @layer base */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Animation & Transition Guidelines

### 7.1 Principles

- **Purposeful only:** Animate state changes, not decoration.
- **Fast:** 150–250ms for micro-interactions; 300ms max for page elements.
- **Transform/opacity:** Only animate `transform` and `opacity` (GPU-composited). Never animate `height`, `width`, or `top/left`.

### 7.2 Standard Transitions

| Element | Transition |
|---------|------------|
| Buttons, nav items, chips | `transition-colors duration-150` |
| Cards (hover lift) | `transition-shadow duration-200` |
| Online/offline badge color | `transition-colors duration-500` |
| Modals / drawers | `transition-opacity duration-200` + `translate-y` |
| Payment chip active state | `transition-colors duration-150` |
| Bottom nav icon color | `transition-colors duration-150` |

### 7.3 Loading Spinner (existing)

Already in login form. Reuse:
```tsx
<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
</svg>
```

### 7.4 Skeleton Pulse

Use Tailwind's `animate-pulse` on `.skeleton` class ✓ (already defined in §1.3).

### 7.5 Success Feedback

After form submit success:
1. Button shows checkmark for 1.5s: `<Check className="w-4 h-4" />`
2. Then redirect

```tsx
// Pattern
setStatus('success');
setTimeout(() => router.push('/production'), 1500);
```

### 7.6 Haptic Feedback (Mobile PWA)

For stepper tap and form submit:
```ts
if ('vibrate' in navigator) navigator.vibrate(10); // 10ms subtle
```

---

## 8. z-index Scale

Define explicitly to avoid conflicts:

| Layer | z-index | Elements |
|-------|---------|----------|
| base | 0 | Normal content, cards |
| sticky | 10 | Sticky table headers |
| header | 20 | `<Header>` sticky top |
| sidebar | 30 | `<Sidebar>` + `<BottomNav>` |
| dropdown | 40 | Notification dropdown, farm picker dropdown |
| modal | 50 | Confirmation dialogs, modals |
| toast | 60 | Success/error toast notifications |

Already applied in existing components: `z-20` (Header), `z-30` (Sidebar, BottomNav). Maintain this scale.

---

## 9. Pre-Delivery Checklist (Per Page)

Before marking any page as done in a phase:

### Visual Quality
- [ ] No emojis used as icons — all Lucide React SVGs
- [ ] Consistent icon sizes (w-4/w-5 inline, w-10 empty state)
- [ ] Hover states on all clickable elements
- [ ] `cursor-pointer` on all card/row links
- [ ] Active state uses `primary-500/600` correctly (not generic green)

### Layout
- [ ] `pb-24 lg:pb-8` on page root `div` (bottom nav clearance)
- [ ] No content hidden under sticky header (pages start below `h-16`)
- [ ] No horizontal scroll on 375px viewport
- [ ] Form pages constrained with `max-w-xl mx-auto` on lg

### Accessibility
- [ ] All inputs have `<label htmlFor>`
- [ ] All icon-only buttons have `aria-label`
- [ ] Payment chips / session chips use `role="group"` + `aria-label`
- [ ] Focus ring visible in keyboard navigation
- [ ] Error messages use `role="alert"`

### Interaction
- [ ] Submit button disabled + spinner during async
- [ ] 10-minute edit window correctly displayed on detail pages
- [ ] Empty states shown when data array is length 0
- [ ] Skeleton shown during data fetch (React Suspense or loading state)

### Data
- [ ] GH₵ formatting via `formatCurrency()` from `src/lib/utils.ts`
- [ ] Dates via `formatDate()` from `src/lib/utils.ts`
- [ ] Derived crates use `deriveStockMetrics()` from `src/lib/utils.ts`
- [ ] Edit window uses `isWithinEditWindow()` from `src/lib/utils.ts`

---

## 10. Design System Retrieval Instructions

When building a specific page in a future phase, reference this document as the single source of truth:

1. Check §3 for the page-specific spec
2. Use component patterns from §2 (copy-paste ready)
3. Check §5 for responsive rules for that layout type
4. Run the pre-delivery checklist from §9 before considering a page complete

---

*Generated: 2026-02-17 | PFMS v2.1 | Design Plan v1.0*
