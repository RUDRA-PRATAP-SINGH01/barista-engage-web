import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";
import type { Channel } from "@/types";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import { channelMeta } from "./campaign-ui-utils";
import { channelPerformance } from "./mock-data";

const channelIcons: Record<Channel, typeof MessageCircle> = {
  WHATSAPP: MessageCircle,
  EMAIL: Mail,
  SMS: MessageSquare,
};

export function CampaignChannelPerformanceChart({
  className,
}: {
  className?: string;
}) {
  const maxOpen = Math.max(...channelPerformance.map((c) => c.openRate));

  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, className)}
    >
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Channel Performance
      </h3>
      <div className="mt-3 flex flex-col gap-3">
        {channelPerformance.map((item) => {
          const Icon = channelIcons[item.channel];
          const width = `${(item.openRate / maxOpen) * 100}%`;

          return (
            <div key={item.channel} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground">
                  <Icon className="size-3.5 text-primary/70" />
                  {channelMeta[item.channel].label}
                </span>
                <span className="text-xs font-semibold text-[#8CB8FF]">
                  {item.openRate}%
                </span>
              </div>
              <div className="glass-inset h-2 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(75,140,255,0.35)]"
                  style={{ width }}
                />
              </div>
              <span className="text-[10px] font-light text-muted-foreground">
                CTR {item.ctr}%
              </span>
            </div>
          );
        })}
      </div>
    </LiquidGlassCard>
  );
}
