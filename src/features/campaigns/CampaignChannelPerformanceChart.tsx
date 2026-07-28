import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { cn } from "@/lib/utils";
import type { Channel } from "@/types";
import { channelMeta } from "./campaign-ui-utils";
import { channelPerformance } from "./mock-data";

const channelIcons: Record<Channel, typeof MessageCircle> = {
  WHATSAPP: MessageCircle,
  EMAIL: Mail,
  SMS: MessageSquare,
};

function rateClass(rate: number) {
  if (rate >= 60) return "text-[var(--success)]";
  if (rate < 45) return "text-destructive";
  return "text-foreground";
}

export function CampaignChannelPerformanceChart({
  className,
}: {
  className?: string;
}) {
  const maxOpen = Math.max(...channelPerformance.map((c) => c.openRate));

  return (
    <DashboardCard className={cn("py-5", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Channel Performance</CardTitle>
        <CardDescription>Open rate by channel</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {channelPerformance.map((item) => {
          const Icon = channelIcons[item.channel];
          const width = `${(item.openRate / maxOpen) * 100}%`;

          return (
            <div key={item.channel} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Icon className="size-3.5 text-foreground" />
                  {channelMeta[item.channel].label}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    rateClass(item.openRate),
                  )}
                >
                  {item.openRate}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-foreground"
                  style={{ width, opacity: 0.35 + (item.openRate / maxOpen) * 0.65 }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">
                CTR{" "}
                <span
                  className={cn(
                    "font-semibold",
                    item.ctr >= 7
                      ? "text-[var(--success)]"
                      : "text-destructive",
                  )}
                >
                  {item.ctr}%
                </span>
              </span>
            </div>
          );
        })}
      </CardContent>
    </DashboardCard>
  );
}
