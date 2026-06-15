const PRODUCTION_API_BASE_URL =
  "https://barista-engage-api-80kw.onrender.com";

export function getApiBaseUrl(): string {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ?? PRODUCTION_API_BASE_URL;
  return baseUrl.replace(/\/$/, "");
}

/** Set VITE_ENABLE_CAMPAIGN_CREATIVE=false to hide visual generation in demo. */
export function isCampaignCreativeEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_CAMPAIGN_CREATIVE;
  return flag !== "false" && flag !== "0";
}
