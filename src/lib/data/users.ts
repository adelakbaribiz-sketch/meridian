import type { DemoUser, Role } from "@/lib/types";

// DEMO DATA — fictional demo personas. Selecting one on the login screen sets a
// signed-looking but non-authenticating demo cookie; see src/lib/session.ts.
export const demoUsers: DemoUser[] = [
  {
    id: "user-park",
    name: "Priya Andersson",
    role: "park_manager",
    orgName: "Harborview Innovation Quarter",
    title: "Ecosystem Director",
  },
  {
    id: "user-vc",
    name: "Marcus Feld",
    role: "vc_manager",
    orgName: "Northgate Capital Partners",
    title: "Principal",
  },
  {
    id: "user-founder",
    name: "Iman Osei",
    role: "startup_founder",
    orgName: "Glacius Thermal",
    title: "Co-founder & CEO",
  },
  {
    id: "user-organizer",
    name: "Lena Kowalski",
    role: "event_organizer",
    orgName: "Meridiana Digital Park",
    title: "Head of Programming",
  },
  {
    id: "user-admin",
    name: "Sam Whitfield",
    role: "admin",
    orgName: "Meridian",
    title: "Platform Administrator",
  },
];

export const roleLabels: Record<Role, string> = {
  park_manager: "Park Manager",
  vc_manager: "VC Manager",
  startup_founder: "Startup Founder",
  event_organizer: "Event Organizer",
  admin: "Admin",
};

export const roleDescriptions: Record<Role, string> = {
  park_manager: "Oversees resident startups, events, and park-level reporting.",
  vc_manager: "Manages deal flow, AI-suggested matches, and portfolio activity.",
  startup_founder: "Manages a fundraising profile, matches, and event registrations.",
  event_organizer: "Creates and runs events, manages registration and matching.",
  admin: "Manages tenants, data sources, and platform-wide settings.",
};
