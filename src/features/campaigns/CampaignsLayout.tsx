import { CampaignHubSidebar } from "./CampaignHubSidebar";
import { CampaignKpiRow } from "./CampaignKpiRow";
import { CampaignPerformanceTrendsChart } from "./CampaignPerformanceTrendsChart";
import { CampaignRegistryTable } from "./CampaignRegistryTable";
import { CampaignSegmentImpactChart } from "./CampaignSegmentImpactChart";
import { campaignLayoutGap } from "./campaign-glass";

export function CampaignsLayout() {
  return (
    <div
      className={`campaigns-layout grid min-w-0 grid-cols-1 ${campaignLayoutGap} lg:grid-cols-[7fr_3fr] lg:items-stretch`}
    >
      {/* Left column — 70% */}
      <div className={`flex min-h-0 flex-col ${campaignLayoutGap}`}>
        <CampaignKpiRow />
        <CampaignPerformanceTrendsChart />

        <div className={`flex min-h-0 flex-1 flex-col ${campaignLayoutGap}`}>
          <CampaignRegistryTable className="min-h-0 flex-1" />
          <CampaignSegmentImpactChart className="shrink-0" />
        </div>
      </div>

      {/* Right column — 30% */}
      <CampaignHubSidebar />
    </div>
  );
}
