import { useMutation } from "@tanstack/react-query";
import { getMutationState } from "@/lib/query-state";
import { audienceBuilderService } from "@/services/audience-builder.service";

export function useAudienceAnalysis() {
  const mutation = useMutation({
    mutationFn: (goal: string) =>
      audienceBuilderService.generateGoal({ goal: goal.trim() }),
  });

  const state = getMutationState(mutation);

  return {
    mutation,
    analyze: mutation.mutate,
    analyzeAsync: mutation.mutateAsync,
    resetAnalysis: mutation.reset,
    ...state,
  };
}
