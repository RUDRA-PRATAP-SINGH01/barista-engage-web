import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { Skeleton } from "@/components/ui/skeleton";
import type { FunnelStage } from "./dashboard-utils";
import { DashboardCardFeedback } from "./DashboardCardFeedback";
import { chartTooltipStyle } from "./chart-theme";

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
            className="w-full bg-white/10"
            style={{ height: `${55 + index * 18}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-full bg-white/10" />
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
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="md"
      glowIntensity="sm"
      borderRadius="16px"
      className="flex h-full min-w-0 flex-col gap-4 bg-white/8 p-4"
    >
      <GlassCardHeader>
        <GlassCardTitle>Campaign Funnel</GlassCardTitle>
        <GlassCardDescription>
          Communication outcomes across all campaigns
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="h-[260px]">
        <DashboardCardFeedback
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          errorMessage={errorMessage}
          skeleton={<FunnelSkeleton />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnel}
              barSize={44}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="stage"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(163,167,178,0.7)",
                  fontSize: 12,
                  fontWeight: 300,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(163,167,178,0.7)",
                  fontSize: 12,
                  fontWeight: 300,
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(75,140,255,0.08)", opacity: 1 }}
                contentStyle={chartTooltipStyle}
              />
              <Bar
                dataKey="count"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
                fillOpacity={0.85}
              />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCardFeedback>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
