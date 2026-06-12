import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { getApiBaseUrl } from "@/lib/env";
import { logApiError, normalizeApiError } from "@/lib/errors";

const REQUEST_TIMEOUT_MS = 30_000;

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: REQUEST_TIMEOUT_MS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((config) => {
    // Auth token attachment point for future integration.
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const normalized = normalizeApiError(error);
      logApiError(normalized, error.config?.url);
      return Promise.reject(normalized);
    },
  );

  return client;
}

export const apiClient = createApiClient();

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient.get<T>(url, config);
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient.post<T>(url, body, config);
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient.put<T>(url, body, config);
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient.patch<T>(url, body, config);
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient.delete<T>(url, config);
}
