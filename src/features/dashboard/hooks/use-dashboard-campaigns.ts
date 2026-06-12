import { useQuery } from "@tanstack/react-query";
import { getQueryState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { campaignsService } from "@/services";

export function useDashboardCampaigns() {
  const query = useQuery({
    queryKey: queryKeys.campaigns.list(),
    queryFn: () => campaignsService.getCampaigns(),
  });

  return {
    query,
    campaigns: query.data ?? [],
    ...getQueryState(query),
  };
}
