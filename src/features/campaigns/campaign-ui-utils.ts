import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import type { Channel } from "@/types";
import type { CampaignHubStatus } from "./mock-data";

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

export function formatCampaignDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRate(value: number | null, suffix = "%") {
  if (value === null) return "—";
  return `${value}${suffix}`;
}
