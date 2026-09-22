import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Compass,
  HandCoins,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { DemoBanner } from "@/components/marketing/demo-banner";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MatchCompass } from "@/components/match-compass";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { scoreMatch } from "@/lib/matching";
import { investors } from "@/lib/data/investors";
import { startups } from "@/lib/data/startups";

const exampleMatch = scoreMatch(startups[0], investors[0]);

const painPoints = [
  {
    title: "Ecosystem data lives in a dozen places",
    body:
      "Park rosters live in spreadsheets, investor theses live in memory, and event attendee lists live in a shared inbox. Nobody has one current picture.",
  },
  {
    title: "Matchmaking is manual and doesn't scale",
    body:
      "A park manager or event organizer hand-matches founders to investors based on who they happen to know — a real bottleneck once a program grows past a few dozen companies.",
  },
  {
    title: "Deal follow-up falls through the cracks",
    body:
      "An intro made at a demo day rarely has a structured place to live afterward — NDAs, documents, and next steps scatter across email threads.",
  },
];

const steps = [
  {
    icon: Building2,
    title: "Parks bring structured startup data",
    body: "Resident startups get a standard profile: stage, traction, sector, and what they're raising.",
  },
  {
    icon: Compass,
    title: "Investors declare focus, not folders",
    body: "Funds set stage, sector, geography, and check-size focus once — instead of re-reading decks that don't fit.",
  },
  {
    icon: Sparkles,
    title: "Matching runs on transparent scoring",
    body: "Every match shows its breakdown — industry, stage, geography, and signal — not a black-box number.",
  },
  {
    icon: HandCoins,
    title: "Intros move into a shared deal room",
    body: "Once both sides say yes, the conversation gets a structured home: documents, NDA status, and pipeline stage.",
  },
];

const personas = [
  { icon: Building2, title: "Park Manager", body: "Track resident startups, run events, and report ecosystem outcomes." },
  { icon: Landmark, title: "VC Manager", body: "Work a deal pipeline sourced from transparent, explainable matches." },
  { icon: Rocket, title: "Startup Founder", body: "Keep one fundraising profile and see which investors actually fit." },
  { icon: CalendarCheck, title: "Event Organizer", body: "Run demo days and summits with structured registration and matching." },
];

const pricingPlans = [
  { name: "Founder", price: "$0", audience: "Early-stage startups", features: ["1 startup profile", "5 match views / month", "Event registration"] },
  { name: "Park", price: "$249", audience: "Per park, per month", features: ["Unlimited resident startups", "2 hosted events / year", "Ecosystem reporting"], highlighted: true },
  { name: "Investor", price: "$399", audience: "Per fund, per month", features: ["Full deal pipeline", "Unlimited match views", "Deal room + document tracking"] },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <DemoBanner />
      <MarketingNav />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <Badge tone="brand" className="w-fit mb-5">
              Innovation ecosystem platform
            </Badge>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight lg:text-5xl">
              Where parks, capital, and startups find each other.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted lg:text-lg">
              Meridian gives science &amp; technology parks, venture investors, and founders one
              shared, structured view of the ecosystem — with explainable matching instead of cold
              outreach, and a real deal room once an intro lands.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/login" className={buttonVariants({ size: "lg" })}>
                View live demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#matching" className={buttonVariants({ variant: "outline", size: "lg" })}>
                See how matching works
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              No signup required — the demo drops you straight into a persona of your choice.
            </p>
          </div>
          <Card className="self-center p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Example match</p>
                <p className="font-display text-lg font-medium">
                  {startups[0].name} <span className="text-muted">×</span> {investors[0].name}
                </p>
              </div>
              <Badge tone="neutral">Demo data</Badge>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <MatchCompass score={exampleMatch.score} breakdown={exampleMatch.breakdown} size={128} />
              <ul className="space-y-1.5 text-sm text-muted">
                {exampleMatch.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section id="problem" className="border-b border-border bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl font-medium lg:text-3xl">
            The ecosystem already exists. The connective tissue doesn&apos;t.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {painPoints.map((p) => (
              <Card key={p.title} className="p-6">
                <p className="font-display text-base font-medium">{p.title}</p>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl font-medium lg:text-3xl">How Meridian works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
                  <s.icon className="h-4.5 w-4.5" strokeWidth={1.85} />
                </div>
                <p className="mt-3 text-xs font-medium tracking-wide text-muted">STEP {i + 1}</p>
                <p className="mt-1 font-display text-base font-medium">{s.title}</p>
                <p className="mt-1.5 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl font-medium lg:text-3xl">Built for five roles</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Try the demo as any of them — the dashboard, navigation, and available actions change
            based on who&apos;s signed in.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p) => (
              <Card key={p.title} className="p-6">
                <p.icon className="h-5 w-5 text-brand" strokeWidth={1.75} />
                <p className="mt-3 font-display text-base font-medium">{p.title}</p>
                <p className="mt-1.5 text-sm text-muted">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="matching" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge tone="accent" className="w-fit">
                <Workflow className="h-3 w-3" /> Explainable, not a black box
              </Badge>
              <h2 className="mt-4 font-display text-2xl font-medium lg:text-3xl">
                Every match shows its work.
              </h2>
              <p className="mt-3 text-sm text-muted lg:text-base">
                Meridian&apos;s match score is a transparent, weighted computation over four factors —
                industry overlap, stage fit, geography, and traction signal — not a trained model
                producing an unexplainable number. The formula is real, runnable code:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface-sunken p-4 font-mono text-xs leading-relaxed text-muted">
{`score = 0.40 × industry_overlap
      + 0.25 × stage_match
      + 0.20 × geography_match
      + 0.15 × traction_signal`}
              </pre>
              <p className="mt-3 text-xs text-muted">
                See <code className="font-mono">src/lib/matching.ts</code> — this is not a trained
                ML embedding model; see docs/ARCHITECTURE.md for what a production version would add.
              </p>
            </div>
            <Card className="p-8 flex justify-center">
              <MatchCompass score={exampleMatch.score} breakdown={exampleMatch.breakdown} size={220} />
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b border-border bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-medium lg:text-3xl">Proposed pricing</h2>
            <Badge tone="warning">Proposed — not validated</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            No billing is implemented in this demo. These tiers illustrate the intended business
            model; see docs/DECISIONS.md for the reasoning and open questions.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "p-6 border-brand ring-1 ring-brand" : "p-6"}
              >
                <p className="font-display text-lg font-medium">{plan.name}</p>
                <p className="mt-1 text-sm text-muted">{plan.audience}</p>
                <p className="mt-4 font-display text-3xl font-medium">
                  {plan.price}
                  <span className="text-sm font-normal text-muted">/mo</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-success mt-0.5" strokeWidth={1.75} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-medium lg:text-3xl">
          Explore the platform as any persona.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          No account needed — pick a demo persona and the dashboard, data, and permissions follow.
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg", className: "mt-6" })}>
          View live demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
                <Compass className="h-3.5 w-3.5" strokeWidth={2.25} />
              </div>
              <span className="font-display text-sm font-medium">Meridian</span>
              <span className="text-xs text-muted">— portfolio demo, 2026</span>
            </div>
            <p className="max-w-md text-xs text-muted">
              Full documentation — what&apos;s real vs. simulated, architecture, limitations,
              roadmap — lives in the <code className="font-mono">/docs</code> folder of the
              repository.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
