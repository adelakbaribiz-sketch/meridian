"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { InvestorCard } from "@/components/domain/investor-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import type { FirmType, Investor, Stage } from "@/lib/types";

const FIRM_TYPES: (FirmType | "all")[] = ["all", "Venture Fund", "Angel Syndicate", "Corporate VC", "Accelerator Fund"];
const STAGES: (Stage | "all")[] = ["all", "Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

export function InvestorsExplorer({ investors }: { investors: Investor[] }) {
  const [query, setQuery] = React.useState("");
  const [firmType, setFirmType] = React.useState<string>("all");
  const [stage, setStage] = React.useState<string>("all");

  const filtered = investors.filter((i) => {
    const matchesQuery =
      query.trim() === "" ||
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.tagline.toLowerCase().includes(query.toLowerCase());
    const matchesFirmType = firmType === "all" || i.firmType === firmType;
    const matchesStage = stage === "all" || i.focusStages.includes(stage as Stage);
    return matchesQuery && matchesFirmType && matchesStage;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search investors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={firmType} onChange={(e) => setFirmType(e.target.value)}>
          {FIRM_TYPES.map((f) => (
            <option key={f} value={f}>
              {f === "all" ? "All firm types" : f}
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
          {filtered.length} of {investors.length} investors
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No investors match those filters"
          description="Try clearing the search or switching the firm type and stage filters."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <InvestorCard key={i.id} investor={i} />
          ))}
        </div>
      )}
    </div>
  );
}
