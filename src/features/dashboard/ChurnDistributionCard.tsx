import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { churnDistribution } from "./mock-data";
import { chartTooltipStyle } from "./chart-theme";

const total = churnDistribution.reduce((sum, d) => sum + d.count, 0);

export function ChurnDistributionCard() {
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
      <GlassCardContent className="flex h-[260px] flex-col items-center justify-between">
        <div className="relative h-[170px] w-full">
          <ResponsiveContainer width="100%" height="100%">
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
                  <Cell key={entry.risk} fill={entry.color} fillOpacity={0.9} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-foreground">
              {total.toLocaleString()}
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
                {Math.round((entry.count / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
