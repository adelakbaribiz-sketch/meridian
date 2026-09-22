import { FlaskConical } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="border-b border-border-strong bg-surface-sunken">
      <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-center text-xs text-muted lg:px-8">
        <FlaskConical className="h-3.5 w-3.5 shrink-0" />
        Portfolio demo — every startup, investor, and deal shown is simulated seed data. No real
        company, fund, or transaction is represented.
      </p>
    </div>
  );
}
