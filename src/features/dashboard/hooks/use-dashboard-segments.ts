import { useQuery } from "@tanstack/react-query";
import { getQueryState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { segmentsService } from "@/services";

export function useDashboardSegments() {
  const query = useQuery({
    queryKey: queryKeys.segments.listWithAudience(),
    queryFn: () => segmentsService.getSegmentsWithAudience(),
  });

  return {
    query,
    segments: query.data ?? [],
    ...getQueryState(query),
  };
}
