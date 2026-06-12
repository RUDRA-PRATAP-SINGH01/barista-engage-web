import { apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  AudienceBuilderRequestDto,
  AudienceBuilderResponseDto,
  CampaignAnalystRequestDto,
  CampaignAnalystResponseDto,
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

  analyzeCampaign(
    payload: CampaignAnalystRequestDto,
  ): Promise<CampaignAnalystResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignAnalystResponseDto>, CampaignAnalystRequestDto>(
        `${BASE_PATH}/campaign-analyst`,
        payload,
      ),
    );
  },
};
