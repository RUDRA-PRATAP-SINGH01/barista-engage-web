import { Megaphone, Send, Users, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { CampaignFunnelCard } from "@/features/dashboard/CampaignFunnelCard";
import { ChurnDistributionCard } from "@/features/dashboard/ChurnDistributionCard";
import { SegmentDistributionCard } from "@/features/dashboard/SegmentDistributionCard";
import { RecentCampaignsCard } from "@/features/dashboard/RecentCampaignsCard";
import { AiRecommendationsCard } from "@/features/dashboard/AiRecommendationsCard";
import { DashboardHeroStrip } from "@/features/dashboard/DashboardHeroStrip";
import { kpis } from "@/features/dashboard/mock-data";

export function DashboardPage() {
  return (
    <div className="dashboard-shell w-full min-w-0 pb-4">
      <div className="dashboard-content flex w-full min-w-0 flex-col gap-6">
        <PageHeader title="Dashboard" variant="glass" />

        <DashboardHeroStrip />

        {/* KPI row — delivery rate emphasized */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_0.9fr_0.9fr_1.35fr]">
          <KpiCard
            label="Total Customers"
            value={kpis.totalCustomers.value.toLocaleString()}
            delta={kpis.totalCustomers.delta}
            icon={UsersRound}
            variant="default"
          />
          <KpiCard
            label="Segments"
            value={String(kpis.segments.value)}
            delta={kpis.segments.delta}
            icon={Users}
            variant="muted"
          />
          <KpiCard
            label="Campaigns"
            value={String(kpis.campaigns.value)}
            delta={kpis.campaigns.delta}
            icon={Megaphone}
            variant="muted"
          />
          <KpiCard
            label="Delivery Rate"
            value={`${kpis.deliveryRate.value}%`}
            delta={kpis.deliveryRate.delta}
            icon={Send}
            variant="featured"
          />
        </div>

        {/* Analytics row */}
        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3">
          <CampaignFunnelCard />
          <ChurnDistributionCard />
          <SegmentDistributionCard />
        </div>

        {/* Tables row */}
        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          <RecentCampaignsCard />
          <AiRecommendationsCard />
        </div>
      </div>
    </div>
  );
}
