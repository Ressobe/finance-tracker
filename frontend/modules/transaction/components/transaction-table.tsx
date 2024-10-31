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
import { useCurrencyStore } from "@/stores/use-currency-store";
import { BadgeDollarSign, TrendingDown } from "lucide-react";

type TransactionTableProps = {
  transactions: {
    id: number;
    accountId: number;
    amount: number;
    transactionType: components["schemas"]["TransactionType"];
    categoryId: number;
    description: string;
    createdAt: string;
  }[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <Table className="w-full">
      <TableCaption>A list of your transactions on {}.</TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/5">Category</TableHead>
          <TableHead className="w-1/6">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.categoryId}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>
              {item.transactionType === 0 && (
                <BadgeDollarSign className="text-green-500" />
              )}
              {item.transactionType === 1 && (
                <TrendingDown className="text-red-500" />
              )}
              {/* {item.transactionType === "transfer" && ( */}
              {/*   <ArrowRightLeft className="text-violet-500" /> */}
              {/* )} */}
            </TableCell>
            <TableCell className="text-left">
              {item.amount} {currency}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
