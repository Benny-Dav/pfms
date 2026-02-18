"use client";

import { Bell, MapPin, ChevronDown, Wifi, WifiOff } from "lucide-react";

interface HeaderProps {
  farmName?: string;
  isOnline?: boolean;
  pendingSyncCount?: number;
}

export function Header({ farmName, isOnline = true, pendingSyncCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 h-16 bg-card border-b border-gray-100 flex items-center justify-between px-4 gap-3">
      {/* Left — farm switcher (mobile only; desktop uses sidebar) */}
      <button
        className="flex items-center gap-1.5 min-h-[44px] px-2 py-1 rounded-btn hover:bg-gray-50 transition-colors lg:hidden"
        aria-label="Switch farm"
      >
        <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
          {farmName ?? "Select Farm"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
      </button>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* Right — status + notifications */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Online/offline indicator pill */}
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isOnline
              ? "bg-primary-50 text-primary-600"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {isOnline ? (
            <Wifi className="w-3.5 h-3.5" />
          ) : (
            <WifiOff className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{isOnline ? "Online" : "Offline"}</span>
          {!isOnline && pendingSyncCount > 0 && (
            <span className="font-bold">&nbsp;· {pendingSyncCount} pending</span>
          )}
        </div>

        {/* Notification bell */}
        <button
          className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-btn hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Unread badge — wired in Phase 7 */}
          {/* <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>
      </div>
    </header>
  );
}
