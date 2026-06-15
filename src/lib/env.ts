const DEFAULT_API_BASE_URL = "/api";

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

/** Set VITE_ENABLE_CAMPAIGN_CREATIVE=false to hide visual generation in demo. */
export function isCampaignCreativeEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_CAMPAIGN_CREATIVE;
  return flag !== "false" && flag !== "0";
}
