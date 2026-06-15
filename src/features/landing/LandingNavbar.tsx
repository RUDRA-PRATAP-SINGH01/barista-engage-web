import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-8 pt-7">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[12px] bg-primary shadow-[0_0_24px_rgba(75,140,255,0.45)]">
            <Coffee className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-foreground">
              Barista Engage
            </span>
            <span className="text-[11px] font-light text-muted-foreground">
              Marketing Intelligence
            </span>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="landing-explore-btn rounded-full border border-primary/40 bg-primary/15 px-5 py-2 text-sm font-medium text-[#8CB8FF] shadow-[0_0_28px_rgba(75,140,255,0.28)] transition-all duration-200 hover:border-primary/60 hover:bg-primary/22 hover:shadow-[0_0_36px_rgba(75,140,255,0.38)]"
        >
          Explore
        </Link>
      </div>
    </header>
  );
}
