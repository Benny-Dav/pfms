# User Journey Maps: Poultry Farm Management System (PFMS)

| Field | Detail |
|-------|--------|
| **Document Version** | 2.0 |
| **Status** | Draft |
| **Author** | Benedicta Davour |
| **Date** | February 11, 2026 |
| **Persona** | Austin — Poultry Farm Owner (Launch Client) |

---

## Table of Contents

1. [Persona Summary](#1-persona-summary)
2. [Journey 1: First-Time Onboarding](#2-journey-1-first-time-onboarding)
3. [Journey 2: Daily Morning Routine — Record Egg Production](#3-journey-2-daily-morning-routine--record-egg-production)
4. [Journey 3: Selling Eggs to a Customer](#4-journey-3-selling-eggs-to-a-customer)
5. [Journey 4: Recording Farm Expenses](#5-journey-4-recording-farm-expenses)
6. [Journey 5: Checking Profit for the Month](#6-journey-5-checking-profit-for-the-month)
7. [Journey 6: Managing Inventory & Purchases](#7-journey-6-managing-inventory--purchases)
8. [Journey 7: Adding a New Flock](#8-journey-7-adding-a-new-flock)
9. [Journey 8: End-of-Week Review](#9-journey-8-end-of-week-review)
10. [Journey 9: Customer Calls to Ask About Purchase History](#10-journey-9-customer-calls-to-ask-about-purchase-history)
11. [Journey 10: Handling a Failed Sale (Insufficient Stock)](#11-journey-10-handling-a-failed-sale-insufficient-stock)
12. [Journey 11: Inviting a Farm Worker & Managing Roles](#12-journey-11-inviting-a-farm-worker--managing-roles)
13. [Journey 12: Farm Worker Daily Data Entry](#13-journey-12-farm-worker-daily-data-entry)
14. [Journey 13: Exporting a Monthly Report](#14-journey-13-exporting-a-monthly-report)
15. [Journey 14: Responding to a Low Stock Notification](#15-journey-14-responding-to-a-low-stock-notification)
16. [Journey 15: Creating a Custom Role for the Team](#16-journey-15-creating-a-custom-role-for-the-team)
17. [Journey 16: Switching Between Farm Locations](#17-journey-16-switching-between-farm-locations)
18. [Journey 17: Recording Data Offline & Syncing](#18-journey-17-recording-data-offline--syncing)
19. [Journey 18: Setting Up a New Farm Location](#19-journey-18-setting-up-a-new-farm-location)
20. [Cross-Journey Insights & Recommendations](#20-cross-journey-insights--recommendations)

---

## 1. Persona Summary

**Austin — Poultry Farm Owner, Age 42, Accra Region, Ghana**

| Attribute | Detail |
|-----------|--------|
| Tech comfort | Uses WhatsApp daily, basic smartphone skills, no experience with business software |
| Primary device | Android smartphone (mid-range, 4G connection) |
| Secondary device | Shared family laptop (occasional use) |
| Daily context | On the farm from 5:30 AM; hands often dirty; uses phone between tasks |
| Current process | Paper notebook + calculator + memory |
| Core motivation | "I want to know if my farm is actually making money" |
| Biggest fear | Losing records or making mistakes he can't catch |

---

## 2. Journey 1: First-Time Onboarding

**Goal:** Set up the system for the first time and feel confident using it.
**Trigger:** Austin has just been given access to PFMS after it's deployed. He opens the link on his phone.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Awareness** | Receives link via WhatsApp or email | Message/Email | "What is this app? Will it be hard to use?" | Curious but skeptical | Doesn't know what to expect | Welcome message with 1-line value prop: "Track your eggs, sales, and profit in one place" |
| **2. First open** | Taps the link, app loads in browser | Mobile browser | "It's loading... okay it's asking me to log in" | Slightly anxious | Slow load on his network; unfamiliar login screen | Fast-loading login page; pre-filled email if sent via link |
| **3. Login** | Enters email and password | Login screen | "I hope I remember this password" | Neutral | May forget password; typing on small keyboard | Large input fields; show/hide password toggle; "Remember me" checkbox |
| **4. First dashboard** | Sees empty dashboard with zero values | Dashboard | "Everything is zero... where do I start?" | Confused, slightly overwhelmed | Empty state is not helpful; no guidance | First-time user guide: "Let's set up your farm! Step 1: Add your first flock" |
| **5. Add first flock** | Guided to create first flock | Flocks > Create | "Okay I just put the flock name and how many birds I have" | Growing confidence | May not know exact bird count; unsure what "start date" means | Helper text: "Approximate count is fine"; tooltip on start date |
| **6. Record first eggs** | Prompted to record today's egg production | Egg Production > Add | "Oh! I just put today's count. That's easy" | Pleased, relieved | None if form is simple | Pre-select the flock just created; default date to today |
| **7. See stock update** | Dashboard shows egg count and crate number | Dashboard | "It already calculated my crates! This is nice" | Delighted, trust building | None | Celebration moment: "Your first eggs are recorded!" |
| **8. Explore** | Taps around to see other screens | Navigation | "What else can I do?" | Curious | Some screens still empty | Contextual empty states: "No sales yet. Record your first sale when you're ready" |

### Emotional Arc

```
Confident  |                                           *---*
           |                                     *--*
           |                               *---*
Neutral    |    *---*                 *---*
           | *       *---*     *---*
Anxious    |               *--*
           +-------------------------------------------------->
             Open   Login  Dashboard  Add    Record   See     Explore
                                      Flock  Eggs     Stock
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from first open to first flock created | < 3 minutes |
| Time from first open to first eggs recorded | < 5 minutes |
| Drop-off rate during onboarding | < 10% |
| User completes all onboarding steps | > 90% |

### Design Recommendations

1. **Guided onboarding flow** — 3-step wizard: Add Flock -> Record Eggs -> See Dashboard
2. **Empty states with CTAs** — Every empty screen should guide the user to the next action
3. **Celebration moments** — Brief animations/toasts when first milestones are hit
4. **Skip option** — Let user skip the guide and explore freely if they prefer

---

## 3. Journey 2: Daily Morning Routine — Record Egg Production

**Goal:** Record the number of eggs collected this morning from each flock.
**Trigger:** Austin has just finished collecting eggs at ~7:30 AM. He washes his hands and picks up his phone.
**Frequency:** Daily (the most repeated journey in the entire app).

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Open app** | Taps PFMS icon/bookmark on phone | Home screen / Browser | "Let me record today's eggs before I forget" | Routine, purposeful | App takes time to load; needs to log in again | PWA shortcut on home screen; persistent login session |
| **2. Navigate** | Sees dashboard, taps "Record Eggs" quick action | Dashboard | "I see my stock from yesterday. Let me add today's" | Oriented | Quick action not visible enough; has to scroll | Prominent "Record Eggs" button above the fold on dashboard |
| **3. Select flock** | Taps flock dropdown, selects "Batch A" | Egg Production form | "Batch A first, they always lay more" | Focused | If many flocks, dropdown is cumbersome | Default to last-used flock; show flocks in order of frequency |
| **4. Enter count** | Types "287" into eggs field | Egg Production form | "287 eggs this morning from Batch A" | Confident | Keyboard covers the form; can't see total | Numeric keyboard auto-opens; running total visible above keyboard |
| **5. Save** | Taps "Save" | Egg Production form | "Done. Now Batch B" | Satisfied | No confirmation; did it save? | Success toast: "287 eggs recorded for Batch A"; form resets for next entry |
| **6. Repeat** | Selects "Batch B", enters count, saves | Egg Production form | "Okay 195 for Batch B. That's low, I should check on them" | Observant | Has to repeat the full flow for each flock | "Add Another" button that keeps the form open; multi-flock entry mode |
| **7. Verify** | Returns to dashboard, checks updated stock | Dashboard | "482 new eggs today. Total stock looks right" | Reassured | Stock number not immediately visible | Auto-return to dashboard after last entry; highlight updated stock number |

### Emotional Arc

```
Confident  |         *-----------*----*---------*
           |    *--*                              *
Neutral    | *
           +-------------------------------------------------->
             Open  Navigate  Select  Enter  Save  Repeat  Verify
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to record eggs for 1 flock | < 30 seconds |
| Time to record eggs for 3 flocks | < 2 minutes |
| Taps required per flock entry | <= 5 (open form, select flock, enter count, save) |
| Error rate (wrong flock/count) | < 2% |

### Design Recommendations

1. **Quick action on dashboard** — Large, prominent "Record Eggs" button
2. **Smart defaults** — Date defaults to today; flock defaults to most recently used
3. **Numeric keyboard** — Auto-open numeric keyboard when eggs field is focused
4. **Multi-entry mode** — After save, form stays open with next flock pre-selected
5. **Running total** — Show "Today's total: 482 eggs" as entries are added
6. **Session persistence** — Keep user logged in for at least 7 days

---

## 4. Journey 3: Selling Eggs to a Customer

**Goal:** Record a sale of egg crates to a customer and have stock update automatically.
**Trigger:** A regular customer (Kofi) has arrived at the farm to buy 10 crates. Austin needs to record this before handing over the crates.
**Frequency:** 3-7 times per week.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Customer arrives** | Kofi asks for 10 crates | Physical (farm) | "Let me check if I have enough and record this sale" | Attentive | Needs to act fast while customer waits | Quick access to stock count from any screen |
| **2. Check stock** | Glances at dashboard for available crates | Dashboard | "I have 42 crates. Plenty for 10" | Confident | Stock number buried below other info | Stock count always visible in header/nav bar |
| **3. Start sale** | Taps "New Sale" or navigates to Sales | Sales screen | "Let me record this properly" | Purposeful | Extra taps to get to the form | "Record Sale" quick action on dashboard alongside "Record Eggs" |
| **4. Select customer** | Types "Kof" in search, selects "Kofi Mensah" | Sale form - Customer field | "There he is" | Smooth flow | Customer not found if name spelled differently; slow search | Fuzzy search; show recent customers first; "Add New" inline |
| **5. Enter crates** | Types "10" in crates field | Sale form - Crates field | "10 crates at the usual price" | Routine | Needs to remember current price | Pre-fill last price used for this customer; show total updating live |
| **6. Enter price** | Types "45" (GH₵ 45 per crate) | Sale form - Price field | "45 cedis per crate, so 450 total" | Checking math | Has to mentally calculate to verify | Auto-calculate and display: "Total: GH₵ 450.00" in large text |
| **7. Review** | Sees summary: 10 crates, GH₵ 45/crate, GH₵ 450 total | Sale form - Summary | "That looks right. Let me save" | Confident | Summary not prominent enough | Clear summary card before save button |
| **8. Save sale** | Taps "Save" | Sale form | "Done!" | Relieved | Worry: did it actually deduct from stock? | Success: "Sale recorded! Stock updated: 32 crates remaining" |
| **9. Confirm to customer** | Tells Kofi the total | Physical (farm) | "GH₵ 450, Kofi. Thank you!" | Professional, proud | None | Optional: shareable receipt (future feature) |

### Emotional Arc

```
Confident  |                   *----*----*----*----*
           |              *--*                      *
Neutral    |    *----*--*
           | *
Stressed   |
           +-------------------------------------------------->
           Arrival  Check  Start  Select  Enter  Price  Review  Save  Confirm
                    Stock  Sale   Cust.   Crates
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from opening sale form to save | < 45 seconds |
| Taps to complete a sale | <= 7 |
| Stock validation accuracy | 100% (never allow overselling) |
| Customer search time | < 3 seconds |

### Design Recommendations

1. **Pre-fill recent prices** — If Austin sold to Kofi at GH₵ 45 last time, pre-fill it
2. **Live total calculation** — Show total updating as crates and price are entered
3. **Stock validation inline** — Show "32 crates available" next to the crates field; turn red if exceeded
4. **Recent customers** — Show last 5 customers at top of dropdown before search
5. **Post-sale confirmation** — Clear message with remaining stock count

---

## 5. Journey 4: Recording Farm Expenses

**Goal:** Record today's expenses (feed purchase, worker salary payment).
**Trigger:** Austin just paid GH₵ 380 for a bag of feed and GH₵ 200 to a farm worker. He wants to log these before he forgets.
**Frequency:** 2-5 times per week.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Open app** | Opens PFMS on phone | Home screen | "I need to record these payments before I forget the amounts" | Urgency | Time pressure; might forget amounts | Notification reminder: "Record today's expenses?" (future feature) |
| **2. Navigate** | Goes to Expenses screen | Navigation | "Where's expenses... there" | Neutral | Too many menu items; expense buried in nav | Bottom nav icon for Expenses; or quick action on dashboard |
| **3. Add expense** | Taps "Add Expense" | Expenses screen | "Feed first" | Focused | None | Clear "Add" button |
| **4. Select category** | Taps "Feed" from category list | Expense form | "This is for feed" | Quick decision | Category list too long; "Feed" not first | Order categories by frequency; most-used at top |
| **5. Enter details** | Types "Layer mash 1 bag" in description | Expense form | "I should note what I bought" | Diligent | Keyboard covers other fields; description feels optional | Suggest recent descriptions: "Layer mash", "Grower feed" |
| **6. Enter amount** | Types "380" | Expense form | "380 cedis for the feed" | Straightforward | None | Numeric keyboard auto-open |
| **7. Optional flock** | Skips flock link (this feed is for all birds) | Expense form | "This is for everyone, I'll skip this" | Fine | Field presence might confuse: "Do I have to fill this?" | Clear "Optional" label; collapsed by default |
| **8. Save** | Taps "Save" | Expense form | "Good. Now the salary" | Accomplished | Form closes; has to reopen for next expense | "Save & Add Another" button |
| **9. Repeat** | Adds second expense: Salaries, "Kwame week 6", GH₵ 200 | Expense form | "Kwame's pay for this week" | Routine | Repetitive | Auto-advance to next entry |
| **10. Review** | Checks expense list to verify both entries | Expenses list | "380 + 200 = 580 in expenses today. That's a lot" | Reflective | No daily total shown | Show "Today's expenses: GH₵ 580.00" at top of list |

### Emotional Arc

```
Confident  |                        *----*----*---------*----*
           |              *----*--*                            *
Neutral    |    *----*--*
Urgent     | *
           +-------------------------------------------------->
           Open  Navigate  Add  Category  Details  Amount  Save  Repeat  Review
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to record one expense | < 30 seconds |
| Taps to record one expense | <= 6 |
| Category selection time | < 3 seconds |
| User records expenses same day as incurred | > 90% |

### Design Recommendations

1. **"Save & Add Another"** — Primary action for multi-expense sessions
2. **Category frequency sorting** — Show most-used categories first
3. **Description suggestions** — Auto-suggest from previously entered descriptions
4. **Daily expense summary** — Show running total for today at top of expense list
5. **Collapsible optional fields** — Hide flock link by default; expand on tap

---

## 6. Journey 5: Checking Profit for the Month

**Goal:** Understand how much profit the farm made this month.
**Trigger:** It's the last day of the month. Austin wants to know if the farm was profitable.
**Frequency:** Weekly to monthly.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Motivation** | End of month, wants to understand finances | Mental | "Did I make money this month or not?" | Anxious, hopeful | Previously had to add up notebook pages for hours | App should answer this in seconds |
| **2. Open app** | Opens PFMS | Home screen | "Let me check the profit" | Purposeful | None | Dashboard profit snapshot may answer the question immediately |
| **3. Dashboard glance** | Sees profit snapshot on dashboard | Dashboard | "It says GH₵ 2,450 profit this month. Is that right?" | Surprised (positive), slightly skeptical | Wants to verify the number; snapshot lacks detail | "View Details" link on profit card |
| **4. Navigate** | Taps "Profit Summary" or "View Details" | Navigation | "Let me see the breakdown" | Investigative | Extra tap needed | Direct link from dashboard profit card |
| **5. Select range** | Taps "This Month" preset | Profit Summary | "This month... okay" | Quick | Default might show wrong period | Default to current month; show preset buttons prominently |
| **6. See revenue** | Views total sales revenue: GH₵ 8,100 | Profit Summary | "8,100 in sales. That's good" | Pleased | Just a number; wants to understand what drove it | Show: "180 crates sold across 23 sales" |
| **7. See expenses** | Views total expenses: GH₵ 5,650 | Profit Summary | "5,650 in expenses. The feed is killing me" | Concerned | No category breakdown visible | Expense breakdown by category: Feed 60%, Salaries 25%, etc. |
| **8. See profit** | Views net profit: GH₵ 2,450 | Profit Summary | "2,450 profit. Better than last month! But I need to reduce feed costs" | Relieved, analytical | No comparison to previous period | Show "+12% vs last month" comparison |
| **9. Reflect** | Thinks about what to change | Mental | "I should shop around for cheaper feed" | Motivated, empowered | No actionable insights from the app | Future: "Your biggest expense category is Feed (60%)" |

### Emotional Arc

```
Empowered  |                                              *----*
Confident  |                                        *--*
           |                               *---*--*
Curious    |              *-----*----*---*
Anxious    | *---*---*--*
           +-------------------------------------------------->
           Motivation  Open  Dashboard  Navigate  Range  Revenue  Expenses  Profit  Reflect
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from app open to seeing profit number | < 15 seconds (dashboard), < 30 seconds (detail) |
| User understands the profit number without help | > 95% |
| User can explain revenue vs expense split | > 80% |

### Design Recommendations

1. **Dashboard profit card** — Show current month profit prominently; link to detail
2. **Date range presets** — "This Week", "This Month", "Last Month", "Custom"
3. **Revenue context** — Show crates sold count alongside revenue
4. **Expense breakdown** — Pie chart or bar chart by category
5. **Period comparison** — "+/- X% vs previous period" indicator
6. **Large, clear numbers** — Profit number in bold, large font with green/red color

---

## 7. Journey 6: Managing Inventory & Purchases

**Goal:** Record a feed purchase and track that the feed stock is updated.
**Trigger:** Austin just bought 5 bags of layer mash feed. He wants to update the system.
**Frequency:** 1-3 times per week.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Purchase made** | Returns from buying feed | Physical | "Let me add these 5 bags to the system" | Responsible | Might delay and forget | Same-day recording habit |
| **2. Navigate** | Goes to Purchases screen | Navigation | "Purchases... here" | Neutral | Purchases vs Expenses confusion | Clear distinction in nav: "Buy Supplies" vs "Record Expenses" |
| **3. Add purchase** | Taps "Add Purchase" | Purchases screen | "5 bags of layer mash" | Focused | None | |
| **4. Select item** | Selects "Feed - Layer Mash" from inventory items | Purchase form | "Layer mash, yes" | Quick | Item not in list yet; needs to create first | "Add New Item" inline; or pre-populated common farm items |
| **5. Enter quantity** | Types "5" | Purchase form | "5 bags" | Straightforward | Unit not clear (bags? kg?) | Show unit next to field: "Quantity (bags)" |
| **6. Enter cost** | Types "1900" (GH₵ 1,900 total for 5 bags) | Purchase form | "1,900 cedis for all 5" | Noting the expense | Is this per-bag or total? | Label: "Total Cost (GH₵)" with helper: "GH₵ 380/bag" |
| **7. Save** | Taps "Save" | Purchase form | "Should be done" | Expectant | Unclear if inventory updated | "Purchase saved! Feed stock updated: 8 bags on hand" |
| **8. Verify inventory** | Navigates to Inventory screen | Inventory | "Let me check... yes, 8 bags now" | Verified, satisfied | Extra navigation step | Post-save link: "View Inventory" |
| **9. Expense auto-created** | Notices expense was auto-recorded | Expenses list | "Oh, it also added this as a feed expense. Smart!" | Impressed | Might double-enter if not aware of auto-creation | Clear notification: "Expense of GH₵ 1,900 auto-recorded under Feed" |

### Emotional Arc

```
Impressed  |                                                  *
Confident  |                        *----*----*---------*--*
Neutral    |    *----*----*----*--*
           +-------------------------------------------------->
           Purchase  Navigate  Add  Select  Qty  Cost  Save  Verify  Auto-
                                    Item                              Expense
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to record a purchase | < 45 seconds |
| Inventory updates correctly | 100% |
| User understands auto-expense | > 85% on first use |

### Design Recommendations

1. **Pre-populated inventory items** — Common poultry farm items pre-loaded (Feed, Medicine, Crates)
2. **Unit display** — Always show the unit of measure next to quantity
3. **Per-unit calculation** — Show "GH₵ X per bag" helper when total and quantity are entered
4. **Auto-expense notification** — Clear toast/banner explaining the auto-created expense
5. **Post-save navigation** — Offer "View Inventory" and "Add Another Purchase" buttons

---

## 8. Journey 7: Adding a New Flock

**Goal:** Register a new batch of birds that just arrived on the farm.
**Trigger:** Austin has purchased 200 new pullets (young hens). He needs to track them separately from existing flocks.
**Frequency:** 2-4 times per year.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. New birds arrive** | 200 pullets delivered to farm | Physical | "I need to set up a new flock for these birds" | Excited about new flock | None | |
| **2. Navigate** | Goes to Flocks screen | Navigation | "Let me add them to the system" | Purposeful | None | |
| **3. Create flock** | Taps "Add Flock" | Flocks screen | "What should I call this batch?" | Thoughtful | Naming convention not clear | Suggest: "Batch C", "Flock 2026-Feb" based on existing patterns |
| **4. Enter name** | Types "Batch C - Feb 2026" | Flock form | "This will help me tell them apart" | Organized | None | |
| **5. Enter date** | Selects today's date | Flock form | "They arrived today" | Straightforward | Calendar date picker clunky on mobile | Default to today; simple date input |
| **6. Enter bird count** | Types "200" | Flock form | "200 birds exactly" | Precise | Might not know exact count | Helper: "Enter approximate count. You can update later" |
| **7. Add notes** | Types "Pullets from Tema supplier" | Flock form | "Good to note where they came from" | Diligent | Notes field seems optional and unimportant | Placeholder: "e.g., Supplier name, breed, special notes" |
| **8. Save** | Taps "Save" | Flock form | "Now I can start tracking their eggs when they start laying" | Accomplished | No guidance on what to do next | "Flock created! This flock will appear in your egg production form. Pullets usually start laying at 18-20 weeks." |
| **9. View flocks** | Sees all flocks listed | Flocks list | "3 flocks now. Batch A and B are laying, Batch C in 4 months" | Overview, planning | No visual distinction between laying and non-laying flocks | Status indicator: "Laying" vs "Growing" (based on age or production data) |

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to create a new flock | < 1 minute |
| Fields completed correctly on first try | > 95% |

### Design Recommendations

1. **Name suggestions** — Auto-suggest based on existing naming pattern
2. **Contextual help** — Brief helper text on each field
3. **Post-creation guidance** — Explain when the flock will start appearing in production forms
4. **Flock status indicators** — Visual badges showing flock status

---

## 9. Journey 8: End-of-Week Review

**Goal:** Get a comprehensive view of the week's performance across all areas.
**Trigger:** Sunday evening. Austin sits down with a cup of tea to review the week.
**Frequency:** Weekly.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Settle in** | Opens app on phone (or laptop) | Home screen | "Let me see how this week went" | Reflective, relaxed | None | |
| **2. Dashboard** | Reviews dashboard metrics | Dashboard | "Stock at 1,260 eggs... 42 crates. Good level" | Oriented | Dashboard shows current state, not weekly summary | Add "This Week" summary section |
| **3. Production** | Navigates to Egg Production | Egg Production | "How did each flock do this week?" | Analytical | No weekly aggregation; just a long list | Weekly summary: "Batch A: 2,100 eggs, Batch B: 1,350 eggs" |
| **4. Flock comparison** | Compares Batch A vs Batch B production | Egg Production | "Batch B is dropping. Maybe 3 birds are sick" | Concerned, attentive | No comparison view; has to remember numbers | Side-by-side flock comparison for selected period |
| **5. Sales review** | Navigates to Sales History | Sales | "12 sales this week, nice" | Pleased | No weekly total visible | Weekly summary bar: "12 sales, 85 crates, GH₵ 3,825" |
| **6. Expense review** | Navigates to Expenses | Expenses | "What did I spend this week?" | Careful | Category totals not aggregated | Weekly expense breakdown by category |
| **7. Profit check** | Navigates to Profit Summary, selects "This Week" | Profit Summary | "GH₵ 1,200 profit this week. Not bad" | Satisfied | Multiple navigation steps to piece together the full picture | Unified "Weekly Report" screen combining all metrics |
| **8. Plan ahead** | Thinks about next week | Mental | "I need to order feed by Wednesday. And follow up with Adwoa about her order" | Forward-looking | No planning tools in the app | Future: "Low stock alerts", "Reminders" |

### Emotional Arc

```
Satisfied  |                                        *----*----*
Analytical |              *----*----*----*----*---*
Reflective | *----*----*
           +-------------------------------------------------->
           Settle  Dashboard  Production  Compare  Sales  Expenses  Profit  Plan
```

### Design Recommendations

1. **Weekly summary on dashboard** — Collapsible "This Week" section with key metrics
2. **Period aggregation** — Every list view should support "This Week" filter with totals
3. **Flock comparison** — Simple comparison table or chart for production per flock
4. **Future: Weekly report** — Single screen that combines production, sales, expenses, and profit for the week

---

## 10. Journey 9: Customer Calls to Ask About Purchase History

**Goal:** Quickly look up a customer's purchase history while on the phone with them.
**Trigger:** Adwoa (a regular customer) calls and says "How many crates did I buy last month? I think you overcharged me."
**Frequency:** 1-3 times per month.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Phone rings** | Adwoa calls with a question | Phone call | "Let me check the records" | Slight pressure | Customer is waiting; needs to answer quickly | Fast lookup is critical |
| **2. Open app** | Opens PFMS while on the phone | Home screen | "Customers... Adwoa..." | Focused, rushed | Phone and app on same device; switching between call and app | Split screen support; or quick search from any screen |
| **3. Search customer** | Navigates to Customers, searches "Adwoa" | Customers | "There she is" | Relieved | Takes 2+ taps to get to search | Global search accessible from any screen |
| **4. View history** | Opens Adwoa's customer detail page | Customer detail | "Last month... let me check" | Focused | No date filter on customer page; scrolling through all history | Date filter on customer detail page |
| **5. Find answer** | Sees: 4 purchases in January, 25 crates total, GH₵ 1,125 | Customer detail | "25 crates at GH₵ 45 each. That's 1,125" | Confident in data | No period summary; has to add up manually | Monthly summary per customer: "January: 25 crates, GH₵ 1,125" |
| **6. Respond** | Tells Adwoa the details | Phone call | "Adwoa, you bought 25 crates last month at 45 cedis each. Total was 1,125" | Professional, authoritative | None | The system gives him confidence and credibility |
| **7. Resolution** | Adwoa is satisfied | Phone call | "She's happy now. Good that I had the records!" | Proud of the system | None | Trust in the system deepens |

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from app open to finding customer history | < 15 seconds |
| Customer search returns results | < 2 seconds |
| User can answer customer's question on first lookup | > 95% |

### Design Recommendations

1. **Global search** — Search bar accessible from any screen; searches customers, sales, expenses
2. **Customer summary** — Monthly aggregation on customer detail page
3. **Quick customer access** — Recent customers list on dashboard or in nav
4. **Per-transaction detail** — Each sale shows date, crates, price, and total

---

## 11. Journey 10: Handling a Failed Sale (Insufficient Stock)

**Goal:** Attempt to sell more crates than available and handle the situation gracefully.
**Trigger:** A new customer wants to buy 50 crates, but Austin only has 32.
**Frequency:** Occasional (1-2 times per month).

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Customer request** | New customer asks for 50 crates | Physical | "50 crates... that's a lot. Let me check" | Hopeful | None | |
| **2. Check stock** | Looks at dashboard | Dashboard | "I have 32 crates. Not enough for 50" | Disappointed | Realizes before even opening the form | Stock clearly visible on dashboard helps |
| **3. Try sale anyway** | Opens sale form, enters 50 crates | Sale form | "Let me see if maybe I miscounted..." | Hopeful | None | |
| **4. Validation error** | System shows error: "Insufficient stock" | Sale form | "Yeah, only 32 available" | Resigned but appreciates the check | Error message is just "insufficient stock" — not helpful | Show: "You have 32 crates (960 eggs) available. Would you like to sell 32 instead?" |
| **5. Negotiate** | Offers customer 32 crates now, 18 next week | Physical | "I can give you 32 now and the rest next week" | Problem-solving | System doesn't support partial/promised orders | Offer to auto-fill with max available: "Sell 32 crates?" button |
| **6. Adjust sale** | Changes quantity to 32, completes sale | Sale form | "32 crates it is" | Resolving | Has to manually clear and retype | One-tap "Use max available" button pre-fills 32 |
| **7. Save** | Saves the sale for 32 crates | Sale form | "Good, at least I sold what I had" | Partially satisfied | No way to track the promised 18 crates | Future: "Customer orders" or "Promises" feature |
| **8. Mental note** | Remembers to save 18 crates for this customer | Mental | "I need to remember the 18 crates for next week" | Slight worry | System doesn't help with this | Future: notes/reminders feature |

### Emotional Arc

```
Hopeful    | *----*              *
Neutral    |       *----*    *    *----*----*
           |              *
Disappointed|                               *----*
           +-------------------------------------------------->
           Request  Check  Try   Error  Negotiate  Adjust  Save  Note
```

### Design Recommendations

1. **Helpful error messages** — Show available stock in the error; offer to use max
2. **"Use max available" button** — One tap to fill in the maximum sellable quantity
3. **Stock visibility in form** — Always show available crates next to the quantity input
4. **Future: Customer orders** — Allow recording promised/pending orders

---

## 12. Journey 11: Inviting a Farm Worker & Managing Roles

**Goal:** Invite a new farm worker to the system so they can record daily egg production independently.
**Trigger:** Austin has hired Kwame as a full-time farm worker. He wants him to record egg counts each morning instead of himself.
**Frequency:** 2-4 times per year (when staff changes occur).

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Decision** | Decides to give Kwame system access | Mental | "Kwame should enter the egg counts himself so I don't have to rely on paper notes" | Practical, delegating | Worried about giving too much access | Role system should make him feel safe |
| **2. Navigate** | Opens User Management screen | Navigation | "Settings... User Management... here" | Purposeful | Might not know where to find it | Clear "Manage Team" link in sidebar/settings |
| **3. Invite** | Taps "Invite User" | User Management | "I need his email" | Focused | Kwame may not use email regularly | Support phone-based invitation or simple code in future |
| **4. Enter details** | Enters Kwame's name and email | Invite form | "Kwame Asante, his email is..." | Straightforward | Typing email on mobile keyboard | Large input fields; email validation feedback |
| **5. Select role** | Selects "Worker" role from dropdown | Invite form | "Worker — he should only record eggs and inventory, not see the money stuff" | Reassured by role description | Unclear what each role can/can't do | Show permission summary: "Worker can: Record eggs, Log inventory usage. Cannot: View sales, Export data" |
| **6. Send invite** | Taps "Send Invitation" | Invite form | "Done, he should get an email" | Accomplished | Uncertain if email was delivered | Success: "Invitation sent to kwame@email.com. He can log in once he sets his password" |
| **7. Inform Kwame** | Tells Kwame to check his email | Physical (farm) | "Check your email, I've set you up on the system" | Managerial, professional | Kwame may need help setting up | Invitation email with clear step-by-step instructions |
| **8. Verify** | Checks User Management to see Kwame's status | User Management | "Is he active yet? Yes, he logged in" | Satisfied | No visibility into whether invite was accepted | Show status: "Pending", "Active" next to each user |

### Emotional Arc

```
Accomplished|                                    *----*----*
Confident   |                        *----*---*
Purposeful  |    *----*----*----*--*
Practical   | *
            +-------------------------------------------------->
              Decision Navigate Invite Details  Role  Send  Inform Verify
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to invite a new user | < 2 minutes |
| User understands role permissions | > 90% on first use |
| Invitation success rate | > 95% |

### Design Recommendations

1. **Permission summary** — Show a clear breakdown of what each role can and cannot do during role selection
2. **Invite status tracking** — Show Pending/Active status for invited users
3. **Simple invitation flow** — Minimize fields: name, email, role
4. **Role descriptions** — Brief, plain-language explanation next to each role option

---

## 13. Journey 12: Farm Worker Daily Data Entry

**Goal:** Kwame (farm worker) records the morning egg count using his limited-access account.
**Trigger:** Kwame has finished collecting eggs at 7:00 AM. He opens the app on his phone.
**Frequency:** Daily.
**Persona:** Kwame — Farm Worker, Age 28, basic smartphone user, limited app experience.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Open app** | Opens PFMS on phone | Home screen | "Time to record the eggs" | Routine | May forget login details | Persistent session; biometric login in future |
| **2. Dashboard** | Sees simplified dashboard (worker view) | Dashboard | "Just eggs and inventory. Simple" | Comfortable | Full dashboard would be overwhelming | Worker dashboard shows only: egg stock, today's entries, and quick actions |
| **3. Record eggs** | Taps "Record Eggs" | Dashboard quick action | "Batch A first" | Focused | Same form as owner; no confusion | Identical egg entry form regardless of role |
| **4. Select flock** | Selects "Batch A" | Egg Production form | "287 eggs today" | Confident | None | Smart defaults work the same for all roles |
| **5. Save** | Saves the entry | Egg Production form | "Done. Mr. Austin will see this" | Satisfied | Wonders if Austin got notified | Toast: "Saved! 287 eggs recorded for Batch A" |
| **6. Repeat** | Records Batch B eggs | Egg Production form | "Now Batch B... 195" | Routine | None | Multi-entry mode |
| **7. Try restricted action** | Curiously taps on "Sales" in nav | Navigation | "What's in sales?" | Curious | Sees a "You don't have access" message | Friendly message: "Sales is managed by the farm owner. Your recorded eggs help track stock automatically!" |
| **8. Done** | Closes the app | Home screen | "Quick and easy" | Content | None | The less Kwame has to think about, the better |

### Emotional Arc

```
Content     |                   *----*---------*---------*
Comfortable |    *----*----*--*                     *
Routine     | *
            +-------------------------------------------------->
              Open  Dashboard  Record  Select  Save  Repeat  Restricted  Done
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time for worker to record all flocks | < 2 minutes |
| Worker encounters no confusion on restricted features | > 95% |
| Worker records eggs daily without assistance | Within first week |

### Design Recommendations

1. **Simplified worker dashboard** — Only show relevant actions and metrics; hide financial data
2. **Friendly restriction messages** — Don't show error screens; explain why access is limited in encouraging language
3. **Same forms, different access** — Egg production form is identical for all roles; consistency builds confidence
4. **Minimal navigation** — Worker sees fewer menu items (Egg Production, Inventory only)

---

## 14. Journey 13: Exporting a Monthly Report

**Goal:** Export the monthly profit report as a PDF to share with his accountant.
**Trigger:** End of the month. Austin's accountant has asked for a summary of January's farm finances.
**Frequency:** Monthly.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Request** | Accountant asks for January financials | WhatsApp/Phone | "He needs the numbers. Let me pull them from the app" | Responsible | Previously had to photocopy notebook pages | App makes this professional and instant |
| **2. Navigate** | Goes to Profit Summary screen | Navigation | "Profit Summary... January" | Purposeful | None | |
| **3. Select period** | Selects "Last Month" or sets custom dates for January | Profit Summary | "January 1 to 31..." | Focused | Custom date range clunky on mobile | "Last Month" preset auto-selects the right range |
| **4. Review** | Reviews the profit summary on screen | Profit Summary | "Revenue 8,100... Expenses 5,650... Profit 2,450. Looks right" | Verifying | Wants to double-check before sharing | Show expense breakdown and top sales to build confidence |
| **5. Export** | Taps "Export" button, selects "PDF" | Profit Summary | "PDF for the accountant" | Expectant | Button not obvious; export options unclear | Prominent "Export" button with format options (PDF / Excel) |
| **6. Download** | PDF downloads to phone | Browser download | "Got it. Let me check it" | Anticipating | Download notification easy to miss on some phones | Show "Download complete" toast with "Open" and "Share" buttons |
| **7. Review PDF** | Opens the PDF to verify | PDF viewer | "Farm name, January 2026, revenue, expenses, profit. This looks professional!" | Proud, impressed | PDF formatting might be poor on small screen | Well-formatted A4 PDF with clear sections and farm branding |
| **8. Share** | Sends PDF to accountant via WhatsApp | WhatsApp | "Here you go, Mr. Mensah" | Professional, confident | Extra steps to share (open WhatsApp, find contact, attach) | "Share" button that opens system share sheet directly |

### Emotional Arc

```
Proud       |                                              *----*
Confident   |                               *----*----*--*
Purposeful  |    *----*----*----*----*---*
Responsible | *
            +-------------------------------------------------->
              Request Navigate Period  Review Export Download Review  Share
                                                            PDF
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from opening Profit Summary to export complete | < 1 minute |
| Exported PDF is accurate (matches on-screen data) | 100% |
| User can share the PDF without assistance | > 90% |
| PDF renders correctly on mobile and desktop | 100% |

### Design Recommendations

1. **Prominent export button** — Visible on Profit Summary, Sales, and Expenses screens
2. **Format choice** — Simple toggle or dropdown: PDF (for sharing) / Excel (for detailed data)
3. **Post-download actions** — "Open" and "Share" buttons in the success toast
4. **Professional PDF layout** — Farm name header, date range, clear sections, A4 format
5. **Export history** — Future: "Recent Exports" section so he can re-download without regenerating

---

## 15. Journey 14: Responding to a Low Stock Notification

**Goal:** See and act on a low egg stock alert before running out of eggs to sell.
**Trigger:** Egg stock has dropped below the configured threshold (5 crates / 150 eggs). The system generates an alert.
**Frequency:** 1-4 times per month (depending on sales volume).

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Alert triggers** | System detects stock is below 150 eggs (5 crates) | Backend | (System event — no user action) | — | — | Alert should be timely, not delayed |
| **2. Notice alert** | Austin sees a notification badge on the bell icon | Dashboard / Any screen | "There's a notification... what is it?" | Curious, slightly concerned | Badge not noticeable enough | Red badge with count; subtle animation to draw attention |
| **3. Open notifications** | Taps the bell icon to open notification center | Notification dropdown | "Low egg stock... 4 crates remaining" | Alert, attentive | Notification text too vague | Clear message: "Low Egg Stock: Only 4 crates (120 eggs) remaining. Threshold: 5 crates" |
| **4. Understand** | Reads the notification details | Notification detail | "I need to make sure the hens lay more, or I should reduce sales pace" | Planning | No actionable next step from notification | Link to: "View Egg Stock" or "Record Production" |
| **5. Check stock** | Taps through to see current stock detail | Dashboard / Stock view | "120 eggs, 4 full crates. I have a customer coming tomorrow for 5 crates" | Worried | Realization that stock is insufficient for upcoming demand | Show upcoming/recent sales trend alongside stock |
| **6. Take action** | Decides to record today's production early to see updated stock | Egg Production | "Let me record this morning's eggs and see where I stand" | Proactive | Extra steps to get from notification to production form | "Record Eggs" shortcut in the notification |
| **7. Updated stock** | After recording production, stock rises to 6 crates | Dashboard | "Good, back above 5 crates. I can fulfill tomorrow's order" | Relieved | Alert might re-trigger if stock hovers near threshold | Alert only triggers once per crossing; resets when stock recovers |
| **8. Dismiss** | Marks the notification as read | Notification center | "All good now" | Resolved | Notification still showing as if active | Mark as read; clear visual distinction between read/unread |

### Emotional Arc

```
Relieved    |                                              *----*
Proactive   |                               *----*----*
Attentive   |         *----*----*----*---*
Curious     |    *--*
              +-------------------------------------------------->
              Alert  Notice  Open   Understand Check  Action Updated Dismiss
                                                Stock
```

### Key Metrics

| Metric | Target |
|--------|--------|
| Time from alert trigger to user seeing it | < 5 seconds (if app is open) |
| User understands the alert and required action | > 90% |
| Time from seeing alert to taking corrective action | < 5 minutes |
| False positive rate (alerts that don't require action) | < 10% |

### Design Recommendations

1. **Persistent notification badge** — Bell icon with unread count visible from any screen
2. **Actionable notifications** — Each notification includes a relevant action link (View Stock, Record Eggs)
3. **Clear threshold display** — Show current level vs threshold in the notification
4. **One-time trigger** — Alert fires once when threshold is crossed; resets when stock recovers
5. **Configurable thresholds** — Easy access to adjust thresholds in Settings without help

---

## 16. Journey 15: Creating a Custom Role for the Team

**Goal:** Create a custom "Accountant" role so Mr. Mensah can pull financial reports himself without accessing production or sales entry.
**Trigger:** Austin's accountant, Mr. Mensah, needs limited access to view reports and export data. None of the default roles fit exactly.
**Frequency:** 2-4 times per year (when new role needs arise).

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Need identified** | Realizes Mr. Mensah needs his own access level | Mental | "He only needs to see the money side, not enter any data" | Practical | None of the default roles fit | Custom roles solve this exactly |
| **2. Navigate** | Goes to Role Management screen | Navigation | "Settings... Role Management" | Purposeful | Might not know where to find it | Clear "Manage Roles" link in sidebar |
| **3. Create role** | Taps "Create New Role" | Role Management | "I'll call it Accountant" | Focused | None | |
| **4. Name role** | Types "Accountant" and optional description | Role form | "Accountant — for Mr. Mensah to view financials" | Organized | None | Description helps remember purpose later |
| **5. Set permissions** | Selects permissions from checklist | Permission matrix | "Reports: view — yes. Export: access — yes. Sales: view — yes. Expenses: view — yes. That's it." | Deliberate, careful | Too many permissions; unclear what each does | Group permissions by category; plain-language descriptions; visual matrix with checkboxes |
| **6. Review** | Sees summary of what this role can and cannot do | Role summary | "Can: View reports, export data, view sales and expenses. Cannot: Enter data, manage users, change settings. Perfect." | Confident | Summary not shown proactively | Auto-generate "Can do / Cannot do" summary before save |
| **7. Save** | Taps "Save Role" | Role form | "Done. Now I'll assign it to Mr. Mensah" | Accomplished | No prompt to assign the role immediately | Post-save: "Role created! Assign it to a user?" with link to User Management |
| **8. Assign** | Goes to User Management, assigns "Accountant" role to Mr. Mensah | User Management | "There he is. Change role to Accountant" | Satisfied | Extra navigation step | Direct link from role creation to user assignment |

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to create a custom role | < 3 minutes |
| User understands permission model | > 85% on first use |
| Role created correctly on first attempt | > 90% |

### Design Recommendations

1. **Visual permission matrix** — Grouped checkboxes by category (Production, Sales, Reports, etc.)
2. **Plain-language descriptions** — Each permission has a one-line explanation
3. **Auto-generated summary** — "Can do / Cannot do" preview before saving
4. **Post-creation flow** — Prompt to assign the new role to a user immediately

---

## 17. Journey 16: Switching Between Farm Locations

**Goal:** Switch from Farm A (Dodowa) to Farm B (Tema) to check this morning's production.
**Trigger:** Austin manages two farms. He's at Dodowa but wants to check if Kwame recorded eggs at the Tema farm.
**Frequency:** Multiple times daily.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Current context** | Viewing Dodowa Farm dashboard | Dashboard | "Dodowa looks good. What about Tema?" | Curious | None | Farm name always visible in header |
| **2. Open switcher** | Taps the farm name/switcher in header | Farm switcher dropdown | "Let me check Tema" | Quick, purposeful | Switcher not obvious enough | Farm switcher prominent in header with dropdown arrow |
| **3. See options** | Sees list of farms with mini summaries | Farm switcher dropdown | "Tema Farm — 2 entries today, 840 eggs in stock" | Informed before switching | No summary in dropdown; have to switch to see anything | Show mini stats: today's entries count, current stock, last activity |
| **4. Select farm** | Taps "Tema Farm" | Farm switcher | "Switching..." | Expectant | Slow switch; page reloads fully | Instant context switch; only data refreshes, not full page |
| **5. View data** | Dashboard refreshes with Tema data | Dashboard | "Kwame recorded 312 eggs this morning. Good." | Satisfied, reassured | Momentary confusion about which farm is showing | Color-coded farms; farm name prominent in header with visual distinction |
| **6. Switch back** | Taps switcher, selects "Dodowa Farm" | Farm switcher | "Back to my farm" | Routine | None | Last-used farm remembered; quick toggle between two |

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to switch farms | < 3 seconds |
| User always knows which farm they're viewing | > 99% |
| Farm data loads correctly after switch | 100% |

### Design Recommendations

1. **Persistent farm switcher** — Always visible in header; shows current farm name
2. **Mini summaries** — Show key stats per farm in the dropdown (stock, today's entries)
3. **Color coding** — Optional color badge per farm for visual distinction
4. **Instant switch** — Only refresh data, not full page; maintain scroll position where possible
5. **Single-farm simplicity** — If tenant has only one farm, hide the switcher entirely

---

## 18. Journey 17: Recording Data Offline & Syncing

**Goal:** Record egg production while the internet is down, then have it sync automatically when connectivity returns.
**Trigger:** Power outage at the farm has knocked out internet. Kwame needs to record this morning's eggs.
**Frequency:** 1-3 times per week (depending on connectivity).
**Persona:** Kwame — Farm Worker, Age 28.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. Open app** | Opens PFMS on phone | Home screen | "Time to record the eggs" | Routine | App might not load without internet | PWA loads from cache; app shell appears instantly |
| **2. Notice offline** | Sees amber "Offline" indicator in header | Dashboard | "No internet... can I still use this?" | Slightly worried | First-time offline users may think app is broken | Clear but calm indicator: "Offline — you can still record data" |
| **3. Record eggs** | Taps "Record Eggs", fills in form as normal | Egg Production form | "Let me just enter the numbers" | Relieved it works | None if form works identically | Identical form experience online and offline |
| **4. Save locally** | Taps "Save" — entry saves with "Pending sync" badge | Egg Production form | "Saved! But it says pending..." | Slightly uncertain | What does "pending sync" mean? | Toast: "Saved locally! Will sync when internet returns." |
| **5. Continue work** | Records Batch B and Batch C eggs | Egg Production form | "195... 210... done" | Confident, routine | None | Multi-entry mode works the same offline |
| **6. See queue** | Notices "3 pending" badge in header | Header / Sync icon | "3 things waiting to sync. Okay." | Aware, neutral | Might worry data will be lost | "Your data is safely stored on this device" reassurance |
| **7. Internet returns** | Power comes back; phone reconnects | Background | (Automatic — no user action needed) | — | — | Background sync triggers automatically |
| **8. Sync happens** | App shows "Syncing 3 entries..." briefly | Header / Toast | "Oh, it's syncing!" | Pleased | Might miss the sync notification | Subtle animation on sync icon; toast: "All 3 entries synced!" |
| **9. Confirmed** | Badge disappears; dashboard updates with fresh data | Dashboard | "All caught up. Stock numbers updated." | Satisfied, trusting | None | Green checkmark animation on sync completion |

### Key Metrics

| Metric | Target |
|--------|--------|
| Offline form submission time | < 1 second (local save) |
| Time to sync after reconnection | < 30 seconds |
| Data loss in offline scenarios | 0% (zero data loss) |
| User understands offline status | > 90% on first encounter |

### Design Recommendations

1. **Calm offline indicator** — Amber bar or icon, not alarming red; message: "Offline — data entry works normally"
2. **Identical forms** — Online and offline forms look and behave exactly the same
3. **Pending count** — Always show number of unsynced entries in header
4. **Automatic sync** — No user action required; background sync is seamless
5. **Sync confirmation** — Brief, clear toast when sync completes; green checkmark
6. **Data safety message** — Reassure users their offline data is safely stored locally

---

## 19. Journey 18: Setting Up a New Farm Location

**Goal:** Add a second farm location to the organization so production can be tracked separately.
**Trigger:** Austin has just acquired a second farm in Tema. He needs to set it up in the system.
**Frequency:** 1-2 times per year.

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Points | Opportunities |
|-------|--------|-----------|----------|---------|-------------|---------------|
| **1. New farm acquired** | Austin finalizes purchase of Tema farm location | Physical | "I need to set up Tema in the app so we can track everything separately" | Excited, planning | None | |
| **2. Navigate** | Goes to Farm Management screen | Navigation | "Settings... Farm Management" | Purposeful | Might not know where to find it | Clear "Manage Farms" link in sidebar/settings |
| **3. Create farm** | Taps "Add Farm" | Farm Management | "Let me add the Tema farm" | Focused | None | |
| **4. Enter details** | Types "Tema Farm", location "Tema, Greater Accra" | Farm form | "Tema Farm... location..." | Straightforward | Location field feels unnecessary | Optional field with helper: "Helps you and your team identify this farm" |
| **5. Save** | Taps "Save" | Farm form | "Done!" | Accomplished | No guidance on what to do next | Post-save wizard: "Farm created! Let's set it up: 1. Assign team members 2. Add your first flock" |
| **6. Assign team** | Assigns Kwame access to Tema Farm | User Management | "Kwame will manage Tema" | Organized | Extra navigation steps | Inline team assignment in the post-creation wizard |
| **7. Add flock** | Creates first flock at Tema Farm | Flocks > Create (Tema context) | "200 birds at Tema, Batch T1" | Building | Farm context might not be set correctly | Auto-set farm context to the newly created farm |
| **8. Verify** | Opens farm switcher, sees both farms listed | Farm switcher | "Dodowa Farm and Tema Farm. Perfect — I can switch between them!" | Proud, in control | None | Both farms visible in switcher with "New" badge on Tema |
| **9. First data** | Kwame records first egg production at Tema | Egg Production (Tema) | "The system is ready for both farms now" | Satisfied | None | Celebration: "First eggs recorded at Tema Farm!" |

### Key Metrics

| Metric | Target |
|--------|--------|
| Time to create a new farm | < 2 minutes |
| Time from farm creation to first data entry | < 5 minutes |
| User can switch to new farm immediately | 100% |

### Design Recommendations

1. **Simple farm form** — Name (required), location (optional), notes (optional)
2. **Post-creation wizard** — Guided steps: assign team, add flocks, start recording
3. **Auto-context switch** — After creating a farm, automatically switch context to it
4. **"New" badge** — Show a temporary badge on newly created farms in the switcher
5. **Single-farm default** — If this is the user's first farm, skip the setup wizard and go straight to dashboard

---

## 20. Cross-Journey Insights & Recommendations

### Recurring Pain Points Across Journeys

| Pain Point | Affected Journeys | Severity | Recommendation |
|-----------|-------------------|----------|----------------|
| Too many taps to reach common actions | 2, 3, 4, 5 | High | Quick action buttons on dashboard for: Record Eggs, New Sale, Add Expense |
| No running totals or period summaries | 2, 4, 8 | High | Show "Today's total", "This week's total" in all relevant views |
| Multi-entry friction (repeating forms) | 2, 4, 12 | High | "Save & Add Another" button; keep form open between entries |
| Empty states don't guide users | 1, 7 | Medium | Every empty state should include a CTA and brief explanation |
| Stock visibility requires navigation | 3, 10, 14 | Medium | Show stock count persistently in header or nav bar |
| No period comparison | 5, 8 | Medium | Add "vs last period" comparison indicators |
| Role permissions unclear to admin | 11 | Medium | Show permission summary when selecting roles during invitation |
| Restricted feature confusion for workers | 12 | Medium | Friendly restriction messages; simplified navigation for worker role |
| Export discoverability | 13 | Medium | Prominent export button on all report screens with format options |
| Notification actionability | 14 | Medium | Every notification should include a direct action link |
| Farm context confusion | 3, 10, 16, 17 | High | Persistent farm badge in header; confirm farm before data entry; color-coded farm indicators |
| Offline uncertainty | 17 | High | Clear online/offline indicator; pending sync count; queue visibility with retry controls |
| Custom role complexity | 15 | Medium | Start from default templates; plain-language permission descriptions; preview before saving |
| Multi-farm setup overhead | 18 | Medium | Guided farm setup wizard; duplicate settings option from existing farm; progress checklist |

### Design Principles Derived from Journeys

1. **Speed over comprehensiveness** — Austin uses the app between farm tasks. Every interaction should be completable in under 60 seconds.
2. **Smart defaults everywhere** — Today's date, last-used flock, recent customers, previous prices. Reduce typing to minimum.
3. **Derived data is the value** — Stock calculations, customer totals, profit reports. The math is what the app does better than paper.
4. **Trust through transparency** — Show how numbers are calculated. "42 crates = 1,260 eggs (produced) - 0 eggs (sold today)". Build confidence.
5. **Mobile-first, thumb-friendly** — Large tap targets, bottom-anchored primary actions, numeric keyboards for number fields.
6. **Progressive disclosure** — Show the essential fields first; hide optional fields (flock link, notes) behind "More options" toggles.
7. **Context clarity** — Always show which farm is active. Prevent accidental cross-farm data entry with clear farm badges and confirmation prompts.
8. **Connectivity resilience** — Offline should feel seamless. Queue changes transparently, sync automatically, and surface conflicts only when necessary.
9. **Progressive complexity** — Start with sensible defaults (templates, single farm). Let power users customize roles and add farms as they grow.

### Priority Matrix for UX Improvements

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| P0 | Quick actions on dashboard (Record Eggs, New Sale, Add Expense) | Low | High |
| P0 | Smart defaults on all forms (date, flock, customer, price) | Low | High |
| P0 | "Save & Add Another" on all entry forms | Low | High |
| P0 | Stock visibility in sale form and header | Low | High |
| P0 | Helpful validation errors with actionable suggestions | Low | High |
| P1 | Running daily/weekly totals on all list views | Medium | High |
| P1 | Period presets on Profit Summary (This Week, This Month, etc.) | Low | Medium |
| P1 | Customer search with fuzzy matching | Medium | Medium |
| P1 | Expense category frequency sorting | Low | Medium |
| P1 | Post-save navigation (View Inventory, Add Another) | Low | Medium |
| P2 | Guided first-time onboarding wizard | Medium | Medium |
| P2 | Flock comparison view | Medium | Medium |
| P2 | Weekly summary report screen | High | Medium |
| P2 | Global search across all entities | High | Medium |
| P0 | Persistent farm context indicator in header | Low | High |
| P0 | Online/offline status indicator with sync count | Low | High |
| P1 | Guided farm setup wizard with duplicate settings option | Medium | High |
| P1 | Custom role builder with default templates and permission preview | Medium | High |
| P1 | Offline sync queue visibility with retry controls | Medium | Medium |
| P2 | Farm color-coding across the UI | Medium | Medium |

### Success Metrics Summary

| Journey | Primary Metric | Target |
|---------|---------------|--------|
| Onboarding | Time to first egg record | < 5 minutes |
| Record Eggs | Time per flock entry | < 30 seconds |
| Record Sale | Time to complete sale | < 45 seconds |
| Record Expense | Time to record expense | < 30 seconds |
| Check Profit | Time to see profit number | < 15 seconds |
| Record Purchase | Time to record purchase | < 45 seconds |
| Add Flock | Time to create flock | < 1 minute |
| Weekly Review | Time to review all areas | < 5 minutes |
| Customer Lookup | Time to answer customer query | < 15 seconds |
| Failed Sale | Time to recover and complete partial sale | < 30 seconds |
| Invite Worker | Time to invite a new user | < 2 minutes |
| Worker Data Entry | Time for worker to record all flocks | < 2 minutes |
| Export Report | Time from opening report to export complete | < 1 minute |
| Low Stock Alert | Time from seeing alert to taking action | < 5 minutes |
| Create Custom Role | Time to create a role from template | < 3 minutes |
| Switch Farms | Time to switch farm context and confirm | < 10 seconds |
| Offline Data Entry | Time to record entry while offline | < 30 seconds |
| Add New Farm | Time to set up a new farm location | < 5 minutes |
