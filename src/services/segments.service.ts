import { apiGet, apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  CreateSegmentRequestDto,
  SegmentDto,
  SegmentPreviewRequestDto,
  SegmentPreviewResponseDto,
} from "@/types/dtos";

const BASE_PATH = "/segments";

export const segmentsService = {
  getSegments(): Promise<SegmentDto[]> {
    return requestApiData(() =>
      apiGet<ApiResponse<SegmentDto[]>>(BASE_PATH),
    );
  },

  getSegmentById(id: string): Promise<SegmentDto> {
    return requestApiData(() =>
      apiGet<ApiResponse<SegmentDto>>(`${BASE_PATH}/${id}`),
    );
  },

  createSegment(payload: CreateSegmentRequestDto): Promise<SegmentDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<SegmentDto>, CreateSegmentRequestDto>(
        BASE_PATH,
        payload,
      ),
    );
  },

  previewSegment(
    payload: SegmentPreviewRequestDto,
  ): Promise<SegmentPreviewResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<SegmentPreviewResponseDto>, SegmentPreviewRequestDto>(
        `${BASE_PATH}/preview`,
        payload,
      ),
    );
  },
};
