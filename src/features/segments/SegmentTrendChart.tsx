import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";
import type { SegmentTrendPoint } from "./segment-detail-data";

interface SegmentTrendChartProps {
  data: SegmentTrendPoint[];
}

export function SegmentTrendChart({ data }: SegmentTrendChartProps) {
  return (
    <div className="h-[88px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(163,167,178,0.65)", fontSize: 10 }}
            dy={4}
          />
          <YAxis
            hide
            domain={["dataMin - 4", "dataMax + 4"]}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(value) => [`${value}`, "Index"]}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4b8cff"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 3,
              fill: "#4b8cff",
              stroke: "rgba(255,255,255,0.4)",
              strokeWidth: 1,
            }}
            isAnimationActive
            animationDuration={600}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
