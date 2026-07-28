import { AlertTriangle, Megaphone, Sparkles, Users } from "lucide-react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { HeroSummary } from "./dashboard-utils";
import {
  DashboardCardFeedback,
  DASHBOARD_ERROR_MESSAGE,
} from "./DashboardCardFeedback";

const statIcons = {
  customers: Users,
  atRisk: AlertTriangle,
  campaigns: Megaphone,
} as const;

interface DashboardHeroStripProps {
  heroSummary: HeroSummary | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export function DashboardHeroStrip({
  heroSummary,
  isLoading,
  isError,
  errorMessage,
}: DashboardHeroStripProps) {
  return (
    <DashboardCard className="overflow-hidden py-0">
      {isLoading ? (
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-72 max-w-full" />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-44" />
              ))}
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-xl lg:max-w-md" />
        </div>
      ) : isError ? (
        <div className="flex min-h-[120px] items-center justify-center p-6 text-sm font-normal text-muted-foreground">
          {errorMessage ?? DASHBOARD_ERROR_MESSAGE}
        </div>
      ) : heroSummary ? (
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] text-primary uppercase">
                Intelligence
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {heroSummary.title}
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {heroSummary.stats.map((stat) => {
                const Icon = statIcons[stat.icon];
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-primary" />
                    <span className="text-sm font-light text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {stat.value}
                      </span>{" "}
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-3.5 text-primary" />
                <span className="text-[11px] font-semibold tracking-wide text-primary uppercase">
                  AI Insight
                </span>
              </div>
              <p className="text-sm leading-relaxed font-light text-foreground/90">
                {heroSummary.aiInsight}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <DashboardCardFeedback isEmpty className="min-h-[120px]" />
      )}
    </DashboardCard>
  );
}
