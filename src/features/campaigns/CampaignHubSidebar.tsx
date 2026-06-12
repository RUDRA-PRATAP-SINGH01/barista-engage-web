import {
  BestPerformingAudienceCard,
  CampaignAiInsightsPanel,
} from "./CampaignInsightsCards";
import { CampaignChannelPerformanceChart } from "./CampaignChannelPerformanceChart";
import { CampaignStatusDonut } from "./CampaignStatusDonut";
import { campaignLayoutGap } from "./campaign-glass";

export function CampaignHubSidebar() {
  return (
    <div className={`flex min-h-0 flex-col ${campaignLayoutGap}`}>
      <CampaignStatusDonut className="shrink-0" />
      <CampaignChannelPerformanceChart className="shrink-0" />
      <CampaignAiInsightsPanel className="min-h-0 flex-1" />
      <BestPerformingAudienceCard className="shrink-0" />
    </div>
  );
}
