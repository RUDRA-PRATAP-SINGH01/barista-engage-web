import { PageHeader } from "@/components/shared/PageHeader";
import { CampaignsLayout } from "@/features/campaigns/CampaignsLayout";

export function CampaignsPage() {
  return (
    <div className="campaigns-shell w-full min-w-0 pb-4">
      <div className="flex w-full min-w-0 flex-col gap-4">
        <PageHeader title="Campaigns" variant="glass" />
        <CampaignsLayout />
      </div>
    </div>
  );
}
