import { useState } from "react";
import { CampaignHubSidebar } from "./CampaignHubSidebar";
import { CampaignKpiRow } from "./CampaignKpiRow";
import { CampaignPerformanceTrendsChart } from "./CampaignPerformanceTrendsChart";
import { CampaignRegistryTable } from "./CampaignRegistryTable";
import { CampaignSegmentImpactChart } from "./CampaignSegmentImpactChart";
import { campaignLayoutGap } from "./campaign-glass";
import { useCampaignsList } from "./hooks/use-campaigns-list";

export function CampaignsLayout() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );

  const {
    campaigns,
    kpis,
    isLoading,
    isError,
    isEmpty,
    userMessage,
  } = useCampaignsList();

  return (
    <div
      className={`campaigns-layout grid min-w-0 grid-cols-1 ${campaignLayoutGap} lg:grid-cols-[7fr_3fr] lg:items-stretch`}
    >
      <div className={`flex min-h-0 flex-col ${campaignLayoutGap}`}>
        <CampaignKpiRow kpis={kpis} isLoading={isLoading} />
        <CampaignPerformanceTrendsChart />

        <div className={`flex min-h-0 flex-1 flex-col ${campaignLayoutGap}`}>
          <CampaignRegistryTable
            className="min-h-0 flex-1"
            campaigns={campaigns}
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            errorMessage={userMessage}
            selectedCampaignId={selectedCampaignId}
            onSelectCampaign={setSelectedCampaignId}
          />
          <CampaignSegmentImpactChart className="shrink-0" />
        </div>
      </div>

      <CampaignHubSidebar />
    </div>
  );
}
