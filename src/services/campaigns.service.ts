import { apiGet, apiPost, requestApiData } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
  CampaignAnalyticsDto,
  CampaignCommunicationDto,
  CampaignDto,
  CampaignListItemApiDto,
  CreateCampaignRequestDto,
  SendCampaignResponseDto,
  SimulateCampaignResponseDto,
} from "@/types/dtos";
import { normalizeCampaignList } from "@/features/campaigns/campaign-mappers";

const BASE_PATH = "/campaigns";

export const campaignsService = {
  async getCampaigns(): Promise<CampaignDto[]> {
    const items = await requestApiData(() =>
      apiGet<ApiResponse<CampaignListItemApiDto[]>>(BASE_PATH),
    );
    return normalizeCampaignList(items);
  },

  getCampaignById(id: string): Promise<CampaignDto> {
    return requestApiData(() =>
      apiGet<ApiResponse<CampaignDto>>(`${BASE_PATH}/${id}`),
    );
  },

  createCampaign(payload: CreateCampaignRequestDto): Promise<CampaignDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<CampaignDto>, CreateCampaignRequestDto>(
        BASE_PATH,
        payload,
      ),
    );
  },

  sendCampaign(id: string): Promise<SendCampaignResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<SendCampaignResponseDto>>(
        `${BASE_PATH}/${id}/send`,
      ),
    );
  },

  simulateCampaign(id: string): Promise<SimulateCampaignResponseDto> {
    return requestApiData(() =>
      apiPost<ApiResponse<SimulateCampaignResponseDto>>(
        `${BASE_PATH}/${id}/simulate`,
      ),
    );
  },

  getCampaignAnalytics(id: string): Promise<CampaignAnalyticsDto> {
    return requestApiData(() =>
      apiGet<ApiResponse<CampaignAnalyticsDto>>(
        `${BASE_PATH}/${id}/analytics`,
      ),
    );
  },

  getCampaignCommunications(
    id: string,
  ): Promise<CampaignCommunicationDto[]> {
    return requestApiData(() =>
      apiGet<ApiResponse<CampaignCommunicationDto[]>>(
        `${BASE_PATH}/${id}/communications`,
      ),
    );
  },
};
