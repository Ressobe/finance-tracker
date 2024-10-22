import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type TotalSavingsSummaryCardProps = {
  totalSavings: number;
  totalTarget: number;
};

export function TotalSavingsSummaryCard({
  totalSavings,
  totalTarget,
}: TotalSavingsSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Savings Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Total Saved:</span>
            <span className="font-bold">${totalSavings.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Target:</span>
            <span className="font-bold">${totalTarget.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <Progress
            value={(totalSavings / totalTarget) * 100}
            className="w-full"
          />
          <p className="text-center mt-2 text-sm text-muted-foreground">
            {((totalSavings / totalTarget) * 100).toFixed(1)}% of total goals
            achieved
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
