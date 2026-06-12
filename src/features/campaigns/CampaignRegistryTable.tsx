import {
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
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
import type { CampaignDto } from "@/types/dtos";
import { toHubStatus } from "./campaign-list-utils";
import { campaignGlassClassName, campaignGlassProps } from "./campaign-glass";
import {
  formatCampaignDate,
  formatLocaleNumber,
  formatRate,
  getChannelDisplay,
  hubStatusStyles,
} from "./campaign-ui-utils";

const SKELETON_ROW_COUNT = 6;

interface CampaignRegistryTableProps {
  campaigns: CampaignDto[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
  selectedCampaignId: string | null;
  onSelectCampaign: (id: string) => void;
  className?: string;
}

function RegistrySkeletonRows() {
  return (
    <>
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
        <TableRow
          key={index}
          className="border-white/[0.06] hover:bg-transparent"
        >
          {Array.from({ length: 8 }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full max-w-[120px] bg-white/10" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function CampaignRegistryTable({
  campaigns,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
  selectedCampaignId,
  onSelectCampaign,
  className,
}: CampaignRegistryTableProps) {
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
            {isLoading && <RegistrySkeletonRows />}

            {!isLoading && isError && (
              <TableRow className="border-white/[0.06] hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm font-normal text-muted-foreground"
                >
                  {errorMessage ?? "Unable to load campaigns. Please try again."}
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && isEmpty && (
              <TableRow className="border-white/[0.06] hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm font-normal text-muted-foreground"
                >
                  No campaigns found
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              !isEmpty &&
              campaigns.map((row) => {
                const channel = getChannelDisplay(row.channel);
                const ChannelIcon = channel.icon;
                const hubStatus = toHubStatus(row.status);
                const isSelected = selectedCampaignId === row.id;

                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onSelectCampaign(row.id)}
                    className={cn(
                      "cursor-pointer border-white/[0.06] transition-colors duration-150",
                      isSelected
                        ? "bg-primary/[0.08] hover:bg-primary/[0.1]"
                        : "hover:bg-white/[0.03]",
                    )}
                  >
                    <TableCell className="font-semibold text-foreground">
                      {row.name || "Untitled Campaign"}
                    </TableCell>
                    <TableCell className="font-normal text-muted-foreground">
                      {row.segmentName ?? "—"}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 font-normal text-muted-foreground">
                        <ChannelIcon className="size-3.5 shrink-0 text-primary/70" />
                        {channel.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-normal text-muted-foreground">
                      {formatLocaleNumber(row.audienceSize)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                          hubStatusStyles[hubStatus],
                        )}
                      >
                        {hubStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-[#8CB8FF]">
                      {formatRate(row.openRate)}
                    </TableCell>
                    <TableCell className="text-right font-normal text-foreground">
                      {formatRate(row.clickRate)}
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
