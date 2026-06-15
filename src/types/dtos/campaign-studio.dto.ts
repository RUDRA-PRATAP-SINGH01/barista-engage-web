import type {
  AudienceBlueprintFilterDto,
  AudienceGenerateResponseDto,
  RecommendedChannelDto,
} from "./audience-builder.dto";

export interface CampaignOverviewDto {
  campaignName: string;
  campaignObjective: string;
  campaignSummary: string;
}

export type StrategyCardIdDto = "audience" | "offer" | "channel" | "timing";

export interface StrategyCardDto {
  id: StrategyCardIdDto;
  title: string;
  headline: string;
  highlight?: string;
  points: string[];
}

export interface CampaignStrategyDto {
  cards: StrategyCardDto[];
}

export interface CampaignRecommendationsDto {
  recommendedChannel: RecommendedChannelDto;
  recommendedOffer: string;
  recommendedTiming: string;
  channelReasoning: string[];
  offerReasoning: string[];
  timingReasoning: string[];
}

export interface CampaignForecastDto {
  audienceSize: number;
  expectedReach: number;
  expectedOpenRate: number;
  expectedCtr: number;
  expectedRevenue: number;
  expectedRoi: number;
}

export interface CampaignMessageDto {
  whatsAppMessage: string;
  emailSubject: string;
  emailBody: string;
  smsMessage: string;
}

export interface CampaignCreativeDto {
  imageUrl: string;
  imagePrompt: string;
}

export interface CampaignAudienceDto {
  name: string;
  description: string;
  filters: AudienceBlueprintFilterDto[];
  audienceSize: number;
}

export interface GenerateCampaignStudioRequestDto {
  goal: string;
  generatedAudience: {
    name: string;
    description: string;
    filters: AudienceBlueprintFilterDto[];
  };
  audienceSize: number;
  forecast: {
    expectedReach?: number;
    expectedOpenRate: number;
    expectedCtr: number;
    expectedRevenueImpact: { min: number; max: number };
    roi: number;
  };
  strategy: {
    why: string;
    what: string;
    how: string;
  };
  recommendedChannel: RecommendedChannelDto;
  recommendedOffer: string;
}

export interface CampaignStudioResponseDto {
  goal: string;
  audience: CampaignAudienceDto;
  overview: CampaignOverviewDto;
  strategy: CampaignStrategyDto;
  recommendations: CampaignRecommendationsDto;
  forecast: CampaignForecastDto;
  message: CampaignMessageDto;
  creative: CampaignCreativeDto | null;
}

export interface GenerateMessageRequestDto {
  goal: string;
  overview: CampaignOverviewDto;
  generatedAudience: GenerateCampaignStudioRequestDto["generatedAudience"];
  recommendedChannel: RecommendedChannelDto;
  recommendedOffer: string;
  recommendedTiming: string;
}

export interface RegenerateMessageRequestDto extends GenerateCampaignStudioRequestDto {
  overview: CampaignOverviewDto;
  recommendedTiming?: string;
  message?: Partial<CampaignMessageDto>;
}

export interface GenerateCreativeRequestDto {
  goal: string;
  overview: CampaignOverviewDto;
  audience: CampaignAudienceDto;
  recommendedChannel: RecommendedChannelDto;
  recommendedOffer: string;
}

export interface SaveCampaignStudioRequestDto {
  goal: string;
  audience: CampaignAudienceDto;
  overview: CampaignOverviewDto;
  recommendations: Pick<
    CampaignRecommendationsDto,
    "recommendedChannel" | "recommendedOffer" | "recommendedTiming"
  >;
  message: CampaignMessageDto;
  creative?: { imageUrl: string };
}

export interface SaveCampaignStudioResponseDto {
  segmentId: string;
  campaign: {
    id: string;
    name: string;
    status: string;
    audienceSize: number;
    channel: string;
    createdAt: string;
  };
  communicationsCreated: number;
}

export interface LaunchCampaignStudioRequestDto {
  campaignId: string;
}

export interface LaunchCampaignStudioResponseDto {
  segmentId: string;
  campaignId: string;
  communicationsSent: number;
}

export function mapAudienceGenerateToStudioRequest(
  response: AudienceGenerateResponseDto,
): GenerateCampaignStudioRequestDto {
  return {
    goal: response.goal,
    generatedAudience: response.generatedAudience,
    audienceSize: response.audiencePreview.audienceSize,
    forecast: {
      expectedReach: response.audiencePreview.estimatedReach,
      expectedOpenRate: response.forecast.expectedOpenRate,
      expectedCtr: response.forecast.expectedCtr,
      expectedRevenueImpact: response.forecast.expectedRevenueImpact,
      roi: response.forecast.roi,
    },
    strategy: response.strategy,
    recommendedChannel: response.recommendedChannel,
    recommendedOffer: response.recommendedOffer,
  };
}
