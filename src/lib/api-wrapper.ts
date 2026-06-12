import type { AxiosResponse } from "axios";
import { ApiRequestError } from "@/lib/errors";
import type { ApiResponse } from "@/types/api";
import { isApiFailureResponse, isApiSuccessResponse } from "@/types/api";

export function unwrapApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const envelope = response.data;

  if (isApiSuccessResponse(envelope)) {
    return envelope.data;
  }

  if (isApiFailureResponse(envelope)) {
    throw new ApiRequestError(envelope.error.message, {
      code: envelope.error.code,
      statusCode: response.status,
      details: envelope.error.details,
    });
  }

  throw new ApiRequestError("Invalid API response envelope", {
    code: "UNKNOWN_ERROR",
    statusCode: response.status,
    details: envelope,
  });
}

export async function requestApiData<T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T> {
  const response = await request();
  return unwrapApiResponse(response);
}
