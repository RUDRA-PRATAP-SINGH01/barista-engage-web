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
  positive: "text-[var(--success)]",
  warning: "text-muted-foreground",
  negative: "text-destructive",
  neutral: "text-foreground",
};

export const metricToneBorderClasses: Record<MetricTone, string> = {
  positive: "border-[var(--success)]/25 hover:border-[var(--success)]/40",
  warning: "border-border hover:border-muted-foreground/40",
  negative: "border-destructive/25 hover:border-destructive/40",
  neutral: "border-border hover:border-foreground/20",
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
      "border-[var(--success)]/35 bg-[var(--success)]/10 text-[var(--success)]",
  },
  watch: {
    label: "Watch",
    className: "border-border bg-muted text-muted-foreground",
  },
  critical: {
    label: "Critical",
    className:
      "border-destructive/35 bg-destructive/10 text-destructive",
  },
};
