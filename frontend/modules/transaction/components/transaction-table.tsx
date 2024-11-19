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
import { BadgeDollarSign, TrendingDown } from "lucide-react";
import { TransactionDropdownMenu } from "./transaction-dropdown-menu";
import { AccountModel } from "@/types/account";

type TransactionTableProps = {
  currentAccount: AccountModel;
  transactions: {
    id: number;
    accountId: number;
    amount: number;
    transactionType: components["schemas"]["TransactionType"];
    categoryId: number;
    categoryName: string;
    description: string;
    createdAt: string;
  }[];
};

export function TransactionTable({
  transactions,
  currentAccount,
}: TransactionTableProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <Table className="w-full">
      <TableCaption>
        A list of your transactions on {currentAccount.name}.
      </TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/5">Category</TableHead>
          <TableHead className="w-1/6">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="w-14">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.categoryName}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{formatDate(new Date(item.createdAt))}</TableCell>
            <TableCell>
              {item.transactionType === 0 && (
                <BadgeDollarSign className="text-green-500" />
              )}
              {item.transactionType === 1 && (
                <TrendingDown className="text-red-500" />
              )}
              {/* {item.transactionType === 2 && ( */}
              {/*   <ArrowRightLeft className="text-violet-500" /> */}
              {/* )} */}
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
        ))}
      </TableBody>
    </Table>
  );
}
