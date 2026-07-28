import { Bell, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
  variant?: "default" | "glass";
}

const today = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function PageHeader({
  title,
  actions,
  variant = "default",
}: PageHeaderProps) {
  const isGlass = variant === "glass";

  return (
    <div className="flex items-center justify-between gap-4 pb-8">
      <div className="flex items-center gap-4">
        <h1
          className={cn(
            "text-2xl tracking-tight text-foreground",
            isGlass ? "font-bold" : "font-semibold",
          )}
        >
          {title}
        </h1>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 font-normal text-muted-foreground",
            isGlass
              ? "glass-control rounded-[10px]"
              : "border-border bg-card",
          )}
        >
          <Calendar className="size-3.5" />
          Today ({today})
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className={cn(
              "h-9 w-64 rounded-[10px] pl-9 font-normal placeholder:font-light placeholder:text-muted-foreground",
              isGlass ? "glass-control bg-transparent" : "border-border bg-card",
            )}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Notifications"
          className={cn(
            "relative size-9 text-muted-foreground",
            isGlass ? "glass-control" : "border-border bg-card",
          )}
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary shadow-[0_0_6px_color-mix(in_srgb,var(--primary)_60%,transparent)]" />
        </Button>
        {actions}
      </div>
    </div>
  );
}
