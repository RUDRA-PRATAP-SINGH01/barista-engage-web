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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { funnel } from "./mock-data";
import { chartTooltipStyle } from "./chart-theme";

export function CampaignFunnelCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Campaign Funnel</CardTitle>
        <CardDescription>Communication outcomes across all campaigns</CardDescription>
      </CardHeader>
      <CardContent className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnel} barSize={44} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="stage"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6E7482", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6E7482", fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: "var(--elevated)", opacity: 0.5 }} contentStyle={chartTooltipStyle} />
            <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
