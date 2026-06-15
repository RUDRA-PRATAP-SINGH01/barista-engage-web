import { Cell, Pie, PieChart, Tooltip } from "recharts";
import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLocaleNumber, normalizeNumber } from "@/lib/format-utils";
import type { ChurnDistributionEntry } from "./dashboard-utils";
import { DashboardCardFeedback } from "./DashboardCardFeedback";
import { DashboardChartContainer } from "./DashboardChartContainer";
import { chartTooltipStyle } from "./chart-theme";

const CHURN_CHART_HEIGHT = 170;

interface ChurnDistributionCardProps {
  churnDistribution: ChurnDistributionEntry[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

function ChurnSkeleton() {
  return (
    <div className="flex h-full flex-col items-center justify-between">
      <Skeleton className="size-[160px] rounded-full bg-white/10" />
      <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-20 bg-white/10" />
        ))}
      </div>
    </div>
  );
}

export function ChurnDistributionCard({
  churnDistribution,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: ChurnDistributionCardProps) {
  const total = churnDistribution.reduce(
    (sum, entry) => sum + normalizeNumber(entry.count),
    0,
  );
  const hasData = total > 0;

  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="md"
      glowIntensity="sm"
      borderRadius="16px"
      className="flex h-full min-w-0 flex-col gap-4 bg-white/8 p-4"
    >
      <GlassCardHeader>
        <GlassCardTitle>Churn Risk</GlassCardTitle>
        <GlassCardDescription>
          Customer distribution by churn risk
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="flex h-[260px] min-h-[260px] min-w-0 flex-col items-center justify-between">
        <DashboardCardFeedback
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty || !hasData}
          errorMessage={errorMessage}
          skeleton={<ChurnSkeleton />}
        >
          <>
            <div className="relative w-full min-w-0">
              <DashboardChartContainer height={CHURN_CHART_HEIGHT}>
                <PieChart>
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Pie
                    data={churnDistribution}
                    dataKey="count"
                    nameKey="risk"
                    innerRadius={58}
                    outerRadius={80}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {churnDistribution.map((entry) => (
                      <Cell
                        key={entry.risk}
                        fill={entry.color}
                        fillOpacity={0.9}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </DashboardChartContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">
                  {formatLocaleNumber(total)}
                </span>
                <span className="text-[11px] font-light text-muted-foreground">
                  customers
                </span>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {churnDistribution.map((entry) => (
                <div key={entry.risk} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs font-normal text-muted-foreground">
                    {entry.risk}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {total > 0
                      ? Math.round((normalizeNumber(entry.count) / total) * 100)
                      : 0}
                    %
                  </span>
                </div>
              ))}
            </div>
          </>
        </DashboardCardFeedback>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
