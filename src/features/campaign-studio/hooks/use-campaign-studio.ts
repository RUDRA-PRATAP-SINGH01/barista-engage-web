import { useMutation } from "@tanstack/react-query";
import { getMutationState } from "@/lib/query-state";
import { campaignStudioService } from "@/services/campaign-studio.service";
import type { GenerateCampaignStudioRequestDto } from "@/types/dtos/campaign-studio.dto";

export function useCampaignStudio() {
  const mutation = useMutation({
    mutationFn: (payload: GenerateCampaignStudioRequestDto) =>
      campaignStudioService.generate(payload),
  });

  return {
    generate: mutation.mutate,
    generateAsync: mutation.mutateAsync,
    resetStudio: mutation.reset,
    ...getMutationState(mutation),
  };
}
