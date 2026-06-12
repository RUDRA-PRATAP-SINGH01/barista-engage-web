export function normalizeNumber(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return value;
}

export function formatLocaleNumber(value: number | null | undefined): string {
  return normalizeNumber(value).toLocaleString();
}
