import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { demoUsers, roleDescriptions, roleLabels } from "@/lib/data/users";
import { setDemoSession } from "@/lib/session";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-sunken">
      <header className="flex h-16 items-center px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <Link href="/" className="ml-auto flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
            <Compass className="h-4 w-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-medium">Meridian</span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 pb-16">
        <div className="text-center mb-8">
          <Badge tone="warning" className="mb-4">
            Demo session — not real authentication
          </Badge>
          <h1 className="font-display text-2xl font-medium">Choose a persona to explore</h1>
          <p className="mt-2 text-sm text-muted">
            There&apos;s no password because there&apos;s no real account system in this prototype. Pick any
            role below — the dashboard, navigation, and data shown will match that persona. See{" "}
            <span className="font-mono">docs/SECURITY.md</span> for what real auth would require.
          </p>
        </div>

        <div className="space-y-3">
          {demoUsers.map((user) => (
            <form key={user.id} action={setDemoSession.bind(null, user.id)}>
              <button type="submit" className="w-full text-left">
                <Card className="flex items-center gap-4 p-4 transition-colors hover:border-brand hover:bg-brand-soft/40">
                  <Avatar name={user.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user.name}</p>
                      <Badge tone="brand">{roleLabels[user.role]}</Badge>
                    </div>
                    <p className="text-sm text-muted truncate">
                      {user.title} · {user.orgName}
                    </p>
                    <p className="mt-1 text-xs text-muted">{roleDescriptions[user.role]}</p>
                  </div>
                </Card>
              </button>
            </form>
          ))}
        </div>
      </main>
    </div>
  );
}
