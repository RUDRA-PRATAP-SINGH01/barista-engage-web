import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SegmentDetailView } from "@/features/segments/SegmentDetailView";
import { SegmentsSidebar } from "@/features/segments/SegmentsSidebar";
import { segments, type SegmentItem } from "@/features/segments/mock-data";

export function SegmentsPage() {
  const [selected, setSelected] = useState<SegmentItem>(segments[0]);

  const sharePercent = useMemo(() => {
    const total = segments.reduce((sum, s) => sum + s.count, 0);
    return Math.round((selected.count / total) * 100);
  }, [selected.count]);

  return (
    <div className="segments-workspace -mx-4 -mt-2 flex h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] min-h-0 w-[calc(100%+2rem)] flex-col overflow-hidden sm:-mx-6 sm:h-[calc(100dvh-5.5rem)] sm:max-h-[calc(100dvh-5.5rem)] sm:w-[calc(100%+3rem)] lg:-mx-8 lg:-mt-4 lg:h-[calc(100dvh-6.5rem)] lg:max-h-[calc(100dvh-6.5rem)] lg:w-[calc(100%+4rem)]">
      <div className="shrink-0 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Segments" variant="glass" />
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <SegmentsSidebar selectedId={selected.id} onSelect={setSelected} />

        <section className="segments-detail-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-2 sm:px-6 lg:px-8">
          <SegmentDetailView segment={selected} sharePercent={sharePercent} />
        </section>
      </div>
    </div>
  );
}
