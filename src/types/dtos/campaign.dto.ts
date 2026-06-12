import type { CampaignStatus, Channel } from "@/types";

export interface CampaignDto {
  id: string;
  name: string;
  channel: Channel;
  status: CampaignStatus;
  targetAudienceSize: number;
  segmentId: string | null;
  segmentName: string | null;
  openRate: number | null;
  clickRate: number | null;
  createdAt: string;
  updatedAt: string;
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
