import type { AudienceGenerateResponseDto } from "@/types/dtos/audience-builder.dto";
import type { CampaignMessageDto } from "@/types/dtos/campaign-studio.dto";

export type CampaignStudioPhase = "empty" | "loading" | "results" | "error";

export type MessageStudioTab = "whatsapp" | "email" | "sms";

export type CampaignStudioNavigationState = {
  goal: string;
  generatedAudience: AudienceGenerateResponseDto["generatedAudience"];
  audienceSize: number;
  forecast: AudienceGenerateResponseDto["forecast"];
  roi: number;
  strategy: AudienceGenerateResponseDto["strategy"];
  recommendedChannel: AudienceGenerateResponseDto["recommendedChannel"];
  recommendedOffer: string;
};

export type CampaignStudioAudienceState = {
  audience: AudienceGenerateResponseDto;
};

export function isCampaignStudioNavigationState(
  value: unknown,
): value is CampaignStudioAudienceState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CampaignStudioAudienceState>;
  return Boolean(candidate.audience?.goal && candidate.audience?.generatedAudience);
}

export function getAudienceFromNavigationState(
  value: CampaignStudioAudienceState,
): AudienceGenerateResponseDto {
  return value.audience;
}

export interface SavedCampaignState {
  campaignId: string;
  segmentId: string;
  status: string;
  communicationsCreated: number;
}

export type MessageDraft = CampaignMessageDto;
