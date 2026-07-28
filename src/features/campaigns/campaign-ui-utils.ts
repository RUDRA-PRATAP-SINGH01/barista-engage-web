import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import type { Channel } from "@/types";
import { formatLocaleNumber } from "@/lib/format-utils";
import type { CampaignHubStatus } from "./campaign-list-utils";

export const channelMeta: Record<
  Channel,
  { label: string; icon: LucideIcon }
> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle },
  EMAIL: { label: "Email", icon: Mail },
  SMS: { label: "SMS", icon: MessageSquare },
};

export const hubStatusStyles: Record<CampaignHubStatus, string> = {
  Draft: "border-border bg-muted text-muted-foreground",
  Active: "border-foreground/20 bg-foreground text-background",
  Completed: "border-border bg-muted text-foreground",
};

const defaultChannelMeta = channelMeta.EMAIL;

export function getChannelDisplay(channel: Channel | string | undefined) {
  if (!channel) return defaultChannelMeta;
  const upper = channel.toUpperCase() as Channel;
  return channelMeta[upper] ?? defaultChannelMeta;
}

export { formatLocaleNumber };

export function formatCampaignDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRate(
  value: number | null | undefined,
  suffix = "%",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  return `${value}${suffix}`;
}
