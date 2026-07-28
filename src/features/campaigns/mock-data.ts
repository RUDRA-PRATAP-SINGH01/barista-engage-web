import type { Channel } from "@/types";

export const topCampaignKpi = {
  name: "Cold Brew Second Chance",
  openRate: 74.5,
  aboveAverage: 12.4,
};

export const campaignPerformanceTrends = [
  {
    week: "Week 1",
    coldBrew: 62,
    monsoonLatte: 34,
    championVip: 58,
  },
  {
    week: "Week 2",
    coldBrew: 68,
    monsoonLatte: 38,
    championVip: 64,
  },
  {
    week: "Week 3",
    coldBrew: 71,
    monsoonLatte: 40,
    championVip: 68,
  },
  {
    week: "Week 4",
    coldBrew: 74.5,
    monsoonLatte: 42,
    championVip: 71.6,
  },
];

export const campaignStatusBreakdown = [
  { status: "Completed", count: 6, color: "var(--foreground)" },
  { status: "Active", count: 1, color: "var(--muted-foreground)" },
  { status: "Draft", count: 1, color: "var(--chart-4)" },
];

export const channelPerformance = [
  { channel: "WHATSAPP" as Channel, openRate: 74, ctr: 8.9 },
  { channel: "EMAIL" as Channel, openRate: 44, ctr: 7.8 },
  { channel: "SMS" as Channel, openRate: 58, ctr: 5.1 },
];

export const aiCampaignInsights = [
  {
    id: "i1",
    text: "Champions prefer WhatsApp",
    highlight: "+32% open rate",
  },
  {
    id: "i2",
    text: "Cold Brew Lovers show highest CTR",
    highlight: "9.0% avg CTR",
  },
  {
    id: "i3",
    text: "Lost Customers respond best to discounts",
    highlight: "24% re-engagement lift",
  },
  {
    id: "i4",
    text: "At Risk customers recover faster within 7 days",
    highlight: "18% faster recovery",
  },
];

export const bestPerformingAudience = {
  segment: "Champion Segment",
  openRate: 74.5,
  ctr: 10.2,
  audience: 640,
};

export const segmentImpact = [
  { segment: "Champion", revenue: 92 },
  { segment: "Loyal Customer", revenue: 78 },
  { segment: "Big Spender", revenue: 65 },
  { segment: "At Risk", revenue: 48 },
  { segment: "Lost Customer", revenue: 32 },
];

export const campaignHealth = {
  deliveryRate: 86.8,
  openRate: 68.2,
  ctr: 8.4,
  clickToOpenRate: 12.3,
};
