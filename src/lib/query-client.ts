import {
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { isApiRequestError, logApiError } from "@/lib/errors";

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (failureCount >= 1) return false;
  if (isApiRequestError(error)) {
    if (error.statusCode !== null && error.statusCode < 500) return false;
    if (error.code === "AI_QUOTA_EXCEEDED") return false;
    return error.isRetryable;
  }
  return true;
}

function handleGlobalQueryError(error: unknown): void {
  logApiError(error);
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalQueryError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalQueryError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: shouldRetryQuery,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
