"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("meridian-theme");
    } catch {
      // ignore — private browsing / blocked storage
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    // Deliberately setting state from an effect: the real theme is only
    // knowable client-side (localStorage / matchMedia), so the server-rendered
    // HTML always starts light and corrects itself post-mount. This avoids an
    // SSR/client hydration mismatch, which matters more here than the extra
    // render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("meridian-theme", next ? "dark" : "light");
    } catch {
      // ignore — per-viewer convenience only
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Toggle color theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
