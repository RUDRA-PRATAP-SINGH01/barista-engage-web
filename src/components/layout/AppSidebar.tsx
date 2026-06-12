import { NavLink } from "react-router-dom";
import {
  Coffee,
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart3,
  Sparkles,
  Bot,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const overviewItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Segments", to: "/segments", icon: Users },
  { label: "Campaigns", to: "/campaigns", icon: Megaphone },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
];

const aiItems: NavItem[] = [
  { label: "Audience Builder", to: "/ai/audience-builder", icon: Sparkles },
  { label: "Campaign Analyst", to: "/ai/campaign-analyst", icon: Bot },
];

function SidebarSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-[11px] font-normal tracking-wider text-muted-foreground uppercase">
        {title}
      </p>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            cn(
              "flex h-10 items-center gap-3 rounded-[10px] px-3 text-sm font-normal transition-colors duration-150",
              isActive
                ? "bg-white/[0.06] text-foreground"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn("size-4.5", isActive ? "text-primary" : "")}
              />
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-(--sidebar-width) flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-8">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-primary">
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

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-8 overflow-y-auto px-4">
        <SidebarSection title="Overview" items={overviewItems} />
        <SidebarSection title="AI Tools" items={aiItems} />
      </nav>

      {/* User profile */}
      <div className="border-t border-border px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left transition-colors duration-150 hover:bg-white/[0.04]"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-primary">
            MS
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-normal text-foreground">
              Maya Sharma
            </span>
            <span className="truncate text-xs font-light text-muted-foreground">
              maya@barista.coffee
            </span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
