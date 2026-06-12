export interface SegmentFilterDto {
  field: string;
  operator: string;
  value: string | number | boolean;
}

/** Raw list item shape returned by GET /segments */
export interface SegmentListItemApiDto {
  id: string;
  name: string;
  description: string | null;
  rules: Record<string, unknown> | SegmentFilterDto[];
}

/** Raw detail shape returned by GET /segments/:id */
export interface SegmentDetailApiDto extends SegmentListItemApiDto {
  audienceSize?: number | null;
  count?: number | null;
}

/** Normalized segment model used by the frontend */
export interface SegmentDto {
  id: string;
  name: string;
  description: string | null;
  rules: SegmentFilterDto[];
  audienceSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSegmentRequestDto {
  name: string;
  description?: string | null;
  rules: SegmentFilterDto[];
}

export interface SegmentPreviewRequestDto {
  rules: SegmentFilterDto[];
}

export interface SegmentPreviewResponseDto {
  audienceSize: number;
  sampleCustomers: SegmentCustomerSampleDto[];
}

export interface SegmentCustomerSampleDto {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  lastOrderAt: string | null;
}
