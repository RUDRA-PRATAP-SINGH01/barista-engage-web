export const queryKeys = {
  campaigns: {
    all: ["campaigns"] as const,
    lists: () => [...queryKeys.campaigns.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.campaigns.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.campaigns.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.campaigns.details(), id] as const,
    analytics: (id: string) =>
      [...queryKeys.campaigns.detail(id), "analytics"] as const,
    communications: (id: string) =>
      [...queryKeys.campaigns.detail(id), "communications"] as const,
  },
  segments: {
    all: ["segments"] as const,
    lists: () => [...queryKeys.segments.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.segments.lists(), filters ?? {}] as const,
    listWithAudience: () =>
      [...queryKeys.segments.lists(), "with-audience"] as const,
    details: () => [...queryKeys.segments.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.segments.details(), id] as const,
    preview: (hash: string) =>
      [...queryKeys.segments.all, "preview", hash] as const,
  },
  ai: {
    all: ["ai"] as const,
    audienceBuilder: (promptHash: string) =>
      [...queryKeys.ai.all, "audience-builder", promptHash] as const,
  },
} as const;
