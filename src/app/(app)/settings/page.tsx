import { PageHeader } from "@/components/page-header";
import { SettingsTabs } from "@/components/domain/settings-tabs";
import { roleLabels } from "@/lib/data/users";
import { requireDemoUser } from "@/lib/session";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireDemoUser();

  return (
    <div>
      <PageHeader title="Settings" description={`Signed in as ${user.name} · ${roleLabels[user.role]}`} />
      <SettingsTabs user={user} />
    </div>
  );
}
