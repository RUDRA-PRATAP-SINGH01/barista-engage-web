export type AudienceBuilderPhase = "empty" | "analysis" | "results";

export interface AudienceGoalSuggestion {
  id: string;
  label: string;
  prompt: string;
}

export interface AudienceAnalysisStep {
  id: string;
  label: string;
  description: string;
}

export interface AudienceFilterChip {
  id: string;
  label: string;
}

export interface GeneratedAudienceView {
  goal: string;
  name: string;
  description: string;
  confidence: string;
  recommendedChannel: string;
  recommendedOffer: string;
}

export interface AudiencePreviewView {
  audienceSize: number;
  estimatedReach: number;
  audienceSizeLabel: string;
  estimatedReachLabel: string;
}

export interface AudienceStrategyView {
  why: string;
  what: string;
  how: string;
}

export interface AudienceForecastView {
  expectedOpenRate: string;
  expectedCtr: string;
  expectedRevenueImpact: string;
  roi: string;
}

export interface AudienceBuilderResults {
  generatedAudience: GeneratedAudienceView;
  filterChips: AudienceFilterChip[];
  preview: AudiencePreviewView;
  strategy: AudienceStrategyView;
  forecast: AudienceForecastView;
}
