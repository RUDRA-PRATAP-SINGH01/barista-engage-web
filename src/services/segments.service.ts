import { apiGet, apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import {
  normalizeSegmentDetail,
  normalizeSegmentList,
  normalizeSegmentListItem,
} from "@/features/segments/segment-mappers";
import type {
  CreateSegmentRequestDto,
  SegmentDetailApiDto,
  SegmentDto,
  SegmentListItemApiDto,
  SegmentPreviewRequestDto,
  SegmentPreviewResponseDto,
} from "@/types/dtos";

const BASE_PATH = "/segments";

export const segmentsService = {
  async getSegments(): Promise<SegmentDto[]> {
    const items = await requestApiData(() =>
      apiGet<ApiResponse<SegmentListItemApiDto[]>>(BASE_PATH),
    );
    return normalizeSegmentList(items);
  },

  async getSegmentsWithAudience(): Promise<SegmentDto[]> {
    const segments = await this.getSegments();

    return Promise.all(
      segments.map(async (segment) => {
        if (segment.audienceSize > 0) {
          return segment;
        }

        const detail = await this.getSegmentById(segment.id);
        return {
          ...segment,
          audienceSize: detail.audienceSize,
        };
      }),
    );
  },

  async getSegmentById(id: string): Promise<SegmentDto> {
    const item = await requestApiData(() =>
      apiGet<ApiResponse<SegmentDetailApiDto>>(`${BASE_PATH}/${id}`),
    );
    return normalizeSegmentDetail(item);
  },

  async createSegment(payload: CreateSegmentRequestDto): Promise<SegmentDto> {
    const item = await requestApiData(() =>
      apiPost<ApiResponse<SegmentListItemApiDto>, CreateSegmentRequestDto>(
        BASE_PATH,
        payload,
      ),
    );
    return normalizeSegmentListItem(item);
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
