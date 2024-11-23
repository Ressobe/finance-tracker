import {
  getAccount,
  getAccountTransactions,
  getAccountTransfers,
} from "@/api/account";
import { Balance } from "@/components/balance";
import { Expense } from "@/components/expense";
import { Income } from "@/components/income";
import { Button } from "@/components/ui/button";
import { TransactionDialog } from "@/modules/transaction/components/create-transaction-dialog";
import { TransactionTable } from "@/modules/transaction/components/transaction-table";
import { TransferDialog } from "@/modules/transfer/components/transfer-dialog";
import { TransfersTable } from "@/modules/transfer/components/transfers-table";
import { ArrowRightLeft, BadgeDollarSign, TrendingDown } from "lucide-react";
import { notFound } from "next/navigation";

type AccountPageProps = {
  params: Promise<{
    accountId: number;
  }>;
};

export default async function AccountPage(props: AccountPageProps) {
  const params = await props.params;

  const { data, error } = await getAccount(params.accountId);
  if (error) {
    notFound();
  }

  const { data: transactions } = await getAccountTransactions(params.accountId);
  const { data: transfers } = await getAccountTransfers(params.accountId);
  const { name, currentBalance, income, expense } = data;

  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">
          Account - <span className="font-medium">{name}</span>
        </h1>
        <span className="text-muted-foreground">
          Information about your {name} account
        </span>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <Income amount={income} />
        <Expense amount={expense} />
        <Balance amount={currentBalance} />
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex justify-between">
          <TransferDialog account={data}>
            <Button
              variant="outline"
              className="space-x-2 bg-violet-500/10 hover:bg-violet-500/30 border-violet-500"
            >
              <ArrowRightLeft className="text-violet-500" />
              <span>Create a new transfer</span>
            </Button>
          </TransferDialog>
          <div className="space-x-4">
            <TransactionDialog account={data} type="income">
              <Button
                variant="outline"
                className="space-x-2 bg-green-500/10 hover:bg-green-500/30 border-green-500"
              >
                <BadgeDollarSign className="text-green-500" />
                <span>Create a new income</span>
              </Button>
            </TransactionDialog>

            <TransactionDialog account={data} type="expense">
              <Button
                variant="outline"
                className="space-x-2 bg-red-500/10 hover:bg-red-500/30 border-red-500"
              >
                <TrendingDown className="text-red-500" />
                <span>Create a new expense</span>
              </Button>
            </TransactionDialog>
          </div>
        </div>
      </div>
      <TransactionTable
        currentAccount={data}
        transactions={transactions ?? []}
      />
      <TransfersTable currentAccount={data} transfers={transfers ?? []} />
    </section>
  );
}
