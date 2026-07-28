import { DashboardCard } from "@/components/shared/DashboardCard";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CampaignListKpis } from "./campaign-list-utils";

const kpiLabels = [
  "Total Campaigns",
  "Active",
  "Draft",
  "Completed",
] as const;

interface CampaignKpiRowProps {
  kpis: CampaignListKpis | null;
  isLoading: boolean;
}

function KpiSkeletonCard() {
  return (
    <DashboardCard className="py-4">
      <CardHeader className="gap-3 space-y-0">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-10" />
      </CardHeader>
    </DashboardCard>
  );
}

export function CampaignKpiRow({ kpis, isLoading }: CampaignKpiRowProps) {
  const kpiValues = kpis
    ? [kpis.total, kpis.active, kpis.draft, kpis.completed]
    : [];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpiLabels.map((label, index) =>
        isLoading ? (
          <KpiSkeletonCard key={label} />
        ) : (
          <DashboardCard key={label} className="py-4">
            <CardHeader className="gap-2 space-y-0">
              <CardDescription className="text-xs font-medium text-muted-foreground">
                {label}
              </CardDescription>
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                {kpiValues[index] ?? 0}
              </span>
            </CardHeader>
          </DashboardCard>
        ),
      )}
    </div>
  );
}
