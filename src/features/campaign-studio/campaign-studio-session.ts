import type { AudienceGenerateResponseDto } from "@/types/dtos/audience-builder.dto";
import type {
  CampaignCreativeDto,
  CampaignMessageDto,
  CampaignStudioResponseDto,
} from "@/types/dtos/campaign-studio.dto";
import type { SavedCampaignState } from "./types";

const SESSION_KEY = "barista:campaign-studio-session";

export interface CampaignStudioPersistedSession {
  audienceKey: string;
  audience: AudienceGenerateResponseDto;
  studioData: CampaignStudioResponseDto;
  message: CampaignMessageDto;
  creative: CampaignCreativeDto | null;
  savedCampaign: SavedCampaignState | null;
  launchStatus: string | null;
}

export function buildAudienceKey(audience: AudienceGenerateResponseDto): string {
  return `${audience.goal}::${audience.generatedAudience.name}`;
}

export function readCampaignStudioSession(): CampaignStudioPersistedSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CampaignStudioPersistedSession;
    if (!parsed?.audience?.goal || !parsed?.studioData?.overview) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeCampaignStudioSession(
  session: CampaignStudioPersistedSession,
): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearCampaignStudioSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors.
  }
}
