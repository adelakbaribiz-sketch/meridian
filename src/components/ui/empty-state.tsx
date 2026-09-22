import * as React from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface-sunken px-6 py-14 text-center",
        className,
      )}
    >
      {icon && <div className="text-muted opacity-70">{icon}</div>}
      <div className="space-y-1">
        <p className="font-display text-base font-medium">{title}</p>
        {description && <p className="text-sm text-muted max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
