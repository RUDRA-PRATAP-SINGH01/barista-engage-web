import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import type { CampaignOverviewDto } from "@/types/dtos/campaign-studio.dto";

interface CampaignOverviewSectionProps {
  overview: CampaignOverviewDto;
}

export function CampaignOverviewSection({ overview }: CampaignOverviewSectionProps) {
  return (
    <PremiumSurface
      variant="accent"
      className="relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,140,255,0.18),transparent_55%)]" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4b8cff]/30 bg-[#4b8cff]/15 px-3 py-1 text-[10px] font-semibold tracking-wide text-[#8cb8ff] uppercase">
            <Sparkles className="size-3" />
            Campaign Overview
          </span>
          <SectionEyebrow>Section 1</SectionEyebrow>
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {overview.campaignName}
        </h2>
        <p className="mt-3 text-sm font-medium text-[#8cb8ff]">
          {overview.campaignObjective}
        </p>
        <p className="mt-4 max-w-3xl text-sm font-light leading-relaxed text-[#c4cad6]">
          {overview.campaignSummary}
        </p>
      </div>
    </PremiumSurface>
  );
}

export function AnimatedMetric({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-light tracking-wide text-[#8a93a8] uppercase">
        {label}
      </span>
      <span
        className={`font-semibold tracking-tight text-white transition-all duration-700 ${
          large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        {displayValue}
      </span>
    </div>
  );
}
