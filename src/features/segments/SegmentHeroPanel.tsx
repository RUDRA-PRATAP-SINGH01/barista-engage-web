import {
  Activity,
  Coffee,
  MapPin,
  MessageCircle,
  PieChart,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { formatLocaleNumber } from "@/lib/format-utils";
import { cn } from "@/lib/utils";
import { SegmentRadarChart } from "./SegmentRadarChart";
import type { SegmentDetailViewModel } from "./segment-derived-data";
import {
  segmentGlassCardClassName,
  segmentGlassCardProps,
} from "./segment-glass";
import {
  getGrowthTone,
  getStatusTone,
  metricToneBorderClasses,
  metricToneClasses,
  type MetricTone,
} from "./segment-ui-utils";

interface SegmentHeroPanelProps {
  viewModel: SegmentDetailViewModel;
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
  showTrend,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: MetricTone;
  showTrend?: "up" | "down";
}) {
  return (
    <div
      className={cn(
        "glass-inset flex min-w-0 flex-1 flex-col gap-1.5 rounded-[12px] px-3.5 py-3",
        metricToneBorderClasses[tone],
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-light tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </span>
        <Icon className="size-3.5 text-primary/70" />
      </div>
      <span
        className={cn(
          "flex items-center gap-1.5 text-base font-semibold leading-none tracking-tight",
          metricToneClasses[tone],
        )}
      >
        {showTrend === "up" && <TrendingUp className="size-3.5 shrink-0" />}
        {showTrend === "down" && <TrendingDown className="size-3.5 shrink-0" />}
        {value}
      </span>
    </div>
  );
}

function SnapshotPill({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="glass-inset flex min-w-0 items-center gap-2 rounded-[10px] px-3 py-2">
      <Icon className="size-3 shrink-0 text-primary/70" />
      <span className="truncate text-[10px] font-light text-muted-foreground">
        {label}
      </span>
      <span className="truncate text-xs font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

export function SegmentHeroPanel({ viewModel }: SegmentHeroPanelProps) {
  const growthTone = getGrowthTone(viewModel.growth);
  const statusTone = getStatusTone(viewModel.status);
  const marketing = viewModel.marketing;

  return (
    <LiquidGlassCard
      {...segmentGlassCardProps}
      className={cn(segmentGlassCardClassName, "min-h-0 gap-5 p-5 sm:p-6")}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-medium tracking-[0.16em] text-primary/75 uppercase">
          Segment DNA
        </p>
        <h2 className="text-[2rem] font-bold tracking-tight text-foreground drop-shadow-[0_0_28px_transparent] sm:text-[2.35rem]">
          {viewModel.name}
        </h2>
        <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          {viewModel.description}
        </p>
      </div>

      <div className="flex min-h-[360px] flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
        <div className="flex min-h-[320px] w-full flex-[2.2] lg:min-h-[380px]">
          <SegmentRadarChart
            data={viewModel.chartData}
            segmentId={viewModel.segmentId}
          />
        </div>

        <div className="flex w-full shrink-0 flex-col items-center justify-center lg:w-[200px]">
          <div className="segment-health-hero flex w-full flex-col items-center justify-center rounded-[16px] px-6 py-8">
            <span className="text-[88px] leading-none font-bold tracking-tight text-foreground sm:text-[96px]">
              {viewModel.healthScore}
            </span>
            <span className="mt-2 text-center text-sm font-semibold tracking-wide text-[var(--foreground)]">
              Segment Health
            </span>
            <span className="mt-0.5 text-[10px] font-light text-muted-foreground">
              Composite DNA score
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Segment Snapshot
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <SnapshotPill
            label="Preferred Drink"
            value={marketing.preferredDrink}
            icon={Coffee}
          />
          <SnapshotPill
            label="Top City"
            value={marketing.topCity}
            icon={MapPin}
          />
          <SnapshotPill
            label="Best Channel"
            value={marketing.bestChannel}
            icon={MessageCircle}
          />
          <SnapshotPill
            label="Average Spend"
            value={marketing.averageSpend}
            icon={Wallet}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <MetricCard
          label="Audience Size"
          value={formatLocaleNumber(viewModel.audienceSize)}
          icon={Users}
          tone="neutral"
        />
        <MetricCard
          label="Share of Base"
          value={`${viewModel.sharePercent}%`}
          icon={PieChart}
          tone="positive"
        />
        <MetricCard
          label="Growth Trend"
          value={`${viewModel.growth >= 0 ? "+" : ""}${viewModel.growth}%`}
          icon={TrendingUp}
          tone={growthTone}
          showTrend={viewModel.growth >= 0 ? "up" : "down"}
        />
        <MetricCard
          label="Segment Status"
          value={viewModel.status}
          icon={Activity}
          tone={statusTone}
        />
      </div>
    </LiquidGlassCard>
  );
}
