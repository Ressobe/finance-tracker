"use client";

import { components } from "@/api/client/v1";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/use-currency-store";
import {
  ArrowRightLeft,
  BadgeDollarSign,
  PiggyBank,
  TrendingDown,
} from "lucide-react";
import { TransactionDropdownMenu } from "./transaction-dropdown-menu";
import { AccountModel } from "@/types/account";
import { Fragment } from "react";
import Link from "next/link";
import { TransferDropdownMenu } from "@/modules/transfer/components/transfer-dropdown-menu";
import { SavingTransactionDropdownMenu } from "@/modules/saving-transaction/components/saving-transaction-dropdown-menu";
import { SavingGoalModel } from "@/types/saving-goal";

type Transaction = {
  id: number;
  accountId: number;
  amount: number;
  transactionType: components["schemas"]["TransactionType"];
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: string;
};

type Transfer = {
  id: number;
  amount: number;
  description: string;
  sourceAccountId: number;
  destinationAccountId: number;
  destinationAccountName: string;
  createdAt: string;
};

type SavingTransaction = {
  id: number;
  savingGoalId: number;
  savingGoal: SavingGoalModel;
  accountId: number;
  amount: number;
  description: string;
  createdAt: string;
};

const isTransaction = (
  item: Transaction | Transfer | SavingTransaction,
): item is Transaction => {
  return "transactionType" in item;
};

const isTransfer = (
  item: Transaction | Transfer | SavingTransaction,
): item is Transfer => {
  return "sourceAccountId" in item;
};

const isSavingTransaction = (
  item: Transaction | Transfer | SavingTransaction,
): item is SavingTransaction => {
  return "savingGoalId" in item;
};

type TransactionTableProps = {
  currentAccount: AccountModel;
  items: (Transaction | Transfer | SavingTransaction)[];
};

export function TransactionTable({
  items,
  currentAccount,
}: TransactionTableProps) {
  const currency = useCurrencyStore((state) => state.currency);

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
  );

  const renderTableRow = (item: Transaction | Transfer | SavingTransaction) => {
    if (isTransaction(item)) {
      return (
        <TableRow>
          <TableCell className="font-medium">
            <Link href="/settings" className="hover:underline">
              {item.categoryName}
            </Link>
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{formatDate(new Date(item.createdAt))}</TableCell>
          <TableCell className="relative">
            {item.transactionType === 0 && (
              <BadgeDollarSign className="text-green-500" />
            )}
            {item.transactionType === 1 && (
              <TrendingDown className="text-red-500" />
            )}
          </TableCell>
          <TableCell className="relative flex items-center gap-2">
            <span>
              {item.amount} {currency}
            </span>
            <TransactionDropdownMenu
              account={currentAccount}
              transaction={item}
            />
          </TableCell>
        </TableRow>
      );
    }

    if (isTransfer(item)) {
      return (
        <TableRow>
          <TableCell className="font-medium">
            <Link
              href={`/accounts/${item.destinationAccountId}`}
              className="hover:underline"
            >
              {item.destinationAccountName}
            </Link>
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{formatDate(new Date(item.createdAt))}</TableCell>
          <TableCell>
            <ArrowRightLeft className="text-violet-500" />
          </TableCell>
          <TableCell className="relative flex items-center gap-2">
            <span>
              {item.amount} {currency}
            </span>
            <TransferDropdownMenu account={currentAccount} transfer={item} />
          </TableCell>
        </TableRow>
      );
    }

    if (isSavingTransaction(item)) {
      return (
        <TableRow>
          <TableCell className="font-medium">
            <Link href="/saving-goals" className="hover:underline">
              {item.savingGoal.name}
            </Link>
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{formatDate(new Date(item.createdAt))}</TableCell>
          <TableCell>
            <PiggyBank />
          </TableCell>
          <TableCell className="relative flex items-center gap-2">
            <span>
              {item.amount} {currency}
            </span>
            <SavingTransactionDropdownMenu
              savingGoal={item.savingGoal}
              savingTransaction={item}
            />
          </TableCell>
        </TableRow>
      );
    }

    return null;
  };

  return (
    <Table className="w-full">
      <TableCaption>
        A list of your transactions on {currentAccount.name}.
      </TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/5">#</TableHead>
          <TableHead className="w-1/6">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="w-14">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedItems.map((item, idx) => (
          <Fragment key={idx}>{renderTableRow(item)}</Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
