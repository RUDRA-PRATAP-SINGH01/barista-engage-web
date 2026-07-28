import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const DASHBOARD_EMPTY_MESSAGE = "No dashboard data available";
export const DASHBOARD_ERROR_MESSAGE =
  "Unable to load dashboard data. Please try again.";

interface DashboardCardFeedbackProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  errorMessage?: string | null;
  className?: string;
  skeleton?: React.ReactNode;
  children?: React.ReactNode;
}

export function DashboardCardFeedback({
  isLoading = false,
  isError = false,
  isEmpty = false,
  errorMessage,
  className,
  skeleton,
  children,
}: DashboardCardFeedbackProps) {
  if (isLoading) {
    return (
      <div className={cn("flex h-full min-h-[260px] flex-col", className)}>
        {skeleton ?? (
          <div className="flex flex-1 flex-col justify-center gap-3">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[260px] items-center justify-center px-4 text-center text-sm font-normal text-muted-foreground",
          className,
        )}
      >
        {errorMessage ?? DASHBOARD_ERROR_MESSAGE}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[260px] items-center justify-center px-4 text-center text-sm font-normal text-muted-foreground",
          className,
        )}
      >
        {DASHBOARD_EMPTY_MESSAGE}
      </div>
    );
  }

  return (
    <div className={cn("h-full min-h-0 w-full min-w-0", className)}>
      {children}
    </div>
  );
}

export function DashboardKpiSkeleton({
  variant,
}: {
  variant: "default" | "featured" | "muted";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-4",
        variant === "featured" && "border-foreground/20",
        variant === "muted" && "opacity-95",
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton
          className={cn(
            "rounded-md",
            variant === "featured"
              ? "size-11"
              : variant === "muted"
                ? "size-8"
                : "size-9",
          )}
        />
      </div>
      <div className="flex items-end justify-between gap-2">
        <Skeleton
          className={cn(
            variant === "featured"
              ? "h-10 w-28"
              : variant === "muted"
                ? "h-7 w-16"
                : "h-8 w-20",
          )}
        />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
