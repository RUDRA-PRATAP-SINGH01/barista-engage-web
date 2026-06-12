import type { SegmentFilterDto } from "@/types/dtos";
import type { HealthBadgeTier } from "./segment-ui-utils";
import type {
  SegmentCampaignPerformance,
  SegmentDNA,
  SegmentMarketingIntel,
  SegmentTrendPoint,
} from "./segment-detail-data";
import {
  computeSegmentHealthScore,
  dnaToChartData,
} from "./segment-detail-data";

export interface SegmentCardViewModel {
  id: string;
  name: string;
  audienceSize: number;
  description: string;
  growth: number;
  status: string;
  healthTier: HealthBadgeTier;
  weeklyActivity: [number, number, number, number];
}

export interface SegmentDetailViewModel {
  segmentId: string;
  name: string;
  description: string;
  audienceSize: number;
  growth: number;
  status: string;
  sharePercent: number;
  dna: SegmentDNA;
  healthScore: number;
  chartData: ReturnType<typeof dnaToChartData>;
  rules: string[];
  marketing: SegmentMarketingIntel;
  campaignPerformance: SegmentCampaignPerformance;
}

const SEGMENT_DNA_BY_NAME: Record<string, SegmentDNA> = {
  champion: {
    recency: 95,
    frequency: 90,
    spend: 92,
    engagement: 88,
    retention: 96,
  },
  "loyal customer": {
    recency: 80,
    frequency: 82,
    spend: 70,
    engagement: 85,
    retention: 88,
  },
  "big spender": {
    recency: 65,
    frequency: 70,
    spend: 95,
    engagement: 68,
    retention: 72,
  },
  "at risk": {
    recency: 30,
    frequency: 40,
    spend: 50,
    engagement: 25,
    retention: 35,
  },
  "lost customer": {
    recency: 10,
    frequency: 15,
    spend: 25,
    engagement: 5,
    retention: 10,
  },
};

const HEALTHY_SEGMENT_NAMES = new Set([
  "champion",
  "loyal customer",
  "big spender",
]);

const WATCH_SEGMENT_NAMES = new Set([
  "promising",
  "deal hunter",
  "new customer",
  "can't lose",
  "cold brew lover",
]);

const CRITICAL_SEGMENT_NAMES = new Set([
  "at risk",
  "lost customer",
  "need attention",
  "about to sleep",
]);

const MARKETING_RECOMMENDATIONS: Record<string, string> = {
  champion: "VIP rewards and exclusivity campaigns.",
  "loyal customer": "Retention and upsell campaigns.",
  "big spender": "Premium product campaigns.",
  "at risk": "Win-back and recovery campaigns.",
  "lost customer": "Reactivation campaigns.",
  "need attention": "Nudge campaigns.",
  "deal hunter": "Discount campaigns.",
  promising: "Nurture campaigns to increase repeat purchase frequency.",
  "new customer": "Onboarding and welcome offer campaigns.",
  "about to sleep": "Re-engagement reminders before dormancy.",
  "can't lose": "High-touch retention campaigns for valuable at-risk customers.",
  "cold brew lover": "Product-led campaigns featuring cold brew launches.",
};

const DEFAULT_CAMPAIGN_PERFORMANCE: SegmentCampaignPerformance = {
  campaignsSent: 0,
  averageOpenRate: "—",
  averageCtr: "—",
  bestCampaign: "—",
};

function normalizeSegmentName(name: string): string {
  return name.trim().toLowerCase();
}

function getRuleValue(
  rules: SegmentFilterDto[],
  field: string,
): string | number | boolean | undefined {
  const rule = rules.find(
    (entry) => normalizeSegmentName(entry.field) === normalizeSegmentName(field),
  );
  return rule?.value;
}

function formatRuleValue(value: string | number | boolean): string {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return String(value);
}

function formatFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    city: "City",
    loyaltyTier: "Loyalty Tier",
    churnRisk: "Churn Risk",
    favoriteDrink: "Favorite Drink",
    rfmSegment: "RFM Segment",
    lifetimeSpend: "Lifetime Spend",
    totalOrders: "Total Orders",
    daysSinceLastOrder: "Days Since Last Order",
  };

  return labels[field] ?? field;
}

export function formatSegmentRule(rule: SegmentFilterDto): string {
  const label = formatFieldLabel(rule.field);
  const value = formatRuleValue(rule.value);

  if (rule.operator === "equals" || rule.operator === "matches") {
    return `${label} = ${value}`;
  }

  return `${label} ${rule.operator} ${value}`;
}

export function formatSegmentRules(rules: SegmentFilterDto[]): string[] {
  return rules.map(formatSegmentRule);
}

export function getSegmentHealthTier(segmentName: string): HealthBadgeTier {
  const normalized = normalizeSegmentName(segmentName);

  if (HEALTHY_SEGMENT_NAMES.has(normalized)) {
    return "healthy";
  }

  if (CRITICAL_SEGMENT_NAMES.has(normalized)) {
    return "critical";
  }

  if (WATCH_SEGMENT_NAMES.has(normalized)) {
    return "watch";
  }

  return "watch";
}

export function getSegmentDna(segmentName: string): SegmentDNA {
  const normalized = normalizeSegmentName(segmentName);
  const mapped = SEGMENT_DNA_BY_NAME[normalized];

  if (mapped) {
    return mapped;
  }

  const tier = getSegmentHealthTier(segmentName);

  if (tier === "healthy") {
    return {
      recency: 75,
      frequency: 78,
      spend: 72,
      engagement: 76,
      retention: 80,
    };
  }

  if (tier === "critical") {
    return {
      recency: 20,
      frequency: 25,
      spend: 30,
      engagement: 15,
      retention: 22,
    };
  }

  return {
    recency: 55,
    frequency: 58,
    spend: 52,
    engagement: 50,
    retention: 54,
  };
}

export function getSegmentGrowthPercent(segmentName: string): number {
  const tier = getSegmentHealthTier(segmentName);

  if (tier === "healthy") {
    return 8;
  }

  if (tier === "critical") {
    return -4.5;
  }

  return 2.5;
}

export function getSegmentStatusLabel(segmentName: string): string {
  const normalized = normalizeSegmentName(segmentName);

  if (normalized === "champion") {
    return "High value";
  }

  if (normalized === "loyal customer") {
    return "Stable";
  }

  if (normalized === "big spender") {
    return "Premium";
  }

  if (normalized === "lost customer") {
    return "Churned";
  }

  if (normalized === "new customer") {
    return "Growing";
  }

  if (normalized === "deal hunter") {
    return "Promo-led";
  }

  if (normalized === "cold brew lover") {
    return "Engaged";
  }

  const tier = getSegmentHealthTier(segmentName);

  if (tier === "critical") {
    return "At risk";
  }

  if (tier === "watch") {
    return "Watch";
  }

  return "Stable";
}

export function deriveWeeklyActivity(
  dna: SegmentDNA,
): [number, number, number, number] {
  return [
    Math.round(dna.engagement * 0.65),
    Math.round(dna.engagement * 0.78),
    Math.round(dna.engagement * 0.88),
    Math.round(dna.engagement * 0.95),
  ];
}

function getMarketingRecommendation(segmentName: string): string {
  const normalized = normalizeSegmentName(segmentName);
  return (
    MARKETING_RECOMMENDATIONS[normalized] ??
    "Target this segment with personalized campaigns aligned to its behavior."
  );
}

function mapChurnRiskToLevel(
  value: string | number | boolean | undefined,
): SegmentMarketingIntel["riskLevel"] {
  if (typeof value !== "string") {
    return "Medium";
  }

  const normalized = value.toUpperCase();

  if (normalized === "HIGH") {
    return "High";
  }

  if (normalized === "LOW") {
    return "Low";
  }

  if (normalized === "CRITICAL") {
    return "Critical";
  }

  return "Medium";
}

function buildSegmentTrend(dna: SegmentDNA): SegmentTrendPoint[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;
  const base = computeSegmentHealthScore(dna);

  return months.map((month, index) => ({
    month,
    value: Math.max(5, Math.round(base - (months.length - 1 - index) * 2)),
  }));
}

export function buildSegmentMarketingIntel(
  segmentName: string,
  rules: SegmentFilterDto[],
): SegmentMarketingIntel {
  const recommendation = getMarketingRecommendation(segmentName);
  const healthTier = getSegmentHealthTier(segmentName);
  const dna = getSegmentDna(segmentName);
  const favoriteDrink = getRuleValue(rules, "favoriteDrink");
  const city = getRuleValue(rules, "city");
  const churnRisk = getRuleValue(rules, "churnRisk");

  return {
    bestChannel: "WhatsApp",
    preferredDrink: favoriteDrink ? formatRuleValue(favoriteDrink) : "—",
    topCity: city ? formatRuleValue(city) : "—",
    riskLevel:
      churnRisk !== undefined
        ? mapChurnRiskToLevel(churnRisk)
        : healthTier === "critical"
          ? "Critical"
          : healthTier === "watch"
            ? "Medium"
            : "Low",
    campaignsRun: 0,
    averageSpend: "—",
    recommendedAction: recommendation,
    aiInsight: recommendation,
    expectedImpactEngagement: "—",
    expectedImpactRetention: "—",
    actionTimeline: recommendation,
    trend: buildSegmentTrend(dna),
  };
}

export function buildSegmentCardViewModel(segment: {
  id: string;
  name: string;
  description: string | null;
  audienceSize: number;
}): SegmentCardViewModel {
  const dna = getSegmentDna(segment.name);

  return {
    id: segment.id,
    name: segment.name,
    audienceSize: segment.audienceSize,
    description:
      segment.description?.trim() ||
      "Customer segment defined by saved audience rules.",
    growth: getSegmentGrowthPercent(segment.name),
    status: getSegmentStatusLabel(segment.name),
    healthTier: getSegmentHealthTier(segment.name),
    weeklyActivity: deriveWeeklyActivity(dna),
  };
}

export function computeSharePercent(
  audienceSize: number,
  totalAudience: number,
): number {
  if (totalAudience <= 0) {
    return 0;
  }

  return Math.round((audienceSize / totalAudience) * 100);
}

export function buildSegmentDetailViewModel(
  segment: {
    id: string;
    name: string;
    description: string | null;
    audienceSize: number;
    rules: SegmentFilterDto[];
  },
  totalAudience: number,
): SegmentDetailViewModel {
  const dna = getSegmentDna(segment.name);
  const marketing = buildSegmentMarketingIntel(segment.name, segment.rules);

  return {
    segmentId: segment.id,
    name: segment.name,
    description:
      segment.description?.trim() ||
      "Customer segment defined by saved audience rules.",
    audienceSize: segment.audienceSize,
    growth: getSegmentGrowthPercent(segment.name),
    status: getSegmentStatusLabel(segment.name),
    sharePercent: computeSharePercent(segment.audienceSize, totalAudience),
    dna,
    healthScore: computeSegmentHealthScore(dna),
    chartData: dnaToChartData(dna),
    rules: formatSegmentRules(segment.rules),
    marketing,
    campaignPerformance: DEFAULT_CAMPAIGN_PERFORMANCE,
  };
}
