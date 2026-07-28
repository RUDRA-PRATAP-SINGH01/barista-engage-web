import { ArrowRight, Sparkles } from "lucide-react";
import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";
import type { SegmentMarketingIntel } from "./segment-detail-data";
import { SegmentTrendChart } from "./SegmentTrendChart";
import {
  segmentGlassCardClassName,
  segmentGlassCardProps,
} from "./segment-glass";
import { getRiskTone, metricToneClasses } from "./segment-ui-utils";

interface SegmentMarketingCardProps {
  marketing: SegmentMarketingIntel;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-xs font-light text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

export function SegmentMarketingCard({ marketing }: SegmentMarketingCardProps) {
  const riskTone = getRiskTone(marketing.riskLevel);

  return (
    <LiquidGlassCard
      {...segmentGlassCardProps}
      className={segmentGlassCardClassName}
    >
      <GlassCardHeader className="gap-1">
        <GlassCardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          Marketing Intelligence
        </GlassCardTitle>
        <GlassCardDescription>
          Channel affinity, trends, and recommended actions
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="flex flex-1 flex-col gap-3">
        <div className="glass-inset rounded-[12px] p-3.5">
          <div className="mb-1.5 flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">
              AI Insight
            </span>
          </div>
          <p className="text-sm font-light leading-relaxed text-foreground">
            {marketing.aiInsight}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Channel Intelligence
          </p>
          <div className="glass-inset rounded-[12px] px-3.5 py-0.5">
            <DetailRow label="Best Channel" value={marketing.bestChannel} />
            <div className="border-t border-white/[0.06]" />
            <DetailRow label="Preferred Drink" value={marketing.preferredDrink} />
            <div className="border-t border-white/[0.06]" />
            <DetailRow label="Top City" value={marketing.topCity} />
            <div className="border-t border-white/[0.06]" />
            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-xs font-light text-muted-foreground">
                Risk Level
              </span>
              <span
                className={cn(
                  "text-right text-sm font-semibold",
                  metricToneClasses[riskTone],
                )}
              >
                {marketing.riskLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Segment Trend
          </p>
          <div className="glass-inset rounded-[12px] px-3 py-2">
            <SegmentTrendChart data={marketing.trend} />
          </div>
        </div>

        <div className="segment-action-card relative overflow-hidden rounded-[12px] border border-primary/30 p-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />
          <p className="text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
            Recommended Action
          </p>
          <div className="mt-3">
            <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Expected Impact
            </p>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {marketing.expectedImpactEngagement}
              </span>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {marketing.expectedImpactRetention}
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
            {marketing.actionTimeline}
          </p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)]"
          >
            Launch campaign
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
