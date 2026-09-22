import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Globe, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StartupStageBadge, StageBadge } from "@/components/domain/badges";
import { MatchCompass } from "@/components/match-compass";
import { RequestIntroButton } from "@/components/domain/request-intro-button";
import { dealsForStartup, getPark, getInvestor, startups, investors } from "@/lib/data";
import { topMatchesForStartup } from "@/lib/matching";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return startups.map((s) => ({ id: s.id }));
}

export default async function StartupDetailPage(props: PageProps<"/startups/[id]">) {
  const { id } = await props.params;
  const startup = startups.find((s) => s.id === id);
  if (!startup) notFound();

  const park = startup.parkId ? getPark(startup.parkId) : null;
  const matches = topMatchesForStartup(startup, investors, 6);
  const deals = dealsForStartup(startup.id);

  return (
    <div>
      <Link href="/startups" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to startups
      </Link>

      <PageHeader
        title={startup.name}
        description={startup.tagline}
        actions={<RequestIntroButton targetName={startup.name} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted leading-relaxed">{startup.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {startup.tags.map((t) => (
                  <Badge key={t} tone="neutral">
                    #{t}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                <Metric label="Founded" value={String(startup.founded)} />
                <Metric label="Team size" value={String(startup.teamSize)} />
                <Metric label="ARR" value={formatCurrency(startup.arr, { compact: true })} />
                <Metric label="MoM growth" value={`${startup.momGrowth.toFixed(1)}%`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top investor matches</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {matches.map((m) => {
                const inv = getInvestor(m.investorId)!;
                return (
                  <Link
                    key={m.investorId}
                    href={`/investors/${inv.id}`}
                    className="flex items-center gap-4 rounded-lg border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                  >
                    <MatchCompass score={m.score} breakdown={m.breakdown} size={88} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{inv.name}</p>
                      <p className="text-xs text-muted">{inv.firmType}</p>
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
                  const inv = getInvestor(d.investorId)!;
                  return (
                    <Link
                      key={d.id}
                      href={`/deals/${d.id}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{inv.name}</p>
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
                <Avatar name={startup.name} size={48} />
                <div>
                  <p className="font-display font-medium">{startup.name}</p>
                  <StartupStageBadge stage={startup.stage} />
                </div>
              </div>
              <dl className="space-y-2.5 text-sm">
                <Row icon={MapPin} label={startup.region} />
                <Row icon={Calendar} label={`Founded ${startup.founded}`} />
                <Row icon={Users} label={`${startup.teamSize} people`} />
                <Row icon={Globe} label={startup.website} />
              </dl>
              {park && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted mb-1">Resident of</p>
                  <Link href={`/parks/${park.id}`} className="text-sm font-medium text-brand hover:underline">
                    {park.name}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fundraise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Raised to date</span>
                <span className="font-medium tabular-nums">{formatCurrency(startup.raisedToDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Currently seeking</span>
                <span className="font-medium tabular-nums">{formatCurrency(startup.seeking)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Profile completeness</span>
                <span className="font-medium tabular-nums">{startup.profileCompleteness}%</span>
              </div>
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

function Row({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}
