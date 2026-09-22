"use client";

import * as React from "react";
import { CalendarPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function RegisterButton({ eventName }: { eventName: string }) {
  const { push } = useToast();
  const [registered, setRegistered] = React.useState(false);

  return (
    <Button
      variant={registered ? "outline" : "primary"}
      disabled={registered}
      onClick={() => {
        setRegistered(true);
        push({
          tone: "success",
          title: "Registered",
          description: `You're on the list for ${eventName}. (Demo action — not persisted.)`,
        });
      }}
    >
      {registered ? <Check className="h-4 w-4" /> : <CalendarPlus className="h-4 w-4" />}
      {registered ? "Registered" : "Register"}
    </Button>
  );
}
