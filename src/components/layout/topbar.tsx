import { Search } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { RoleSwitcher } from "@/components/layout/role-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { DemoUser } from "@/lib/types";

export function Topbar({ user }: { user: DemoUser }) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-border bg-surface px-4 lg:px-6">
      <MobileNav />
      <div className="relative hidden md:block w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          placeholder="Search startups, investors, events…"
          className="h-9 w-full rounded-md border border-border-strong bg-surface-sunken pl-9 pr-3 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <RoleSwitcher user={user} />
      </div>
    </header>
  );
}
