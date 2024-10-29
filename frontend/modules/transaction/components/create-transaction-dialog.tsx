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
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(true);
  };

  const textColor = type === "income" ? "text-green-500" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <TransactionForm type={type} onCancel={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
