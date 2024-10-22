import { getOverview } from "@/api/user";
import { Balance } from "@/components/balance";
import { ExampleChart } from "@/components/example-chart";
import { Expense } from "@/components/expense";
import { ExpenseByCategories } from "@/components/expense-by-categories";
import { Income } from "@/components/income";
import { IncomeByCategories } from "@/components/income-by-categories";

const incomeByCategories = [
  {
    name: "Salary",
    percentageShare: 36,
    amount: 836,
  },
  {
    name: "Freelance income",
    percentageShare: 35,
    amount: 805,
  },
  {
    name: "Investments",
    percentageShare: 29,
    amount: 662,
  },
];

const expenseByCategories = [
  {
    name: "Housing",
    percentageShare: 41,
    amount: 300,
  },
  {
    name: "Transporation",
    percentageShare: 40,
    amount: 290,
  },
  {
    name: "Food",
    percentageShare: 29,
    amount: 432,
  },
];

export default async function Dashboard() {
  const { data, error } = await getOverview();
  if (error) {
    return null;
  }
  const { totalIncome, totalBalance, totalExpense } = data;

  return (
    <section className="space-y-12">
      <h1 className="text-3xl font-bold">Overiew</h1>
      <div className="flex gap-4">
        <Income amount={totalIncome} currencySymbol="PLN" />
        <Expense amount={totalExpense} currencySymbol="PLN" />
        <Balance amount={totalBalance} currencySymbol="PLN" />
      </div>
      <div className="grid grid-cols-2 gap-8 pt-6">
        <IncomeByCategories categories={incomeByCategories} />
        <ExpenseByCategories categories={expenseByCategories} />
      </div>
      <h2 className="text-2xl font-bold">History</h2>
      <ExampleChart />
    </section>
  );
}
