import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GlassCardAction,
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
import type { CampaignStatus, Channel } from "@/types";
import { recentCampaigns } from "./mock-data";

const channelMeta: Record<
  Channel,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle },
  EMAIL: { label: "Email", icon: Mail },
  SMS: { label: "SMS", icon: MessageSquare },
};

const statusStyles: Record<CampaignStatus, string> = {
  COMPLETED: "bg-primary/15 text-[#8CB8FF]",
  SENDING: "bg-primary/25 text-primary",
  SCHEDULED: "bg-white/5 text-muted-foreground",
  DRAFT: "bg-white/5 text-muted-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function RecentCampaignsCard() {
  return (
    <LiquidGlassCard
      blurIntensity="xl"
      shadowIntensity="md"
      glowIntensity="sm"
      borderRadius="16px"
      className="flex h-full min-w-0 flex-col gap-4 bg-white/8 p-4"
    >
      <GlassCardHeader>
        <GlassCardTitle>Recent Campaigns</GlassCardTitle>
        <GlassCardDescription>Latest campaign activity</GlassCardDescription>
        <GlassCardAction>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="font-normal text-primary hover:bg-white/5"
          >
            <Link to="/campaigns">
              View all
              <ArrowUpRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </Button>
        </GlassCardAction>
      </GlassCardHeader>
      <GlassCardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] hover:bg-transparent">
              <TableHead className="font-normal text-muted-foreground">
                Campaign
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Channel
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                Audience
              </TableHead>
              <TableHead className="text-right font-normal text-muted-foreground">
                Created
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCampaigns.map((campaign) => {
              const channel = channelMeta[campaign.channel];
              return (
                <TableRow
                  key={campaign.id}
                  className="border-white/[0.06] transition-colors duration-150 hover:bg-white/[0.03]"
                >
                  <TableCell className="font-semibold text-foreground">
                    {campaign.name}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 font-normal text-muted-foreground">
                      <channel.icon className="size-3.5 text-primary/70" />
                      {channel.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-md border-transparent text-[11px] font-semibold capitalize",
                        statusStyles[campaign.status],
                      )}
                    >
                      {campaign.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-normal text-muted-foreground">
                    {campaign.targetAudienceSize.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-light text-muted-foreground">
                    {formatDate(campaign.createdAt)}
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
