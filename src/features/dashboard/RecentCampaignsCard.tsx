import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const channelMeta: Record<Channel, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle },
  EMAIL: { label: "Email", icon: Mail },
  SMS: { label: "SMS", icon: MessageSquare },
};

const statusStyles: Record<CampaignStatus, string> = {
  COMPLETED: "bg-success/10 text-success",
  SENDING: "bg-primary/10 text-primary",
  SCHEDULED: "bg-warning/10 text-warning",
  DRAFT: "bg-elevated text-muted-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function RecentCampaignsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>Latest campaign activity</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" asChild className="text-primary">
            <Link to="/campaigns">
              View all
              <ArrowUpRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-[#6E7482]">Campaign</TableHead>
              <TableHead className="text-[#6E7482]">Channel</TableHead>
              <TableHead className="text-[#6E7482]">Status</TableHead>
              <TableHead className="text-right text-[#6E7482]">
                Audience
              </TableHead>
              <TableHead className="text-right text-[#6E7482]">
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
                  className="border-border hover:bg-elevated/40"
                >
                  <TableCell className="font-medium text-foreground">
                    {campaign.name}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <channel.icon className="size-3.5" />
                      {channel.label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-md border-transparent text-[11px] font-medium capitalize",
                        statusStyles[campaign.status],
                      )}
                    >
                      {campaign.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {campaign.targetAudienceSize.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDate(campaign.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
