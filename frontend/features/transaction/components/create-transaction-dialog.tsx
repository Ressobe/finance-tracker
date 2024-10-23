"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionForm } from "./transaction-form";
import { AccountModel } from "@/types/account";

type CreateTransactionDialogProps = {
  children: React.ReactNode;
  type: "income" | "expense";
  account: AccountModel;
};

export function CreateTransactionDialog({
  children,
  type,
  account,
}: CreateTransactionDialogProps) {
  const textColor = type === "income" ? "text-green-500" : "text-red-500";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new <span className={textColor}>{type} </span>
            transaction
          </DialogTitle>
          <DialogDescription>
            New transaction for{" "}
            <span className="text-violet-500 font-bold">{account.name}</span>
          </DialogDescription>
        </DialogHeader>
        <TransactionForm type={type} />
      </DialogContent>
    </Dialog>
  );
}
