export type RecommendedChannelDto = "WhatsApp" | "Email" | "SMS";

export const BLUEPRINT_FILTER_FIELDS = [
  "city",
  "loyaltyTier",
  "churnRisk",
  "favoriteDrink",
  "rfmSegment",
  "lifetimeSpend",
  "totalOrders",
  "daysSinceLastOrder",
] as const;

export type BlueprintFilterFieldDto = (typeof BLUEPRINT_FILTER_FIELDS)[number];

export const BLUEPRINT_OPERATORS = ["equals", "gt", "gte", "lt", "lte"] as const;

export type BlueprintOperatorDto = (typeof BLUEPRINT_OPERATORS)[number];

export interface AudienceBlueprintFilterDto {
  field: BlueprintFilterFieldDto;
  operator: BlueprintOperatorDto;
  value: string | number;
}

export interface GeneratedAudienceDto {
  name: string;
  description: string;
  filters: AudienceBlueprintFilterDto[];
}

export interface AudienceGenerateRequestDto {
  goal: string;
}

export interface RevenueRangeDto {
  min: number;
  max: number;
}

export interface AudiencePreviewSnippetDto {
  audienceSize: number;
  estimatedReach: number;
}

export interface AudienceForecastSnippetDto {
  expectedOpenRate: number;
  expectedCtr: number;
  expectedRevenueImpact: RevenueRangeDto;
  roi: number;
}

export interface AudienceStrategyDto {
  why: string;
  what: string;
  how: string;
}

/** Response body from POST /audience-builder/generate */
export interface AudienceGenerateResponseDto {
  goal: string;
  generatedAudience: GeneratedAudienceDto;
  audiencePreview: AudiencePreviewSnippetDto;
  forecast: AudienceForecastSnippetDto;
  strategy: AudienceStrategyDto;
  recommendedChannel: RecommendedChannelDto;
  recommendedOffer: string;
  confidence: number;
}
