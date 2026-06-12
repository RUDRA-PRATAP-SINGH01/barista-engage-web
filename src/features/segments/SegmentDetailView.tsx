import type { SegmentDetailViewModel } from "./segment-derived-data";
import { SegmentHeroPanel } from "./SegmentHeroPanel";
import { SegmentMarketingCard } from "./SegmentMarketingCard";
import { SegmentRulesCard } from "./SegmentRulesCard";
import {
  SEGMENTS_EMPTY_MESSAGE,
  SEGMENTS_ERROR_MESSAGE,
  SegmentDetailSkeleton,
  SegmentFeedbackCard,
} from "./SegmentsPageFeedback";

interface SegmentDetailViewProps {
  viewModel: SegmentDetailViewModel | null;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
}

export function SegmentDetailView({
  viewModel,
  isLoading,
  isError,
  isEmpty,
  errorMessage,
}: SegmentDetailViewProps) {
  if (isLoading) {
    return <SegmentDetailSkeleton />;
  }

  if (isError) {
    return (
      <SegmentFeedbackCard
        message={errorMessage ?? SEGMENTS_ERROR_MESSAGE}
      />
    );
  }

  if (isEmpty || !viewModel) {
    return <SegmentFeedbackCard message={SEGMENTS_EMPTY_MESSAGE} />;
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      <SegmentHeroPanel viewModel={viewModel} />

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        <SegmentRulesCard
          segmentName={viewModel.name}
          rules={viewModel.rules}
          campaignPerformance={viewModel.campaignPerformance}
        />
        <SegmentMarketingCard marketing={viewModel.marketing} />
      </div>
    </div>
  );
}
