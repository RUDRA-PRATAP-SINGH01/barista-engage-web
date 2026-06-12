import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import {
  channelMeta,
  formatCampaignDate,
  formatRate,
  hubStatusStyles,
} from "./campaign-ui-utils";
import { campaignRegistry } from "./mock-data";

export function CampaignRegistryTable({
  className,
}: {
  className?: string;
}) {
  return (
    <LiquidGlassCard
      {...campaignGlassProps}
      className={cn(campaignGlassClassName, "min-h-0 flex-1", className)}
    >
      <GlassCardHeader className="gap-1 pb-3">
        <GlassCardTitle>Campaign Registry</GlassCardTitle>
        <GlassCardDescription>
          Monitor all launched and scheduled customer campaigns
        </GlassCardDescription>
      </GlassCardHeader>

      <GlassCardContent className="min-h-0 flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] hover:bg-transparent">
              <TableHead className="font-normal text-muted-foreground">
                Campaign Name
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Segment
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Channel
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                Audience Size
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                Open Rate
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                CTR
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                Created Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignRegistry.map((row) => {
              const channel = channelMeta[row.channel];
              const ChannelIcon = channel.icon;

              return (
                <TableRow
                  key={row.id}
                  className="border-white/[0.06] transition-colors duration-150 hover:bg-white/[0.03]"
                >
                  <TableCell className="font-semibold text-foreground">
                    {row.name}
                  </TableCell>
                  <TableCell className="font-normal text-muted-foreground">
                    {row.segment}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 font-normal text-muted-foreground">
                      <ChannelIcon className="size-3.5 shrink-0 text-primary/70" />
                      {channel.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-normal text-muted-foreground">
                    {row.audienceSize.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                        hubStatusStyles[row.status],
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-[#8CB8FF]">
                    {formatRate(row.openRate)}
                  </TableCell>
                  <TableCell className="text-right font-normal text-foreground">
                    {formatRate(row.ctr)}
                  </TableCell>
                  <TableCell className="text-right font-light text-muted-foreground">
                    {formatCampaignDate(row.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
