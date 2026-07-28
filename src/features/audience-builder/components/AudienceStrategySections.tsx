import type { AudienceStrategyView } from "../types";
import { PremiumSurface, SectionEyebrow } from "./audience-builder-ui";

interface AudienceStrategySectionProps {
  title: "Why" | "What" | "How";
  content: string;
}

export function AudienceStrategySection({
  title,
  content,
}: AudienceStrategySectionProps) {
  return (
    <PremiumSurface className="h-full p-6 sm:p-8">
      <SectionEyebrow>Strategy</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
        {content}
      </p>
    </PremiumSurface>
  );
}

interface AudienceStrategySectionsProps {
  strategy: AudienceStrategyView;
}

export function AudienceStrategySections({
  strategy,
}: AudienceStrategySectionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <AudienceStrategySection title="Why" content={strategy.why} />
      <AudienceStrategySection title="What" content={strategy.what} />
      <AudienceStrategySection title="How" content={strategy.how} />
    </div>
  );
}
