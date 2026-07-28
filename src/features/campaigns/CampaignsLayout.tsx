import { useState } from "react";
import { CampaignChannelPerformanceChart } from "./CampaignChannelPerformanceChart";
import { CampaignKpiRow } from "./CampaignKpiRow";
import { CampaignPerformanceTrendsChart } from "./CampaignPerformanceTrendsChart";
import { CampaignRegistryTable } from "./CampaignRegistryTable";
import { useCampaignsList } from "./hooks/use-campaigns-list";

export function CampaignsLayout() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );

  const { campaigns, kpis, isLoading, isError, isEmpty, userMessage } =
    useCampaignsList();

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <CampaignKpiRow kpis={kpis} isLoading={isLoading} />

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <CampaignPerformanceTrendsChart />
        <CampaignChannelPerformanceChart />
      </div>

      <CampaignRegistryTable
        campaigns={campaigns}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        errorMessage={userMessage}
        selectedCampaignId={selectedCampaignId}
        onSelectCampaign={setSelectedCampaignId}
      />
    </div>
  );
}
