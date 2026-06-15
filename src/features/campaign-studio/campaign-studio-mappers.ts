import { formatLocaleNumber } from "@/lib/format-utils";
import type { CampaignStudioResponseDto } from "@/types/dtos/campaign-studio.dto";

function formatInr(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }

  return `₹${formatLocaleNumber(value)}`;
}

export interface FunnelStageView {
  id: string;
  label: string;
  value: string;
  numericValue: number;
}

export interface CampaignStudioView {
  goal: string;
  audienceName: string;
  overview: CampaignStudioResponseDto["overview"];
  strategy: CampaignStudioResponseDto["strategy"];
  recommendations: CampaignStudioResponseDto["recommendations"];
  forecast: {
    audienceSize: string;
    expectedReach: string;
    expectedOpenRate: string;
    expectedCtr: string;
    expectedRevenue: string;
    expectedRoi: string;
    audienceSizeValue: number;
    expectedReachValue: number;
    expectedOpenRateValue: number;
    expectedCtrValue: number;
    expectedRevenueValue: number;
    expectedRoiValue: number;
  };
  funnel: FunnelStageView[];
  message: CampaignStudioResponseDto["message"];
  creative: CampaignStudioResponseDto["creative"];
}

export function mapCampaignStudioResponse(
  response: CampaignStudioResponseDto,
): CampaignStudioView {
  const expectedOpens = Math.round(
    response.forecast.expectedReach * (response.forecast.expectedOpenRate / 100),
  );

  return {
    goal: response.goal,
    audienceName: response.audience.name,
    overview: response.overview,
    strategy: response.strategy,
    recommendations: response.recommendations,
    forecast: {
      audienceSize: formatLocaleNumber(response.forecast.audienceSize),
      expectedReach: formatLocaleNumber(response.forecast.expectedReach),
      expectedOpenRate: `${response.forecast.expectedOpenRate}%`,
      expectedCtr: `${response.forecast.expectedCtr}%`,
      expectedRevenue: formatInr(response.forecast.expectedRevenue),
      expectedRoi: `${response.forecast.expectedRoi}x`,
      audienceSizeValue: response.forecast.audienceSize,
      expectedReachValue: response.forecast.expectedReach,
      expectedOpenRateValue: response.forecast.expectedOpenRate,
      expectedCtrValue: response.forecast.expectedCtr,
      expectedRevenueValue: response.forecast.expectedRevenue,
      expectedRoiValue: response.forecast.expectedRoi,
    },
    funnel: [
      {
        id: "audience",
        label: "Audience",
        value: formatLocaleNumber(response.forecast.audienceSize),
        numericValue: response.forecast.audienceSize,
      },
      {
        id: "reach",
        label: "Reach",
        value: formatLocaleNumber(response.forecast.expectedReach),
        numericValue: response.forecast.expectedReach,
      },
      {
        id: "open",
        label: "Open",
        value: formatLocaleNumber(expectedOpens),
        numericValue: expectedOpens,
      },
      {
        id: "ctr",
        label: "CTR",
        value: `${response.forecast.expectedCtr}%`,
        numericValue: response.forecast.expectedCtr,
      },
      {
        id: "revenue",
        label: "Revenue",
        value: formatInr(response.forecast.expectedRevenue),
        numericValue: response.forecast.expectedRevenue,
      },
    ],
    message: response.message,
    creative: response.creative,
  };
}

export function mergeMessageForTab(
  current: CampaignStudioResponseDto["message"],
  incoming: CampaignStudioResponseDto["message"],
  tab: "whatsapp" | "email" | "sms",
): CampaignStudioResponseDto["message"] {
  if (tab === "whatsapp") {
    return { ...current, whatsAppMessage: incoming.whatsAppMessage };
  }

  if (tab === "email") {
    return {
      ...current,
      emailSubject: incoming.emailSubject,
      emailBody: incoming.emailBody,
    };
  }

  return { ...current, smsMessage: incoming.smsMessage };
}
