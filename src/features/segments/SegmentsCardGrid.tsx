import { cn } from "@/lib/utils";
import { SegmentBox } from "./SegmentBox";
import { segments, type SegmentItem } from "./mock-data";

interface SegmentsCardGridProps {
  selectedId: string;
  onSelect: (segment: SegmentItem) => void;
  layout?: "stack" | "grid";
  className?: string;
}

export function SegmentsCardGrid({
  selectedId,
  onSelect,
  layout = "grid",
  className,
}: SegmentsCardGridProps) {
  return (
    <div
      className={cn(
        layout === "stack" ? "flex flex-col gap-2" : "grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {segments.map((segment) => (
        <SegmentBox
          key={segment.id}
          segment={segment}
          isSelected={segment.id === selectedId}
          onSelect={() => onSelect(segment)}
        />
      ))}
    </div>
  );
}
