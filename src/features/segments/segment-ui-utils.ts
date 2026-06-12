import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Clock,
  Repeat,
  Tag,
  Wallet,
} from "lucide-react";

export type MetricTone = "positive" | "warning" | "negative" | "neutral";

export function getGrowthTone(growth: number): MetricTone {
  if (growth > 0) return "positive";
  if (growth < 0) return "negative";
  return "neutral";
}

export function getStatusTone(status: string): MetricTone {
  const value = status.toLowerCase();
  if (
    ["high value", "stable", "premium", "growing", "emerging", "engaged", "promo-led"].some(
      (s) => value.includes(s),
    )
  ) {
    return "positive";
  }
  if (["watch", "at risk", "dormant", "critical"].some((s) => value.includes(s))) {
    return "warning";
  }
  if (["churned"].some((s) => value.includes(s))) {
    return "negative";
  }
  return "neutral";
}

export const metricToneClasses: Record<MetricTone, string> = {
  positive: "text-[#8CB8FF]",
  warning: "text-[#c9a06a]",
  negative: "text-[#c97f6a]",
  neutral: "text-foreground",
};

export const metricToneBorderClasses: Record<MetricTone, string> = {
  positive: "border-primary/20 hover:border-primary/30",
  warning: "border-[#c9a06a]/20 hover:border-[#c9a06a]/35",
  negative: "border-[#c97f6a]/20 hover:border-[#c97f6a]/35",
  neutral: "border-white/10 hover:border-white/16",
};

type RuleCategory = "spend" | "frequency" | "recency" | "churn" | "general";

export function getRuleIcon(rule: string): LucideIcon {
  const category = getRuleCategory(rule);
  switch (category) {
    case "spend":
      return Wallet;
    case "frequency":
      return Repeat;
    case "recency":
      return Clock;
    case "churn":
      return AlertTriangle;
    default:
      return Tag;
  }
}

function getRuleCategory(rule: string): RuleCategory {
  const lower = rule.toLowerCase();
  if (lower.includes("spend") || lower.includes("₹") || lower.includes("order value")) {
    return "spend";
  }
  if (lower.includes("order") || lower.includes("frequency") || lower.includes("redemption")) {
    return "frequency";
  }
  if (
    lower.includes("visit") ||
    lower.includes("day") ||
    lower.includes("last") ||
    lower.includes("active")
  ) {
    return "recency";
  }
  if (
    lower.includes("churn") ||
    lower.includes("risk") ||
    lower.includes("engagement") ||
    lower.includes("lost")
  ) {
    return "churn";
  }
  return "general";
}

export function getRiskTone(
  risk: "Low" | "Medium" | "High" | "Critical",
): MetricTone {
  switch (risk) {
    case "Low":
      return "positive";
    case "Medium":
      return "warning";
    case "High":
      return "warning";
    case "Critical":
      return "negative";
  }
}

export const riskToneClasses = metricToneClasses;

export type HealthBadgeTier = "healthy" | "watch" | "critical";

export function getSegmentHealthBadgeTier(
  healthScore: number,
): HealthBadgeTier {
  if (healthScore >= 70) return "healthy";
  if (healthScore >= 40) return "watch";
  return "critical";
}

export const healthBadgeStyles: Record<
  HealthBadgeTier,
  { label: string; className: string }
> = {
  healthy: {
    label: "Healthy",
    className:
      "border-primary/35 bg-primary/12 text-[#8CB8FF]",
  },
  watch: {
    label: "Watch",
    className: "border-[#c9a06a]/35 bg-[#c9a06a]/10 text-[#c9a06a]",
  },
  critical: {
    label: "Critical",
    className: "border-[#c97f6a]/35 bg-[#c97f6a]/10 text-[#c97f6a]",
  },
};
