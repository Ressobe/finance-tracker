import { getDailyIncomesExpenses, getTotalFlowSummary } from "@/api/account";
import {
  getExpenseByCategories,
  getIncomeByCategories,
  getOverview,
} from "@/api/user";
import { Balance } from "@/components/balance";
import { DailyExpensesIncomesBarChart } from "@/components/charts/daily-expenses-incomes-bar-chart";
import { TotalFlowSummaryPieChart } from "@/components/charts/total-flow-summary-pie-chart";
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
  const { data: totalFlowSummary } = await getTotalFlowSummary();
  const { data: dailyExpensesIncomes } = await getDailyIncomesExpenses(
    "2024-11-01",
    "2024-11-29",
  );

  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <span className="text-muted-foreground">
          Summary of your all accounts
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Income amount={totalIncome} />
        <Expense amount={totalExpense} />
        <Balance amount={totalBalance} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {incomeByCategories && (
          <IncomeByCategories categories={incomeByCategories} />
        )}
        {totalFlowSummary && <TotalFlowSummaryPieChart {...totalFlowSummary} />}
        {expenseByCategories && (
          <ExpenseByCategories categories={expenseByCategories} />
        )}
      </div>
      <h2 className="text-2xl font-bold">History</h2>

      <DailyExpensesIncomesBarChart items={dailyExpensesIncomes ?? []} />
    </section>
  );
}
