import type { GeneratedAudienceView } from "../types";
import { MetricBlock, PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudienceGeneratedPanelProps {
  data: GeneratedAudienceView;
}

export function AudienceGeneratedPanel({ data }: AudienceGeneratedPanelProps) {
  return (
    <PremiumSurface className="h-full p-6 sm:p-8">
      <SectionEyebrow>Generated Audience</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {data.name}
      </h3>
      <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
        {data.description}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <MetricBlock label="Goal" value={data.goal} />
        <MetricBlock label="Confidence" value={data.confidence} />
        <MetricBlock label="Recommended Channel" value={data.recommendedChannel} />
        <MetricBlock label="Recommended Offer" value={data.recommendedOffer} />
      </div>
    </PremiumSurface>
  );
}
