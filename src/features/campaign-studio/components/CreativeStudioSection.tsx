import { ImageIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import type { CampaignCreativeDto } from "@/types/dtos/campaign-studio.dto";

interface CreativeStudioSectionProps {
  creative: CampaignCreativeDto | null;
  isGenerating: boolean;
  errorMessage: string | null;
  onGenerate: () => Promise<void>;
  onRegenerate: () => Promise<void>;
}

export function CreativeStudioSection({
  creative,
  isGenerating,
  errorMessage,
  onGenerate,
  onRegenerate,
}: CreativeStudioSectionProps) {
  return (
    <PremiumSurface className="p-6 sm:p-8">
      <SectionEyebrow>Creative Studio</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Campaign visual
      </h3>

      {errorMessage ? (
        <div className="mt-6 rounded-[18px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-light text-rose-300">
          {errorMessage}
        </div>
      ) : null}

      {!creative && !isGenerating ? (
        <div className="mt-6 rounded-[22px] border border-dashed border-white/10 bg-[#0d121c]/60 p-10 text-center">
          <ImageIcon className="mx-auto size-10 text-[#8cb8ff]/60" />
          <p className="mt-4 text-sm font-light text-[#8a93a8]">
            Generate a marketing visual based on your campaign objective, audience,
            offer, and channel.
          </p>
          <button
            type="button"
            onClick={onGenerate}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b8cff] px-5 py-2.5 text-sm font-medium text-white"
          >
            Generate Campaign Visual
          </button>
        </div>
      ) : null}

      {isGenerating ? (
        <div className="mt-6 overflow-hidden rounded-[22px] border border-white/8">
          <div className="aspect-square max-w-md animate-pulse bg-[linear-gradient(110deg,#151b28_8%,#1f2c3d_18%,#151b28_33%)] bg-size-[200%_100%]" />
          <p className="px-4 py-3 text-xs font-light text-[#8a93a8]">
            Generating campaign visual...
          </p>
        </div>
      ) : null}

      {creative && !isGenerating ? (
        <div className="mt-6">
          <div className="overflow-hidden rounded-[22px] border border-white/8">
            <img
              src={creative.imageUrl}
              alt="Generated campaign visual"
              className="aspect-square w-full max-w-md object-cover"
            />
          </div>
          <p className="mt-4 max-w-md text-xs font-light leading-relaxed text-[#8a93a8]">
            {creative.imagePrompt}
          </p>
          <button
            type="button"
            onClick={onRegenerate}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-[#151b28] px-4 py-2 text-sm font-light text-[#c4cad6]"
          >
            <RefreshCw className={cn("size-4")} />
            Regenerate Visual
          </button>
        </div>
      ) : null}
    </PremiumSurface>
  );
}
