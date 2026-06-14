import type { AudiencePreviewView } from "../types";
import { MetricBlock, PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudiencePreviewPanelProps {
  data: AudiencePreviewView;
}

export function AudiencePreviewPanel({ data }: AudiencePreviewPanelProps) {
  return (
    <PremiumSurface variant="elevated" className="p-6 sm:p-8">
      <SectionEyebrow>Audience Preview</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Reach estimate
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <MetricBlock
          label="Audience Size"
          value={data.audienceSizeLabel}
          large
        />
        <MetricBlock
          label="Estimated Reach"
          value={data.estimatedReachLabel}
          large
        />
      </div>
    </PremiumSurface>
  );
}
