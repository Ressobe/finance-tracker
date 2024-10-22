import { SavingGoalCard } from "@/features/saving-goal/components/saving-goal-card";
import { SavingGoalForm } from "@/features/saving-goal/components/saving-goal-form";
import { TotalSavingsSummaryCard } from "@/features/saving-goal/components/total-savings-summary-card";

const goals = [
  { id: 1, name: "Emergency Fund", target: 10000, current: 5000 },
  { id: 2, name: "Vacation", target: 5000, current: 2000 },
  { id: 3, name: "New Car", target: 20000, current: 4000 },
];

const totalSavings = goals.reduce((sum, goal) => sum + goal.current, 0);
const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

export default function SavingGoalsPage() {
  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Saving goals</h1>
        <span className="text-muted-foreground">
          Track your savings progress.
        </span>
      </div>

      <SavingGoalForm />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((item) => {
          return <SavingGoalCard key={item.id} {...item} />;
        })}
      </div>
      <div className="w-2/5">
        <TotalSavingsSummaryCard
          totalSavings={totalSavings}
          totalTarget={totalTarget}
        />
      </div>
    </section>
  );
}
