"use client";

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
import { ArrowRightLeft } from "lucide-react";
import { AccountModel } from "@/types/account";
import { TransferDropdownMenu } from "./transfer-dropdown-menu";

type TransfersTableProps = {
  currentAccount: AccountModel;
  transfers: {
    id: number;
    amount: number;
    description: string;
    sourceAccountId: number;
    destinationAccountId: number;
    createdAt: string;
  }[];
};

export function TransfersTable({
  transfers,
  currentAccount,
}: TransfersTableProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <Table className="w-full">
      <TableCaption>
        A list of your transfers on {currentAccount.name}.
      </TableCaption>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/5">To</TableHead>
          <TableHead className="w-1/6">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="w-14">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transfers.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {item.sourceAccountId}
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
        ))}
      </TableBody>
    </Table>
  );
}
