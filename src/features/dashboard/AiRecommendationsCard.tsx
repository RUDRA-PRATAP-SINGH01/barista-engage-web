import { Sparkles } from "lucide-react";
import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { aiRecommendations } from "./mock-data";

export function AiRecommendationsCard() {
  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="lg"
      glowIntensity="lg"
      borderRadius="16px"
      className="relative flex h-full min-w-0 flex-col gap-4 border border-primary/25 bg-gradient-to-b from-primary/[0.08] via-white/[0.06] to-white/[0.03] p-4 shadow-[0_0_48px_rgba(75,140,255,0.16)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-primary/10 blur-3xl"
      />

      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
            <Sparkles className="size-4 text-primary" />
          </span>
          AI Recommendations
        </GlassCardTitle>
        <GlassCardDescription>
          Suggested actions based on customer data
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="flex flex-col gap-3">
        {aiRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="glass-inset flex flex-col gap-1.5 rounded-[12px] border border-white/[0.07] p-4 transition-all duration-200 hover:border-primary/20"
          >
            <span className="text-sm font-semibold text-foreground">
              {rec.title}
            </span>
            <span className="text-xs font-light leading-relaxed text-muted-foreground">
              {rec.description}
            </span>
          </div>
        ))}
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
