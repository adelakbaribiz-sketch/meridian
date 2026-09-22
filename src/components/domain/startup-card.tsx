import Link from "next/link";
import { Building2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StartupStageBadge } from "@/components/domain/badges";
import { getPark } from "@/lib/data";
import type { Startup } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function StartupCard({ startup }: { startup: Startup }) {
  const park = startup.parkId ? getPark(startup.parkId) : null;
  return (
    <Link href={`/startups/${startup.id}`}>
      <Card className="h-full p-5 transition-colors hover:border-brand hover:bg-brand-soft/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={startup.name} size={40} />
            <div className="min-w-0">
              <p className="font-display font-medium truncate">{startup.name}</p>
              <p className="text-xs text-muted truncate">{startup.tagline}</p>
            </div>
          </div>
          <StartupStageBadge stage={startup.stage} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {startup.industries.map((i) => (
            <Badge key={i} tone="neutral">
              {i}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span className="tabular-nums">ARR {formatCurrency(startup.arr, { compact: true })}</span>
          <span className="tabular-nums">Seeking {formatCurrency(startup.seeking, { compact: true })}</span>
        </div>
        {park && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted border-t border-border pt-3">
            <Building2 className="h-3.5 w-3.5" />
            {park.name}
          </div>
        )}
      </Card>
    </Link>
  );
}
