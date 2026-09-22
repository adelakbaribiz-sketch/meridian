import Link from "next/link";
import { ArrowRight, Handshake, Rocket, TrendingUp, Users, CalendarDays, Building2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StageBadge, EventStatusBadge } from "@/components/domain/badges";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { PipelineFunnel } from "@/components/charts/pipeline-funnel";
import { MatchCompass } from "@/components/match-compass";
import {
  deals,
  dealsForInvestor,
  dealsForStartup,
  events,
  eventsForPark,
  getInvestor,
  getStartup,
  investors,
  parks,
  startups,
  startupsForPark,
} from "@/lib/data";
import { roleLabels } from "@/lib/data/users";
import { topMatchesForInvestor, topMatchesForStartup } from "@/lib/matching";
import { requireDemoUser } from "@/lib/session";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireDemoUser();

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description={`${roleLabels[user.role]} · ${user.orgName}`}
      />
      {user.role === "park_manager" && <ParkManagerDashboard orgName={user.orgName} />}
      {user.role === "vc_manager" && <VcManagerDashboard orgName={user.orgName} />}
      {user.role === "startup_founder" && <StartupFounderDashboard orgName={user.orgName} />}
      {user.role === "event_organizer" && <EventOrganizerDashboard orgName={user.orgName} />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
}

function ParkManagerDashboard({ orgName }: { orgName: string }) {
  const park = parks.find((p) => p.name === orgName) ?? parks[0];
  const residents = startupsForPark(park.id);
  const parkEvents = eventsForPark(park.id);
  const upcoming = parkEvents.filter((e) => e.status === "upcoming" || e.status === "open");
  const avgCompleteness = Math.round(
    residents.reduce((sum, s) => sum + s.profileCompleteness, 0) / (residents.length || 1),
  );
  const industryCounts = Object.entries(
    residents.reduce<Record<string, number>>((acc, s) => {
      s.industries.forEach((i) => (acc[i] = (acc[i] ?? 0) + 1));
      return acc;
    }, {}),
  ).map(([label, value]) => ({ label, value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Resident startups" value={String(residents.length)} icon={Rocket} />
        <StatCard label="Upcoming events" value={String(upcoming.length)} icon={CalendarDays} />
        <StatCard
          label="Avg. profile completeness"
          value={`${avgCompleteness}%`}
          icon={TrendingUp}
        />
        <StatCard label="Focus sectors" value={String(park.focusIndustries.length)} icon={Building2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Resident startups by sector</CardTitle>
              <CardDescription>{park.name}</CardDescription>
            </div>
            <Badge tone="neutral">Demo data</Badge>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={industryCounts} height={240} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming at this park</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 && <p className="text-sm text-muted">No upcoming events scheduled.</p>}
            {upcoming.map((e) => (
              <Link
                key={e.id}
                href={`/events/${e.id}`}
                className="block rounded-md border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{e.name}</p>
                  <EventStatusBadge status={e.status} />
                </div>
                <p className="mt-1 text-xs text-muted">{formatDate(e.date)}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resident directory</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-2.5 font-medium">Startup</th>
                <th className="px-5 py-2.5 font-medium">Stage</th>
                <th className="px-5 py-2.5 font-medium">ARR</th>
                <th className="px-5 py-2.5 font-medium">Seeking</th>
                <th className="px-5 py-2.5 font-medium">Profile</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-surface-sunken">
                  <td className="px-5 py-3">
                    <Link href={`/startups/${s.id}`} className="font-medium hover:text-brand">
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{s.stage}</td>
                  <td className="px-5 py-3 tabular-nums text-muted">{formatCurrency(s.arr, { compact: true })}</td>
                  <td className="px-5 py-3 tabular-nums text-muted">{formatCurrency(s.seeking, { compact: true })}</td>
                  <td className="px-5 py-3 text-muted">{s.profileCompleteness}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function VcManagerDashboard({ orgName }: { orgName: string }) {
  const investor = investors.find((i) => i.name === orgName) ?? investors[0];
  const myDeals = dealsForInvestor(investor.id);
  const pipelineValue = myDeals
    .filter((d) => !["Closed", "Passed"].includes(d.stage))
    .reduce((sum, d) => sum + d.amount, 0);
  const topMatches = topMatchesForInvestor(investor, startups, 4);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active deals" value={String(myDeals.length)} icon={Handshake} />
        <StatCard label="Pipeline value" value={formatCurrency(pipelineValue, { compact: true })} icon={TrendingUp} />
        <StatCard label="Portfolio companies" value={String(investor.portfolioCount)} icon={Rocket} />
        <StatCard label="AUM" value={formatCurrency(investor.aum, { compact: true })} icon={Building2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline by stage</CardTitle>
          </CardHeader>
          <CardContent>
            <PipelineFunnel deals={myDeals} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fund focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted">{investor.tagline}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {investor.focusIndustries.map((i) => (
                <Badge key={i} tone="brand">{i}</Badge>
              ))}
            </div>
            <p className="pt-2 text-xs text-muted">
              Check size: {formatCurrency(investor.checkSizeMin, { compact: true })}–
              {formatCurrency(investor.checkSizeMax, { compact: true })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Top AI-suggested matches</CardTitle>
            <CardDescription>Ranked by the scoring model in src/lib/matching.ts</CardDescription>
          </div>
          <Link href="/matches" className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topMatches.map((m) => {
            const s = getStartup(m.startupId)!;
            return (
              <Link
                key={m.startupId}
                href={`/startups/${s.id}`}
                className="flex flex-col items-center rounded-lg border border-border p-4 text-center hover:border-brand hover:bg-brand-soft/30"
              >
                <MatchCompass score={m.score} breakdown={m.breakdown} size={110} />
                <p className="mt-2 text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted">{s.stage} · {s.region}</p>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function StartupFounderDashboard({ orgName }: { orgName: string }) {
  const startup = startups.find((s) => s.name === orgName) ?? startups[0];
  const myDeals = dealsForStartup(startup.id);
  const topMatches = topMatchesForStartup(startup, investors, 4);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="ARR" value={formatCurrency(startup.arr, { compact: true })} delta={startup.momGrowth} deltaLabel="MoM" icon={TrendingUp} />
        <StatCard label="Raised to date" value={formatCurrency(startup.raisedToDate, { compact: true })} icon={Handshake} />
        <StatCard label="Seeking" value={formatCurrency(startup.seeking, { compact: true })} icon={Rocket} />
        <StatCard label="Profile completeness" value={`${startup.profileCompleteness}%`} icon={Users} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Top investor matches</CardTitle>
              <CardDescription>Ranked by the scoring model in src/lib/matching.ts</CardDescription>
            </div>
            <Link href="/matches" className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {topMatches.map((m) => {
              const inv = getInvestor(m.investorId)!;
              return (
                <Link
                  key={m.investorId}
                  href={`/investors/${inv.id}`}
                  className="flex items-center gap-4 rounded-lg border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                >
                  <MatchCompass score={m.score} breakdown={m.breakdown} size={90} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{inv.name}</p>
                    <p className="text-xs text-muted">{inv.firmType}</p>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myDeals.length === 0 && (
              <p className="text-sm text-muted">No active deal-room conversations yet.</p>
            )}
            {myDeals.map((d) => {
              const inv = getInvestor(d.investorId)!;
              return (
                <Link
                  key={d.id}
                  href={`/deals/${d.id}`}
                  className="block rounded-md border border-border p-3 hover:border-brand hover:bg-brand-soft/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{inv.name}</p>
                    <StageBadge stage={d.stage} />
                  </div>
                  <p className="mt-1 text-xs text-muted">{d.nextStep}</p>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EventOrganizerDashboard({ orgName }: { orgName: string }) {
  const park = parks.find((p) => p.name === orgName);
  const managed = park ? eventsForPark(park.id) : events.slice(0, 3);
  const totalRegistered = managed.reduce((sum, e) => sum + e.registered, 0);
  const avgFill = Math.round(
    (managed.reduce((sum, e) => sum + e.registered / e.capacity, 0) / (managed.length || 1)) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Events managed" value={String(managed.length)} icon={CalendarDays} />
        <StatCard label="Total registered" value={String(totalRegistered)} icon={Users} />
        <StatCard label="Avg. fill rate" value={`${avgFill}%`} icon={TrendingUp} />
        <StatCard
          label="Open for registration"
          value={String(managed.filter((e) => e.status === "open").length)}
          icon={Rocket}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {managed.map((e) => (
            <Link
              key={e.id}
              href={`/events/${e.id}`}
              className="block rounded-lg border border-border p-4 hover:border-brand hover:bg-brand-soft/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{e.name}</p>
                <EventStatusBadge status={e.status} />
              </div>
              <p className="mt-1 text-xs text-muted">
                {formatDate(e.date)} · {e.location}
              </p>
              <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-surface-sunken overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${Math.min((e.registered / e.capacity) * 100, 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted">
                {e.registered}/{e.capacity} registered
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const totalPipeline = deals
    .filter((d) => !["Closed", "Passed"].includes(d.stage))
    .reduce((sum, d) => sum + d.amount, 0);
  const recentActivity = [...deals]
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Startups" value={String(startups.length)} icon={Rocket} />
        <StatCard label="Investors" value={String(investors.length)} icon={Handshake} />
        <StatCard label="Parks" value={String(parks.length)} icon={Building2} />
        <StatCard label="Pipeline value" value={formatCurrency(totalPipeline, { compact: true })} icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Deals by stage — platform-wide</CardTitle>
          </CardHeader>
          <CardContent>
            <PipelineFunnel deals={deals} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((d) => {
              const s = getStartup(d.startupId)!;
              const inv = getInvestor(d.investorId)!;
              return (
                <div key={d.id} className="text-sm">
                  <p>
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted"> × {inv.name}</span>
                  </p>
                  <p className="text-xs text-muted">
                    Moved to <StageBadgeInline stage={d.stage} /> · {formatDate(d.lastActivity)}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StageBadgeInline({ stage }: { stage: string }) {
  return <span className="font-medium text-foreground">{stage}</span>;
}
