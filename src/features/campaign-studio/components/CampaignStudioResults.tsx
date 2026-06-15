import { CampaignActionsSection } from "./CampaignActionsSection";
import { CampaignOverviewSection } from "./CampaignOverviewSection";
import { CreativeStudioSection } from "./CreativeStudioSection";
import { ForecastSection } from "./ForecastSection";
import { MessageStudioSection } from "./MessageStudioSection";
import { StrategyCardsSection } from "./StrategyCardsSection";
import { isCampaignCreativeEnabled } from "@/lib/env";
import type { CampaignStudioView } from "../campaign-studio-mappers";
import type {
  CampaignCreativeDto,
  CampaignMessageDto,
} from "@/types/dtos/campaign-studio.dto";
import type { MessageStudioTab, SavedCampaignState } from "../types";

interface CampaignStudioResultsProps {
  view: CampaignStudioView;
  message: CampaignMessageDto;
  creative: CampaignCreativeDto | null;
  creativeError: string | null;
  savedCampaign: SavedCampaignState | null;
  launchStatus: string | null;
  successMessage: string | null;
  errorMessage: string | null;
  isRegeneratingMessage: boolean;
  isGeneratingCreative: boolean;
  isSaving: boolean;
  isLaunching: boolean;
  onMessageChange: (message: CampaignMessageDto) => void;
  onRegenerateMessage: (tab: MessageStudioTab) => Promise<void>;
  onGenerateCreative: () => Promise<void>;
  onRegenerateCreative: () => Promise<void>;
  onSave: () => Promise<void>;
  onLaunch: () => Promise<void>;
}

export function CampaignStudioResults({
  view,
  message,
  creative,
  creativeError,
  savedCampaign,
  launchStatus,
  successMessage,
  errorMessage,
  isRegeneratingMessage,
  isGeneratingCreative,
  isSaving,
  isLaunching,
  onMessageChange,
  onRegenerateMessage,
  onGenerateCreative,
  onRegenerateCreative,
  onSave,
  onLaunch,
}: CampaignStudioResultsProps) {
  return (
    <div className="flex flex-col gap-6">
      <CampaignOverviewSection overview={view.overview} />
      <StrategyCardsSection cards={view.strategy.cards} />
      <ForecastSection forecast={view.forecast} funnel={view.funnel} />
      <MessageStudioSection
        message={message}
        onChange={onMessageChange}
        onRegenerate={onRegenerateMessage}
        isRegenerating={isRegeneratingMessage}
      />
      {isCampaignCreativeEnabled() ? (
        <CreativeStudioSection
          creative={creative}
          isGenerating={isGeneratingCreative}
          errorMessage={creativeError}
          onGenerate={onGenerateCreative}
          onRegenerate={onRegenerateCreative}
        />
      ) : null}
      <CampaignActionsSection
        audienceName={view.audienceName}
        recommendations={view.recommendations}
        forecast={view.forecast}
        savedCampaign={savedCampaign}
        launchStatus={launchStatus}
        successMessage={successMessage}
        errorMessage={errorMessage}
        isSaving={isSaving}
        isLaunching={isLaunching}
        onSave={onSave}
        onLaunch={onLaunch}
      />
    </div>
  );
}
