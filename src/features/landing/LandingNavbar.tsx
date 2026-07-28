import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-6 pt-6 sm:px-8 sm:pt-7">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-foreground">
            <Coffee className="size-4 text-background" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Barista Engage
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
