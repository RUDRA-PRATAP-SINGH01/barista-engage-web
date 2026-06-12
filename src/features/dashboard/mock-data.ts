// Static placeholder data for the dashboard shell.
// Will be replaced by real API data (TanStack Query) during backend integration.
import type { CampaignListItem } from "@/types";

export const kpis = {
  totalCustomers: { value: 5000, delta: 3.2 },
  segments: { value: 12, delta: 8.4 },
  campaigns: { value: 8, delta: 12.5 },
  deliveryRate: { value: 86.8, delta: 1.9 },
};

export const funnel = [
  { stage: "Sent", count: 4520 },
  { stage: "Delivered", count: 4180 },
  { stage: "Opened", count: 2890 },
  { stage: "Clicked", count: 412 },
];

export const churnDistribution = [
  { risk: "Low", count: 2850, color: "var(--success)" },
  { risk: "Medium", count: 1240, color: "var(--warning)" },
  { risk: "High", count: 910, color: "var(--destructive)" },
];

export const segmentDistribution = [
  { segment: "Champion", count: 640 },
  { segment: "Loyal Customer", count: 1380 },
  { segment: "Big Spender", count: 520 },
  { segment: "At Risk", count: 1410 },
  { segment: "Lost Customer", count: 1050 },
];

export const recentCampaigns: CampaignListItem[] = [
  {
    id: "c1",
    name: "Cold Brew Second Chance",
    channel: "WHATSAPP",
    status: "COMPLETED",
    targetAudienceSize: 167,
    createdAt: "2026-06-10T11:20:00Z",
  },
  {
    id: "c2",
    name: "Monsoon Latte Launch",
    channel: "EMAIL",
    status: "COMPLETED",
    targetAudienceSize: 1380,
    createdAt: "2026-06-08T09:05:00Z",
  },
  {
    id: "c3",
    name: "Gold Tier Weekend Treat",
    channel: "WHATSAPP",
    status: "SENDING",
    targetAudienceSize: 640,
    createdAt: "2026-06-07T16:42:00Z",
  },
  {
    id: "c4",
    name: "Win Back Lost Customers",
    channel: "SMS",
    status: "COMPLETED",
    targetAudienceSize: 1050,
    createdAt: "2026-06-03T10:15:00Z",
  },
  {
    id: "c5",
    name: "New Store Opening - Pune",
    channel: "EMAIL",
    status: "DRAFT",
    targetAudienceSize: 410,
    createdAt: "2026-06-01T13:30:00Z",
  },
];

export const aiRecommendations = [
  {
    id: "r1",
    title: "Re-engage at-risk cold brew lovers",
    description:
      "1,410 customers are at risk. A WhatsApp win-back offer historically lifts open rates by 12% for this group.",
  },
  {
    id: "r2",
    title: "Shift Gold tier campaigns to WhatsApp",
    description:
      "Gold tier customers open 74% of WhatsApp messages vs 38% of emails. Channel switch could improve engagement.",
  },
  {
    id: "r3",
    title: "Target Deal Hunters with click-focused offers",
    description:
      "Deal Hunter personas click 20% above baseline. Discount-led copy performs best for this segment.",
  },
];
