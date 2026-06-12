import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { campaignStatusBreakdown } from "./mock-data";

const total = campaignStatusBreakdown.reduce((sum, d) => sum + d.count, 0);

export function CampaignStatusDonut({ className }: { className?: string }) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, className)}
    >
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Campaign Status
      </h3>
      <div className="relative mt-2 h-[120px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={chartTooltipStyle} />
            <Pie
              data={campaignStatusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={36}
              outerRadius={54}
              paddingAngle={3}
              strokeWidth={0}
            >
              {campaignStatusBreakdown.map((entry) => (
                <Cell key={entry.status} fill={entry.color} fillOpacity={0.9} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">{total}</span>
          <span className="text-[10px] font-light text-muted-foreground">
            total
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {campaignStatusBreakdown.map((entry) => (
          <div
            key={entry.status}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">
                {entry.status} {entry.count}
              </span>
            </div>
            <span className="font-semibold text-foreground">
              {Math.round((entry.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </LiquidGlassCard>
  );
}
