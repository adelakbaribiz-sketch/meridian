import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { EventStatusBadge } from "@/components/domain/badges";
import { MatchCompass } from "@/components/match-compass";
import { RegisterButton } from "@/components/domain/register-button";
import { events, getInvestor, getPark, getStartup } from "@/lib/data";
import { scoreMatch } from "@/lib/matching";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage(props: PageProps<"/events/[id]">) {
  const { id } = await props.params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const park = event.parkId ? getPark(event.parkId) : null;
  const participantStartups = event.participantStartupIds.map((sid) => getStartup(sid)!);
  const participantInvestors = event.participantInvestorIds.map((iid) => getInvestor(iid)!);

  const matchMatrix = participantStartups.flatMap((s) =>
    participantInvestors.map((inv) => scoreMatch(s, inv)),
  );

  return (
    <div>
      <Link href="/events" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to events
      </Link>

      <PageHeader
        title={event.name}
        description={event.description}
        actions={<RegisterButton eventName={event.name} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>On-site match matrix</CardTitle>
            </CardHeader>
            <CardContent>
              {matchMatrix.length === 0 ? (
                <EmptyState
                  title="No overlapping participants yet"
                  description="Match suggestions appear once both startups and investors are registered."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {matchMatrix
                    .sort((a, b) => b.score - a.score)
                    .map((m) => {
                      const s = getStartup(m.startupId)!;
                      const inv = getInvestor(m.investorId)!;
                      return (
                        <div
                          key={`${m.startupId}-${m.investorId}`}
                          className="flex items-center gap-4 rounded-lg border border-border p-3"
                        >
                          <MatchCompass score={m.score} breakdown={m.breakdown} size={80} />
                          <div className="min-w-0 text-sm">
                            <Link href={`/startups/${s.id}`} className="font-medium hover:text-brand truncate block">
                              {s.name}
                            </Link>
                            <Link href={`/investors/${inv.id}`} className="text-muted hover:text-brand truncate block">
                              {inv.name}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participating startups ({participantStartups.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {participantStartups.map((s) => (
                <Link
                  key={s.id}
                  href={`/startups/${s.id}`}
                  className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 hover:border-brand"
                >
                  <Avatar name={s.name} size={24} />
                  <span className="text-sm">{s.name}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participating investors ({participantInvestors.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {participantInvestors.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/investors/${inv.id}`}
                  className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 hover:border-brand"
                >
                  <Avatar name={inv.name} size={24} />
                  <span className="text-sm">{inv.name}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <Badge tone="brand">{event.type}</Badge>
                <EventStatusBadge status={event.status} />
              </div>
              <div className="flex items-center gap-2 text-muted">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                {formatDate(event.date)} · {event.format}
              </div>
              <div className="flex items-center gap-2 text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Users className="h-3.5 w-3.5 shrink-0" />
                {event.registered}/{event.capacity} registered
              </div>
              <div className="h-1.5 w-full rounded-full bg-surface-sunken overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                />
              </div>
              {park && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted mb-1">Hosted by</p>
                  <Link href={`/parks/${park.id}`} className="font-medium text-brand hover:underline">
                    {park.name}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
