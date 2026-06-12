import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { segmentDistribution } from "./mock-data";

const total = segmentDistribution.reduce((sum, d) => sum + d.count, 0);
const max = Math.max(...segmentDistribution.map((d) => d.count));

export function SegmentDistributionCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>RFM Segments</CardTitle>
        <CardDescription>Customer distribution by RFM segment</CardDescription>
      </CardHeader>
      <CardContent className="flex h-[260px] flex-col justify-center gap-4">
        {segmentDistribution.map((entry) => (
          <div key={entry.segment} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{entry.segment}</span>
              <span className="font-medium text-foreground">
                {entry.count.toLocaleString()}
                <span className="ml-1.5 text-[#6E7482]">
                  {Math.round((entry.count / total) * 100)}%
                </span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
              <div
                className="h-full rounded-full bg-primary transition-all duration-200"
                style={{ width: `${(entry.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
