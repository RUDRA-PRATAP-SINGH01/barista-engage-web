import type { CampaignStatus, Channel } from "@/types";

/** Raw list item shape returned by GET /campaigns */
export interface CampaignListItemApiDto {
  id: string;
  name: string;
  status: string;
  audienceSize: number;
  channel: string;
  createdAt: string;
}

/** Normalized campaign model used by the campaigns UI */
export interface CampaignDto {
  id: string;
  name: string;
  channel: Channel;
  status: CampaignStatus;
  audienceSize: number;
  createdAt: string;
  segmentId: string | null;
  segmentName: string | null;
  openRate: number | null;
  clickRate: number | null;
}

export interface CampaignDetailDto extends CampaignDto {
  description: string | null;
  subject: string | null;
  body: string;
  imageUrl: string | null;
  scheduledAt: string | null;
  sentAt: string | null;
}

export interface CreateCampaignRequestDto {
  name: string;
  channel: Channel;
  segmentId: string;
  messageBody: string;
  scheduledAt?: string | null;
}

export interface SimulateCampaignResponseDto {
  campaignId: string;
  estimatedDeliveryRate: number;
  estimatedOpenRate: number;
  estimatedClickRate: number;
  audienceSize: number;
}

export interface SendCampaignResponseDto {
  campaignId: string;
  status: CampaignStatus;
  sentAt: string;
}
