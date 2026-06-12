import { Skeleton } from "@/components/ui/skeleton";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";
import {
  segmentGlassCardClassName,
  segmentGlassCardProps,
} from "./segment-glass";

export const SEGMENTS_EMPTY_MESSAGE = "No segment selected";
export const SEGMENTS_ERROR_MESSAGE =
  "Unable to load segment data. Please try again.";

export function SegmentSidebarSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[74px] w-full rounded-[14px] bg-white/10"
        />
      ))}
    </div>
  );
}

export function SegmentDetailSkeleton() {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <LiquidGlassCard
        {...segmentGlassCardProps}
        className={`${segmentGlassCardClassName} min-h-0 gap-5 p-5 sm:p-6`}
      >
        <div className="space-y-3">
          <Skeleton className="h-3 w-24 bg-white/10" />
          <Skeleton className="h-10 w-64 max-w-full bg-white/10" />
          <Skeleton className="h-4 w-full max-w-2xl bg-white/10" />
        </div>
        <Skeleton className="min-h-[360px] w-full rounded-[16px] bg-white/10" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-[10px] bg-white/10" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-[12px] bg-white/10" />
          ))}
        </div>
      </LiquidGlassCard>

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <Skeleton className="min-h-[320px] rounded-[16px] bg-white/10" />
        <Skeleton className="min-h-[320px] rounded-[16px] bg-white/10" />
      </div>
    </div>
  );
}

interface SegmentFeedbackCardProps {
  message: string;
}

export function SegmentFeedbackCard({ message }: SegmentFeedbackCardProps) {
  return (
    <LiquidGlassCard
      {...segmentGlassCardProps}
      className={`${segmentGlassCardClassName} flex min-h-[320px] items-center justify-center p-8 text-center`}
    >
      <p className="text-sm font-normal text-muted-foreground">{message}</p>
    </LiquidGlassCard>
  );
}
