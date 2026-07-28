import {
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
import type { CampaignDto } from "@/types/dtos";
import { toHubStatus } from "./campaign-list-utils";
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

function rateTone(
  value: number | null | undefined,
  kind: "open" | "ctr" = "open",
) {
  if (value == null || Number.isNaN(value)) return "text-muted-foreground";
  const high = kind === "ctr" ? 7 : 50;
  const low = kind === "ctr" ? 4 : 30;
  if (value >= high) return "text-[var(--success)]";
  if (value < low) return "text-destructive";
  return "text-foreground";
}

function RegistrySkeletonRows() {
  return (
    <>
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
        <TableRow key={index} className="border-border hover:bg-transparent">
          {Array.from({ length: 8 }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full max-w-[120px]" />
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
    <DashboardCard className={cn("py-5", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Campaign Registry</CardTitle>
        <CardDescription>
          Monitor launched and scheduled campaigns
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-medium text-muted-foreground">
                Campaign Name
              </TableHead>
              <TableHead className="font-medium text-muted-foreground">
                Segment
              </TableHead>
              <TableHead className="font-medium text-muted-foreground">
                Channel
              </TableHead>
              <TableHead className="text-right font-medium text-muted-foreground">
                Audience Size
              </TableHead>
              <TableHead className="font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-right font-medium text-muted-foreground">
                Open Rate
              </TableHead>
              <TableHead className="text-right font-medium text-muted-foreground">
                CTR
              </TableHead>
              <TableHead className="text-right font-medium text-muted-foreground">
                Created Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <RegistrySkeletonRows />}

            {!isLoading && isError && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  {errorMessage ?? "Unable to load campaigns. Please try again."}
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && isEmpty && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-sm text-muted-foreground"
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
                      "cursor-pointer border-border transition-colors duration-150",
                      isSelected
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-muted/50",
                    )}
                  >
                    <TableCell className="font-semibold text-foreground">
                      {row.name || "Untitled Campaign"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.segmentName ?? "—"}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <ChannelIcon className="size-3.5 shrink-0 text-foreground" />
                        {channel.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {formatLocaleNumber(row.audienceSize)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                          hubStatusStyles[hubStatus],
                        )}
                      >
                        {hubStatus}
                      </span>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold tabular-nums",
                        rateTone(row.openRate, "open"),
                      )}
                    >
                      {formatRate(row.openRate)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold tabular-nums",
                        rateTone(row.clickRate, "ctr"),
                      )}
                    >
                      {formatRate(row.clickRate)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCampaignDate(row.createdAt)}
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
