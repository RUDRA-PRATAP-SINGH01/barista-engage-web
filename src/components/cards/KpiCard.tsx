import { TrendingDown, TrendingUp } from "lucide-react";
import { GlassCardContent } from "@/components/cards/GlassCard";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "featured" | "muted";
}

const variantStyles = {
  featured: {
    card: "border border-primary/30 bg-gradient-to-br from-primary/10 via-white/10 to-white/[0.04] shadow-[0_0_40px_rgba(75,140,255,0.18)]",
    glow: "lg" as const,
    shadow: "lg" as const,
    value: "text-[36px] sm:text-[40px] text-primary",
    label: "text-sm font-medium text-foreground/80",
    iconWrap: "border border-primary/25 bg-primary/15",
    icon: "size-5 text-primary",
    iconBox: "size-11 rounded-[12px]",
  },
  default: {
    card: "bg-white/8",
    glow: "sm" as const,
    shadow: "md" as const,
    value: "text-[26px] text-foreground",
    label: "text-sm font-normal text-muted-foreground",
    iconWrap: "",
    icon: "size-4 text-primary/80",
    iconBox: "size-9 rounded-[10px]",
  },
  muted: {
    card: "bg-white/[0.04] opacity-90",
    glow: "none" as const,
    shadow: "sm" as const,
    value: "text-[22px] font-semibold text-foreground/85",
    label: "text-xs font-light text-muted-foreground",
    iconWrap: "",
    icon: "size-3.5 text-muted-foreground",
    iconBox: "size-8 rounded-[8px]",
  },
};

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
  const styles = variantStyles[variant];

  return (
    <LiquidGlassCard
      blurIntensity={variant === "featured" ? "xl" : "lg"}
      shadowIntensity={styles.shadow}
      glowIntensity={styles.glow}
      borderRadius="16px"
      className={cn("flex flex-col gap-4 p-4", styles.card)}
    >
      {variant === "featured" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
      )}

      <GlassCardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className={styles.label}>{label}</span>
          <div
            className={cn(
              "glass-inset flex items-center justify-center transition-colors duration-200",
              styles.iconBox,
              styles.iconWrap,
            )}
          >
            <Icon className={styles.icon} />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <span
            className={cn(
              "leading-none font-bold tracking-tight",
              styles.value,
            )}
          >
            {value}
          </span>
          <div className="flex flex-col items-end gap-0.5">
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-semibold",
                positive ? "text-[#8CB8FF]" : "text-muted-foreground",
                variant === "muted" && "text-[11px] font-medium",
              )}
            >
              <TrendIcon className="size-3.5" />
              {positive ? "+" : ""}
              {delta}%
            </span>
            <span
              className={cn(
                "text-[11px] font-light text-muted-foreground",
                variant === "muted" && "text-[10px]",
              )}
            >
              {deltaLabel}
            </span>
          </div>
        </div>
      </GlassCardContent>
    </LiquidGlassCard>
  );
}
