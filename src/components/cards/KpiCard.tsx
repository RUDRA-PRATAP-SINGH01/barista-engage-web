import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function KpiCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
}: KpiCardProps) {
  const positive = delta >= 0;
  const TrendIcon = positive ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex size-8 items-center justify-center rounded-[10px] bg-elevated">
            <Icon className="size-4 text-primary" />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <span className="text-[28px] leading-none font-semibold tracking-tight text-foreground">
            {value}
          </span>
          <div className="flex flex-col items-end gap-0.5">
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                positive ? "text-success" : "text-destructive",
              )}
            >
              <TrendIcon className="size-3.5" />
              {positive ? "+" : ""}
              {delta}%
            </span>
            <span className="text-[11px] text-[#6E7482]">{deltaLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
