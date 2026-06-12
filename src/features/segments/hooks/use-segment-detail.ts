import { useQuery } from "@tanstack/react-query";
import { getQueryState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { segmentsService } from "@/services";

export function useSegmentDetail(segmentId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.segments.detail(segmentId ?? ""),
    queryFn: () => segmentsService.getSegmentById(segmentId as string),
    enabled: Boolean(segmentId),
  });

  return {
    query,
    segment: query.data,
    ...getQueryState(query),
  };
}
