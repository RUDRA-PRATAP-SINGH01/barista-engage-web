import type { CampaignDto, SegmentDto } from "@/types/dtos";
import { formatLocaleNumber, normalizeNumber } from "@/lib/format-utils";

const HIGH_RISK_SEGMENT_NAMES = [
  "At Risk",
  "Lost Customer",
  "Need Attention",
] as const;

const MEDIUM_RISK_SEGMENT_NAMES = ["About To Sleep", "Can't Lose"] as const;

const LOW_RISK_SEGMENT_NAMES = [
  "Champion",
  "Loyal Customer",
  "Big Spender",
  "Promising",
  "New Customer",
  "Deal Hunter",
  "Cold Brew Lover",
] as const;

export interface DashboardKpis {
  totalCustomers: number;
  segmentCount: number;
  campaignCount: number;
  deliveryRate: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
}

export interface ChurnDistributionEntry {
  risk: string;
  count: number;
  color: string;
}

export interface SegmentDistributionEntry {
  segment: string;
  count: number;
}

export interface AiRecommendation {
  id: string;
  title: string;
  description: string;
}

export interface HeroStat {
  icon: "customers" | "atRisk" | "campaigns";
  value: string;
  label: string;
}

export interface HeroSummary {
  title: string;
  stats: HeroStat[];
  aiInsight: string;
}

function normalizeSegmentName(name: string): string {
  return name.trim().toLowerCase();
}

function matchesSegmentName(segmentName: string, expectedName: string): boolean {
  return normalizeSegmentName(segmentName) === normalizeSegmentName(expectedName);
}

function sumAudienceForSegmentNames(
  segments: SegmentDto[],
  names: readonly string[],
): number {
  const expectedNames = new Set(names.map(normalizeSegmentName));

  return segments.reduce((sum, segment) => {
    if (!expectedNames.has(normalizeSegmentName(segment.name))) {
      return sum;
    }

    return sum + normalizeNumber(segment.audienceSize);
  }, 0);
}

function hasSegmentNamed(segments: SegmentDto[], name: string): boolean {
  return segments.some((segment) => matchesSegmentName(segment.name, name));
}

export function computeDashboardKpis(
  segments: SegmentDto[],
  campaigns: CampaignDto[],
): DashboardKpis {
  const totalCustomers = segments.reduce(
    (sum, segment) => sum + normalizeNumber(segment.audienceSize),
    0,
  );
  const completedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "COMPLETED",
  ).length;
  const deliveryRate =
    campaigns.length > 0
      ? (completedCampaigns / campaigns.length) * 100
      : 0;

  return {
    totalCustomers,
    segmentCount: segments.length,
    campaignCount: campaigns.length,
    deliveryRate,
  };
}

export function getRecentCampaigns(campaigns: CampaignDto[]): CampaignDto[] {
  return [...campaigns]
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() -
        new Date(left.createdAt).getTime(),
    )
    .slice(0, 5);
}

export function buildCampaignFunnel(campaigns: CampaignDto[]): FunnelStage[] {
  const sent = campaigns.reduce(
    (sum, campaign) => sum + normalizeNumber(campaign.audienceSize),
    0,
  );
  const delivered = Math.round(sent * 0.87);
  const opened = Math.round(delivered * 0.68);
  const clicked = Math.round(opened * 0.18);

  return [
    { stage: "Sent", count: sent },
    { stage: "Delivered", count: delivered },
    { stage: "Opened", count: opened },
    { stage: "Clicked", count: clicked },
  ];
}

export function buildChurnDistribution(
  segments: SegmentDto[],
): ChurnDistributionEntry[] {
  return [
    {
      risk: "Low",
      count: sumAudienceForSegmentNames(segments, LOW_RISK_SEGMENT_NAMES),
      color: "var(--chart-3)",
    },
    {
      risk: "Medium",
      count: sumAudienceForSegmentNames(segments, MEDIUM_RISK_SEGMENT_NAMES),
      color: "var(--chart-2)",
    },
    {
      risk: "High",
      count: sumAudienceForSegmentNames(segments, HIGH_RISK_SEGMENT_NAMES),
      color: "var(--chart-1)",
    },
  ];
}

export function buildSegmentDistribution(
  segments: SegmentDto[],
): SegmentDistributionEntry[] {
  return [...segments]
    .sort((left, right) => normalizeNumber(right.audienceSize) - normalizeNumber(left.audienceSize))
    .map((segment) => ({
      segment: segment.name,
      count: normalizeNumber(segment.audienceSize),
    }));
}

export function buildAiRecommendations(
  segments: SegmentDto[],
): AiRecommendation[] {
  const recommendations: AiRecommendation[] = [];

  if (hasSegmentNamed(segments, "At Risk")) {
    recommendations.push({
      id: "at-risk",
      title: "Win-back campaign",
      description: "Launch win-back campaign for At Risk customers",
    });
  }

  if (hasSegmentNamed(segments, "Champion")) {
    recommendations.push({
      id: "champion",
      title: "VIP campaign",
      description: "Create VIP campaign for Champions",
    });
  }

  if (hasSegmentNamed(segments, "Lost Customer")) {
    recommendations.push({
      id: "lost-customer",
      title: "Reactivation offer",
      description: "Run reactivation offer for Lost Customers",
    });
  }

  if (hasSegmentNamed(segments, "Deal Hunter")) {
    recommendations.push({
      id: "deal-hunter",
      title: "Discount promotion",
      description: "Launch discount-focused promotion",
    });
  }

  return recommendations.slice(0, 3);
}

export function buildHeroSummary(
  segments: SegmentDto[],
  campaigns: CampaignDto[],
): HeroSummary {
  const kpis = computeDashboardKpis(segments, campaigns);
  const atRiskCustomers = sumAudienceForSegmentNames(
    segments,
    HIGH_RISK_SEGMENT_NAMES,
  );
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const campaignsThisWeek = campaigns.filter(
    (campaign) => new Date(campaign.createdAt) >= weekAgo,
  ).length;
  const recommendations = buildAiRecommendations(segments);

  return {
    title: "Customer Intelligence Overview",
    stats: [
      {
        icon: "customers",
        value: formatLocaleNumber(kpis.totalCustomers),
        label: "customers tracked",
      },
      {
        icon: "atRisk",
        value: formatLocaleNumber(atRiskCustomers),
        label: "customers at risk",
      },
      {
        icon: "campaigns",
        value: String(campaignsThisWeek),
        label: "campaigns launched this week",
      },
    ],
    aiInsight:
      recommendations[0]?.description ??
      "No insights available yet. Add segments to unlock recommendations.",
  };
}

export function isDashboardEmpty(
  segments: SegmentDto[],
  campaigns: CampaignDto[],
): boolean {
  return segments.length === 0 && campaigns.length === 0;
}
