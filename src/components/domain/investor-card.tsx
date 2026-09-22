import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Investor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function InvestorCard({ investor }: { investor: Investor }) {
  return (
    <Link href={`/investors/${investor.id}`}>
      <Card className="h-full p-5 transition-colors hover:border-brand hover:bg-brand-soft/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={investor.name} size={40} />
            <div className="min-w-0">
              <p className="font-display font-medium truncate">{investor.name}</p>
              <p className="text-xs text-muted truncate">{investor.tagline}</p>
            </div>
          </div>
          <Badge tone="info">{investor.firmType}</Badge>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {investor.focusIndustries.map((i) => (
            <Badge key={i} tone="neutral">
              {i}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span>{investor.focusStages.join(", ")}</span>
          <span className="tabular-nums">
            {formatCurrency(investor.checkSizeMin, { compact: true })}–
            {formatCurrency(investor.checkSizeMax, { compact: true })}
          </span>
        </div>
      </Card>
    </Link>
  );
}
