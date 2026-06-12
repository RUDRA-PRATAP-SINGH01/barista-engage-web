import { Sparkles, Users } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { aiCampaignInsights, bestPerformingAudience } from "./mock-data";

export function CampaignAiInsightsPanel({ className }: { className?: string }) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, "min-h-0", className)}
    >
      <h3 className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
        <Sparkles className="size-4 text-primary" />
        AI Campaign Insights
      </h3>
      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-auto">
        {aiCampaignInsights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-[10px] border border-primary/15 bg-primary/[0.05] px-3 py-2"
          >
            <p className="text-xs font-normal leading-relaxed text-foreground/90">
              {insight.text}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#8CB8FF]">
              {insight.highlight}
            </p>
          </div>
        ))}
      </div>
    </LiquidGlassCard>
  );
}

export function BestPerformingAudienceCard({
  className,
}: {
  className?: string;
}) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      glowIntensity="md"
      className={cn(
        campaignGlassClassName,
        "relative border border-primary/30 bg-gradient-to-br from-primary/12 via-white/8 to-white/[0.03] shadow-[0_0_40px_rgba(75,140,255,0.16)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-primary">
        <Users className="size-4" />
        Best Performing Audience
      </h3>
      <p className="mt-2 text-base font-bold text-foreground">
        {bestPerformingAudience.segment}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="glass-inset rounded-[10px] px-2 py-2">
          <p className="text-[10px] font-light text-muted-foreground">
            Open Rate
          </p>
          <p className="mt-0.5 text-sm font-bold text-[#8CB8FF]">
            {bestPerformingAudience.openRate}%
          </p>
        </div>
        <div className="glass-inset rounded-[10px] px-2 py-2">
          <p className="text-[10px] font-light text-muted-foreground">CTR</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {bestPerformingAudience.ctr}%
          </p>
        </div>
        <div className="glass-inset rounded-[10px] px-2 py-2">
          <p className="text-[10px] font-light text-muted-foreground">
            Audience
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">
            {bestPerformingAudience.audience.toLocaleString()}
          </p>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
