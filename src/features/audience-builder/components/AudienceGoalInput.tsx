import { useState } from "react";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import {
  AI_RECOMMENDED_GOALS,
  GOAL_SUGGESTIONS,
} from "../mock-data";
import type { AudienceGoalSuggestion } from "../types";
import { PremiumSurface } from "./audience-builder-ui";

interface AudienceGoalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function AudienceGoalInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: AudienceGoalInputProps) {
  const [showRecommendations, setShowRecommendations] = useState(false);

  function applySuggestion(suggestion: AudienceGoalSuggestion) {
    onChange(suggestion.prompt);
    setShowRecommendations(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-9">
          <PremiumSurface className="p-1.5">
            <textarea
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              rows={5}
              placeholder="I want to increase revenue by bringing back customers who haven't visited recently."
              className="min-h-[160px] w-full resize-none rounded-[22px] bg-background px-5 py-4 text-base font-light leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
            />
          </PremiumSurface>

          <div className="mt-4 flex flex-wrap gap-2">
            {GOAL_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                disabled={disabled}
                onClick={() => applySuggestion(suggestion)}
                className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-light text-muted-foreground transition-colors hover:border-[var(--foreground)]/35 hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-3">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowRecommendations((open) => !open)}
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-border bg-foreground px-5 py-4 text-sm font-semibold text-background shadow-sm transition-transform hover:scale-[1.01] disabled:opacity-50"
          >
            <Sparkles className="size-4" />
            AI Recommendations
          </button>

          {showRecommendations ? (
            <PremiumSurface className="absolute top-[calc(100%+12px)] z-20 w-full p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <p className="mb-2 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                From your segments
              </p>
              <div className="flex flex-col gap-1">
                {AI_RECOMMENDED_GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => applySuggestion(goal)}
                    className="rounded-[14px] px-3 py-2.5 text-left text-sm font-light text-foreground transition-colors hover:bg-muted"
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </PremiumSurface>
          ) : null}

          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-[20px] border border-border bg-muted px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:border-[var(--foreground)]/30 hover:bg-muted disabled:opacity-50"
          >
            <Wand2 className="size-4 text-[var(--foreground)]" />
            Analyze Audience
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
