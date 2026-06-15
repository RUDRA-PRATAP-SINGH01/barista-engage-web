import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import type { StrategyCardDto } from "@/types/dtos/campaign-studio.dto";

interface StrategyCardsSectionProps {
  cards: StrategyCardDto[];
}

export function StrategyCardsSection({ cards }: StrategyCardsSectionProps) {
  return (
    <PremiumSurface className="p-6 sm:p-8">
      <SectionEyebrow>Strategy Cards</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Why this campaign works
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-[22px] border border-white/8 bg-[#0d121c]/60 p-5"
          >
            <p className="text-[11px] font-light tracking-wide text-[#8a93a8] uppercase">
              {card.title}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">{card.headline}</p>
            {card.highlight ? (
              <span className="mt-2 inline-flex rounded-full bg-[#4b8cff]/15 px-2.5 py-1 text-[10px] font-semibold text-[#8cb8ff]">
                {card.highlight}
              </span>
            ) : null}
            <ul className="mt-4 flex flex-col gap-2">
              {card.points.map((point) => (
                <li
                  key={point}
                  className="text-sm font-light leading-relaxed text-[#c4cad6]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PremiumSurface>
  );
}
