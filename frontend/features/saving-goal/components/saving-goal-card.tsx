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

type SavingGoalCardProps = {
  id: number;
  name: string;
  targetAmount: number;
  currentSaved: number;
};

export function SavingGoalCard({
  name,
  targetAmount,
  currentSaved,
}: SavingGoalCardProps) {
  const indicatorColor = "#8b5cf6";
  const trackColor = "#ddd6fe";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          ${currentSaved.toLocaleString()} of ${targetAmount.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={(currentSaved / targetAmount) * 100}
          className="w-full h-2"
          indicatorColor={indicatorColor}
          trackColor={trackColor}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {((currentSaved / targetAmount) * 100).toFixed(1)}% Complete
        </p>
        <Button size="icon" variant="ghost">
          <HandCoins />
        </Button>
      </CardFooter>
    </Card>
  );
}
