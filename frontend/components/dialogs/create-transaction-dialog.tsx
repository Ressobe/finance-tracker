"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { TransactionForm } from "@/_components/forms/transaction-form";

type CreateTransactionDialogProps = {
  type: "income" | "expense";
};

export function CreateTransactionDialog({
  type,
}: CreateTransactionDialogProps) {
  const textColor = type === "income" ? "text-green-500" : "text-red-500";

  return (
    <Dialog>
      <DialogTrigger>Create a new {type}</DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            Create a new <span className={textColor}>{type} </span>
            transaction
          </DialogTitle>
          <DialogDescription>
            New transaction for{" "}
            <span className="text-violet-500 font-bold">ACCOUNT_NAME</span>
          </DialogDescription>
        </DialogHeader>
        <TransactionForm type={type} />
      </DialogContent>
    </Dialog>
  );
}
