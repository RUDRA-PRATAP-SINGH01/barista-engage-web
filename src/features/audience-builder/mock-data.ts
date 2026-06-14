export { AI_RECOMMENDED_GOALS, GOAL_SUGGESTIONS } from "./goal-suggestions";

export const ANALYSIS_STEPS = [
  {
    id: "goal",
    label: "Understanding goal",
    description:
      "Parsing intent, constraints, and revenue objective from your prompt.",
  },
  {
    id: "segments",
    label: "Analyzing segments",
    description:
      "Matching RFM segments against behavioral signals in your database.",
  },
  {
    id: "revenue",
    label: "Finding revenue opportunities",
    description:
      "Scoring audience pockets by conversion potential and margin impact.",
  },
  {
    id: "strategy",
    label: "Building audience strategy",
    description: "Selecting channels, offers, and timing for maximum lift.",
  },
  {
    id: "recommendations",
    label: "Generating recommendations",
    description: "Packaging executive-ready audience and campaign guidance.",
  },
] as const;
