import { Users } from "lucide-react";
import { SegmentsCardGrid } from "./SegmentsCardGrid";
import { segments, type SegmentItem } from "./mock-data";

interface SegmentsSidebarProps {
  selectedId: string;
  onSelect: (segment: SegmentItem) => void;
}

export function SegmentsSidebar({
  selectedId,
  onSelect,
}: SegmentsSidebarProps) {
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <aside className="flex h-full min-h-0 w-(--segments-panel-width) shrink-0 flex-col border-r border-border bg-[#0c0c0c]">
      <div className="shrink-0 border-b border-white/[0.08] px-5 py-6">
        <div className="flex items-center gap-2.5">
          <Users className="size-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Segments</h2>
        </div>
        <p className="mt-1.5 text-sm font-light text-muted-foreground">
          {segments.length} segments · {total.toLocaleString()} customers
        </p>
      </div>

      <div className="segments-sidebar-scroll min-h-0 flex-1 overflow-y-auto p-4">
        <SegmentsCardGrid
          layout="stack"
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>
    </aside>
  );
}
