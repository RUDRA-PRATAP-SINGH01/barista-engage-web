import type { Channel } from "@/types";

export interface CampaignAnalyticsDto {
  campaignId: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  segmentBreakdown: CampaignSegmentBreakdownDto[];
  channelPerformance: CampaignChannelMetricDto[];
}

export interface CampaignSegmentBreakdownDto {
  segmentName: string;
  audienceSize: number;
  openRate: number;
  clickRate: number;
}

export interface CampaignChannelMetricDto {
  channel: Channel;
  openRate: number;
  clickRate: number;
}

export interface CampaignCommunicationDto {
  id: string;
  customerId: string;
  customerName: string;
  channel: Channel;
  status: "SENT" | "DELIVERED" | "OPENED" | "CLICKED" | "FAILED";
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
}
