"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bird,
  Egg,
  Users,
  ShoppingCart,
  Package,
  Wallet,
  BarChart3,
  UserCog,
  Settings,
  MapPin,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Operations",
    items: [
      { href: "/dashboard",  label: "Dashboard",      icon: LayoutDashboard },
      { href: "/flocks",     label: "Flocks",         icon: Bird },
      { href: "/production", label: "Egg Production", icon: Egg },
      { href: "/customers",  label: "Customers",      icon: Users },
      { href: "/sales",      label: "Sales",          icon: ShoppingCart },
      { href: "/expenses",   label: "Expenses",       icon: Wallet },
    ],
  },
  {
    label: "Inventory",
    items: [
      { href: "/inventory", label: "Inventory", icon: Package },
      { href: "/purchases", label: "Purchases", icon: ShoppingCart },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: "/profit", label: "Profit Summary", icon: BarChart3 },
    ],
  },
  {
    label: "Admin",
    items: [
      { href: "/farms",    label: "Farm Management", icon: MapPin },
      { href: "/users",    label: "Users & Roles",   icon: UserCog },
      { href: "/settings", label: "Settings",        icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-gray-100 fixed top-0 left-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 flex-shrink-0">
        <div className="w-9 h-9 bg-primary-600 rounded-btn flex items-center justify-center flex-shrink-0">
          <Egg className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">PFMS</p>
          <p className="text-xs text-gray-400 leading-tight">Farm Management</p>
        </div>
      </div>

      {/* Farm switcher */}
      <div className="px-3 py-3 border-b border-gray-100 flex-shrink-0">
        <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-btn bg-surface hover:bg-gray-100 transition-colors text-sm min-h-[44px]">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
            <span className="truncate font-semibold text-gray-700">Select Farm</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {group.label}
            </p>
            {group.items.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href + "/"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn("nav-item", isActive && "nav-item-active")}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={isActive ? 2.5 : 1.75} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-100 p-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary-600">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Farm Owner</p>
            <p className="text-xs text-gray-400 truncate">Admin</p>
          </div>
          <button
            className="p-1.5 rounded-btn text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
