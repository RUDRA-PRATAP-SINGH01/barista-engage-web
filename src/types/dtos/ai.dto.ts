import type { SegmentFilterDto } from "./segment.dto";

export interface AudienceBuilderRequestDto {
  prompt: string;
}

export interface AudienceBuilderResponseDto {
  filters: SegmentFilterDto[];
  audienceSize: number;
  summary: string;
  sampleCustomers: AudienceBuilderSampleDto[];
}

export interface AudienceBuilderSampleDto {
  id: string;
  name: string;
  city: string | null;
  preferredDrink: string | null;
  lastOrderAt: string | null;
}
