"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const STEPS = ["Organization", "Focus", "Team", "Review"];

export function OnboardingWizard() {
  const [step, setStep] = React.useState(0);
  const [orgName, setOrgName] = React.useState("");
  const [orgType, setOrgType] = React.useState("Startup");
  const [focus, setFocus] = React.useState("Climate & Energy");
  const [teamEmail, setTeamEmail] = React.useState("");
  const { push } = useToast();
  const router = useRouter();

  const last = step === STEPS.length - 1;

  function next() {
    if (last) {
      push({
        tone: "success",
        title: "Onboarding complete",
        description: "(Demo flow — no account was actually created.)",
      });
      router.push("/dashboard");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <Card className="mx-auto max-w-xl p-6">
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                i < step
                  ? "bg-brand text-white"
                  : i === step
                    ? "bg-brand-soft text-brand-strong border border-brand"
                    : "bg-surface-sunken text-muted",
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </div>
            <span className={cn("text-xs hidden sm:inline", i === step ? "font-medium" : "text-muted")}>
              {label}
            </span>
            {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-muted" />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-medium">Tell us about your organization</h2>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Organization name</label>
            <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. Northgate Capital Partners" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Organization type</label>
            <Select value={orgType} onChange={(e) => setOrgType(e.target.value)} className="w-full">
              <option>Startup</option>
              <option>Investor</option>
              <option>Science/Technology Park</option>
              <option>Event Organizer</option>
            </Select>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-medium">What&apos;s your primary focus?</h2>
          <Select value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full">
            {["Climate & Energy", "Health & Biotech", "Fintech", "AI & Data Infrastructure", "Advanced Manufacturing", "Agri & Foodtech", "Mobility & Logistics", "Cybersecurity"].map(
              (i) => (
                <option key={i}>{i}</option>
              ),
            )}
          </Select>
          <p className="text-xs text-muted">
            This drives which matches and events you&apos;ll see first — it can be changed anytime in
            Settings.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-medium">Invite your team (optional)</h2>
          <Input
            value={teamEmail}
            onChange={(e) => setTeamEmail(e.target.value)}
            placeholder="teammate@example.com"
            type="email"
          />
          <p className="text-xs text-muted">You can skip this and invite people later from Settings → Team.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <h2 className="font-display text-lg font-medium">Review</h2>
          <SummaryRow label="Organization" value={orgName || "—"} />
          <SummaryRow label="Type" value={orgType} />
          <SummaryRow label="Focus" value={focus} />
          <SummaryRow label="Invited" value={teamEmail || "No one yet"} />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button onClick={next}>{last ? "Finish" : "Continue"}</Button>
      </div>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2 text-sm last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
