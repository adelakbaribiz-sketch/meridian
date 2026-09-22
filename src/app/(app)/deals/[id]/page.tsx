import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ShieldCheck, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StageBadge } from "@/components/domain/badges";
import { deals, getInvestor, getStartup } from "@/lib/data";
import type { DealDocument } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }));
}

const docStatusTone: Record<DealDocument["status"], "neutral" | "brand" | "success" | "warning"> = {
  pending: "warning",
  shared: "brand",
  signed: "success",
  expired: "neutral",
};

export default async function DealDetailPage(props: PageProps<"/deals/[id]">) {
  const { id } = await props.params;
  const deal = deals.find((d) => d.id === id);
  if (!deal) notFound();

  const startup = getStartup(deal.startupId)!;
  const investor = getInvestor(deal.investorId)!;

  return (
    <div>
      <Link href="/deals" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to deal room
      </Link>

      <PageHeader
        title={`${startup.name} × ${investor.name}`}
        description={`Opened ${formatDate(deal.createdAt)} · Last activity ${formatDate(deal.lastActivity)}`}
        actions={<StageBadge stage={deal.stage} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {deal.documents.length === 0 ? (
                <EmptyState
                  className="m-5"
                  title="No documents shared yet"
                  description="Documents appear here once either side shares them in the deal room."
                />
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted">
                      <th className="px-5 py-2.5 font-medium">Document</th>
                      <th className="px-5 py-2.5 font-medium">Type</th>
                      <th className="px-5 py-2.5 font-medium">Status</th>
                      <th className="px-5 py-2.5 font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deal.documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5 text-muted shrink-0" />
                            {doc.name}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted">{doc.type}</td>
                        <td className="px-5 py-3">
                          <Badge tone={docStatusTone[doc.status]}>{doc.status}</Badge>
                        </td>
                        <td className="px-5 py-3 text-muted">{formatDate(doc.updatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next step</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{deal.nextStep}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-5 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar name={startup.name} size={36} />
                <Link href={`/startups/${startup.id}`} className="font-medium hover:text-brand">
                  {startup.name}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name={investor.name} size={36} />
                <Link href={`/investors/${investor.id}`} className="font-medium hover:text-brand">
                  {investor.name}
                </Link>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-muted">Deal size</span>
                <span className="font-medium tabular-nums">{formatCurrency(deal.amount)}</span>
              </div>
              <div className="flex items-center gap-2">
                {deal.ndaSigned ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-success" />
                    <span className="text-success">NDA signed</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-4 w-4 text-warning" />
                    <span className="text-warning">NDA not yet signed</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
