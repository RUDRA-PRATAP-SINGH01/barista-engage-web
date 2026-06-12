import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  computeSegmentHealthScore,
  getSegmentDetail,
} from "./segment-detail-data";
import type { SegmentItem } from "./mock-data";
import {
  getSegmentHealthBadgeTier,
  healthBadgeStyles,
} from "./segment-ui-utils";

interface SegmentBoxProps {
  segment: SegmentItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MiniTrend({
  activity,
  active,
}: {
  activity: [number, number, number, number];
  active: boolean;
}) {
  const max = Math.max(...activity, 1);

  return (
    <div className="flex h-5 items-end gap-0.5" aria-hidden>
      {activity.map((value, index) => (
        <span
          key={index}
          className={cn(
            "w-1.5 rounded-sm transition-colors",
            active ? "bg-primary/80" : "bg-white/20",
          )}
          style={{ height: `${Math.max(4, (value / max) * 20)}px` }}
        />
      ))}
    </div>
  );
}

export function SegmentBox({
  segment,
  isSelected,
  onSelect,
}: SegmentBoxProps) {
  const positive = segment.growth >= 0;
  const healthScore = computeSegmentHealthScore(
    getSegmentDetail(segment.id).dna,
  );
  const healthTier = getSegmentHealthBadgeTier(healthScore);
  const healthBadge = healthBadgeStyles[healthTier];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "segment-list-item flex w-full items-center justify-between gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-all duration-200",
        isSelected
          ? "segment-list-item-active"
          : "segment-list-item-hover",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "truncate text-sm font-semibold",
                isSelected ? "text-foreground" : "text-foreground/90",
              )}
            >
              {segment.name}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-wide uppercase",
                healthBadge.className,
              )}
            >
              {healthBadge.label}
            </span>
          </div>
          <MiniTrend activity={segment.weeklyActivity} active={isSelected} />
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-xs font-light text-muted-foreground">
            {segment.count.toLocaleString()} customers
          </span>
          <span
            className={cn(
              "flex shrink-0 items-center gap-0.5 text-xs font-semibold",
              positive ? "text-[#8CB8FF]" : "text-muted-foreground",
            )}
          >
            {positive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {positive ? "+" : ""}
            {segment.growth}%
          </span>
        </div>
      </div>
    </button>
  );
}
