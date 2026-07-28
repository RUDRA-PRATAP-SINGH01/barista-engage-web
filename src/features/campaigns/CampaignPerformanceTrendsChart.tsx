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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";
import { cn } from "@/lib/utils";
import { campaignPerformanceTrends } from "./mock-data";

const lines = [
  {
    key: "coldBrew",
    name: "Cold Brew Second Chance",
    color: "var(--foreground)",
    opacity: 1,
  },
  {
    key: "monsoonLatte",
    name: "Monsoon Latte Launch",
    color: "var(--muted-foreground)",
    opacity: 0.7,
  },
  {
    key: "championVip",
    name: "Champion VIP Early Access",
    color: "var(--chart-3)",
    opacity: 0.9,
  },
] as const;

export function CampaignPerformanceTrendsChart({
  className,
}: {
  className?: string;
}) {
  return (
    <DashboardCard className={cn("py-5", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Open rate progression across top campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={campaignPerformanceTrends}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--chart-grid)"
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--chart-tick)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--chart-tick)", fontSize: 11 }}
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
                strokeOpacity={line.opacity}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "var(--foreground)" }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </DashboardCard>
  );
}
