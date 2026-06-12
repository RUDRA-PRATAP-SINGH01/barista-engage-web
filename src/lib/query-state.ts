import type { UseQueryResult } from "@tanstack/react-query";
import {
  isApiRequestError,
  normalizeApiError,
  type ApiRequestError,
} from "@/lib/errors";

export type AsyncDataState =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "empty";

export interface QueryStateResult<TData> {
  state: AsyncDataState;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  isFetching: boolean;
  data: TData | undefined;
  error: ApiRequestError | null;
  userMessage: string | null;
}

function isEmptyData<TData>(data: TData | undefined): boolean {
  if (data === undefined || data === null) return false;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === "object") return Object.keys(data).length === 0;
  return false;
}

export function getQueryState<TData>(
  query: Pick<
    UseQueryResult<TData, unknown>,
    "status" | "fetchStatus" | "data" | "error" | "isPending" | "isFetching"
  >,
): QueryStateResult<TData> {
  const error = query.error
    ? isApiRequestError(query.error)
      ? query.error
      : normalizeApiError(query.error)
    : null;

  const isLoading = query.isPending && query.isFetching;

  const isSuccess = query.status === "success";
  const isError = query.status === "error";
  const isEmpty = isSuccess && isEmptyData(query.data);

  let state: AsyncDataState = "idle";

  if (isLoading) {
    state = "loading";
  } else if (isError) {
    state = "error";
  } else if (isEmpty) {
    state = "empty";
  } else if (isSuccess) {
    state = "success";
  }

  return {
    state,
    isIdle: state === "idle",
    isLoading,
    isSuccess,
    isError,
    isEmpty,
    isFetching: query.isFetching,
    data: query.data,
    error,
    userMessage: error?.userMessage ?? null,
  };
}

export function getMutationState<TData>(
  mutation: {
    status: "idle" | "pending" | "success" | "error";
    data?: TData;
    error: unknown;
    isPending: boolean;
  },
): Omit<QueryStateResult<TData>, "isFetching" | "isEmpty"> & {
  isPending: boolean;
} {
  const error = mutation.error
    ? isApiRequestError(mutation.error)
      ? mutation.error
      : normalizeApiError(mutation.error)
    : null;

  let state: AsyncDataState = "idle";

  if (mutation.isPending) {
    state = "loading";
  } else if (mutation.status === "error") {
    state = "error";
  } else if (mutation.status === "success") {
    state = "success";
  }

  return {
    state,
    isIdle: state === "idle",
    isLoading: mutation.isPending,
    isPending: mutation.isPending,
    isSuccess: mutation.status === "success",
    isError: mutation.status === "error",
    data: mutation.data,
    error,
    userMessage: error?.userMessage ?? null,
  };
}
