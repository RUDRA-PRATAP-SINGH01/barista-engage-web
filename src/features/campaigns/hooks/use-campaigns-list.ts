import { useQuery } from "@tanstack/react-query";
import { getQueryState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { campaignsService } from "@/services";
import { computeCampaignKpis } from "../campaign-list-utils";

export function useCampaignsList() {
  const query = useQuery({
    queryKey: queryKeys.campaigns.list(),
    queryFn: () => campaignsService.getCampaigns(),
  });

  const state = getQueryState(query);
  const campaigns = query.data ?? [];
  const kpis = query.data ? computeCampaignKpis(query.data) : null;

  return {
    query,
    campaigns,
    kpis,
    ...state,
  };
}
