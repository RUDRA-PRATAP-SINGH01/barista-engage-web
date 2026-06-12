export type Channel = "EMAIL" | "SMS" | "WHATSAPP";

export type CampaignStatus = "DRAFT" | "SCHEDULED" | "SENDING" | "COMPLETED";

export type ChurnRisk = "LOW" | "MEDIUM" | "HIGH";

export type RfmSegment =
  | "Champion"
  | "Loyal Customer"
  | "Big Spender"
  | "At Risk"
  | "Lost Customer";

export interface CampaignListItem {
  id: string;
  name: string;
  channel: Channel;
  status: CampaignStatus;
  targetAudienceSize: number;
  createdAt: string;
}
