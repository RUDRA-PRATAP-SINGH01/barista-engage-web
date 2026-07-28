import { ArrowDown } from "lucide-react";
import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import { AnimatedMetric } from "./CampaignOverviewSection";
import type { CampaignStudioView } from "../campaign-studio-mappers";

interface ForecastSectionProps {
  forecast: CampaignStudioView["forecast"];
  funnel: CampaignStudioView["funnel"];
}

export function ForecastSection({ forecast, funnel }: ForecastSectionProps) {
  return (
    <PremiumSurface variant="elevated" className="p-6 sm:p-8">
      <SectionEyebrow>Forecast</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Performance projection
      </h3>

      <div className="mt-8 flex flex-col items-center gap-3">
        {funnel.map((stage, index) => (
          <div
            key={stage.id}
            className="flex w-full max-w-2xl flex-col items-center"
          >
            <div
              className="w-full rounded-[20px] border border-[var(--foreground)]/20 bg-[var(--foreground)]/8 px-5 py-4 text-center transition-all duration-500 hover:scale-[1.01]"
              style={{ maxWidth: `${Math.max(42, 100 - index * 10)}%` }}
            >
              <p className="text-[11px] font-light tracking-wide text-muted-foreground uppercase">
                {stage.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{stage.value}</p>
            </div>
            {index < funnel.length - 1 ? (
              <ArrowDown className="my-1 size-4 text-[var(--foreground)]/60" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <AnimatedMetric label="Audience Size" value={forecast.audienceSize} />
        <AnimatedMetric label="Expected Reach" value={forecast.expectedReach} />
        <AnimatedMetric label="Expected Open Rate" value={forecast.expectedOpenRate} />
        <AnimatedMetric label="Expected CTR" value={forecast.expectedCtr} />
        <AnimatedMetric label="Revenue Impact" value={forecast.expectedRevenue} large />
        <AnimatedMetric label="ROI" value={forecast.expectedRoi} large />
      </div>
    </PremiumSurface>
  );
}
