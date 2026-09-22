import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
            <Compass className="h-4 w-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-medium tracking-tight">Meridian</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <a href="#problem" className="hover:text-foreground">
            Problem
          </a>
          <a href="#product" className="hover:text-foreground">
            Product
          </a>
          <a href="#matching" className="hover:text-foreground">
            Matching
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Log in
          </Link>
          <Link href="/login" className={buttonVariants({ size: "sm" })}>
            View live demo
          </Link>
        </div>
      </div>
    </header>
  );
}
