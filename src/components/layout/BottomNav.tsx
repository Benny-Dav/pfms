"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Egg,
  ShoppingCart,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  { href: "/dashboard",  label: "Home",       icon: LayoutDashboard },
  { href: "/production", label: "Production", icon: Egg },
  { href: "/sales",      label: "Sales",      icon: ShoppingCart },
  { href: "/more",       label: "More",       icon: MoreHorizontal },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-gray-100 safe-area-bottom">
      <div className="grid grid-cols-4 h-16">
        {bottomNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
                isActive ? "text-primary-500" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary-500" : "text-gray-400"
                )}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
