import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import { cn } from "@/lib/utils";

const glassProps = {
  blurIntensity: "xl" as const,
  shadowIntensity: "md" as const,
  glowIntensity: "sm" as const,
  borderRadius: "20px",
};

interface LayoutPlaceholderCardProps {
  title: string;
  className?: string;
  bodyClassName?: string;
  compact?: boolean;
  variant?: "glass" | "panel";
}

export function LayoutPlaceholderCard({
  title,
  className,
  bodyClassName,
  compact = false,
  variant = "glass",
}: LayoutPlaceholderCardProps) {
  const body = (
    <>
      <h2
        className={cn(
          "font-semibold tracking-tight text-foreground",
          compact ? "text-sm" : "text-base",
          variant === "panel" && "text-sm",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 flex flex-1 items-center justify-center rounded-[12px] border border-dashed border-white/10 bg-white/[0.02]",
          compact ? "min-h-[72px]" : "min-h-[120px]",
          variant === "panel" && "mt-2 min-h-[48px] border-white/[0.06] bg-white/[0.015]",
          bodyClassName,
        )}
      >
        <span className="text-xs font-light text-muted-foreground/70">
          Placeholder
        </span>
      </div>
    </>
  );

  if (variant === "panel") {
    return (
      <div
        className={cn(
          "segment-list-item segment-list-item-hover flex h-full min-h-0 min-w-0 flex-col rounded-[14px] border px-4 py-3.5 transition-all duration-200",
          className,
        )}
      >
        {body}
      </div>
    );
  }

  return (
    <LiquidGlassCard
      {...glassProps}
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col bg-white/8",
        compact ? "p-4" : "p-5 sm:p-6",
        className,
      )}
    >
      {body}
    </LiquidGlassCard>
  );
}
