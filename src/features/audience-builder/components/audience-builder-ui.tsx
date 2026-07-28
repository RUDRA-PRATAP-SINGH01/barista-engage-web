import { cn } from "@/lib/utils";

export function PremiumSurface({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "elevated" | "accent" | "inverse";
}) {
  return (
    <div
      className={cn(
        "ab-surface rounded-[28px] border",
        variant === "default" && "ab-surface-default",
        variant === "elevated" && "ab-surface-elevated",
        variant === "accent" && "ab-surface-accent",
        variant === "inverse" && "ab-surface-inverse",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium tracking-[0.16em] text-[var(--foreground)] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function MetricBlock({
  label,
  value,
  hint,
  large = false,
}: {
  label: string;
  value: string;
  hint?: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-light tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground",
          large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
        )}
      >
        {value}
      </span>
      {hint ? (
        <span className="text-xs font-light text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}

export function PriorityPill({
  priority,
}: {
  priority: "High" | "Medium" | "Low";
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase",
        priority === "High" &&
          "bg-[var(--success)]/15 text-[var(--success)]",
        priority === "Medium" && "bg-muted text-muted-foreground",
        priority === "Low" && "bg-muted/70 text-muted-foreground",
      )}
    >
      {priority}
    </span>
  );
}
