import { isAxiosError } from "axios";
import type { ApiErrorBody, ApiErrorCode } from "@/types/api";

export class ApiRequestError extends Error {
  readonly name = "ApiRequestError";
  readonly code: ApiErrorCode;
  readonly statusCode: number | null;
  readonly details: unknown;
  readonly isRetryable: boolean;
  readonly userMessage: string;

  constructor(
    message: string,
    options: {
      code?: ApiErrorCode;
      statusCode?: number | null;
      details?: unknown;
      isRetryable?: boolean;
      userMessage?: string;
    } = {},
  ) {
    super(message);
    this.code = options.code ?? "UNKNOWN_ERROR";
    this.statusCode = options.statusCode ?? null;
    this.details = options.details;
    this.isRetryable = options.isRetryable ?? false;
    this.userMessage = options.userMessage ?? getDefaultUserMessage(this.code, this.statusCode);
  }
}

const AI_STATUS_MESSAGES: Record<number, string> = {
  429: "AI quota exceeded. Please try again later.",
  502: "AI service temporarily unavailable.",
  503: "AI service is not configured.",
};

export function getDefaultUserMessage(
  code: ApiErrorCode,
  statusCode: number | null,
): string {
  if (statusCode !== null && AI_STATUS_MESSAGES[statusCode]) {
    return AI_STATUS_MESSAGES[statusCode];
  }

  switch (code) {
    case "VALIDATION_ERROR":
      return "Please check your input and try again.";
    case "NOT_FOUND":
      return "The requested resource was not found.";
    case "UNAUTHORIZED":
      return "You are not authorized to perform this action.";
    case "FORBIDDEN":
      return "You do not have permission to perform this action.";
    case "AI_QUOTA_EXCEEDED":
      return AI_STATUS_MESSAGES[429];
    case "AI_UNAVAILABLE":
      return AI_STATUS_MESSAGES[502];
    case "AI_NOT_CONFIGURED":
      return AI_STATUS_MESSAGES[503];
    case "NETWORK_ERROR":
      return "Network error. Please check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function mapStatusToErrorCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 422) return "VALIDATION_ERROR";
  if (status === 429) return "AI_QUOTA_EXCEEDED";
  if (status === 502) return "AI_UNAVAILABLE";
  if (status === 503) return "AI_NOT_CONFIGURED";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN_ERROR";
}

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return error instanceof ApiRequestError;
}

export function normalizeApiError(error: unknown): ApiRequestError {
  if (isApiRequestError(error)) {
    return error;
  }

  if (isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const body = error.response?.data as
      | { error?: ApiErrorBody; message?: string }
      | undefined;

    if (body?.error) {
      return new ApiRequestError(body.error.message, {
        code: body.error.code,
        statusCode: status,
        details: body.error.details,
        isRetryable: status !== null && status >= 500,
        userMessage: getDefaultUserMessage(body.error.code, status),
      });
    }

    if (!error.response) {
      return new ApiRequestError("Network request failed", {
        code: "NETWORK_ERROR",
        statusCode: null,
        isRetryable: true,
      });
    }

    const code = mapStatusToErrorCode(status ?? 500);
    return new ApiRequestError(error.message, {
      code,
      statusCode: status,
      isRetryable: status !== null && status >= 500,
    });
  }

  if (error instanceof Error) {
    return new ApiRequestError(error.message);
  }

  return new ApiRequestError("An unexpected error occurred");
}

export function logApiError(error: unknown, context?: string): void {
  const normalized = normalizeApiError(error);
  const prefix = context ? `[API:${context}]` : "[API]";

  if (import.meta.env.DEV) {
    console.error(prefix, {
      code: normalized.code,
      statusCode: normalized.statusCode,
      message: normalized.message,
      details: normalized.details,
    });
  }
}
