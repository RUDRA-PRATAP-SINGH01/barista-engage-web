import { AlertTriangle, Megaphone, Sparkles, Users } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { heroSummary } from "./mock-data";

const statIcons = {
  customers: Users,
  atRisk: AlertTriangle,
  campaigns: Megaphone,
} as const;

export function DashboardHeroStrip() {
  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="lg"
      glowIntensity="md"
      borderRadius="16px"
      className="relative overflow-hidden bg-white/[0.06] p-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary/20 via-primary to-primary/20"
      />

      <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-primary/80 uppercase">
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
                  <Icon className="size-3.5 shrink-0 text-primary/70" />
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
          <div className="rounded-[12px] border border-primary/20 bg-gradient-to-br from-primary/12 via-white/[0.04] to-transparent p-4">
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
    </LiquidGlassCard>
  );
}
