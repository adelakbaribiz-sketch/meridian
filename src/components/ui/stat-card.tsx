import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-muted" strokeWidth={1.75} />}
      </div>
      <p className="font-display text-2xl font-medium mt-2 tabular-nums">{value}</p>
      {typeof delta === "number" && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-success" : "text-danger",
          )}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span className="tabular-nums">{Math.abs(delta)}%</span>
          {deltaLabel && <span className="text-muted font-normal">{deltaLabel}</span>}
        </div>
      )}
    </Card>
  );
}
