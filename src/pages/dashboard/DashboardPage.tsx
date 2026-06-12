import { Megaphone, Send, Users, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { CampaignFunnelCard } from "@/features/dashboard/CampaignFunnelCard";
import { ChurnDistributionCard } from "@/features/dashboard/ChurnDistributionCard";
import { SegmentDistributionCard } from "@/features/dashboard/SegmentDistributionCard";
import { RecentCampaignsCard } from "@/features/dashboard/RecentCampaignsCard";
import { AiRecommendationsCard } from "@/features/dashboard/AiRecommendationsCard";
import { kpis } from "@/features/dashboard/mock-data";

export function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" />

      <div className="flex flex-col gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Customers"
            value={kpis.totalCustomers.value.toLocaleString()}
            delta={kpis.totalCustomers.delta}
            icon={UsersRound}
          />
          <KpiCard
            label="Segments"
            value={String(kpis.segments.value)}
            delta={kpis.segments.delta}
            icon={Users}
          />
          <KpiCard
            label="Campaigns"
            value={String(kpis.campaigns.value)}
            delta={kpis.campaigns.delta}
            icon={Megaphone}
          />
          <KpiCard
            label="Delivery Rate"
            value={`${kpis.deliveryRate.value}%`}
            delta={kpis.deliveryRate.delta}
            icon={Send}
          />
        </div>

        {/* Analytics row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CampaignFunnelCard />
          <ChurnDistributionCard />
          <SegmentDistributionCard />
        </div>

        {/* Tables row */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          <RecentCampaignsCard />
          <AiRecommendationsCard />
        </div>
      </div>
    </>
  );
}
