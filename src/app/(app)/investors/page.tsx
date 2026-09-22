import { PageHeader } from "@/components/page-header";
import { InvestorsExplorer } from "@/components/domain/investors-explorer";
import { investors } from "@/lib/data";

export const metadata = { title: "Investors" };

export default function InvestorsPage() {
  return (
    <div>
      <PageHeader title="Investors" description="Funds and syndicates active across the network." />
      <InvestorsExplorer investors={investors} />
    </div>
  );
}
