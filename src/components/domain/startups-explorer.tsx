"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { StartupCard } from "@/components/domain/startup-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import type { Industry, Stage, Startup } from "@/lib/types";

const INDUSTRIES: (Industry | "all")[] = [
  "all",
  "Climate & Energy",
  "Health & Biotech",
  "Fintech",
  "AI & Data Infrastructure",
  "Advanced Manufacturing",
  "Agri & Foodtech",
  "Mobility & Logistics",
  "Cybersecurity",
];

const STAGES: (Stage | "all")[] = ["all", "Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

export function StartupsExplorer({ startups }: { startups: Startup[] }) {
  const [query, setQuery] = React.useState("");
  const [industry, setIndustry] = React.useState<string>("all");
  const [stage, setStage] = React.useState<string>("all");

  const filtered = startups.filter((s) => {
    const matchesQuery =
      query.trim() === "" ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.tagline.toLowerCase().includes(query.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesIndustry = industry === "all" || s.industries.includes(industry as Industry);
    const matchesStage = stage === "all" || s.stage === stage;
    return matchesQuery && matchesIndustry && matchesStage;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search startups…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4" />
        </div>
        <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i === "all" ? "All industries" : i}
            </option>
          ))}
        </Select>
        <Select value={stage} onChange={(e) => setStage(e.target.value)}>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All stages" : s}
            </option>
          ))}
        </Select>
        <p className="text-xs text-muted sm:ml-auto shrink-0">
          {filtered.length} of {startups.length} startups
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No startups match those filters"
          description="Try clearing the search or switching the industry and stage filters."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <StartupCard key={s.id} startup={s} />
          ))}
        </div>
      )}
    </div>
  );
}
