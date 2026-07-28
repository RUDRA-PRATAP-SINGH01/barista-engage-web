import { Cell, Pie, PieChart, Tooltip } from "recharts";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
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
      <Skeleton className="size-[160px] rounded-full" />
      <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-20" />
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
    <DashboardCard className="flex min-w-0 flex-col gap-4 py-5">
      <CardHeader className="pb-0">
        <CardTitle>Churn Risk</CardTitle>
        <CardDescription>
          Customer distribution by churn risk
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-[260px] min-h-[260px] min-w-0 flex-col items-center justify-between">
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
                    outerRadius={78}
                    paddingAngle={4}
                    stroke="var(--card)"
                    strokeWidth={3}
                    cornerRadius={4}
                  >
                    {churnDistribution.map((entry) => (
                      <Cell key={entry.risk} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </DashboardChartContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Total
                </span>
                <span className="text-xl font-semibold text-foreground">
                  {formatLocaleNumber(total)}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 px-1">
              {churnDistribution.map((entry) => (
                <div
                  key={entry.risk}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-sm"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="font-medium text-foreground">
                      {entry.risk}
                    </span>
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {formatLocaleNumber(entry.count)} ·{" "}
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
      </CardContent>
    </DashboardCard>
  );
}
