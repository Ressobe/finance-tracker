import { getAccount } from "@/api/account";
import { Balance } from "@/components/balance";
import { ExampleTable } from "@/components/example-table";
import { Expense } from "@/components/expense";
import { Income } from "@/components/income";
import { Button } from "@/components/ui/button";
import { CreateTransactionDialog } from "@/features/transaction/components/create-transaction-dialog";
import { TransactionTable } from "@/features/transaction/components/transaction-table";
import { ArrowRightLeft, BadgeDollarSign, TrendingDown } from "lucide-react";
import { notFound } from "next/navigation";

type AccountPageProps = {
  params: {
    accountId: number;
  };
};

export default async function AccountPage({ params }: AccountPageProps) {
  const { data, error } = await getAccount(params.accountId);
  if (error) {
    notFound();
  }
  const { name, currentBalance } = data;

  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">
          Account - <span className="font-medium">{name}</span>
        </h1>
        <span className="text-muted-foreground">
          Information about you {name} account
        </span>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <Income amount={currentBalance} currencySymbol="PLN" />
        <Expense amount={currentBalance} currencySymbol="PLN" />
        <Balance amount={currentBalance} currencySymbol="PLN" />
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex justify-between">
          <CreateTransactionDialog account={data} type="income">
            <Button
              variant="outline"
              className="space-x-2 bg-violet-500/10 hover:bg-violet-500/30 border-violet-500"
            >
              <ArrowRightLeft className="text-violet-500" />
              <span>Create a new transfer</span>
            </Button>
          </CreateTransactionDialog>
          <div className="space-x-4">
            <CreateTransactionDialog account={data} type="income">
              <Button
                variant="outline"
                className="space-x-2 bg-green-500/10 hover:bg-green-500/30 border-green-500"
              >
                <BadgeDollarSign className="text-green-500" />
                <span>Create a new income</span>
              </Button>
            </CreateTransactionDialog>

            <CreateTransactionDialog account={data} type="expense">
              <Button
                variant="outline"
                className="space-x-2 bg-red-500/10 hover:bg-red-500/30 border-red-500"
              >
                <TrendingDown className="text-red-500" />
                <span>Create a new expense</span>
              </Button>
            </CreateTransactionDialog>
          </div>
        </div>
      </div>
      <TransactionTable />
    </section>
  );
}
