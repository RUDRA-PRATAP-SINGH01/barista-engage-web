import { useId } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { chartTooltipStyle } from "@/features/dashboard/chart-theme";

const RADAR_CHART_HEIGHT = 320;

interface SegmentRadarChartProps {
  data: { dimension: string; score: number }[];
  segmentId: string;
}

export function SegmentRadarChart({ data, segmentId }: SegmentRadarChartProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div
      className="segment-radar-glow relative w-full min-w-0 shrink-0"
      style={{ height: RADAR_CHART_HEIGHT }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,transparent_0%,transparent_42%,transparent_70%)]"
      />
      <ResponsiveContainer width="100%" height={RADAR_CHART_HEIGHT} minWidth={0}>
        <RadarChart cx="50%" cy="50%" outerRadius="76%" data={data}>
          <defs>
            <linearGradient
              id={`radar-fill-${gradientId}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.38} />
              <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="var(--chart-grid)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fill: "var(--chart-tick)",
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: "var(--chart-tick)",
              fontSize: 10,
            }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            formatter={(value) => [`${value}`, "Score"]}
            labelFormatter={(label) => label}
          />
          <Radar
            key={segmentId}
            name="Score"
            dataKey="score"
            stroke="var(--foreground)"
            fill={`url(#radar-fill-${gradientId})`}
            fillOpacity={1}
            strokeWidth={2.5}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-in-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
