import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PremiumSurface,
  SectionEyebrow,
} from "@/features/audience-builder/components/audience-builder-ui";
import type { CampaignMessageDto } from "@/types/dtos/campaign-studio.dto";
import type { MessageStudioTab } from "../types";

interface MessageStudioSectionProps {
  message: CampaignMessageDto;
  onChange: (message: CampaignMessageDto) => void;
  onRegenerate: (tab: MessageStudioTab) => Promise<void>;
  isRegenerating: boolean;
}

const TABS: { id: MessageStudioTab; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
];

function getTabCopy(message: CampaignMessageDto, tab: MessageStudioTab): string {
  if (tab === "whatsapp") return message.whatsAppMessage;
  if (tab === "email") {
    return `Subject: ${message.emailSubject}\n\n${message.emailBody}`;
  }
  return message.smsMessage;
}

export function MessageStudioSection({
  message,
  onChange,
  onRegenerate,
  isRegenerating,
}: MessageStudioSectionProps) {
  const [activeTab, setActiveTab] = useState<MessageStudioTab>("whatsapp");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  async function handleCopy() {
    const text = getTabCopy(message, activeTab);
    await navigator.clipboard.writeText(text);
    setCopyMessage("Copied to clipboard");
    window.setTimeout(() => setCopyMessage(null), 2000);
  }

  return (
    <PremiumSurface className="p-6 sm:p-8">
      <SectionEyebrow>Message Studio</SectionEyebrow>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Campaign copy
      </h3>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-light transition-colors",
              activeTab === tab.id
                ? "border-[var(--foreground)]/40 bg-[var(--foreground)]/15 text-foreground"
                : "border-border bg-muted text-muted-foreground hover:border-[var(--foreground)]/25",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "whatsapp" ? (
          <div className="mx-auto max-w-md">
            <textarea
              value={message.whatsAppMessage}
              onChange={(event) =>
                onChange({ ...message, whatsAppMessage: event.target.value })
              }
              rows={5}
              className="w-full rounded-[22px] rounded-tl-md border border-border bg-muted px-4 py-3 text-sm font-light leading-relaxed text-foreground focus:border-[var(--foreground)]/40 focus:outline-none"
            />
          </div>
        ) : null}

        {activeTab === "email" ? (
          <div className="rounded-[24px] border border-border bg-[#f5f7fb] p-6 text-[#10141d]">
            <input
              value={message.emailSubject}
              onChange={(event) =>
                onChange({ ...message, emailSubject: event.target.value })
              }
              className="w-full border-b border-[#d7dbe4] bg-transparent pb-3 text-sm font-semibold focus:outline-none"
              placeholder="Email subject"
            />
            <textarea
              value={message.emailBody}
              onChange={(event) =>
                onChange({ ...message, emailBody: event.target.value })
              }
              rows={8}
              className="mt-4 w-full resize-none bg-transparent text-sm leading-relaxed focus:outline-none"
            />
          </div>
        ) : null}

        {activeTab === "sms" ? (
          <textarea
            value={message.smsMessage}
            onChange={(event) =>
              onChange({ ...message, smsMessage: event.target.value })
            }
            rows={4}
            className="w-full max-w-md rounded-[18px] border border-border bg-background px-4 py-3 text-sm font-light leading-relaxed text-muted-foreground focus:border-[var(--foreground)]/40 focus:outline-none"
          />
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm font-light text-muted-foreground"
        >
          <Copy className="size-4" />
          Copy
        </button>
        <button
          type="button"
          onClick={() => onRegenerate(activeTab)}
          disabled={isRegenerating}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/30 bg-[var(--foreground)]/10 px-4 py-2 text-sm font-light text-[var(--foreground)] disabled:opacity-60"
        >
          <RefreshCw className={cn("size-4", isRegenerating && "animate-spin")} />
          Regenerate
        </button>
        {copyMessage ? (
          <span className="text-xs font-light text-[var(--foreground)]">{copyMessage}</span>
        ) : null}
      </div>
    </PremiumSurface>
  );
}
