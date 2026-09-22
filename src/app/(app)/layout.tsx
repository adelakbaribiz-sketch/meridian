import { FlaskConical } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ToastProvider } from "@/components/ui/toast";
import { requireDemoUser } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireDemoUser();

  return (
    <ToastProvider>
      <div className="flex h-dvh overflow-hidden bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar user={user} />
          <div className="flex items-center gap-2 border-b border-border bg-warning-soft px-4 py-1.5 text-xs text-warning lg:px-6">
            <FlaskConical className="h-3.5 w-3.5 shrink-0" />
            Demo workspace — every record below is simulated seed data, not a real user, company,
            or transaction.
          </div>
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
