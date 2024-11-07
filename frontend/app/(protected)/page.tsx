import {
  getExpenseByCategories,
  getIncomeByCategories,
  getOverview,
} from "@/api/user";
import { Balance } from "@/components/balance";
import { Expense } from "@/components/expense";
import { ExpenseByCategories } from "@/components/expense-by-categories";
import { Income } from "@/components/income";
import { IncomeByCategories } from "@/components/income-by-categories";

export default async function Dashboard() {
  const { data, error } = await getOverview();
  if (error) {
    return null;
  }
  const { totalIncome, totalBalance, totalExpense } = data;

  const { data: incomeByCategories } = await getIncomeByCategories();
  const { data: expenseByCategories } = await getExpenseByCategories();

  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <span className="text-muted-foreground">
          Summary of your all accounts
        </span>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <Income amount={totalIncome} />
        <Expense amount={totalExpense} />
        <Balance amount={totalBalance} />
      </div>
      <div className="grid grid-cols-2 gap-8 pt-6">
        {incomeByCategories && (
          <IncomeByCategories categories={incomeByCategories} />
        )}
        {expenseByCategories && (
          <ExpenseByCategories categories={expenseByCategories} />
        )}
      </div>
      <h2 className="text-2xl font-bold">History</h2>
    </section>
  );
}
