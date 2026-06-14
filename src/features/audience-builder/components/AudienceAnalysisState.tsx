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
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Unable to analyze your goal
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#8a93a8]">
            {errorMessage ??
              "Something went wrong while analyzing your audience goal. Please try again."}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-[18px] bg-[#4b8cff] px-5 py-3 text-sm font-semibold text-white"
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
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Building your audience strategy
        </h2>
        <p className="mt-3 text-sm font-light text-[#8a93a8]">
          Analyzing customer signals across segments, channels, and revenue
          potential.
        </p>
      </div>

      <PremiumSurface className="overflow-hidden p-6 sm:p-8">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-light text-[#8a93a8]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#0d121c]">
            <div
              className="h-full rounded-full bg-[#4b8cff] transition-all duration-700 ease-out"
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
                  isComplete && "border-[#4b8cff]/25 bg-[#4b8cff]/8",
                  isActive &&
                    "border-[#4b8cff]/45 bg-[#4b8cff]/12 shadow-[0_0_40px_rgba(75,140,255,0.12)]",
                  isPendingStep && "border-white/6 bg-[#0d121c]/60 opacity-70",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                      isComplete &&
                        "border-[#4b8cff] bg-[#4b8cff] text-white",
                      isActive &&
                        "border-[#4b8cff] bg-[#4b8cff]/15 text-[#8cb8ff]",
                      isPendingStep &&
                        "border-white/10 bg-[#151b28] text-[#667085]",
                    )}
                  >
                    {isComplete ? <Check className="size-4" /> : index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      {step.label}
                    </p>
                    <p className="mt-1 text-sm font-light leading-relaxed text-[#8a93a8]">
                      {step.description}
                    </p>
                    {isActive ? (
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#0d121c]">
                        <div className="ab-analysis-bar h-full rounded-full bg-[#4b8cff]" />
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
