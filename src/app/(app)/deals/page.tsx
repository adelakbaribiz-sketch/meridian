import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { deals, getInvestor, getStartup } from "@/lib/data";
import type { DealStage } from "@/lib/types";
import { formatCurrency, formatRelativeDays } from "@/lib/utils";

export const metadata = { title: "Deal Room" };

const COLUMNS: DealStage[] = ["Prospect", "Contacted", "Meeting", "Due Diligence", "Term Sheet", "Closed"];

export default function DealsPage() {
  const passed = deals.filter((d) => d.stage === "Passed");

  return (
    <div>
      <PageHeader
        title="Deal Room"
        description="Pipeline across every active introduction. Documents and NDA status live on each deal."
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const total = stageDeals.reduce((sum, d) => sum + d.amount, 0);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-sm font-medium">{stage}</p>
                <span className="text-xs text-muted tabular-nums">{stageDeals.length}</span>
              </div>
              <p className="mb-2 px-1 text-xs text-muted tabular-nums">{formatCurrency(total, { compact: true })}</p>
              <div className="space-y-2.5">
                {stageDeals.map((d) => {
                  const s = getStartup(d.startupId)!;
                  const inv = getInvestor(d.investorId)!;
                  return (
                    <Link key={d.id} href={`/deals/${d.id}`}>
                      <Card className="p-3.5 transition-colors hover:border-brand hover:bg-brand-soft/20">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-xs text-muted truncate">{inv.name}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="tabular-nums font-medium">{formatCurrency(d.amount, { compact: true })}</span>
                          <span className="text-muted">{formatRelativeDays(d.lastActivity)}</span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
                {stageDeals.length === 0 && (
                  <div className="rounded-md border border-dashed border-border-strong p-4 text-center text-xs text-muted">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {passed.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-medium">Passed</p>
            <Badge tone="danger">{passed.length}</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {passed.map((d) => {
              const s = getStartup(d.startupId)!;
              const inv = getInvestor(d.investorId)!;
              return (
                <Link key={d.id} href={`/deals/${d.id}`}>
                  <Card className="p-3.5 opacity-70 hover:opacity-100 transition-opacity">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-xs text-muted truncate">{inv.name} · {d.nextStep}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
