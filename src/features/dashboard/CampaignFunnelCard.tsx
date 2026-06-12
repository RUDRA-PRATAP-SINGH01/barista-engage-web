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
import { funnel } from "./mock-data";
import { chartTooltipStyle } from "./chart-theme";

export function CampaignFunnelCard() {
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
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
