import type { CampaignStatus, Channel } from "@/types";
import type { CampaignDto, CampaignListItemApiDto } from "@/types/dtos/campaign.dto";

const CHANNELS: readonly Channel[] = ["EMAIL", "SMS", "WHATSAPP"];
const STATUSES: readonly CampaignStatus[] = [
  "DRAFT",
  "SCHEDULED",
  "SENDING",
  "COMPLETED",
];

type RawCampaignListItem = CampaignListItemApiDto & {
  targetAudienceSize?: number | null;
  segmentId?: string | null;
  segmentName?: string | null;
  segment?: { id?: string; name?: string } | null;
  openRate?: number | null;
  clickRate?: number | null;
  ctr?: number | null;
};

function normalizeChannel(value: string | undefined): Channel {
  const upper = (value ?? "").toUpperCase();
  if (CHANNELS.includes(upper as Channel)) {
    return upper as Channel;
  }
  return "EMAIL";
}

function normalizeStatus(value: string | undefined): CampaignStatus {
  const upper = (value ?? "").toUpperCase();
  if (upper === "ACTIVE") {
    return "SENDING";
  }
  if (STATUSES.includes(upper as CampaignStatus)) {
    return upper as CampaignStatus;
  }
  return "DRAFT";
}

function normalizeNullableNumber(
  value: number | null | undefined,
): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }
  return value;
}

function normalizeAudienceSize(raw: RawCampaignListItem): number {
  const size = raw.audienceSize ?? raw.targetAudienceSize;
  if (size === null || size === undefined || Number.isNaN(size)) {
    return 0;
  }
  return size;
}

function normalizeCreatedAt(value: string | undefined): string {
  if (!value) return new Date(0).toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date(0).toISOString();
  }
  return date.toISOString();
}

export function normalizeCampaignListItem(
  raw: RawCampaignListItem,
): CampaignDto {
  const segmentName =
    raw.segmentName ?? raw.segment?.name ?? null;

  return {
    id: raw.id ?? "",
    name: raw.name?.trim() || "Untitled Campaign",
    channel: normalizeChannel(raw.channel),
    status: normalizeStatus(raw.status),
    audienceSize: normalizeAudienceSize(raw),
    createdAt: normalizeCreatedAt(raw.createdAt),
    segmentId: raw.segmentId ?? raw.segment?.id ?? null,
    segmentName,
    openRate: normalizeNullableNumber(raw.openRate),
    clickRate: normalizeNullableNumber(raw.clickRate ?? raw.ctr),
  };
}

export function normalizeCampaignList(
  items: RawCampaignListItem[] | null | undefined,
): CampaignDto[] {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeCampaignListItem);
}
