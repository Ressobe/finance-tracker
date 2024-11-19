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
import { Transaction } from "@/types/transaction";

type TransactionDialogProps = {
  children: React.ReactNode;
  type: "income" | "expense";
  account: AccountModel;
  defaultValue?: Transaction;
  closeDropdownMenu?: () => void;
};

export function TransactionDialog({
  children,
  type,
  account,
  defaultValue,
  closeDropdownMenu,
}: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    closeDropdownMenu?.();
    setOpen(false);
  };

  const textColor = type === "income" ? "text-green-500" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValue ? "Update " : "Create a new "}
            <span className={textColor}>{type} </span>
            transaction
          </DialogTitle>
          <DialogDescription>
            {defaultValue ? "Update " : "New "} transaction for{" "}
            <span className="text-violet-500 font-bold">{account.name}</span>
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          accountId={account.id}
          type={type}
          closeDialog={closeDialog}
          defaultValue={defaultValue}
        />
      </DialogContent>
    </Dialog>
  );
}
