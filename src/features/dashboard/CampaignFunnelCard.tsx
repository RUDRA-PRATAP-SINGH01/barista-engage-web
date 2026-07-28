import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { FunnelStage } from "./dashboard-utils";
import { DashboardCardFeedback } from "./DashboardCardFeedback";
import { DashboardChartContainer } from "./DashboardChartContainer";
import { chartTooltipStyle } from "./chart-theme";

const FUNNEL_CHART_HEIGHT = 228;
const SEGMENT_H = 3;
const SEGMENT_GAP = 2;

interface SegmentBarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

/** Stacked dash segments — shadcndashboard SaaS chart look */
function SegmentedBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
}: SegmentBarShapeProps) {
  if (height <= 0 || width <= 0) return null;

  const step = SEGMENT_H + SEGMENT_GAP;
  const count = Math.max(1, Math.floor(height / step));

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const segY = y + height - (i + 1) * step + SEGMENT_GAP;
        const opacity = 0.35 + (i / Math.max(count - 1, 1)) * 0.65;
        return (
          <rect
            key={i}
            x={x}
            y={segY}
            width={width}
            height={SEGMENT_H}
            rx={1}
            fill="var(--foreground)"
            fillOpacity={opacity}
          />
        );
      })}
    </g>
  );
}

interface CampaignFunnelCardProps {
  funnel: FunnelStage[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

function FunnelSkeleton() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 px-2 pb-2">
      <div className="flex h-[180px] items-end justify-between gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full"
            style={{ height: `${55 + index * 18}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-full" />
        ))}
      </div>
    </div>
  );
}

export function CampaignFunnelCard({
  funnel,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: CampaignFunnelCardProps) {
  return (
    <DashboardCard className="flex min-w-0 flex-col gap-4 py-5">
      <CardHeader className="pb-0">
        <CardTitle>Campaign Funnel</CardTitle>
        <CardDescription>
          Communication outcomes across all campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-[260px] min-h-[260px] min-w-0 flex-col">
        <DashboardCardFeedback
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          errorMessage={errorMessage}
          skeleton={<FunnelSkeleton />}
        >
          <DashboardChartContainer height={FUNNEL_CHART_HEIGHT}>
            <BarChart
              data={funnel}
              barSize={36}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--chart-grid)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="stage"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--chart-tick)",
                  fontSize: 12,
                  fontWeight: 400,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--chart-tick)",
                  fontSize: 12,
                  fontWeight: 400,
                }}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                contentStyle={chartTooltipStyle}
              />
              <Bar
                dataKey="count"
                shape={(props) => (
                  <SegmentedBar {...(props as SegmentBarShapeProps)} />
                )}
              />
            </BarChart>
          </DashboardChartContainer>
        </DashboardCardFeedback>
      </CardContent>
    </DashboardCard>
  );
}
