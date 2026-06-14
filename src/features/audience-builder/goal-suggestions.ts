import type { AudienceGoalSuggestion } from "./types";

export const GOAL_SUGGESTIONS: AudienceGoalSuggestion[] = [
  {
    id: "weekend",
    label: "Increase weekend footfall",
    prompt: "Increase weekend footfall with targeted offers for nearby customers.",
  },
  {
    id: "winback",
    label: "Win back churned customers",
    prompt:
      "I want to increase revenue by bringing back customers who haven't visited recently.",
  },
  {
    id: "cold-brew",
    label: "Promote cold brew",
    prompt: "Promote cold brew launches to customers most likely to convert.",
  },
  {
    id: "repeat",
    label: "Increase repeat purchases",
    prompt: "Increase repeat purchases from customers with moderate visit frequency.",
  },
  {
    id: "high-value",
    label: "Reach high value customers",
    prompt: "Reach high value customers with premium upsell campaigns.",
  },
];

export const AI_RECOMMENDED_GOALS: AudienceGoalSuggestion[] = [
  {
    id: "at-risk",
    label: "Recover At Risk segment",
    prompt: "Launch a win-back campaign for At Risk customers before they churn.",
  },
  {
    id: "champion-vip",
    label: "Activate Champions",
    prompt: "Create a VIP exclusivity campaign for Champion customers.",
  },
  {
    id: "lost-reactivate",
    label: "Reactivate Lost Customers",
    prompt: "Run a reactivation offer for Lost Customers with high historical spend.",
  },
  {
    id: "deal-hunter",
    label: "Convert Deal Hunters",
    prompt: "Launch a discount-focused promotion for Deal Hunter personas.",
  },
];
