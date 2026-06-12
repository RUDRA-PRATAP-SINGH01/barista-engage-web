import type { CampaignStatus, Channel } from "@/types";

export type CampaignHubStatus = "Draft" | "Active" | "Completed";

export interface CampaignRegistryRow {
  id: string;
  name: string;
  segment: string;
  channel: Channel;
  audienceSize: number;
  status: CampaignHubStatus;
  openRate: number | null;
  ctr: number | null;
  createdAt: string;
}

export const campaignKpis = {
  total: 8,
  active: 1,
  draft: 1,
  completed: 6,
  avgOpenRate: 68.2,
};

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
  { status: "Completed", count: 6, color: "#4b8cff" },
  { status: "Active", count: 1, color: "#8CB8FF" },
  { status: "Draft", count: 1, color: "rgba(163, 167, 178, 0.5)" },
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

export const campaignRegistry: CampaignRegistryRow[] = [
  {
    id: "c1",
    name: "Cold Brew Second Chance",
    segment: "Cold Brew Lover",
    channel: "WHATSAPP",
    audienceSize: 167,
    status: "Completed",
    openRate: 74.5,
    ctr: 9.0,
    createdAt: "2026-06-10T11:20:00Z",
  },
  {
    id: "c2",
    name: "Monsoon Latte Launch",
    segment: "Loyal Customer",
    channel: "EMAIL",
    audienceSize: 1380,
    status: "Completed",
    openRate: 42.0,
    ctr: 6.2,
    createdAt: "2026-06-08T09:05:00Z",
  },
  {
    id: "c3",
    name: "Gold Tier Weekend Treat",
    segment: "Champion",
    channel: "WHATSAPP",
    audienceSize: 640,
    status: "Active",
    openRate: 58.3,
    ctr: 7.1,
    createdAt: "2026-06-07T16:42:00Z",
  },
  {
    id: "c4",
    name: "Win Back Lost Customers",
    segment: "Lost Customer",
    channel: "SMS",
    audienceSize: 1050,
    status: "Completed",
    openRate: 61.0,
    ctr: 5.4,
    createdAt: "2026-06-03T10:15:00Z",
  },
  {
    id: "c5",
    name: "New Store Opening - Pune",
    segment: "New Customer",
    channel: "EMAIL",
    audienceSize: 410,
    status: "Draft",
    openRate: null,
    ctr: null,
    createdAt: "2026-06-01T13:30:00Z",
  },
  {
    id: "c6",
    name: "At-Risk WhatsApp Nudge",
    segment: "At Risk",
    channel: "WHATSAPP",
    audienceSize: 1410,
    status: "Completed",
    openRate: 63.8,
    ctr: 8.1,
    createdAt: "2026-05-28T08:00:00Z",
  },
  {
    id: "c7",
    name: "Deal Hunter Flash Sale",
    segment: "Deal Hunter",
    channel: "EMAIL",
    audienceSize: 390,
    status: "Completed",
    openRate: 51.2,
    ctr: 11.4,
    createdAt: "2026-05-22T14:30:00Z",
  },
  {
    id: "c8",
    name: "Champion VIP Early Access",
    segment: "Champion",
    channel: "WHATSAPP",
    audienceSize: 640,
    status: "Completed",
    openRate: 71.6,
    ctr: 10.2,
    createdAt: "2026-05-18T10:00:00Z",
  },
];

export const campaignHealth = {
  deliveryRate: 86.8,
  openRate: 68.2,
  ctr: 8.4,
  clickToOpenRate: 12.3,
};

/** Maps API status to hub display status */
export function toHubStatus(status: CampaignStatus): CampaignHubStatus {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "SENDING":
    case "SCHEDULED":
      return "Active";
    case "COMPLETED":
      return "Completed";
  }
}
