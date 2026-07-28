import { Sparkles } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { AiRecommendation } from "./dashboard-utils";
import { DashboardCardFeedback } from "./DashboardCardFeedback";

interface AiRecommendationsCardProps {
  recommendations: AiRecommendation[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

function RecommendationsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4"
        >
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}

export function AiRecommendationsCard({
  recommendations,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: AiRecommendationsCardProps) {
  return (
    <DashboardCard className="flex min-w-0 flex-col gap-4 py-5">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-border bg-muted">
            <Sparkles className="size-4 text-foreground" />
          </span>
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Suggested actions based on customer data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <DashboardCardFeedback
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          errorMessage={errorMessage}
          skeleton={<RecommendationsSkeleton />}
        >
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted/30 p-4 transition-colors duration-200 hover:bg-muted/50"
            >
              <span className="text-sm font-semibold text-foreground">
                {rec.title}
              </span>
              <span className="text-xs font-light leading-relaxed text-muted-foreground">
                {rec.description}
              </span>
            </div>
          ))}
        </DashboardCardFeedback>
      </CardContent>
    </DashboardCard>
  );
}
