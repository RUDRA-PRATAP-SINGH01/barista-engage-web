import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import type { SegmentCampaignPerformance } from "./segment-detail-data";
import {
  segmentGlassCardClassName,
  segmentGlassCardProps,
} from "./segment-glass";
import { getRuleIcon } from "./segment-ui-utils";

interface SegmentRulesCardProps {
  segmentName: string;
  rules: string[];
  campaignPerformance: SegmentCampaignPerformance;
}

function CompactKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-inset flex flex-col gap-1 rounded-[10px] px-3 py-2.5">
      <span className="text-[10px] font-light tracking-[0.1em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-base font-semibold leading-none tracking-tight text-foreground">
        {value}
      </span>
    </div>
  );
}

export function SegmentRulesCard({
  segmentName,
  rules,
  campaignPerformance,
}: SegmentRulesCardProps) {
  return (
    <LiquidGlassCard
      {...segmentGlassCardProps}
      className={segmentGlassCardClassName}
    >
      <GlassCardHeader className="gap-1">
        <GlassCardTitle>Segment Rules</GlassCardTitle>
        <GlassCardDescription>
          Active filters defining segment membership
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]">
            {segmentName}
          </span>
          {rules.length === 0 ? (
            <span className="text-xs font-normal text-muted-foreground">
              No rules defined
            </span>
          ) : (
            rules.map((rule) => {
              const Icon = getRuleIcon(rule);
              return (
                <span
                  key={rule}
                  className="glass-inset inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-normal text-foreground/90"
                >
                  <Icon className="size-3 shrink-0 text-primary/70" />
                  {rule}
                </span>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Campaign Performance
          </p>
          <div className="grid grid-cols-2 gap-2">
            <CompactKpi
              label="Campaigns Sent"
              value={String(campaignPerformance.campaignsSent)}
            />
            <CompactKpi
              label="Average Open Rate"
              value={campaignPerformance.averageOpenRate}
            />
            <CompactKpi
              label="Average CTR"
              value={campaignPerformance.averageCtr}
            />
            <CompactKpi
              label="Best Campaign"
              value={campaignPerformance.bestCampaign}
            />
          </div>
        </div>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
