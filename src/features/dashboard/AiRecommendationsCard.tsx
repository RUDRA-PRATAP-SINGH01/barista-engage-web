import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aiRecommendations } from "./mock-data";

export function AiRecommendationsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Suggested actions based on customer data</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {aiRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex flex-col gap-1 rounded-[10px] border border-border bg-elevated/40 p-4 transition-colors duration-150 hover:bg-elevated"
          >
            <span className="text-sm font-medium text-foreground">
              {rec.title}
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {rec.description}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
