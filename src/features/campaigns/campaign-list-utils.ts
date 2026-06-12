import type { CampaignStatus } from "@/types";
import type { CampaignDto } from "@/types/dtos";

export type CampaignHubStatus = "Draft" | "Active" | "Completed";

export interface CampaignListKpis {
  total: number;
  active: number;
  draft: number;
  completed: number;
}

export function toHubStatus(status: CampaignStatus | string): CampaignHubStatus {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "SENDING":
    case "SCHEDULED":
      return "Active";
    case "COMPLETED":
      return "Completed";
    default:
      return "Draft";
  }
}

export function computeCampaignKpis(campaigns: CampaignDto[]): CampaignListKpis {
  return {
    total: campaigns.length,
    active: campaigns.filter((c) => toHubStatus(c.status) === "Active").length,
    draft: campaigns.filter((c) => toHubStatus(c.status) === "Draft").length,
    completed: campaigns.filter((c) => toHubStatus(c.status) === "Completed")
      .length,
  };
}
