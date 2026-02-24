"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { mockUser, mockNotifications } from "@/lib/mock-data";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Properties",
    href: "/properties",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: "Tenants",
    href: "/tenants",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: "Payments",
    href: "/payments",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const bottomNav = [
  {
    name: "Settings",
    href: "/settings",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ activePath, onNavigate, collapsed = false, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-surface-200 bg-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-surface-100 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm flex-shrink-0">
          PM
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-gray-900 truncate">
            PropManage
          </span>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "ml-auto rounded-md p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-500 transition-colors",
            collapsed && "ml-0"
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.href)}
            className={cn(
              activePath === item.href ? "nav-item-active" : "nav-item",
              "w-full",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? item.name : undefined}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-surface-100 p-3 space-y-1">
        {bottomNav.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.href)}
            className={cn(
              activePath === item.href ? "nav-item-active" : "nav-item",
              "w-full",
              collapsed && "justify-center px-2"
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </button>
        ))}
        <div className={cn("flex items-center gap-3 rounded-lg p-2.5", collapsed && "justify-center")}>
          <Avatar name={mockUser.name} size="sm" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{mockUser.name}</p>
              <p className="text-xs text-surface-400 truncate">{mockUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  sidebarCollapsed?: boolean;
}

export function Header({ title, subtitle, actions, sidebarCollapsed }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 backdrop-blur-md px-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-surface-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-surface-400 hover:bg-surface-100 hover:text-surface-500 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white min-w-[18px] h-[18px]">
                {unread}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 rounded-xl bg-white border border-surface-200 shadow-modal animate-scale-in overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100">
                <span className="text-sm font-semibold text-gray-900">Notifications</span>
                <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "px-4 py-3 border-b border-surface-50 hover:bg-surface-50 cursor-pointer transition-colors",
                      !notif.read && "bg-brand-50/30"
                    )}
                  >
                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [activePath, setActivePath] = useState("/dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar
        activePath={activePath}
        onNavigate={setActivePath}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <main
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}
