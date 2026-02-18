import type { Metadata } from "next";
import Link from "next/link";
import {
  Egg,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Plus,
  ShoppingCart,
  Wallet,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

// ── Placeholder data — wired to real data in Phase 4, 5 & 6 ──────────────────
const todayProduction = {
  eggs: null as number | null,
  crates: null as number | null,
  session: "—",
};

const stockMetrics = [
  {
    label: "Eggs on Hand",
    value: "—",
    sub: "No production yet",
    icon: Egg,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    label: "Sellable Crates",
    value: "—",
    sub: "Derived (eggs ÷ 30)",
    icon: Package,
    iconColor: "text-primary-600",
    iconBg: "bg-primary-50",
  },
  {
    label: "Empty Crates",
    value: "—",
    sub: "Physical inventory",
    icon: Package,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
];

const financialMetrics = [
  { label: "Gross Revenue",      value: "GH₵ —", icon: DollarSign,  iconColor: "text-primary-600", iconBg: "bg-primary-50" },
  { label: "Cash Collected",     value: "GH₵ —", icon: TrendingUp,  iconColor: "text-blue-600",    iconBg: "bg-blue-50" },
  { label: "Outstanding Credit", value: "GH₵ —", icon: CreditCard,  iconColor: "text-orange-600",  iconBg: "bg-orange-50" },
  { label: "Total Expenses",     value: "GH₵ —", icon: TrendingDown,iconColor: "text-red-600",     iconBg: "bg-red-50" },
  { label: "Operational Profit", value: "GH₵ —", icon: TrendingUp,  iconColor: "text-primary-600", iconBg: "bg-primary-50" },
  { label: "Cash Profit",        value: "GH₵ —", icon: TrendingUp,  iconColor: "text-primary-700", iconBg: "bg-primary-100" },
];

const quickActions = [
  { label: "Record Eggs",  href: "/production/new", icon: Egg },
  { label: "New Sale",     href: "/sales/new",      icon: ShoppingCart },
  { label: "Add Expense",  href: "/expenses/new",   icon: Wallet },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5 pb-24 lg:pb-8">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Select a farm to see live data</p>
        </div>
      </div>

      {/* ── Today's Production — featured card ─────────────────────────────── */}
      <div className="card p-5 bg-primary-600 text-white rounded-card shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-primary-100 uppercase tracking-widest">
              Today&apos;s Production
            </p>
            <p className="text-xs text-primary-200 mt-0.5">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-btn flex items-center justify-center">
            <Egg className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-bold tracking-tight">
              {todayProduction.eggs !== null ? todayProduction.eggs.toLocaleString() : "—"}
            </p>
            <p className="text-sm text-primary-100 mt-0.5">Eggs collected</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight">
              {todayProduction.crates !== null ? todayProduction.crates : "—"}
            </p>
            <p className="text-sm text-primary-100 mt-0.5">Crates</p>
          </div>
        </div>

        <Link
          href="/production/new"
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-white/20 hover:bg-white/30 active:bg-white/30 transition-colors rounded-btn text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          Record Today&apos;s Eggs
        </Link>
      </div>

      {/* ── Quick Actions ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="card flex flex-col items-center justify-center gap-2 py-4 px-2 hover:shadow-md active:scale-95 transition-all"
            >
              <div className="w-10 h-10 bg-primary-50 rounded-btn flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Current Stock ───────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">Current Stock</h2>
          <Link href="/inventory" className="text-xs font-semibold text-primary-600 flex items-center gap-0.5">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stockMetrics.map(({ label, value, sub, icon: Icon, iconColor, iconBg }) => (
            <div key={label} className="metric-card">
              <div className={`w-8 h-8 rounded-btn ${iconBg} flex items-center justify-center mb-2 flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              <p className="metric-label">{label}</p>
              <p className="metric-value">{value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── This Month — Financial Performance ─────────────────────────────── */}
      <section>
        <h2 className="section-title">This Month — Financial</h2>
        <div className="grid grid-cols-2 gap-3">
          {financialMetrics.map(({ label, value, icon: Icon, iconColor, iconBg }) => (
            <div key={label} className="metric-card">
              <div className={`w-8 h-8 rounded-btn ${iconBg} flex items-center justify-center mb-2 flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              <p className="metric-label">{label}</p>
              <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Activity ─────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Egg Production */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-bold text-gray-800">Recent Egg Production</h3>
            <Link href="/production" className="text-xs font-semibold text-primary-600 flex items-center gap-0.5">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="card-body flex flex-col items-center justify-center h-28 gap-2">
            <Egg className="w-8 h-8 text-gray-200" />
            <p className="text-sm text-gray-400 text-center">
              No production data yet.<br />Add your first flock to get started.
            </p>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-bold text-gray-800">Recent Sales</h3>
            <Link href="/sales" className="text-xs font-semibold text-primary-600 flex items-center gap-0.5">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="card-body flex flex-col items-center justify-center h-28 gap-2">
            <ShoppingCart className="w-8 h-8 text-gray-200" />
            <p className="text-sm text-gray-400 text-center">
              No sales recorded yet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
