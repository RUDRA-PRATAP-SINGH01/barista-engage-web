import type { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface DashboardChartContainerProps {
  height: number;
  className?: string;
  children: ReactNode;
}

/** Stable chart frame — avoids Recharts width(-1)/height(-1) in flex/grid layouts. */
export function DashboardChartContainer({
  height,
  className,
  children,
}: DashboardChartContainerProps) {
  return (
    <div
      className={cn("w-full min-w-0 shrink-0", className)}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height={height} minWidth={0}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
