import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const weekLabels = ["1w", "2w", "3w", "4w"] as const;

export interface SegmentStatFooterItem {
  label: string;
  value: string;
  trend?: "up" | "down";
}

export interface SegmentStatCardProps {
  title: string;
  subtitle: string;
  weeklyActivity: [number, number, number, number];
  accentColor: string;
  footer: SegmentStatFooterItem[];
  status?: string;
  className?: string;
}

export function SegmentStatCard({
  title,
  subtitle,
  weeklyActivity,
  accentColor,
  footer,
  status,
  className,
}: SegmentStatCardProps) {
  const maxActivity = Math.max(...weeklyActivity, 1);
  const peakIndex = weeklyActivity.indexOf(Math.max(...weeklyActivity));

  return (
    <div
      className={cn(
        "segment-box flex h-full min-w-0 flex-col gap-4 rounded-[20px] border border-white/[0.08] p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-xs font-light text-muted-foreground">{subtitle}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-white/[0.04] px-2 py-1 text-[11px] font-normal text-muted-foreground">
          View
          <ChevronDown className="size-3" />
        </span>
      </div>

      <div className="flex h-[88px] items-end justify-between gap-2 px-1">
        {weeklyActivity.map((value, index) => {
          const barHeight = Math.max(12, (value / maxActivity) * 72);
          const isPeak = index === peakIndex;

          return (
            <div
              key={weekLabels[index]}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "w-full max-w-[36px] rounded-t-md transition-all",
                  !isPeak && "bg-white/10",
                )}
                style={{
                  height: `${barHeight}px`,
                  ...(isPeak
                    ? {
                        backgroundColor: accentColor,
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.18) 4px, rgba(255,255,255,0.18) 8px)",
                      }
                    : {}),
                }}
              />
              <span className="text-[10px] font-light text-muted-foreground">
                {weekLabels[index]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4">
        {footer.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-light text-muted-foreground">
              {item.label}
            </span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-lg font-semibold leading-none",
                item.trend === "up" && "text-[var(--success)]",
                item.trend === "down" && "text-destructive",
                !item.trend && "text-foreground",
              )}
            >
              {item.trend === "up" && <TrendingUp className="size-3.5" />}
              {item.trend === "down" && <TrendingDown className="size-3.5" />}
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {status && (
        <p className="text-[11px] font-light text-muted-foreground">{status}</p>
      )}
    </div>
  );
}
