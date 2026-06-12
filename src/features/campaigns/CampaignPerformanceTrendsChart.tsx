import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";
import { cn } from "@/lib/utils";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { campaignPerformanceTrends } from "./mock-data";

const lines = [
  { key: "coldBrew", name: "Cold Brew Second Chance", color: "#4b8cff" },
  { key: "monsoonLatte", name: "Monsoon Latte Launch", color: "#8CB8FF" },
  {
    key: "championVip",
    name: "Champion VIP Early Access",
    color: "#72a5ff",
  },
] as const;

export function CampaignPerformanceTrendsChart({
  className,
}: {
  className?: string;
}) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, "shrink-0", className)}
    >
      <GlassCardHeader className="gap-1">
        <GlassCardTitle>Campaign Performance Trends</GlassCardTitle>
        <GlassCardDescription>
          Open rate progression across top-performing campaigns
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={campaignPerformanceTrends}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(163,167,178,0.85)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(163,167,178,0.85)", fontSize: 11 }}
              domain={[20, 80]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value) => [`${value}%`, "Open Rate"]}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs font-normal text-muted-foreground">
                  {value}
                </span>
              )}
            />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
