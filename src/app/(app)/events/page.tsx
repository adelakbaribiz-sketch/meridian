import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EventStatusBadge } from "@/components/domain/badges";
import { events, getPark } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Events" };

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <PageHeader title="Events" description="Demo days, summits, and workshops across the network." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((event) => {
          const park = event.parkId ? getPark(event.parkId) : null;
          return (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card className="h-full p-5 transition-colors hover:border-brand hover:bg-brand-soft/20">
                <div className="flex items-start justify-between gap-2">
                  <Badge tone="brand">{event.type}</Badge>
                  <EventStatusBadge status={event.status} />
                </div>
                <p className="mt-3 font-display font-medium leading-snug">{event.name}</p>
                <div className="mt-3 space-y-1.5 text-xs text-muted">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(event.date)} · {event.format}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {event.registered}/{event.capacity} registered
                  </div>
                </div>
                {park && (
                  <p className="mt-3 border-t border-border pt-3 text-xs text-muted">
                    Hosted by {park.name}
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
