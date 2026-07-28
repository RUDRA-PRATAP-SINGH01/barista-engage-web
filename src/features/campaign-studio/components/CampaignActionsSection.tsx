import { Bookmark, Rocket } from "lucide-react";
import {
  MetricBlock,
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import type { SavedCampaignState } from "../types";
import type { CampaignStudioView } from "../campaign-studio-mappers";
import { formatCampaignStatus } from "../campaign-status";

interface CampaignActionsSectionProps {
  audienceName: string;
  recommendations: CampaignStudioView["recommendations"];
  forecast: CampaignStudioView["forecast"];
  savedCampaign: SavedCampaignState | null;
  launchStatus: string | null;
  successMessage: string | null;
  errorMessage: string | null;
  isSaving: boolean;
  isLaunching: boolean;
  onSave: () => Promise<void>;
  onLaunch: () => Promise<void>;
}

export function CampaignActionsSection({
  audienceName,
  recommendations,
  forecast,
  savedCampaign,
  launchStatus,
  successMessage,
  errorMessage,
  isSaving,
  isLaunching,
  onSave,
  onLaunch,
}: CampaignActionsSectionProps) {
  const statusLabel = formatCampaignStatus(
    launchStatus ?? savedCampaign?.status ?? "Not saved",
  );

  return (
    <PremiumSurface variant="accent" className="p-6 sm:p-8">
      <SectionEyebrow>Campaign Actions</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Launch readiness
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricBlock label="Audience" value={audienceName} />
        <MetricBlock label="Offer" value={recommendations.recommendedOffer} />
        <MetricBlock label="Channel" value={recommendations.recommendedChannel} />
        <MetricBlock label="Forecast" value={forecast.expectedReach} />
        <MetricBlock label="ROI" value={forecast.expectedRoi} large />
      </div>

      {successMessage ? (
        <div className="mt-6 rounded-[18px] border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-light text-emerald-300">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-[18px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-light text-rose-300">
          {errorMessage}
        </div>
      ) : null}

      {savedCampaign ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricBlock label="Campaign ID" value={savedCampaign.campaignId} />
          <MetricBlock label="Campaign Status" value={statusLabel} />
          <MetricBlock
            label="Communications Created"
            value={savedCampaign.communicationsCreated.toLocaleString("en-IN")}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-[18px] bg-foreground px-5 py-3 text-sm font-semibold text-background disabled:opacity-60"
        >
          <Bookmark className="size-4" />
          {isSaving ? "Saving..." : "Save Campaign"}
        </button>
        <button
          type="button"
          onClick={onLaunch}
          disabled={isLaunching || !savedCampaign}
          className="inline-flex items-center gap-2 rounded-[18px] border border-[var(--foreground)]/40 bg-[var(--foreground)]/10 px-5 py-3 text-sm font-semibold text-[var(--foreground)] disabled:opacity-60"
        >
          <Rocket className="size-4" />
          {isLaunching ? "Launching..." : "Launch Campaign"}
        </button>
      </div>
    </PremiumSurface>
  );
}
