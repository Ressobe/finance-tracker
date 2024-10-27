import { getSavingGoals } from "@/api/saving-goal";
import { Button } from "@/components/ui/button";
import { SavingGoalCard } from "@/features/saving-goal/components/saving-goal-card";
import { SavingGoalDialog } from "@/features/saving-goal/components/saving-goal-dialog";
import { TotalSavingsSummaryCard } from "@/features/saving-goal/components/total-savings-summary-card";
import { PiggyBank } from "lucide-react";

export default async function SavingGoalsPage() {
  const { data, error } = await getSavingGoals();

  if (error) {
    return null;
  }

  const totalSavings = data.reduce((sum, goal) => sum + goal.currentSaved, 0);
  const totalTarget = data.reduce((sum, goal) => sum + goal.targetAmount, 0);

  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Saving goals</h1>
          <span className="text-muted-foreground">
            Track your savings progress.
          </span>
        </div>

        <div className="flex justify-end">
          <SavingGoalDialog>
            <Button
              variant="secondary"
              className="space-x-2 bg-violet-500/10 border border-violet-500 hover:bg-violet-500/20"
            >
              <PiggyBank className="text-violet-500" />
              <span>Create a new saving goal</span>
            </Button>
          </SavingGoalDialog>
        </div>
      </div>

      <TotalSavingsSummaryCard
        totalSavings={totalSavings}
        totalTarget={totalTarget}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          return <SavingGoalCard key={item.id} savingGoal={item} />;
        })}
      </div>
    </section>
  );
}
