import { PageHeader } from "@/components/shared/PageHeader";
import { CampaignsLayoutSkeleton } from "@/features/campaigns/CampaignsLayoutSkeleton";

export function CampaignsPage() {
  return (
    <div className="campaigns-shell w-full min-w-0 pb-4">
      <div className="flex w-full min-w-0 flex-col gap-5">
        <PageHeader title="Campaigns" variant="glass" />
        <CampaignsLayoutSkeleton />
      </div>
    </div>
  );
}
