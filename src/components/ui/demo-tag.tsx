import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Explicit, visible marker for demo/seed data, per this project's disclosure
 * policy (see docs/LIMITATIONS.md). Used anywhere the UI renders fixture data
 * that isn't backed by a live, persisted record the visitor created.
 */
export function DemoTag({ className, label = "Demo data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface-sunken px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted",
        className,
      )}
      title="This content is seed/demo data, not a real record."
    >
      <FlaskConical className="h-3 w-3" strokeWidth={2} />
      {label}
    </span>
  );
}
