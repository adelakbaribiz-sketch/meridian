"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-sunken px-4">
      <EmptyState
        icon={<AlertTriangle className="h-8 w-8 text-danger" strokeWidth={1.5} />}
        title="Something went wrong"
        description="This is an unexpected error in the demo app. Try again, or head back to the dashboard."
        action={
          <Button size="sm" onClick={reset}>
            Try again
          </Button>
        }
      />
    </div>
  );
}
