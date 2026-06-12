import { Users } from "lucide-react";
import { formatLocaleNumber, normalizeNumber } from "@/lib/format-utils";
import type { SegmentDto } from "@/types/dtos";
import { SegmentsCardGrid } from "./SegmentsCardGrid";
import {
  SEGMENTS_ERROR_MESSAGE,
  SegmentSidebarSkeleton,
} from "./SegmentsPageFeedback";

interface SegmentsSidebarProps {
  segments: SegmentDto[];
  selectedId: string | null;
  onSelect: (segmentId: string) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export function SegmentsSidebar({
  segments,
  selectedId,
  onSelect,
  isLoading,
  isError,
  errorMessage,
}: SegmentsSidebarProps) {
  const total = segments.reduce(
    (sum, segment) => sum + normalizeNumber(segment.audienceSize),
    0,
  );

  return (
    <aside className="flex h-full min-h-0 w-(--segments-panel-width) shrink-0 flex-col border-r border-border bg-[#0c0c0c]">
      <div className="shrink-0 border-b border-white/[0.08] px-5 py-6">
        <div className="flex items-center gap-2.5">
          <Users className="size-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Segments</h2>
        </div>
        <p className="mt-1.5 text-sm font-light text-muted-foreground">
          {isLoading
            ? "Loading segments..."
            : `${segments.length} segments · ${formatLocaleNumber(total)} customers`}
        </p>
      </div>

      <div className="segments-sidebar-scroll min-h-0 flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <SegmentSidebarSkeleton />
        ) : isError ? (
          <p className="px-1 py-6 text-center text-sm font-normal text-muted-foreground">
            {errorMessage ?? SEGMENTS_ERROR_MESSAGE}
          </p>
        ) : segments.length === 0 ? (
          <p className="px-1 py-6 text-center text-sm font-normal text-muted-foreground">
            No segments available
          </p>
        ) : (
          <SegmentsCardGrid
            layout="stack"
            segments={segments}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        )}
      </div>
    </aside>
  );
}
