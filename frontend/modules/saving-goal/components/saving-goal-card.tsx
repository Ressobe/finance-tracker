"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HandCoins } from "lucide-react";
import { SavingGoalDropdownMenu } from "./saving-goal-dropdown-menu";
import { SavingTransactionDialog } from "@/modules/saving-transaction/components/saving-transaction-dialog";
import { SavingGoalModel } from "@/types/saving-goal";
import { useCurrencyStore } from "@/stores/use-currency-store";

type SavingGoalCardProps = {
  savingGoal: SavingGoalModel;
};

export function SavingGoalCard({ savingGoal }: SavingGoalCardProps) {
  const currency = useCurrencyStore((state) => state.currency);

  const indicatorColor = "#8b5cf6";
  const trackColor = "#ddd6fe";

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>{savingGoal.name}</CardTitle>
          <CardDescription>
            {savingGoal.currentSaved.toLocaleString()} {currency} of{" "}
            {savingGoal.targetAmount.toLocaleString()} {currency}
          </CardDescription>
        </div>
        <SavingGoalDropdownMenu savingGoal={savingGoal} />
      </CardHeader>
      <CardContent>
        <Progress
          value={(savingGoal.currentSaved / savingGoal.targetAmount) * 100}
          className="w-full h-2"
          indicatorColor={indicatorColor}
          trackColor={trackColor}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {((savingGoal.currentSaved / savingGoal.targetAmount) * 100).toFixed(
            1,
          )}
          % Complete
        </p>
        <SavingTransactionDialog savingGoal={savingGoal}>
          <Button size="icon" variant="ghost">
            <HandCoins />
          </Button>
        </SavingTransactionDialog>
      </CardFooter>
    </Card>
  );
}
