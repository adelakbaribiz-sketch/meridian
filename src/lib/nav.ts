import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Rocket,
  Landmark,
  Building2,
  Compass,
  CalendarDays,
  HandCoins,
  Settings,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/startups", label: "Startups", icon: Rocket },
  { href: "/investors", label: "Investors", icon: Landmark },
  { href: "/parks", label: "Parks", icon: Building2 },
  { href: "/matches", label: "Matches", icon: Compass },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/deals", label: "Deal Room", icon: HandCoins },
];

export const settingsNavItem: NavItem = { href: "/settings", label: "Settings", icon: Settings };
