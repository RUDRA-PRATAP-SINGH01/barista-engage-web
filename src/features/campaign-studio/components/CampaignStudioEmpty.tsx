import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";

export function CampaignStudioEmpty() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <PremiumSurface className="flex max-w-xl flex-col items-center px-8 py-12 text-center sm:px-12 sm:py-14">
        <SectionEyebrow>Campaign Studio</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          No audience selected
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-[#8a93a8] sm:text-base">
          Generate an audience in Audience Builder first, then create a campaign
          to continue in Campaign Studio.
        </p>
        <Link
          to="/ai/audience-builder"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4b8cff] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a7af0]"
        >
          <Sparkles className="size-4" />
          Go To Audience Builder
        </Link>
      </PremiumSurface>
    </div>
  );
}
