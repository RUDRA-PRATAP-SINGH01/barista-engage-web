import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Megaphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  buildAudienceKey,
  clearCampaignStudioSession,
  readCampaignStudioSession,
  writeCampaignStudioSession,
} from "@/features/campaign-studio/campaign-studio-session";
import { CampaignStudioEmpty } from "@/features/campaign-studio/components/CampaignStudioEmpty";
import { CampaignStudioLoading } from "@/features/campaign-studio/components/CampaignStudioLoading";
import { CampaignStudioResults } from "@/features/campaign-studio/components/CampaignStudioResults";
import {
  mapCampaignStudioResponse,
  mergeMessageForTab,
} from "@/features/campaign-studio/campaign-studio-mappers";
import {
  useLaunchCampaign,
  useSaveCampaign,
} from "@/features/campaign-studio/hooks/use-campaign-studio-actions";
import { useCampaignStudio } from "@/features/campaign-studio/hooks/use-campaign-studio";
import {
  useGenerateCreative,
  useRegenerateMessage,
} from "@/features/campaign-studio/hooks/use-campaign-studio-messages";
import {
  getAudienceFromNavigationState,
  isCampaignStudioNavigationState,
  type CampaignStudioPhase,
  type MessageStudioTab,
  type SavedCampaignState,
} from "@/features/campaign-studio/types";
import { isApiRequestError, normalizeApiError } from "@/lib/errors";
import type {
  CampaignCreativeDto,
  CampaignMessageDto,
  CampaignStudioResponseDto,
} from "@/types/dtos/campaign-studio.dto";
import { mapAudienceGenerateToStudioRequest } from "@/types/dtos/campaign-studio.dto";

function getApiErrorMessage(error: unknown, fallback: string): string {
  const normalized = isApiRequestError(error)
    ? error
    : normalizeApiError(error);
  return normalized.userMessage ?? fallback;
}

export function CampaignStudioPage() {
  const location = useLocation();
  const isFreshNavigation = isCampaignStudioNavigationState(location.state);
  const freshAudience = isFreshNavigation
    ? getAudienceFromNavigationState(location.state)
    : null;

  const restoredSession = useMemo(
    () => (isFreshNavigation ? null : readCampaignStudioSession()),
    [isFreshNavigation],
  );

  const audienceInput = freshAudience ?? restoredSession?.audience ?? null;
  const audienceKey = audienceInput ? buildAudienceKey(audienceInput) : null;

  const [phase, setPhase] = useState<CampaignStudioPhase>(() => {
    if (!audienceInput) return "empty";
    if (restoredSession?.studioData && !isFreshNavigation) return "results";
    return "loading";
  });
  const [restoredStudio, setRestoredStudio] =
    useState<CampaignStudioResponseDto | null>(
      () => restoredSession?.studioData ?? null,
    );
  const [message, setMessage] = useState<CampaignMessageDto | null>(
    () => restoredSession?.message ?? null,
  );
  const [creative, setCreative] = useState<CampaignCreativeDto | null>(
    () => restoredSession?.creative ?? null,
  );
  const [savedCampaign, setSavedCampaign] = useState<SavedCampaignState | null>(
    () => restoredSession?.savedCampaign ?? null,
  );
  const [launchStatus, setLaunchStatus] = useState<string | null>(
    () => restoredSession?.launchStatus ?? null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [creativeError, setCreativeError] = useState<string | null>(null);
  const [isRegeneratingMessage, setIsRegeneratingMessage] = useState(false);
  const [isGeneratingCreative, setIsGeneratingCreative] = useState(false);
  const autoGenerateKeyRef = useRef<string | null>(null);

  const {
    generate,
    data: mutationStudioData,
    isPending,
    isSuccess,
    isError,
    userMessage,
    resetStudio,
  } = useCampaignStudio();
  const { regenerateMessage } = useRegenerateMessage();
  const { generateCreative, regenerateCreative } = useGenerateCreative();
  const { saveCampaign, isPending: isSaving } = useSaveCampaign();
  const { launchCampaign, isPending: isLaunching } = useLaunchCampaign();

  const studioData = mutationStudioData ?? restoredStudio;

  useEffect(() => {
    if (!audienceInput || !audienceKey) {
      return;
    }

    if (!isFreshNavigation && restoredSession?.studioData) {
      return;
    }

    if (autoGenerateKeyRef.current === audienceKey) {
      return;
    }

    autoGenerateKeyRef.current = audienceKey;

    if (isFreshNavigation) {
      clearCampaignStudioSession();
    }

    setPhase("loading");
    generate(mapAudienceGenerateToStudioRequest(audienceInput), {
      onError: () => setPhase("error"),
    });

    return () => {
      autoGenerateKeyRef.current = null;
    };
  }, [audienceInput, audienceKey, generate, isFreshNavigation, restoredSession?.studioData]);

  useEffect(() => {
    if (studioData) {
      setMessage(studioData.message);
      setCreative(studioData.creative);
      setRestoredStudio(studioData);
    }
  }, [studioData]);

  useEffect(() => {
    if (!audienceInput || !audienceKey || !studioData || !message) {
      return;
    }

    writeCampaignStudioSession({
      audienceKey,
      audience: audienceInput,
      studioData,
      message,
      creative,
      savedCampaign,
      launchStatus,
    });
  }, [
    audienceInput,
    audienceKey,
    studioData,
    message,
    creative,
    savedCampaign,
    launchStatus,
  ]);

  const view = useMemo(() => {
    if (!studioData || !message) {
      return null;
    }

    const merged: CampaignStudioResponseDto = {
      ...studioData,
      message,
      creative,
    };

    return mapCampaignStudioResponse(merged);
  }, [studioData, message, creative]);

  const handleLoadingComplete = useCallback(() => {
    if (studioData) {
      setPhase("results");
    }
  }, [studioData]);

  useEffect(() => {
    if (phase !== "loading" || !isSuccess || !studioData || isPending) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("results");
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [phase, isSuccess, studioData, isPending]);

  const handleRetry = useCallback(() => {
    if (!audienceInput) return;

    autoGenerateKeyRef.current = null;
    resetStudio();
    setRestoredStudio(null);
    setSavedCampaign(null);
    setLaunchStatus(null);
    setSuccessMessage(null);
    setActionError(null);
    setCreativeError(null);
    clearCampaignStudioSession();
    setPhase("loading");
    generate(mapAudienceGenerateToStudioRequest(audienceInput), {
      onError: () => setPhase("error"),
    });
  }, [audienceInput, generate, resetStudio]);

  const handleRegenerateMessage = useCallback(
    async (tab: MessageStudioTab) => {
      if (!audienceInput || !studioData || !message) return;

      setIsRegeneratingMessage(true);
      setActionError(null);

      try {
        const updated = await regenerateMessage({
          ...mapAudienceGenerateToStudioRequest(audienceInput),
          overview: studioData.overview,
          recommendedTiming: studioData.recommendations.recommendedTiming,
          message,
        });
        setMessage((current) =>
          current ? mergeMessageForTab(current, updated, tab) : updated,
        );
      } catch (error) {
        setActionError(
          getApiErrorMessage(error, "Unable to regenerate message. Please try again."),
        );
      } finally {
        setIsRegeneratingMessage(false);
      }
    },
    [audienceInput, message, regenerateMessage, studioData],
  );

  const buildCreativePayload = useCallback(() => {
    if (!audienceInput || !studioData) return null;

    return {
      goal: audienceInput.goal,
      overview: studioData.overview,
      audience: studioData.audience,
      recommendedChannel: studioData.recommendations.recommendedChannel,
      recommendedOffer: studioData.recommendations.recommendedOffer,
    };
  }, [audienceInput, studioData]);

  const handleGenerateCreative = useCallback(async () => {
    const payload = buildCreativePayload();
    if (!payload) return;

    setIsGeneratingCreative(true);
    setCreativeError(null);

    try {
      const result = await generateCreative(payload);
      setCreative(result);
    } catch (error) {
      setCreativeError(
        getApiErrorMessage(
          error,
          "Image generation temporarily unavailable. Please try again.",
        ),
      );
    } finally {
      setIsGeneratingCreative(false);
    }
  }, [buildCreativePayload, generateCreative]);

  const handleRegenerateCreative = useCallback(async () => {
    const payload = buildCreativePayload();
    if (!payload) return;

    setIsGeneratingCreative(true);
    setCreativeError(null);

    try {
      const result = await regenerateCreative(payload);
      setCreative(result);
    } catch (error) {
      setCreativeError(
        getApiErrorMessage(
          error,
          "Image generation temporarily unavailable. Please try again.",
        ),
      );
    } finally {
      setIsGeneratingCreative(false);
    }
  }, [buildCreativePayload, regenerateCreative]);

  const handleSave = useCallback(async () => {
    if (!audienceInput || !studioData || !message) return;

    setActionError(null);
    setSuccessMessage(null);

    try {
      const result = await saveCampaign({
        goal: audienceInput.goal,
        audience: studioData.audience,
        overview: studioData.overview,
        recommendations: {
          recommendedChannel: studioData.recommendations.recommendedChannel,
          recommendedOffer: studioData.recommendations.recommendedOffer,
          recommendedTiming: studioData.recommendations.recommendedTiming,
        },
        message,
        creative: creative ? { imageUrl: creative.imageUrl } : undefined,
      });

      setSavedCampaign({
        campaignId: result.campaign.id,
        segmentId: result.segmentId,
        status: result.campaign.status,
        communicationsCreated: result.communicationsCreated,
      });
      setLaunchStatus(result.campaign.status);
      setSuccessMessage(`Campaign "${result.campaign.name}" saved successfully.`);
    } catch (error) {
      setActionError(
        getApiErrorMessage(error, "Unable to save campaign. Please try again."),
      );
    }
  }, [audienceInput, creative, message, saveCampaign, studioData]);

  const handleLaunch = useCallback(async () => {
    if (!savedCampaign) {
      setActionError("Save the campaign first, then launch.");
      return;
    }

    setActionError(null);

    try {
      const result = await launchCampaign(savedCampaign.campaignId);
      setSavedCampaign((current) =>
        current ? { ...current, status: "SENDING" } : current,
      );
      setLaunchStatus("SENDING");
      setSuccessMessage(
        `Campaign launched to ${result.communicationsSent.toLocaleString("en-IN")} customers.`,
      );
    } catch (error) {
      setActionError(
        getApiErrorMessage(error, "Unable to launch campaign. Please try again."),
      );
    }
  }, [launchCampaign, savedCampaign]);

  if (!audienceInput) {
    return (
      <div className="audience-builder-workspace -mx-4 min-h-[calc(100dvh-5rem)] w-[calc(100%+2rem)] px-4 py-8 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:px-8">
        <CampaignStudioEmpty />
      </div>
    );
  }

  return (
    <div className="audience-builder-workspace -mx-4 min-h-[calc(100dvh-5rem)] w-[calc(100%+2rem)] pb-10 sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
      <div className="border-b border-white/6 px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <Link
            to="/ai/audience-builder"
            className="inline-flex items-center gap-2 text-sm font-light text-[#8a93a8] transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Audience Builder
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <Megaphone className="size-4 text-[#8cb8ff]" />
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#8cb8ff] uppercase">
              Campaign Studio
            </p>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What should you send?
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-light text-[#8a93a8]">
            Turning {audienceInput.generatedAudience.name} into campaign copy,
            creative, and launch-ready assets for: {audienceInput.goal}
          </p>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {phase === "loading" || phase === "error" ? (
          <CampaignStudioLoading
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            errorMessage={userMessage}
            onComplete={handleLoadingComplete}
            onRetry={handleRetry}
          />
        ) : null}

        {phase === "results" && view && message ? (
          <CampaignStudioResults
            view={view}
            message={message}
            creative={creative}
            creativeError={creativeError}
            savedCampaign={savedCampaign}
            launchStatus={launchStatus}
            successMessage={successMessage}
            errorMessage={actionError}
            isRegeneratingMessage={isRegeneratingMessage}
            isGeneratingCreative={isGeneratingCreative}
            isSaving={isSaving}
            isLaunching={isLaunching}
            onMessageChange={setMessage}
            onRegenerateMessage={handleRegenerateMessage}
            onGenerateCreative={handleGenerateCreative}
            onRegenerateCreative={handleRegenerateCreative}
            onSave={handleSave}
            onLaunch={handleLaunch}
          />
        ) : null}
      </div>
    </div>
  );
}
