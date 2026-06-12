import { useQuery } from "@tanstack/react-query";
import { getQueryState } from "@/lib/query-state";
import { queryKeys } from "@/lib/query-keys";
import { segmentsService } from "@/services";

async function fetchSegmentsForList() {
  const segments = await segmentsService.getSegments();

  return Promise.all(
    segments.map(async (segment) => {
      if (segment.audienceSize > 0) {
        return segment;
      }

      try {
        const detail = await segmentsService.getSegmentById(segment.id);
        return {
          ...segment,
          audienceSize: detail.audienceSize,
          description: detail.description ?? segment.description,
        };
      } catch {
        return segment;
      }
    }),
  );
}

export function useSegmentsList() {
  const query = useQuery({
    queryKey: queryKeys.segments.list(),
    queryFn: fetchSegmentsForList,
  });

  return {
    query,
    segments: query.data ?? [],
    ...getQueryState(query),
  };
}
