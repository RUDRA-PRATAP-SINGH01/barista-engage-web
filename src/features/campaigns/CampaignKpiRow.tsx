import { TrendingUp, Trophy } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { CampaignListKpis } from "./campaign-list-utils";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { topCampaignKpi } from "./mock-data";

const kpiLabels = [
  "Total Campaigns",
  "Active",
  "Draft",
  "Completed",
] as const;

interface CampaignKpiRowProps {
  kpis: CampaignListKpis | null;
  isLoading: boolean;
}

function KpiSkeletonCard() {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, "justify-between gap-2")}
    >
      <Skeleton className="h-3 w-20 bg-white/10" />
      <Skeleton className="h-8 w-10 bg-white/10" />
    </LiquidGlassCard>
  );
}

export function CampaignKpiRow({ kpis, isLoading }: CampaignKpiRowProps) {
  const kpiValues = kpis
    ? [kpis.total, kpis.active, kpis.draft, kpis.completed]
    : [];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-5">
      {kpiLabels.map((label, index) =>
        isLoading ? (
          <KpiSkeletonCard key={label} />
        ) : (
          <LiquidGlassCard
            key={label}
            {...campaignGlassProps}
            className={cn(campaignGlassClassName, "justify-between gap-2")}
          >
            <span className="text-[11px] font-light tracking-wide text-muted-foreground">
              {label}
            </span>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {kpiValues[index] ?? 0}
            </span>
          </LiquidGlassCard>
        ),
      )}

      <LiquidGlassCard
        {...campaignGlassProps}
        glowIntensity="md"
        className={cn(
          campaignGlassClassName,
          "justify-between gap-2 border border-primary/25 bg-gradient-to-br from-primary/10 via-white/8 to-white/[0.04] shadow-[0_0_32px_rgba(75,140,255,0.14)]",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium tracking-wide text-primary/90">
            Top Campaign
          </span>
          <Trophy className="size-4 text-primary" />
        </div>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">
          {topCampaignKpi.name}
        </p>
        <p className="text-2xl font-bold tracking-tight text-[#8CB8FF]">
          {topCampaignKpi.openRate}%{" "}
          <span className="text-sm font-normal text-muted-foreground">
            Open Rate
          </span>
        </p>
        <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-[#8CB8FF]">
          <TrendingUp className="size-3" />+{topCampaignKpi.aboveAverage}% above
          average
        </span>
      </LiquidGlassCard>
    </div>
  );
}
