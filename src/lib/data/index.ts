// Thin repository layer over the demo fixtures. Every function here reads
// static, in-memory DEMO DATA (see the files in this folder) — there is no
// database in this prototype. Swapping these for real queries (Prisma, a
// REST client, etc.) later should not require changing any calling code's
// shape; see docs/ARCHITECTURE.md.
import { deals } from "@/lib/data/deals";
import { events } from "@/lib/data/events";
import { investors } from "@/lib/data/investors";
import { parks } from "@/lib/data/parks";
import { startups } from "@/lib/data/startups";
import { demoUsers } from "@/lib/data/users";

export { deals, events, investors, parks, startups, demoUsers };

export function getStartup(id: string) {
  return startups.find((s) => s.id === id) ?? null;
}

export function getInvestor(id: string) {
  return investors.find((i) => i.id === id) ?? null;
}

export function getPark(id: string) {
  return parks.find((p) => p.id === id) ?? null;
}

export function getEvent(id: string) {
  return events.find((e) => e.id === id) ?? null;
}

export function getDeal(id: string) {
  return deals.find((d) => d.id === id) ?? null;
}

export function dealsForStartup(startupId: string) {
  return deals.filter((d) => d.startupId === startupId);
}

export function dealsForInvestor(investorId: string) {
  return deals.filter((d) => d.investorId === investorId);
}

export function eventsForPark(parkId: string) {
  return events.filter((e) => e.parkId === parkId);
}

export function startupsForPark(parkId: string) {
  return startups.filter((s) => s.parkId === parkId);
}
