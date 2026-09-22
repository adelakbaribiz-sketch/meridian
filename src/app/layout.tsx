import type { Metadata } from "next";
import "./globals.css";

// Note: this project intentionally does NOT use next/font/google. That
// requires fetching font files at build time, which fails in network-
// restricted environments (including the one this was built in). Using
// self-contained system font stacks instead keeps `next build` reproducible
// anywhere. See docs/DECISIONS.md.

export const metadata: Metadata = {
  title: {
    default: "Meridian — Innovation Ecosystem Platform",
    template: "%s · Meridian",
  },
  description:
    "Meridian connects science & technology parks, venture investors, and startups through structured matching, events, and deal rooms. Portfolio demo — see /docs for what is real vs. simulated.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
