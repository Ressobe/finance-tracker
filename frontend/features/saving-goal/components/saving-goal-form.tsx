import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export async function SavingGoalForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Saving Goal</CardTitle>
        <CardDescription>
          Set a new financial goal to track your savings progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input id="goalName" placeholder="e.g., Vacation Fund" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <Input id="targetAmount" type="number" placeholder="e.g., 5000" />
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
