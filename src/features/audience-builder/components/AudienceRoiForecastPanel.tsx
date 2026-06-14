import type { AudienceForecastView } from "../types";
import { MetricBlock, PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudienceRoiForecastPanelProps {
  data: AudienceForecastView;
}

export function AudienceRoiForecastPanel({ data }: AudienceRoiForecastPanelProps) {
  return (
    <PremiumSurface variant="accent" className="p-6 sm:p-8">
      <SectionEyebrow>ROI Forecast</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Expected campaign impact
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricBlock label="Expected Open Rate" value={data.expectedOpenRate} />
        <MetricBlock label="Expected CTR" value={data.expectedCtr} />
        <MetricBlock
          label="Expected Revenue Impact"
          value={data.expectedRevenueImpact}
          large
        />
        <MetricBlock label="ROI" value={data.roi} large />
      </div>
    </PremiumSurface>
  );
}
