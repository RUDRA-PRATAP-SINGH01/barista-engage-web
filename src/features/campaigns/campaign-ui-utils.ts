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
  Draft: "border-white/10 bg-white/[0.04] text-muted-foreground",
  Active: "border-primary/35 bg-primary/15 text-primary",
  Completed: "border-primary/25 bg-primary/10 text-[#8CB8FF]",
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
