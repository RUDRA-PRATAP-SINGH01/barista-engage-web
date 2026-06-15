import { apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  CampaignCreativeDto,
  CampaignMessageDto,
  CampaignStudioResponseDto,
  GenerateCampaignStudioRequestDto,
  GenerateCreativeRequestDto,
  GenerateMessageRequestDto,
  LaunchCampaignStudioRequestDto,
  LaunchCampaignStudioResponseDto,
  RegenerateMessageRequestDto,
  SaveCampaignStudioRequestDto,
  SaveCampaignStudioResponseDto,
} from "@/types/dtos/campaign-studio.dto";

const BASE_PATH = "/campaign-studio";

export const campaignStudioService = {
  generate(
    payload: GenerateCampaignStudioRequestDto,
  ): Promise<CampaignStudioResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignStudioResponseDto>, GenerateCampaignStudioRequestDto>(
        `${BASE_PATH}/generate`,
        payload,
      ),
    );
  },

  generateMessage(payload: GenerateMessageRequestDto): Promise<CampaignMessageDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignMessageDto>, GenerateMessageRequestDto>(
        `${BASE_PATH}/generate-message`,
        payload,
      ),
    );
  },

  regenerateMessage(payload: RegenerateMessageRequestDto): Promise<CampaignMessageDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignMessageDto>, RegenerateMessageRequestDto>(
        `${BASE_PATH}/regenerate-message`,
        payload,
      ),
    );
  },

  generateCreative(payload: GenerateCreativeRequestDto): Promise<CampaignCreativeDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignCreativeDto>, GenerateCreativeRequestDto>(
        `${BASE_PATH}/generate-creative`,
        payload,
      ),
    );
  },

  regenerateCreative(payload: GenerateCreativeRequestDto): Promise<CampaignCreativeDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignCreativeDto>, GenerateCreativeRequestDto>(
        `${BASE_PATH}/regenerate-creative`,
        payload,
      ),
    );
  },

  save(payload: SaveCampaignStudioRequestDto): Promise<SaveCampaignStudioResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<SaveCampaignStudioResponseDto>, SaveCampaignStudioRequestDto>(
        `${BASE_PATH}/save`,
        payload,
      ),
    );
  },

  launch(
    payload: LaunchCampaignStudioRequestDto,
  ): Promise<LaunchCampaignStudioResponseDto> {
    return requestApiData(() =>
      apiPost<
        ApiResponse<LaunchCampaignStudioResponseDto>,
        LaunchCampaignStudioRequestDto
      >(`${BASE_PATH}/launch`, payload),
    );
  },
};
