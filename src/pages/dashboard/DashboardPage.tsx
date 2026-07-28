import { useMemo } from "react";
import { Megaphone, Send, Users, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/cards/KpiCard";
import { CampaignFunnelCard } from "@/features/dashboard/CampaignFunnelCard";
import { ChurnDistributionCard } from "@/features/dashboard/ChurnDistributionCard";
import { SegmentDistributionCard } from "@/features/dashboard/SegmentDistributionCard";
import { RecentCampaignsCard } from "@/features/dashboard/RecentCampaignsCard";
import { AiRecommendationsCard } from "@/features/dashboard/AiRecommendationsCard";
import { DashboardHeroStrip } from "@/features/dashboard/DashboardHeroStrip";
import { formatLocaleNumber } from "@/lib/format-utils";
import { DashboardKpiSkeleton } from "@/features/dashboard/DashboardCardFeedback";
import {
  buildAiRecommendations,
  buildCampaignFunnel,
  buildChurnDistribution,
  buildHeroSummary,
  buildSegmentDistribution,
  computeDashboardKpis,
  getRecentCampaigns,
  isDashboardEmpty,
} from "@/features/dashboard/dashboard-utils";
import { useDashboardCampaigns } from "@/features/dashboard/hooks/use-dashboard-campaigns";
import { useDashboardSegments } from "@/features/dashboard/hooks/use-dashboard-segments";

export function DashboardPage() {
  const campaignsQuery = useDashboardCampaigns();
  const segmentsQuery = useDashboardSegments();

  const isLoading = campaignsQuery.isLoading || segmentsQuery.isLoading;
  const campaigns = campaignsQuery.campaigns;
  const segments = segmentsQuery.segments;

  const dashboardEmpty = useMemo(
    () =>
      !isLoading &&
      !campaignsQuery.isError &&
      !segmentsQuery.isError &&
      isDashboardEmpty(segments, campaigns),
    [
      campaigns,
      campaignsQuery.isError,
      isLoading,
      segments,
      segmentsQuery.isError,
    ],
  );

  const kpis = useMemo(
    () => computeDashboardKpis(segments, campaigns),
    [campaigns, segments],
  );
  const heroSummary = useMemo(
    () =>
      dashboardEmpty ? null : buildHeroSummary(segments, campaigns),
    [campaigns, dashboardEmpty, segments],
  );
  const funnel = useMemo(
    () => buildCampaignFunnel(campaigns),
    [campaigns],
  );
  const churnDistribution = useMemo(
    () => buildChurnDistribution(segments),
    [segments],
  );
  const segmentDistribution = useMemo(
    () => buildSegmentDistribution(segments),
    [segments],
  );
  const recentCampaigns = useMemo(
    () => getRecentCampaigns(campaigns),
    [campaigns],
  );
  const recommendations = useMemo(
    () => buildAiRecommendations(segments),
    [segments],
  );

  const campaignsErrorMessage =
    campaignsQuery.userMessage ?? segmentsQuery.userMessage;
  const segmentsErrorMessage =
    segmentsQuery.userMessage ?? campaignsQuery.userMessage;

  return (
    <div className="dashboard-shell w-full min-w-0 pb-4">
      <div className="dashboard-content flex w-full min-w-0 flex-col gap-6">
        <PageHeader title="Dashboard" />

        <DashboardHeroStrip
          heroSummary={heroSummary}
          isLoading={isLoading}
          isError={campaignsQuery.isError || segmentsQuery.isError}
          errorMessage={campaignsErrorMessage ?? segmentsErrorMessage}
        />

        {/* KPI row — delivery rate emphasized */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_0.9fr_0.9fr_1.35fr]">
          {isLoading ? (
            <>
              <DashboardKpiSkeleton variant="default" />
              <DashboardKpiSkeleton variant="muted" />
              <DashboardKpiSkeleton variant="muted" />
              <DashboardKpiSkeleton variant="featured" />
            </>
          ) : (
            <>
              <KpiCard
                label="Total Customers"
                value={
                  segmentsQuery.isError
                    ? "—"
                    : formatLocaleNumber(kpis.totalCustomers)
                }
                delta={0}
                icon={UsersRound}
                variant="default"
              />
              <KpiCard
                label="Segments"
                value={
                  segmentsQuery.isError ? "—" : String(kpis.segmentCount)
                }
                delta={0}
                icon={Users}
                variant="muted"
              />
              <KpiCard
                label="Campaigns"
                value={
                  campaignsQuery.isError ? "—" : String(kpis.campaignCount)
                }
                delta={0}
                icon={Megaphone}
                variant="muted"
              />
              <KpiCard
                label="Delivery Rate"
                value={
                  campaignsQuery.isError
                    ? "—"
                    : `${kpis.deliveryRate.toFixed(1)}%`
                }
                delta={0}
                icon={Send}
                variant="featured"
              />
            </>
          )}
        </div>

        {/* Analytics row */}
        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3">
          <CampaignFunnelCard
            funnel={funnel}
            isLoading={isLoading}
            isError={campaignsQuery.isError}
            isEmpty={dashboardEmpty || campaigns.length === 0}
            errorMessage={campaignsQuery.userMessage}
          />
          <ChurnDistributionCard
            churnDistribution={churnDistribution}
            isLoading={isLoading}
            isError={segmentsQuery.isError}
            isEmpty={dashboardEmpty || segments.length === 0}
            errorMessage={segmentsErrorMessage}
          />
          <SegmentDistributionCard
            segmentDistribution={segmentDistribution}
            isLoading={isLoading}
            isError={segmentsQuery.isError}
            isEmpty={dashboardEmpty || segments.length === 0}
            errorMessage={segmentsErrorMessage}
          />
        </div>

        {/* Tables row */}
        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          <RecentCampaignsCard
            campaigns={recentCampaigns}
            isLoading={isLoading}
            isError={campaignsQuery.isError}
            isEmpty={dashboardEmpty || campaigns.length === 0}
            errorMessage={campaignsQuery.userMessage}
          />
          <AiRecommendationsCard
            recommendations={recommendations}
            isLoading={isLoading}
            isError={segmentsQuery.isError}
            isEmpty={
              dashboardEmpty ||
              (segments.length > 0 && recommendations.length === 0)
            }
            errorMessage={segmentsErrorMessage}
          />
        </div>
      </div>
    </div>
  );
}
