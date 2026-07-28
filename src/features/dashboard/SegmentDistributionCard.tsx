import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
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
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
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
    <DashboardCard className="flex min-w-0 flex-col gap-4 py-5">
      <CardHeader className="pb-0">
        <CardTitle>RFM Segments</CardTitle>
        <CardDescription>
          Customer distribution by RFM segment
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-[260px] min-h-[260px] min-w-0 flex-col justify-center gap-4 overflow-y-auto">
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
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-foreground transition-all duration-200"
                  style={{
                    width: `${max > 0 ? (normalizeNumber(entry.count) / max) * 100 : 0}%`,
                    opacity: 0.35 + (normalizeNumber(entry.count) / Math.max(max, 1)) * 0.65,
                  }}
                />
              </div>
            </div>
          ))}
        </DashboardCardFeedback>
      </CardContent>
    </DashboardCard>
  );
}
