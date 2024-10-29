"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAccountsStore } from "@/stores/accounts-store";
import { useStore } from "zustand";

type TotalSavingsSummaryCardProps = {
  totalSavings: number;
  totalTarget: number;
};

export function TotalSavingsSummaryCard({
  totalSavings,
  totalTarget,
}: TotalSavingsSummaryCardProps) {
  const indicatorColor = "#8b5cf6";
  const trackColor = "#ddd6fe";

  const accountsStore = useStore(useAccountsStore, (state) => state);
  if (!accountsStore) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Savings Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <button onClick={accountsStore.inc}>inc</button>
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
            indicatorColor={indicatorColor}
            trackColor={trackColor}
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
