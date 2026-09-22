import { describe, expect, it } from "vitest";
import { scoreMatch, topMatchesForInvestor, topMatchesForStartup } from "@/lib/matching";
import { investors } from "@/lib/data/investors";
import { startups } from "@/lib/data/startups";
import type { Investor, Startup } from "@/lib/types";

function makeStartup(overrides: Partial<Startup> = {}): Startup {
  return {
    id: "su-test",
    name: "Test Startup",
    tagline: "",
    description: "",
    industries: ["Climate & Energy"],
    stage: "Seed",
    region: "North America",
    founded: 2022,
    teamSize: 10,
    parkId: null,
    raisedToDate: 1000000,
    seeking: 2000000,
    arr: 200000,
    momGrowth: 10,
    tags: [],
    website: "test.example",
    profileCompleteness: 80,
    ...overrides,
  };
}

function makeInvestor(overrides: Partial<Investor> = {}): Investor {
  return {
    id: "vc-test",
    name: "Test Capital",
    firmType: "Venture Fund",
    tagline: "",
    description: "",
    focusIndustries: ["Climate & Energy"],
    focusStages: ["Seed"],
    focusRegions: ["North America"],
    checkSizeMin: 500000,
    checkSizeMax: 3000000,
    aum: 10000000,
    portfolioCount: 5,
    tags: [],
    activeSince: 2018,
    ...overrides,
  };
}

describe("scoreMatch", () => {
  it("scores a fully-aligned startup/investor pair near the top of the range", () => {
    const m = scoreMatch(makeStartup(), makeInvestor());
    expect(m.score).toBeGreaterThanOrEqual(80);
    expect(m.score).toBeLessThanOrEqual(100);
  });

  it("scores a fully-misaligned pair much lower than a fully-aligned pair", () => {
    const aligned = scoreMatch(makeStartup(), makeInvestor());
    const misaligned = scoreMatch(
      makeStartup({ industries: ["Fintech"], stage: "Growth", region: "Southeast Asia" }),
      makeInvestor(),
    );
    expect(misaligned.score).toBeLessThan(aligned.score);
  });

  it("always returns a score within [0, 100]", () => {
    for (const s of startups) {
      for (const i of investors) {
        const m = scoreMatch(s, i);
        expect(m.score).toBeGreaterThanOrEqual(0);
        expect(m.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("breakdown components are each within [0, 100]", () => {
    const m = scoreMatch(makeStartup(), makeInvestor());
    for (const value of Object.values(m.breakdown)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it("always returns at least one human-readable reason", () => {
    const m = scoreMatch(
      makeStartup({ industries: ["Fintech"], stage: "Growth", region: "Southeast Asia", momGrowth: 0 }),
      makeInvestor(),
    );
    expect(m.reasons.length).toBeGreaterThan(0);
  });

  it("rewards stage fit independently of industry fit", () => {
    const wrongStage = scoreMatch(makeStartup({ stage: "Growth" }), makeInvestor());
    const rightStage = scoreMatch(makeStartup({ stage: "Seed" }), makeInvestor());
    expect(rightStage.breakdown.stage).toBeGreaterThan(wrongStage.breakdown.stage);
  });
});

describe("topMatchesForStartup / topMatchesForInvestor", () => {
  it("returns results sorted by descending score", () => {
    const results = topMatchesForStartup(startups[0], investors, investors.length);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it("respects the limit parameter", () => {
    const results = topMatchesForInvestor(investors[0], startups, 3);
    expect(results).toHaveLength(3);
  });
});
