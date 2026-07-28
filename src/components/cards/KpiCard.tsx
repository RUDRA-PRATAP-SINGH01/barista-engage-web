import { TrendingDown, TrendingUp } from "lucide-react";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "featured" | "muted";
}

/** Tiny monochrome sparkline visual (decorative) */
function SparkBars({ featured }: { featured?: boolean }) {
  const heights = featured
    ? [28, 40, 32, 48, 36, 52, 44]
    : [18, 26, 20, 32, 24, 28, 22];
  return (
    <div className="flex h-10 items-end gap-0.5" aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-[1px] bg-foreground",
            featured ? "opacity-90" : "opacity-40",
          )}
          style={{ height: h * 0.55 }}
        />
      ))}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
  variant = "default",
}: KpiCardProps) {
  const positive = delta >= 0;
  const TrendIcon = positive ? TrendingUp : TrendingDown;
  const isFeatured = variant === "featured";
  const isMuted = variant === "muted";

  return (
    <DashboardCard className={cn("py-5", isMuted && "opacity-95")}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="flex min-w-0 flex-col gap-2">
          <CardDescription className="text-sm font-medium text-muted-foreground">
            {label}
          </CardDescription>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "leading-none font-semibold tracking-tight text-foreground",
                isFeatured ? "text-3xl" : isMuted ? "text-xl" : "text-2xl",
              )}
            >
              {value}
            </span>
            {delta !== 0 && (
              <Badge
                className={cn(
                  "rounded-md border-transparent text-[11px] font-semibold",
                  positive
                    ? "bg-[var(--success)]/15 text-[var(--success)]"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                <TrendIcon className="mr-0.5 size-3" />
                {positive ? "+" : ""}
                {delta}%
              </Badge>
            )}
          </div>
          {delta !== 0 && (
            <span className="text-[11px] text-muted-foreground">{deltaLabel}</span>
          )}
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40">
            <Icon className="size-3.5 text-foreground" />
          </div>
          <SparkBars featured={isFeatured} />
        </div>
      </CardHeader>
    </DashboardCard>
  );
}
