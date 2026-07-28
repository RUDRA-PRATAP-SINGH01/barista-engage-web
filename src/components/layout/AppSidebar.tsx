import { NavLink } from "react-router-dom";
import {
  Coffee,
  LayoutDashboard,
  Users,
  Megaphone,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const overviewItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Segments", to: "/segments", icon: Users },
  { label: "Campaigns", to: "/campaigns", icon: Megaphone },
];

const aiItems: NavItem[] = [
  { label: "Audience Builder", to: "/ai/audience-builder", icon: Sparkles },
  { label: "Campaign Studio", to: "/campaign-studio", icon: Megaphone },
];

function SidebarSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {title}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/dashboard"}
          className={({ isActive }) =>
            cn(
              "flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )
          }
        >
          <item.icon className="size-4 shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-(--sidebar-width) flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center justify-between gap-3 px-4 pt-5 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
            <Coffee className="size-4 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Barista Engage
            </span>
            <span className="text-[11px] text-muted-foreground">
              Marketing Intelligence
            </span>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3">
        <SidebarSection title="AI Tools" items={aiItems} />
        <SidebarSection title="Overview" items={overviewItems} />
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-150 hover:bg-sidebar-accent"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
            MS
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              Maya Sharma
            </span>
            <span className="truncate text-xs text-muted-foreground">
              maya@barista.coffee
            </span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
