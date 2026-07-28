import { Filter } from "lucide-react";
import type { AudienceFilterChip } from "../types";
import { PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudienceDefinitionPanelProps {
  audienceName: string;
  filterChips: AudienceFilterChip[];
}

export function AudienceDefinitionPanel({
  audienceName,
  filterChips,
}: AudienceDefinitionPanelProps) {
  return (
    <PremiumSurface className="p-6 sm:p-8">
      <SectionEyebrow>Audience Definition</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Generated filters
      </h3>
      <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
        AI-defined rules that determine who belongs in this audience.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/25 bg-[var(--foreground)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]">
          {audienceName}
        </span>
        {filterChips.length === 0 ? (
          <span className="text-xs font-light text-muted-foreground">
            No filters generated
          </span>
        ) : (
          filterChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-light text-muted-foreground"
            >
              <Filter className="size-3 shrink-0 text-[var(--foreground)]/70" />
              {chip.label}
            </span>
          ))
        )}
      </div>
    </PremiumSurface>
  );
}
