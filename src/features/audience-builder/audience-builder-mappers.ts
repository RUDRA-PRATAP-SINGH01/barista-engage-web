import { formatLocaleNumber } from "@/lib/format-utils";
import type {
  AudienceBlueprintFilterDto,
  AudienceGenerateResponseDto,
} from "@/types/dtos/audience-builder.dto";
import type {
  AudienceBuilderResults,
  AudienceFilterChip,
} from "./types";

function formatInr(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }

  return `₹${formatLocaleNumber(value)}`;
}

function formatInrRange(min: number, max: number): string {
  return `${formatInr(min)} – ${formatInr(max)}`;
}

function formatPercent(value: number): string {
  return `${value}%`;
}

function formatConfidence(value: number): string {
  const percent = value <= 1 ? Math.round(value * 100) : Math.round(value);
  return `${percent}%`;
}

function formatRuleValue(value: string | number): string {
  return String(value);
}

function formatFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    city: "City",
    loyaltyTier: "Loyalty Tier",
    churnRisk: "Churn Risk",
    favoriteDrink: "Favorite Drink",
    rfmSegment: "RFM Segment",
    lifetimeSpend: "Lifetime Spend",
    totalOrders: "Total Orders",
    daysSinceLastOrder: "Days Since Last Order",
  };

  return labels[field] ?? field;
}

export function formatAudienceFilter(filter: AudienceBlueprintFilterDto): string {
  const label = formatFieldLabel(filter.field);
  const value = formatRuleValue(filter.value);

  if (filter.operator === "equals") {
    return `${label} = ${value}`;
  }

  return `${label} ${filter.operator} ${value}`;
}

function mapFilterChips(filters: AudienceBlueprintFilterDto[]): AudienceFilterChip[] {
  return filters.map((filter, index) => ({
    id: `${filter.field}-${filter.operator}-${String(filter.value)}-${index}`,
    label: formatAudienceFilter(filter),
  }));
}

export function mapGenerateResponseToResults(
  response: AudienceGenerateResponseDto,
): AudienceBuilderResults {
  return {
    generatedAudience: {
      goal: response.goal,
      name: response.generatedAudience.name,
      description: response.generatedAudience.description,
      confidence: formatConfidence(response.confidence),
      recommendedChannel: response.recommendedChannel,
      recommendedOffer: response.recommendedOffer,
    },
    filterChips: mapFilterChips(response.generatedAudience.filters),
    preview: {
      audienceSize: response.audiencePreview.audienceSize,
      estimatedReach: response.audiencePreview.estimatedReach,
      audienceSizeLabel: formatLocaleNumber(response.audiencePreview.audienceSize),
      estimatedReachLabel: formatLocaleNumber(
        response.audiencePreview.estimatedReach,
      ),
    },
    strategy: {
      why: response.strategy.why,
      what: response.strategy.what,
      how: response.strategy.how,
    },
    forecast: {
      expectedOpenRate: formatPercent(response.forecast.expectedOpenRate),
      expectedCtr: formatPercent(response.forecast.expectedCtr),
      expectedRevenueImpact: formatInrRange(
        response.forecast.expectedRevenueImpact.min,
        response.forecast.expectedRevenueImpact.max,
      ),
      roi: `${response.forecast.roi}x`,
    },
  };
}
