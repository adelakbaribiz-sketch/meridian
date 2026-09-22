import { PageHeader } from "@/components/page-header";
import { OnboardingWizard } from "@/components/domain/onboarding-wizard";

export const metadata = { title: "Onboarding" };

export default function OnboardingPage() {
  return (
    <div>
      <PageHeader
        title="Set up your workspace"
        description="A short demo of the onboarding flow — nothing here is saved to a real account."
      />
      <OnboardingWizard />
    </div>
  );
}
