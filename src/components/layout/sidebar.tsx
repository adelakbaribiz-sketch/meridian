"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import { navItems, settingsNavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
          <Compass className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <span className="font-display text-lg font-medium tracking-tight">Meridian</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-soft text-brand-strong"
                  : "text-muted hover:bg-surface-sunken hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.85} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-border">
        <Link
          href={settingsNavItem.href}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith("/settings")
              ? "bg-brand-soft text-brand-strong"
              : "text-muted hover:bg-surface-sunken hover:text-foreground",
          )}
        >
          <settingsNavItem.icon className="h-4 w-4" strokeWidth={1.85} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
