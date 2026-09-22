import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MatchCompass } from "@/components/match-compass";
import { getInvestor, getStartup, investors, startups } from "@/lib/data";
import { scoreMatch, topMatchesForInvestor, topMatchesForStartup } from "@/lib/matching";
import { requireDemoUser } from "@/lib/session";

export const metadata = { title: "Matches" };

export default async function MatchesPage() {
  const user = await requireDemoUser();

  let matches: { startupId: string; investorId: string; score: number; breakdown: ReturnType<typeof scoreMatch>["breakdown"]; reasons: string[] }[] = [];
  let subtitle = "Highest-scoring startup × investor pairs across the network.";

  if (user.role === "startup_founder") {
    const startup = startups.find((s) => s.name === user.orgName) ?? startups[0];
    matches = topMatchesForStartup(startup, investors, 12);
    subtitle = `Investors ranked by fit for ${startup.name}.`;
  } else if (user.role === "vc_manager") {
    const investor = investors.find((i) => i.name === user.orgName) ?? investors[0];
    matches = topMatchesForInvestor(investor, startups, 12);
    subtitle = `Startups ranked by fit for ${investor.name}.`;
  } else {
    matches = startups
      .flatMap((s) => investors.map((i) => scoreMatch(s, i)))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }

  return (
    <div>
      <PageHeader title="Matches" description={subtitle} />
      <p className="mb-6 text-xs text-muted">
        Scored by the deterministic model in <code className="font-mono">src/lib/matching.ts</code> —
        weighted industry overlap, stage fit, geography, and traction signal. Not a trained ML model.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m) => {
          const s = getStartup(m.startupId)!;
          const inv = getInvestor(m.investorId)!;
          return (
            <Card key={`${m.startupId}-${m.investorId}`} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Badge tone={m.score >= 70 ? "success" : m.score >= 45 ? "warning" : "neutral"}>
                  {m.score >= 70 ? "Strong fit" : m.score >= 45 ? "Possible fit" : "Weak fit"}
                </Badge>
                <MatchCompass score={m.score} breakdown={m.breakdown} size={72} />
              </div>
              <Link href={`/startups/${s.id}`} className="block text-sm font-medium hover:text-brand truncate">
                {s.name}
              </Link>
              <p className="text-xs text-muted">×</p>
              <Link href={`/investors/${inv.id}`} className="block text-sm font-medium hover:text-brand truncate">
                {inv.name}
              </Link>
              <ul className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted">
                {m.reasons.slice(0, 2).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
