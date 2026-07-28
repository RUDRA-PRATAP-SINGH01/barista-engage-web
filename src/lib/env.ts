const PRODUCTION_API_BASE_URL =
  "https://barista-engage-api-8okw.onrender.com";

/**
 * Locally always use Vite `/api` proxy (avoids CORS) even if .env has the
 * production Render URL. Production builds use VITE_API_BASE_URL as-is.
 */
export function getApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    return "/api";
  }
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv.replace(/\/$/, "");
  }
  return PRODUCTION_API_BASE_URL;
}

/** Set VITE_ENABLE_CAMPAIGN_CREATIVE=false to hide visual generation in demo. */
export function isCampaignCreativeEnabled(): boolean {
  const flag = import.meta.env.VITE_ENABLE_CAMPAIGN_CREATIVE;
  return flag !== "false" && flag !== "0";
}
