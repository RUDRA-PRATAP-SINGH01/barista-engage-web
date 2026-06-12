import { Coffee } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Dashboard", to: "/dashboard" },
] as const;

export function LandingNavbar() {
  const location = useLocation();

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

        <nav className="landing-glass-pill hidden items-center gap-1 rounded-full border border-primary/25 bg-white/[0.04] p-1.5 backdrop-blur-xl md:flex">
          {navItems.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : item.to === "/dashboard"
                  ? location.pathname.startsWith("/dashboard")
                  : false;

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-normal transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-foreground shadow-[0_0_20px_rgba(75,140,255,0.2)]"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

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
