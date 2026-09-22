import Link from "next/link";
import { Rocket } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { parks, startupsForPark } from "@/lib/data";

export const metadata = { title: "Parks" };

export default function ParksPage() {
  return (
    <div>
      <PageHeader title="Parks" description="Science & technology parks connected to the network." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {parks.map((park) => {
          const residents = startupsForPark(park.id);
          return (
            <Link key={park.id} href={`/parks/${park.id}`}>
              <Card className="h-full p-5 transition-colors hover:border-brand hover:bg-brand-soft/20">
                <p className="font-display font-medium">{park.name}</p>
                <p className="text-xs text-muted mt-0.5">
                  {park.country} · {park.region}
                </p>
                <p className="mt-3 text-sm text-muted line-clamp-2">{park.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {park.focusIndustries.map((i) => (
                    <Badge key={i} tone="neutral">
                      {i}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted border-t border-border pt-3">
                  <Rocket className="h-3.5 w-3.5" />
                  {residents.length} resident startups tracked
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
