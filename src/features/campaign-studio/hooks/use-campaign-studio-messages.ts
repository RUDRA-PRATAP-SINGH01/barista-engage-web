import { useMutation } from "@tanstack/react-query";
import { getMutationState } from "@/lib/query-state";
import { campaignStudioService } from "@/services/campaign-studio.service";
import type {
  GenerateCreativeRequestDto,
  GenerateMessageRequestDto,
  RegenerateMessageRequestDto,
} from "@/types/dtos/campaign-studio.dto";

export function useGenerateMessage() {
  const mutation = useMutation({
    mutationFn: (payload: GenerateMessageRequestDto) =>
      campaignStudioService.generateMessage(payload),
  });

  return {
    generateMessage: mutation.mutateAsync,
    ...getMutationState(mutation),
  };
}

export function useRegenerateMessage() {
  const mutation = useMutation({
    mutationFn: (payload: RegenerateMessageRequestDto) =>
      campaignStudioService.regenerateMessage(payload),
  });

  return {
    regenerateMessage: mutation.mutateAsync,
    ...getMutationState(mutation),
  };
}

export function useGenerateCreative() {
  const mutation = useMutation({
    mutationFn: (payload: GenerateCreativeRequestDto) =>
      campaignStudioService.generateCreative(payload),
  });

  return {
    generateCreative: mutation.mutateAsync,
    regenerateCreative: (payload: GenerateCreativeRequestDto) =>
      campaignStudioService.regenerateCreative(payload),
    ...getMutationState(mutation),
  };
}
