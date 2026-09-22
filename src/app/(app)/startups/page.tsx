import { PageHeader } from "@/components/page-header";
import { StartupsExplorer } from "@/components/domain/startups-explorer";
import { startups } from "@/lib/data";

export const metadata = { title: "Startups" };

export default function StartupsPage() {
  return (
    <div>
      <PageHeader
        title="Startups"
        description="Resident and network startups across every connected park."
      />
      <StartupsExplorer startups={startups} />
    </div>
  );
}
