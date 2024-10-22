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
import { Trash2 } from "lucide-react";

type SavingGoalCardProps = {
  id: number;
  name: string;
  target: number;
  current: number;
};

export function SavingGoalCard({ name, target, current }: SavingGoalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          ${current.toLocaleString()} of ${target.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={(current / target) * 100} className="w-full" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {((current / target) * 100).toFixed(1)}% Complete
        </p>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
