import type { DealStage } from "@/lib/types";
import { cn } from "@/lib/utils";

const STAGE_ORDER: DealStage[] = [
  "Prospect",
  "Contacted",
  "Meeting",
  "Due Diligence",
  "Term Sheet",
  "Closed",
];

export function PipelineFunnel({ deals }: { deals: { stage: DealStage }[] }) {
  const counts = STAGE_ORDER.map((stage) => ({
    stage,
    count: deals.filter((d) => d.stage === stage).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="space-y-2.5">
      {counts.map((c) => (
        <div key={c.stage} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs text-muted">{c.stage}</span>
          <div className="h-6 flex-1 rounded bg-surface-sunken overflow-hidden">
            <div
              className={cn("h-full rounded bg-brand transition-all", c.count === 0 && "opacity-0")}
              style={{ width: `${(c.count / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-xs font-medium tabular-nums">{c.count}</span>
        </div>
      ))}
    </div>
  );
}
