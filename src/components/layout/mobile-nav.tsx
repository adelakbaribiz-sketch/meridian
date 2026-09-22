"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";
import { navItems, settingsNavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-surface-sunken"
        aria-label="Open navigation"
      >
        <Menu className="h-4.5 w-4.5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative z-10 flex h-full w-72 flex-col bg-surface border-r border-border animate-fade-in">
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
                  <Compass className="h-4 w-4" strokeWidth={2.25} />
                </div>
                <span className="font-display text-lg font-medium">Meridian</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close navigation">
                <X className="h-5 w-5 text-muted" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
              {[...navItems, settingsNavItem].map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium",
                      active ? "bg-brand-soft text-brand-strong" : "text-muted hover:bg-surface-sunken hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.85} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
