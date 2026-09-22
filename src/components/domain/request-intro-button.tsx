"use client";

import * as React from "react";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

/**
 * Demo-only interaction: this does not create a real deal-room record or send
 * a real message. It gives realistic optimistic-UI feedback (per this
 * project's "realistic demo" requirement) without a backend to persist to —
 * see docs/LIMITATIONS.md.
 */
export function RequestIntroButton({ targetName }: { targetName: string }) {
  const { push } = useToast();
  const [sent, setSent] = React.useState(false);

  return (
    <Button
      variant={sent ? "outline" : "primary"}
      disabled={sent}
      onClick={() => {
        setSent(true);
        push({
          tone: "success",
          title: "Introduction requested",
          description: `${targetName} will see this request in their deal room. (Demo action — not persisted.)`,
        });
      }}
    >
      <Handshake className="h-4 w-4" />
      {sent ? "Requested" : "Request introduction"}
    </Button>
  );
}
