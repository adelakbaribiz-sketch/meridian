"use client";

import * as React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { demoUsers, roleLabels } from "@/lib/data/users";
import { setDemoSession, clearDemoSession } from "@/lib/session";
import type { DemoUser } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RoleSwitcher({ user }: { user: DemoUser }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-md border border-transparent px-2 py-1.5 hover:border-border hover:bg-surface-sunken"
      >
        <Avatar name={user.name} size={32} />
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted">{roleLabels[user.role]}</p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-surface shadow-lg py-2 z-40 animate-fade-in">
          <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            Switch demo persona
          </p>
          {demoUsers.map((u) => (
            <form key={u.id} action={setDemoSession.bind(null, u.id)}>
              <button
                type="submit"
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-surface-sunken",
                  u.id === user.id && "bg-brand-soft/60",
                )}
              >
                <Avatar name={u.name} size={28} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium truncate">{u.name}</span>
                  <span className="block text-xs text-muted truncate">
                    {roleLabels[u.role]} · {u.orgName}
                  </span>
                </span>
              </button>
            </form>
          ))}
          <div className="mt-1 border-t border-border pt-1">
            <form action={clearDemoSession}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-muted hover:bg-surface-sunken hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
