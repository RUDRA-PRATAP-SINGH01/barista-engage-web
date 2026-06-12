export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "AI_QUOTA_EXCEEDED"
  | "AI_UNAVAILABLE"
  | "AI_NOT_CONFIGURED"
  | "UNKNOWN_ERROR";

export interface ApiErrorBody {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailureResponse {
  success: false;
  error: ApiErrorBody;
  message?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export function isApiSuccessResponse<T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> {
  return response.success === true;
}

export function isApiFailureResponse<T>(
  response: ApiResponse<T>,
): response is ApiFailureResponse {
  return response.success === false;
}
