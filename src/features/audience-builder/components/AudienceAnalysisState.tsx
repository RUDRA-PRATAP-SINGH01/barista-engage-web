import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYSIS_STEPS } from "../mock-data";
import { PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudienceAnalysisStateProps {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  onComplete: () => void;
  onRetry: () => void;
}

export function AudienceAnalysisState({
  isPending,
  isSuccess,
  isError,
  errorMessage,
  onComplete,
  onRetry,
}: AudienceAnalysisStateProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
  }, [isPending, isError]);

  useEffect(() => {
    if (isError) {
      return;
    }

    if (isSuccess && activeStep >= ANALYSIS_STEPS.length) {
      const timer = window.setTimeout(onComplete, 400);
      return () => window.clearTimeout(timer);
    }

    if (!isPending && isSuccess && activeStep < ANALYSIS_STEPS.length) {
      setActiveStep(ANALYSIS_STEPS.length);
      return;
    }

    if (!isPending || activeStep >= ANALYSIS_STEPS.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStep((step) => step + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [activeStep, isError, isPending, isSuccess, onComplete]);

  const progress = isSuccess
    ? 100
    : Math.min(
        100,
        Math.round((activeStep / ANALYSIS_STEPS.length) * 100),
      );

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center">
        <PremiumSurface className="p-8 text-center">
          <SectionEyebrow>Analysis Failed</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Unable to analyze your goal
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
            {errorMessage ??
              "Something went wrong while analyzing your audience goal. Please try again."}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-[18px] bg-foreground px-5 py-3 text-sm font-semibold text-background"
          >
            Try again
          </button>
        </PremiumSurface>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center">
      <div className="mb-8 text-center">
        <SectionEyebrow>AI Audience Builder</SectionEyebrow>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Building your audience strategy
        </h2>
        <p className="mt-3 text-sm font-light text-muted-foreground">
          Analyzing customer signals across segments, channels, and revenue
          potential.
        </p>
      </div>

      <PremiumSurface className="overflow-hidden p-6 sm:p-8">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-light text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-[var(--foreground)] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {ANALYSIS_STEPS.map((step, index) => {
            const isComplete = index < activeStep || isSuccess;
            const isActive =
              index === activeStep && isPending && !isSuccess && !isError;
            const isPendingStep = index > activeStep && !isSuccess;

            return (
              <div
                key={step.id}
                className={cn(
                  "rounded-[20px] border px-5 py-4 transition-all duration-500",
                  isComplete && "border-[var(--foreground)]/25 bg-[var(--foreground)]/8",
                  isActive &&
                    "border-[var(--foreground)]/45 bg-[var(--foreground)]/12 shadow-[0_0_40px_transparent]",
                  isPendingStep && "border-white/6 bg-background/60 opacity-70",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                      isComplete &&
                        "border-foreground bg-foreground text-background",
                      isActive &&
                        "border-[var(--foreground)] bg-[var(--foreground)]/15 text-[var(--foreground)]",
                      isPendingStep &&
                        "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {isComplete ? <Check className="size-4" /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {step.label}
                    </p>
                    <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    {isActive ? (
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-background">
                        <div className="ab-analysis-bar h-full rounded-full bg-[var(--foreground)]" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PremiumSurface>
    </div>
  );
}
