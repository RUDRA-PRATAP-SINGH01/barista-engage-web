import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLocaleNumber, normalizeNumber } from "@/lib/format-utils";
import type { SegmentDistributionEntry } from "./dashboard-utils";
import { DashboardCardFeedback } from "./DashboardCardFeedback";

interface SegmentDistributionCardProps {
  segmentDistribution: SegmentDistributionEntry[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

function SegmentDistributionSkeleton() {
  return (
    <div className="flex flex-col justify-center gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24 bg-white/10" />
            <Skeleton className="h-3 w-16 bg-white/10" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function SegmentDistributionCard({
  segmentDistribution,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: SegmentDistributionCardProps) {
  const total = segmentDistribution.reduce(
    (sum, entry) => sum + normalizeNumber(entry.count),
    0,
  );
  const max = segmentDistribution.reduce(
    (currentMax, entry) =>
      Math.max(currentMax, normalizeNumber(entry.count)),
    0,
  );

  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="md"
      glowIntensity="sm"
      borderRadius="16px"
      className="flex h-full min-w-0 flex-col gap-4 bg-white/8 p-4"
    >
      <GlassCardHeader>
        <GlassCardTitle>RFM Segments</GlassCardTitle>
        <GlassCardDescription>
          Customer distribution by RFM segment
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="flex h-[260px] flex-col justify-center gap-4 overflow-y-auto">
        <DashboardCardFeedback
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          errorMessage={errorMessage}
          skeleton={<SegmentDistributionSkeleton />}
        >
          {segmentDistribution.map((entry) => (
            <div key={entry.segment} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-normal text-muted-foreground">
                  {entry.segment}
                </span>
                <span className="font-semibold text-foreground">
                  {formatLocaleNumber(entry.count)}
                  <span className="ml-1.5 font-light text-muted-foreground">
                    {total > 0
                      ? Math.round(
                          (normalizeNumber(entry.count) / total) * 100,
                        )
                      : 0}
                    %
                  </span>
                </span>
              </div>
              <div className="glass-inset h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-200"
                  style={{
                    width: `${max > 0 ? (normalizeNumber(entry.count) / max) * 100 : 0}%`,
                    opacity: 0.85,
                  }}
                />
              </div>
            </div>
          ))}
        </DashboardCardFeedback>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
