import Link from "next/link";
import { Compass } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-sunken px-4">
      <EmptyState
        icon={<Compass className="h-8 w-8" strokeWidth={1.5} />}
        title="This page doesn't exist"
        description="The link may be out of date, or the record may not be in the demo dataset."
        action={
          <Link href="/" className={buttonVariants({ size: "sm" })}>
            Back to home
          </Link>
        }
      />
    </div>
  );
}
