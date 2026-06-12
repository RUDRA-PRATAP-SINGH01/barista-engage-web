export interface SegmentDNA {
  spend: number;
  frequency: number;
  recency: number;
  engagement: number;
  retention: number;
}

export interface SegmentTrendPoint {
  month: string;
  value: number;
}

export interface SegmentCampaignPerformance {
  campaignsSent: number;
  averageOpenRate: string;
  averageCtr: string;
  bestCampaign: string;
}

export interface SegmentMarketingIntel {
  bestChannel: string;
  preferredDrink: string;
  topCity: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  campaignsRun: number;
  averageSpend: string;
  recommendedAction: string;
  aiInsight: string;
  expectedImpactEngagement: string;
  expectedImpactRetention: string;
  actionTimeline: string;
  trend: SegmentTrendPoint[];
}

export interface SegmentDetailProfile {
  dna: SegmentDNA;
  rules: string[];
  marketing: SegmentMarketingIntel;
  campaignPerformance: SegmentCampaignPerformance;
}

export const dnaDimensions = [
  { key: "spend", label: "Spend Score" },
  { key: "frequency", label: "Frequency Score" },
  { key: "recency", label: "Recency Score" },
  { key: "engagement", label: "Engagement Score" },
  { key: "retention", label: "Retention Score" },
] as const;

export function dnaToChartData(dna: SegmentDNA) {
  return dnaDimensions.map(({ key, label }) => ({
    dimension: label,
    score: dna[key],
  }));
}

export function computeSegmentHealthScore(dna: SegmentDNA): number {
  const values = dnaDimensions.map(({ key }) => dna[key]);
  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}
