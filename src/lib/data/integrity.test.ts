import { describe, expect, it } from "vitest";
import { deals, events, investors, parks, startups } from "@/lib/data";

const startupIds = new Set(startups.map((s) => s.id));
const investorIds = new Set(investors.map((i) => i.id));
const parkIds = new Set(parks.map((p) => p.id));

/**
 * The demo fixtures reference each other by hand-written id strings (a deal's
 * startupId, an event's participant ids, a startup's parkId). Nothing enforces
 * those references at the type level, so a typo silently breaks a page at
 * request time (`getStartup(id)!` returning null). This test is the guard
 * rail — it is the one test in this repo that would have caught real
 * authoring bugs during development.
 */
describe("demo data referential integrity", () => {
  it("every deal references a real startup and investor", () => {
    for (const deal of deals) {
      expect(startupIds.has(deal.startupId), `deal ${deal.id} -> startup ${deal.startupId}`).toBe(true);
      expect(investorIds.has(deal.investorId), `deal ${deal.id} -> investor ${deal.investorId}`).toBe(true);
    }
  });

  it("every startup's parkId, if set, references a real park", () => {
    for (const s of startups) {
      if (s.parkId !== null) {
        expect(parkIds.has(s.parkId), `startup ${s.id} -> park ${s.parkId}`).toBe(true);
      }
    }
  });

  it("every event references real parks and participants", () => {
    for (const e of events) {
      if (e.parkId !== null) {
        expect(parkIds.has(e.parkId), `event ${e.id} -> park ${e.parkId}`).toBe(true);
      }
      for (const sid of e.participantStartupIds) {
        expect(startupIds.has(sid), `event ${e.id} -> startup ${sid}`).toBe(true);
      }
      for (const iid of e.participantInvestorIds) {
        expect(investorIds.has(iid), `event ${e.id} -> investor ${iid}`).toBe(true);
      }
    }
  });

  it("has no duplicate ids within any single collection", () => {
    for (const [name, collection] of [
      ["startups", startups],
      ["investors", investors],
      ["parks", parks],
      ["events", events],
      ["deals", deals],
    ] as const) {
      const ids = collection.map((item) => item.id);
      expect(new Set(ids).size, `duplicate id within ${name}`).toBe(ids.length);
    }
  });

  it("registered never exceeds capacity for any event", () => {
    for (const e of events) {
      expect(e.registered, `event ${e.id}`).toBeLessThanOrEqual(e.capacity);
    }
  });
});
