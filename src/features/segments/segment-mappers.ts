import type {
  SegmentDetailApiDto,
  SegmentDto,
  SegmentFilterDto,
  SegmentListItemApiDto,
} from "@/types/dtos/segment.dto";

type RawSegmentItem = (SegmentListItemApiDto | SegmentDetailApiDto) & {
  audienceSize?: number | null;
  count?: number | null;
  customerCount?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

function normalizeAudienceSize(raw: RawSegmentItem): number {
  const size = raw.audienceSize ?? raw.count ?? raw.customerCount;

  if (size === null || size === undefined || Number.isNaN(size)) {
    return 0;
  }

  return size;
}

function normalizeTimestamp(value: string | null | undefined): string {
  if (!value) {
    return new Date(0).toISOString();
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date(0).toISOString();
  }

  return date.toISOString();
}

function normalizeRuleValue(value: unknown): string | number | boolean {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  return JSON.stringify(value);
}

function normalizeRules(raw: SegmentListItemApiDto["rules"] | undefined): SegmentFilterDto[] {
  if (Array.isArray(raw)) {
    return raw.map((rule) => ({
      field: rule.field ?? "",
      operator: rule.operator ?? "equals",
      value: normalizeRuleValue(rule.value),
    }));
  }

  if (!raw || typeof raw !== "object") {
    return [];
  }

  return Object.entries(raw).map(([field, value]) => ({
    field,
    operator: typeof value === "object" && value !== null ? "matches" : "equals",
    value: normalizeRuleValue(value),
  }));
}

export function normalizeSegmentListItem(raw: RawSegmentItem): SegmentDto {
  return {
    id: raw.id ?? "",
    name: raw.name?.trim() || "Untitled Segment",
    description: raw.description ?? null,
    rules: normalizeRules(raw.rules),
    audienceSize: normalizeAudienceSize(raw),
    createdAt: normalizeTimestamp(raw.createdAt),
    updatedAt: normalizeTimestamp(raw.updatedAt ?? raw.createdAt),
  };
}

export function normalizeSegmentList(
  items: RawSegmentItem[] | null | undefined,
): SegmentDto[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizeSegmentListItem);
}

export function normalizeSegmentDetail(raw: RawSegmentItem): SegmentDto {
  return normalizeSegmentListItem(raw);
}
