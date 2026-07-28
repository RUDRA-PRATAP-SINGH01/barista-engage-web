import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "h-full rounded-xl border border-border bg-card shadow-none ring-0",
        className,
      )}
      {...props}
    />
  );
}
