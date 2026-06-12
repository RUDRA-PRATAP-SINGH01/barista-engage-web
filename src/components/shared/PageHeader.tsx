import { Bell, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

const today = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border bg-card text-muted-foreground"
        >
          <Calendar className="size-3.5" />
          Today ({today})
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6E7482]" />
          <Input
            placeholder="Search"
            className="h-9 w-64 rounded-[10px] border-border bg-card pl-9 placeholder:text-[#6E7482]"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Notifications"
          className="relative size-9 border-border bg-card text-muted-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
        </Button>
        {actions}
      </div>
    </div>
  );
}
