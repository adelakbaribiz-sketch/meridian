import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Landmark } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StageBadge } from "@/components/domain/badges";
import { MatchCompass } from "@/components/match-compass";
import { RequestIntroButton } from "@/components/domain/request-intro-button";
import { dealsForInvestor, getStartup, investors, startups } from "@/lib/data";
import { topMatchesForInvestor } from "@/lib/matching";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return investors.map((i) => ({ id: i.id }));
}

export default async function InvestorDetailPage(props: PageProps<"/investors/[id]">) {
  const { id } = await props.params;
  const investor = investors.find((i) => i.id === id);
  if (!investor) notFound();

  const matches = topMatchesForInvestor(investor, startups, 6);
  const deals = dealsForInvestor(investor.id);

  return (
    <div>
      <Link href="/investors" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to investors
      </Link>

      <PageHeader
        title={investor.name}
        description={investor.tagline}
        actions={<RequestIntroButton targetName={investor.name} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted leading-relaxed">{investor.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {investor.focusIndustries.map((i) => (
                  <Badge key={i} tone="brand">
                    {i}
                  </Badge>
                ))}
                {investor.focusRegions.map((r) => (
                  <Badge key={r} tone="neutral">
                    {r}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                <Metric label="AUM" value={formatCurrency(investor.aum, { compact: true })} />
                <Metric label="Portfolio" value={String(investor.portfolioCount)} />
                <Metric
                  label="Check size"
                  value={`${formatCurrency(investor.checkSizeMin, { compact: true })}–${formatCurrency(investor.checkSizeMax, { compact: true })}`}
                />
                <Metric label="Active since" value={String(investor.activeSince)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top startup matches</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {matches.map((m) => {
                const s = getStartup(m.startupId)!;
                return (
                  <Link
                    key={m.startupId}
                    href={`/startups/${s.id}`}
                    className="flex items-center gap-4 rounded-lg border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                  >
                    <MatchCompass score={m.score} breakdown={m.breakdown} size={88} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted">{s.stage} · {s.region}</p>
                      <p className="mt-1 text-xs text-muted truncate">{m.reasons[0]}</p>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {deals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Deal room activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deals.map((d) => {
                  const s = getStartup(d.startupId)!;
                  return (
                    <Link
                      key={d.id}
                      href={`/deals/${d.id}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-xs text-muted">{d.nextStep}</p>
                      </div>
                      <StageBadge stage={d.stage} />
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={investor.name} size={48} />
                <div>
                  <p className="font-display font-medium">{investor.name}</p>
                  <Badge tone="info">{investor.firmType}</Badge>
                </div>
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Landmark className="h-3.5 w-3.5 shrink-0" />
                  {investor.focusStages.join(", ")}
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  Active since {investor.activeSince}
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="font-display text-base font-medium tabular-nums">{value}</p>
    </div>
  );
}
