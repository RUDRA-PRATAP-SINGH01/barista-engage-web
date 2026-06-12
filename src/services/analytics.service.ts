import { campaignsService } from "./campaigns.service";

export const analyticsService = {
  getCampaignAnalytics: campaignsService.getCampaignAnalytics,
  getCampaignCommunications: campaignsService.getCampaignCommunications,
};
