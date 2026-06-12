import { cn } from "@/lib/utils";
import { LayoutPlaceholderCard } from "./LayoutPlaceholderCard";

const heroMiniCards = ["Hero Card 2", "Hero Card 3", "Hero Card 4", "Hero Card 5"] as const;
const sideCards = ["Card 1", "Card 2", "Card 3", "Card 4"] as const;

export function CampaignsLayoutSkeleton() {
  return (
    <div className="campaigns-layout flex w-full min-w-0 flex-col gap-5">
      {/* Hero — 5 cards, first wider */}
      <div
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4",
          "lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))]",
        )}
      >
        <LayoutPlaceholderCard
          title="Hero"
          className="min-h-[160px] sm:col-span-2 lg:col-span-1 lg:min-h-[180px]"
          bodyClassName="min-h-[96px] lg:min-h-[108px]"
        />
        {heroMiniCards.map((title) => (
          <LayoutPlaceholderCard
            key={title}
            title={title}
            compact
            className="min-h-[120px] lg:min-h-[180px]"
            bodyClassName="min-h-[64px] lg:min-h-[108px]"
          />
        ))}
      </div>

      {/* Main content — 70 / 30 */}
      <div className="grid min-h-0 min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-[7fr_3fr] lg:gap-6">
        <LayoutPlaceholderCard
          title="Main Workspace"
          className="min-h-[480px] lg:min-h-[560px]"
          bodyClassName="min-h-[380px] lg:min-h-[460px]"
        />

        <div className="flex min-h-[480px] flex-col gap-2 rounded-[16px] border border-white/[0.08] bg-[#0c0c0c] p-4 lg:min-h-[560px]">
          {sideCards.map((title) => (
            <LayoutPlaceholderCard
              key={title}
              title={title}
              variant="panel"
              compact
              className="min-h-0 flex-1"
              bodyClassName="min-h-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
