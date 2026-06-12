import { cn } from "@/lib/utils";
import type { SegmentDto } from "@/types/dtos";
import { SegmentBox } from "./SegmentBox";
import { buildSegmentCardViewModel } from "./segment-derived-data";

interface SegmentsCardGridProps {
  segments: SegmentDto[];
  selectedId: string | null;
  onSelect: (segmentId: string) => void;
  layout?: "stack" | "grid";
  className?: string;
}

export function SegmentsCardGrid({
  segments,
  selectedId,
  onSelect,
  layout = "grid",
  className,
}: SegmentsCardGridProps) {
  return (
    <div
      className={cn(
        layout === "stack"
          ? "flex flex-col gap-2"
          : "grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {segments.map((segment) => {
        const card = buildSegmentCardViewModel(segment);

        return (
          <SegmentBox
            key={segment.id}
            segment={card}
            isSelected={segment.id === selectedId}
            onSelect={() => onSelect(segment.id)}
          />
        );
      })}
    </div>
  );
}
