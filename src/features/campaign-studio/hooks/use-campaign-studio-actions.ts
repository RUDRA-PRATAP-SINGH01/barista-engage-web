import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMutationState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { campaignStudioService } from "@/services/campaign-studio.service";
import type { SaveCampaignStudioRequestDto } from "@/types/dtos/campaign-studio.dto";

export function useSaveCampaign() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: SaveCampaignStudioRequestDto) =>
      campaignStudioService.save(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.campaigns.lists() });
    },
  });

  return {
    saveCampaign: mutation.mutateAsync,
    ...getMutationState(mutation),
  };
}

export function useLaunchCampaign() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (campaignId: string) =>
      campaignStudioService.launch({ campaignId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.campaigns.lists() });
    },
  });

  return {
    launchCampaign: mutation.mutateAsync,
    ...getMutationState(mutation),
  };
}
