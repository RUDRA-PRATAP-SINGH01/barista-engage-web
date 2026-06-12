export interface SegmentItem {
  id: string;
  name: string;
  count: number;
  description: string;
  growth: number;
  status: string;
  weeklyActivity: [number, number, number, number];
}

export const segments: SegmentItem[] = [
  {
    id: "champion",
    name: "Champion",
    count: 640,
    description: "Top-tier customers with high recency, frequency, and spend.",
    growth: 12.4,
    status: "High value",
    weeklyActivity: [42, 58, 71, 68],
  },
  {
    id: "loyal",
    name: "Loyal Customer",
    count: 1380,
    description: "Consistent repeat buyers with strong engagement history.",
    growth: 8.2,
    status: "Stable",
    weeklyActivity: [55, 62, 60, 74],
  },
  {
    id: "big-spender",
    name: "Big Spender",
    count: 520,
    description: "High average order value with moderate visit frequency.",
    growth: 5.6,
    status: "Premium",
    weeklyActivity: [38, 45, 52, 48],
  },
  {
    id: "at-risk",
    name: "At Risk",
    count: 1410,
    description: "Previously active customers showing declining engagement.",
    growth: -4.1,
    status: "Watch",
    weeklyActivity: [68, 54, 41, 32],
  },
  {
    id: "lost",
    name: "Lost Customer",
    count: 1050,
    description: "No recent purchases; prime candidates for win-back.",
    growth: -9.3,
    status: "Churned",
    weeklyActivity: [72, 48, 28, 18],
  },
  {
    id: "new",
    name: "New Customer",
    count: 430,
    description: "Recently acquired customers in their first 30-day window.",
    growth: 18.7,
    status: "Growing",
    weeklyActivity: [22, 35, 48, 62],
  },
  {
    id: "promising",
    name: "Promising",
    count: 310,
    description: "Recent buyers with potential to become loyal customers.",
    growth: 14.2,
    status: "Emerging",
    weeklyActivity: [28, 40, 55, 58],
  },
  {
    id: "need-attention",
    name: "Need Attention",
    count: 285,
    description: "Average performers starting to slip on recency.",
    growth: -2.8,
    status: "At risk",
    weeklyActivity: [50, 44, 36, 30],
  },
  {
    id: "about-to-sleep",
    name: "About to Sleep",
    count: 220,
    description: "Low recent activity; intervention recommended soon.",
    growth: -6.5,
    status: "Dormant",
    weeklyActivity: [46, 38, 24, 16],
  },
  {
    id: "cant-lose",
    name: "Can't Lose",
    count: 175,
    description: "High-value customers at risk of churning.",
    growth: -1.2,
    status: "Critical",
    weeklyActivity: [60, 52, 44, 40],
  },
  {
    id: "deal-hunter",
    name: "Deal Hunter",
    count: 390,
    description: "Responds strongly to discounts and limited-time offers.",
    growth: 6.9,
    status: "Promo-led",
    weeklyActivity: [34, 48, 56, 52],
  },
  {
    id: "cold-brew",
    name: "Cold Brew Lover",
    count: 190,
    description: "Cold brew affinity segment with high WhatsApp open rates.",
    growth: 23.1,
    status: "Engaged",
    weeklyActivity: [30, 42, 65, 78],
  },
];

export const segmentAccentColors = [
  "#5447dd",
  "#e3aa61",
  "#91bb95",
  "#dd7957",
] as const;

export function getSegmentAccentColor(index: number): string {
  return segmentAccentColors[index % segmentAccentColors.length];
}
