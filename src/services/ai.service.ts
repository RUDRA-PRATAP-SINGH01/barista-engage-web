import { apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  AudienceBuilderRequestDto,
  AudienceBuilderResponseDto,
} from "@/types/dtos";

const BASE_PATH = "/ai";

export const aiService = {
  buildAudience(
    payload: AudienceBuilderRequestDto,
  ): Promise<AudienceBuilderResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<AudienceBuilderResponseDto>, AudienceBuilderRequestDto>(
        `${BASE_PATH}/audience-builder`,
        payload,
      ),
    );
  },
};
