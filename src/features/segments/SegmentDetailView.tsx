import type { SegmentItem } from "./mock-data";
import { getSegmentDetail } from "./segment-detail-data";
import { SegmentHeroPanel } from "./SegmentHeroPanel";
import { SegmentMarketingCard } from "./SegmentMarketingCard";
import { SegmentRulesCard } from "./SegmentRulesCard";

interface SegmentDetailViewProps {
  segment: SegmentItem;
  sharePercent: number;
}

export function SegmentDetailView({
  segment,
  sharePercent,
}: SegmentDetailViewProps) {
  const detail = getSegmentDetail(segment.id);

  return (
    <div className="flex flex-col gap-5 pb-4">
      <SegmentHeroPanel
        segment={segment}
        detail={detail}
        sharePercent={sharePercent}
      />

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <SegmentRulesCard
          segmentName={segment.name}
          rules={detail.rules}
          campaignPerformance={detail.campaignPerformance}
        />
        <SegmentMarketingCard marketing={detail.marketing} />
      </div>
    </div>
  );
}
