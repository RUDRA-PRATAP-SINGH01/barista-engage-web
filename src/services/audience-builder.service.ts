import { apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  AudienceGenerateRequestDto,
  AudienceGenerateResponseDto,
} from "@/types/dtos/audience-builder.dto";

const BASE_PATH = "/audience-builder";

export const audienceBuilderService = {
  generateGoal(
    payload: AudienceGenerateRequestDto,
  ): Promise<AudienceGenerateResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<AudienceGenerateResponseDto>, AudienceGenerateRequestDto>(
        `${BASE_PATH}/generate`,
        payload,
      ),
    );
  },
};
