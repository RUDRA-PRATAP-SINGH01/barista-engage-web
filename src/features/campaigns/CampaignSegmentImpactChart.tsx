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
import { cn } from "@/lib/utils";
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { segmentImpact } from "./mock-data";

export function CampaignSegmentImpactChart({
  className,
}: {
  className?: string;
}) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, className)}
    >
      <GlassCardHeader className="gap-1 pb-2">
        <GlassCardTitle>Segment Impact</GlassCardTitle>
        <GlassCardDescription>
          Campaign revenue contribution by customer segment
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={segmentImpact}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 4, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(163,167,178,0.85)", fontSize: 11 }}
              domain={[0, 100]}
              tickFormatter={(v) => `₹${v}L`}
            />
            <YAxis
              type="category"
              dataKey="segment"
              axisLine={false}
              tickLine={false}
              width={110}
              tick={{ fill: "rgba(163,167,178,0.85)", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value) => [`₹${value}L`, "Revenue Contribution"]}
            />
            <Bar
              dataKey="revenue"
              fill="#4b8cff"
              radius={[0, 6, 6, 0]}
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
