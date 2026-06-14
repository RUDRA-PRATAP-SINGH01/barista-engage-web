import { useCallback, useMemo, useState } from "react";

import { RotateCcw, Sparkles } from "lucide-react";

import { AudienceAnalysisState } from "@/features/audience-builder/components/AudienceAnalysisState";

import { AudienceDefinitionPanel } from "@/features/audience-builder/components/AudienceDefinitionPanel";

import { AudienceGeneratedPanel } from "@/features/audience-builder/components/AudienceGeneratedPanel";

import { AudienceGoalInput } from "@/features/audience-builder/components/AudienceGoalInput";

import { AudiencePreviewPanel } from "@/features/audience-builder/components/AudiencePreviewPanel";

import { AudienceRoiForecastPanel } from "@/features/audience-builder/components/AudienceRoiForecastPanel";

import { AudienceStrategySections } from "@/features/audience-builder/components/AudienceStrategySections";

import { PremiumSurface } from "@/features/audience-builder/components/audience-builder-ui";

import { mapGenerateResponseToResults } from "@/features/audience-builder/audience-builder-mappers";

import { useAudienceAnalysis } from "@/features/audience-builder/hooks/use-audience-analysis";

import type { AudienceBuilderPhase } from "@/features/audience-builder/types";



export function AudienceBuilderPage() {

  const [phase, setPhase] = useState<AudienceBuilderPhase>("empty");

  const [goal, setGoal] = useState("");



  const {

    analyze,

    resetAnalysis,

    data: generateData,

    isPending,

    isSuccess,

    isError,

    userMessage,

  } = useAudienceAnalysis();



  const results = useMemo(() => {

    if (!generateData) {

      return null;

    }



    return mapGenerateResponseToResults(generateData);

  }, [generateData]);



  const handleSubmit = useCallback(() => {

    const trimmedGoal = goal.trim();

    if (!trimmedGoal) {

      return;

    }



    resetAnalysis();

    setPhase("analysis");

    analyze(trimmedGoal);

  }, [analyze, goal, resetAnalysis]);



  const handleAnalysisComplete = useCallback(() => {

    if (generateData) {

      setPhase("results");

    }

  }, [generateData]);



  const handleRetry = useCallback(() => {

    resetAnalysis();

    setPhase("empty");

  }, [resetAnalysis]);



  const handleReset = useCallback(() => {

    resetAnalysis();

    setPhase("empty");

    setGoal("");

  }, [resetAnalysis]);



  return (

    <div className="audience-builder-workspace -mx-4 min-h-[calc(100dvh-5rem)] w-[calc(100%+2rem)] pb-10 sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">

      <div className="border-b border-white/6 px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles className="size-4 text-[#8cb8ff]" />

              <p className="text-[11px] font-medium tracking-[0.16em] text-[#8cb8ff] uppercase">

                AI Workspace

              </p>

            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">

              Audience Builder

            </h1>

          </div>



          {phase === "results" ? (

            <button

              type="button"

              onClick={handleReset}

              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-[#151b28] px-4 py-2 text-sm font-light text-[#c4cad6] transition-colors hover:border-[#4b8cff]/30 hover:text-white"

            >

              <RotateCcw className="size-4" />

              New analysis

            </button>

          ) : null}

        </div>

      </div>



      <div className="px-4 py-8 sm:px-6 lg:px-8">

        {phase === "empty" ? (

          <div className="flex min-h-[calc(100dvh-12rem)] flex-col justify-center py-10">

            <div className="mx-auto mb-10 max-w-3xl text-center">

              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Who do you want to reach?

              </h2>

              <p className="mt-4 text-base font-light leading-relaxed text-[#8a93a8] sm:text-lg">

                Describe your business goal in natural language. AI will identify

                the highest-value audiences from your customer database.

              </p>

            </div>



            <AudienceGoalInput

              value={goal}

              onChange={setGoal}

              onSubmit={handleSubmit}

              disabled={isPending}

            />



            {isError ? (

              <div className="mx-auto mt-6 w-full max-w-3xl">

                <PremiumSurface className="p-5 text-center">

                  <p className="text-sm font-light text-[#8a93a8]">

                    {userMessage ??

                      "Unable to generate your audience. Please try again."}

                  </p>

                </PremiumSurface>

              </div>

            ) : null}

          </div>

        ) : null}



        {phase === "analysis" ? (

          <AudienceAnalysisState

            isPending={isPending}

            isSuccess={isSuccess}

            isError={isError}

            errorMessage={userMessage}

            onComplete={handleAnalysisComplete}

            onRetry={handleRetry}

          />

        ) : null}



        {phase === "results" && results ? (

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

            <div className="xl:col-span-12">

              <AudienceGeneratedPanel data={results.generatedAudience} />

            </div>



            <div className="xl:col-span-12">

              <AudienceDefinitionPanel

                audienceName={results.generatedAudience.name}

                filterChips={results.filterChips}

              />

            </div>



            <div className="xl:col-span-12">

              <AudiencePreviewPanel data={results.preview} />

            </div>



            <div className="xl:col-span-12">

              <AudienceStrategySections strategy={results.strategy} />

            </div>



            <div className="xl:col-span-12">

              <AudienceRoiForecastPanel data={results.forecast} />

            </div>

          </div>

        ) : null}



        {phase === "results" && isSuccess && !results ? (

          <PremiumSurface className="mx-auto max-w-3xl p-8 text-center">

            <p className="text-sm font-light text-[#8a93a8]">

              No generation results available. Start a new analysis to continue.

            </p>

          </PremiumSurface>

        ) : null}

      </div>

    </div>

  );

}


