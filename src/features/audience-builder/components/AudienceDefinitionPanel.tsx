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
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Generated filters
      </h3>
      <p className="mt-3 text-sm font-light leading-relaxed text-[#8a93a8]">
        AI-defined rules that determine who belongs in this audience.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#4b8cff]/25 bg-[#4b8cff]/10 px-3 py-1.5 text-xs font-semibold text-[#8cb8ff]">
          {audienceName}
        </span>
        {filterChips.length === 0 ? (
          <span className="text-xs font-light text-[#8a93a8]">
            No filters generated
          </span>
        ) : (
          filterChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-[#151b28] px-3 py-1.5 text-xs font-light text-[#c4cad6]"
            >
              <Filter className="size-3 shrink-0 text-[#8cb8ff]/70" />
              {chip.label}
            </span>
          ))
        )}
      </div>
    </PremiumSurface>
  );
}
