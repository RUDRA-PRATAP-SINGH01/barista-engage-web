import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { segmentDistribution } from "./mock-data";

const total = segmentDistribution.reduce((sum, d) => sum + d.count, 0);
const max = Math.max(...segmentDistribution.map((d) => d.count));

export function SegmentDistributionCard() {
  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="md"
      glowIntensity="sm"
      borderRadius="16px"
      className="flex h-full min-w-0 flex-col gap-4 bg-white/8 p-4"
    >
      <GlassCardHeader>
        <GlassCardTitle>RFM Segments</GlassCardTitle>
        <GlassCardDescription>
          Customer distribution by RFM segment
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="flex h-[260px] flex-col justify-center gap-4">
        {segmentDistribution.map((entry) => (
          <div key={entry.segment} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-normal text-muted-foreground">
                {entry.segment}
              </span>
              <span className="font-semibold text-foreground">
                {entry.count.toLocaleString()}
                <span className="ml-1.5 font-light text-muted-foreground">
                  {Math.round((entry.count / total) * 100)}%
                </span>
              </span>
            </div>
            <div className="glass-inset h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-primary transition-all duration-200"
                style={{
                  width: `${(entry.count / max) * 100}%`,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        ))}
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
