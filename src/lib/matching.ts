import type { Investor, Match, Startup } from "@/lib/types";

/**
 * Deterministic match scoring between a startup and an investor.
 *
 * This is REAL, runnable code — not a mocked number. It is NOT a trained ML
 * embedding model; it is a transparent, explainable scoring function over
 * structured attributes, chosen so the "why" behind every score is inspectable
 * (see `reasons` in the returned Match). A production version could swap the
 * `industryOverlap` term for a learned embedding similarity without changing
 * this function's shape — see docs/ARCHITECTURE.md.
 *
 * Weights mirror the proposal in the source dossier:
 *   score = 0.40 * industry_overlap + 0.25 * stage_match
 *         + 0.20 * geo_match       + 0.15 * signal_score
 */
const WEIGHTS = { industry: 0.4, stage: 0.25, geo: 0.2, signal: 0.15 };

function jaccard<T>(a: T[], b: T[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  if (union === 0) return 0;
  return intersection / union;
}

function stageScore(startup: Startup, investor: Investor): number {
  return investor.focusStages.includes(startup.stage) ? 1 : 0.15;
}

function geoScore(startup: Startup, investor: Investor): number {
  return investor.focusRegions.includes(startup.region) ? 1 : 0.2;
}

/**
 * "Signal" approximates traction quality from momentum + profile completeness
 * + whether the requested check falls inside the investor's stated range.
 * This is a heuristic, not a fitted model.
 */
function signalScore(startup: Startup, investor: Investor): number {
  const growthComponent = Math.min(startup.momGrowth / 15, 1);
  const completenessComponent = startup.profileCompleteness / 100;
  const inRange =
    startup.seeking >= investor.checkSizeMin * 0.4 &&
    startup.seeking <= investor.checkSizeMax * 1.5
      ? 1
      : 0.3;
  return growthComponent * 0.4 + completenessComponent * 0.3 + inRange * 0.3;
}

export function scoreMatch(startup: Startup, investor: Investor): Match {
  const industry = jaccard(startup.industries, investor.focusIndustries);
  const stage = stageScore(startup, investor);
  const geo = geoScore(startup, investor);
  const signal = signalScore(startup, investor);

  const raw =
    industry * WEIGHTS.industry +
    stage * WEIGHTS.stage +
    geo * WEIGHTS.geo +
    signal * WEIGHTS.signal;

  const score = Math.round(raw * 100);

  const reasons: string[] = [];
  if (industry >= 0.34) {
    const shared = startup.industries.filter((i) => investor.focusIndustries.includes(i));
    reasons.push(`Shared focus: ${shared.join(", ")}`);
  }
  if (investor.focusStages.includes(startup.stage)) {
    reasons.push(`Invests at ${startup.stage}`);
  }
  if (investor.focusRegions.includes(startup.region)) {
    reasons.push(`Active in ${startup.region}`);
  }
  if (startup.momGrowth >= 8) {
    reasons.push(`Strong momentum (${startup.momGrowth.toFixed(1)}% MoM ARR growth)`);
  }
  if (
    startup.seeking >= investor.checkSizeMin &&
    startup.seeking <= investor.checkSizeMax
  ) {
    reasons.push("Raise size fits check range");
  }
  if (reasons.length === 0) {
    reasons.push("Limited overlap on stated focus areas");
  }

  return {
    startupId: startup.id,
    investorId: investor.id,
    score,
    breakdown: {
      industry: Math.round(industry * 100),
      stage: Math.round(stage * 100),
      geo: Math.round(geo * 100),
      signal: Math.round(signal * 100),
    },
    reasons,
  };
}

export function topMatchesForStartup(
  startup: Startup,
  investors: Investor[],
  limit = 5,
): Match[] {
  return investors
    .map((investor) => scoreMatch(startup, investor))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function topMatchesForInvestor(
  investor: Investor,
  startups: Startup[],
  limit = 5,
): Match[] {
  return startups
    .map((startup) => scoreMatch(startup, investor))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
