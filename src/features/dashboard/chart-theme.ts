import type { CSSProperties } from "react";

export const chartTooltipStyle: CSSProperties = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  fontFamily: "Unbounded, sans-serif",
  fontWeight: 400,
  color: "var(--foreground)",
  boxShadow: "0 4px 16px color-mix(in srgb, var(--foreground) 8%, transparent)",
};
