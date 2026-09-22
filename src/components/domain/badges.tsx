import { Badge } from "@/components/ui/badge";
import type { DealStage, EcosystemEvent, Stage } from "@/lib/types";

export function StageBadge({ stage }: { stage: DealStage }) {
  const tone =
    stage === "Closed"
      ? "success"
      : stage === "Passed"
        ? "danger"
        : stage === "Term Sheet" || stage === "Due Diligence"
          ? "accent"
          : "brand";
  return <Badge tone={tone}>{stage}</Badge>;
}

export function StartupStageBadge({ stage }: { stage: Stage }) {
  return <Badge tone="info">{stage}</Badge>;
}

export function EventStatusBadge({ status }: { status: EcosystemEvent["status"] }) {
  const tone =
    status === "open"
      ? "success"
      : status === "upcoming"
        ? "brand"
        : status === "closed"
          ? "warning"
          : "neutral";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge tone={tone}>{label}</Badge>;
}
