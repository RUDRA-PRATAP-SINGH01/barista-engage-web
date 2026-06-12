import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { normalizeNumber } from "@/lib/format-utils";
import { SegmentDetailView } from "@/features/segments/SegmentDetailView";
import { SegmentsSidebar } from "@/features/segments/SegmentsSidebar";
import { buildSegmentDetailViewModel } from "@/features/segments/segment-derived-data";
import { useSegmentDetail } from "@/features/segments/hooks/use-segment-detail";
import { useSegmentsList } from "@/features/segments/hooks/use-segments-list";

export function SegmentsPage() {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(
    null,
  );
  const segmentsList = useSegmentsList();
  const segmentDetail = useSegmentDetail(selectedSegmentId);

  useEffect(() => {
    if (segmentsList.segments.length === 0) {
      return;
    }

    const selectedExists = segmentsList.segments.some(
      (segment) => segment.id === selectedSegmentId,
    );

    if (!selectedSegmentId || !selectedExists) {
      setSelectedSegmentId(segmentsList.segments[0].id);
    }
  }, [segmentsList.segments, selectedSegmentId]);

  const totalAudience = useMemo(
    () =>
      segmentsList.segments.reduce(
        (sum, segment) => sum + normalizeNumber(segment.audienceSize),
        0,
      ),
    [segmentsList.segments],
  );

  const detailViewModel = useMemo(() => {
    if (!segmentDetail.segment) {
      return null;
    }

    return buildSegmentDetailViewModel(segmentDetail.segment, totalAudience);
  }, [segmentDetail.segment, totalAudience]);

  const isDetailLoading =
    segmentsList.isLoading ||
    (Boolean(selectedSegmentId) &&
      (segmentDetail.isLoading || segmentDetail.isFetching));

  const isDetailEmpty =
    !segmentsList.isLoading &&
    !segmentsList.isError &&
    (segmentsList.segments.length === 0 || !selectedSegmentId);

  const isDetailError =
    !segmentsList.isLoading &&
    !segmentsList.isError &&
    Boolean(selectedSegmentId) &&
    segmentDetail.isError;

  return (
    <div className="segments-workspace -mx-4 -mt-2 flex h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] min-h-0 w-[calc(100%+2rem)] flex-col overflow-hidden sm:-mx-6 sm:h-[calc(100dvh-5.5rem)] sm:max-h-[calc(100dvh-5.5rem)] sm:w-[calc(100%+3rem)] lg:-mx-8 lg:-mt-4 lg:h-[calc(100dvh-6.5rem)] lg:max-h-[calc(100dvh-6.5rem)] lg:w-[calc(100%+4rem)]">
      <div className="shrink-0 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Segments" variant="glass" />
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <SegmentsSidebar
          segments={segmentsList.segments}
          selectedId={selectedSegmentId}
          onSelect={setSelectedSegmentId}
          isLoading={segmentsList.isLoading}
          isError={segmentsList.isError}
          errorMessage={segmentsList.userMessage}
        />

        <section className="segments-detail-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-2 sm:px-6 lg:px-8">
          <SegmentDetailView
            viewModel={detailViewModel}
            isLoading={isDetailLoading}
            isError={isDetailError}
            isEmpty={isDetailEmpty}
            errorMessage={segmentDetail.userMessage ?? segmentsList.userMessage}
          />
        </section>
      </div>
    </div>
  );
}
