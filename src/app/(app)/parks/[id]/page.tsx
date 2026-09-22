import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StartupCard } from "@/components/domain/startup-card";
import { EventStatusBadge } from "@/components/domain/badges";
import { eventsForPark, parks, startupsForPark } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return parks.map((p) => ({ id: p.id }));
}

export default async function ParkDetailPage(props: PageProps<"/parks/[id]">) {
  const { id } = await props.params;
  const park = parks.find((p) => p.id === id);
  if (!park) notFound();

  const residents = startupsForPark(park.id);
  const parkEvents = eventsForPark(park.id);

  return (
    <div>
      <Link href="/parks" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to parks
      </Link>

      <PageHeader title={park.name} description={`${park.country} · ${park.region} · Founded ${park.founded}`} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted leading-relaxed">{park.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {park.focusIndustries.map((i) => (
                  <Badge key={i} tone="brand">
                    {i}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resident startups ({residents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {residents.length === 0 ? (
                <EmptyState title="No resident startups yet" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {residents.map((s) => (
                    <StartupCard key={s.id} startup={s} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {park.programs.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand shrink-0" strokeWidth={1.75} />
                  {p}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {parkEvents.length === 0 && <p className="text-sm text-muted">No events on record.</p>}
              {parkEvents.map((e) => (
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
      </div>
    </div>
  );
}
