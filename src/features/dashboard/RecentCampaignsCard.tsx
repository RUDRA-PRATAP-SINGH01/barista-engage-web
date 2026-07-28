import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatLocaleNumber } from "@/lib/format-utils";
import type { CampaignStatus, Channel } from "@/types";
import type { CampaignDto } from "@/types/dtos";
import {
  DASHBOARD_EMPTY_MESSAGE,
  DASHBOARD_ERROR_MESSAGE,
} from "./DashboardCardFeedback";

const channelMeta: Record<
  Channel,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle },
  EMAIL: { label: "Email", icon: Mail },
  SMS: { label: "SMS", icon: MessageSquare },
};

const statusStyles: Record<CampaignStatus, string> = {
  COMPLETED: "bg-muted text-foreground",
  SENDING: "bg-foreground text-background",
  SCHEDULED: "bg-muted text-muted-foreground",
  DRAFT: "bg-muted text-muted-foreground",
};

const SKELETON_ROW_COUNT = 5;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface RecentCampaignsCardProps {
  campaigns: CampaignDto[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

function RecentCampaignsSkeletonRows() {
  return (
    <>
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
        <TableRow key={index} className="border-border hover:bg-transparent">
          {Array.from({ length: 5 }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function RecentCampaignsCard({
  campaigns,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: RecentCampaignsCardProps) {
  return (
    <DashboardCard className="flex min-w-0 flex-col gap-4 py-5">
      <CardHeader className="pb-0">
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>Latest campaign activity</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="font-normal text-primary hover:bg-muted"
          >
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
            {isLoading && <RecentCampaignsSkeletonRows />}

            {!isLoading && isError && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm font-normal text-muted-foreground"
                >
                  {errorMessage ?? DASHBOARD_ERROR_MESSAGE}
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && isEmpty && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm font-normal text-muted-foreground"
                >
                  {DASHBOARD_EMPTY_MESSAGE}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              !isEmpty &&
              campaigns.map((campaign) => {
                const channel = channelMeta[campaign.channel];
                return (
                  <TableRow
                    key={campaign.id}
                    className="border-border transition-colors duration-150 hover:bg-muted/50"
                  >
                    <TableCell className="font-semibold text-foreground">
                      {campaign.name}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 font-normal text-muted-foreground">
                        <channel.icon className="size-3.5 text-primary" />
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
                      {formatLocaleNumber(campaign.audienceSize)}
                    </TableCell>
                    <TableCell className="text-right font-light text-muted-foreground">
                      {formatDate(campaign.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
    </DashboardCard>
  );
}
