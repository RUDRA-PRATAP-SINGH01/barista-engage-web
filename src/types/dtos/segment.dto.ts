export interface SegmentFilterDto {
  field: string;
  operator: string;
  value: string | number | boolean;
}

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
