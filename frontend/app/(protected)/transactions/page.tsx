import { getTransactions } from "@/api/transaction";
import { TransactionTable } from "@/modules/transaction/components/transaction-table";

export default async function TransactionsPage() {
  const { data: transactions } = await getTransactions();

  return (
    <section className="space-y-12 w-full">
      <h1 className="text-3xl font-bold">Transactions History</h1>
      <TransactionTable transactions={transactions ?? []} />
    </section>
  );
}
