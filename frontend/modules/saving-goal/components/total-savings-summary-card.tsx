"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrencyStore } from "@/stores/use-currency-store";

type TotalSavingsSummaryCardProps = {
  totalSavings: number;
  totalTarget: number;
};

export function TotalSavingsSummaryCard({
  totalSavings,
  totalTarget,
}: TotalSavingsSummaryCardProps) {
  const currency = useCurrencyStore((state) => state.currency);

  const indicatorColor = "#8b5cf6";
  const trackColor = "#ddd6fe";

  let totalPercentage = (totalSavings / totalTarget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Savings Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Total Saved:</span>
            <span className="font-bold">
              {totalSavings.toLocaleString()} {currency}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Target:</span>
            <span className="font-bold">
              {totalTarget.toLocaleString()} {currency}
            </span>
          </div>
        </div>
        <div>
          <Progress
            value={(totalSavings / totalTarget) * 100}
            className="w-full"
            indicatorColor={indicatorColor}
            trackColor={trackColor}
          />
          <p className="text-center mt-2 text-sm text-muted-foreground">
            {isNaN(totalPercentage) ? 0 : totalPercentage.toFixed(1)}% of total
            goals achieved
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
