"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AccountModel } from "@/types/account";
import { useState } from "react";
import { TransferForm } from "./form/transfer-form";

type CreateTransactionDialogProps = {
  children: React.ReactNode;
  account: AccountModel;
};

export function TransferDialog({
  children,
  account,
}: CreateTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new transfer</DialogTitle>
          <DialogDescription>
            New transfer for{" "}
            <span className="text-violet-500 font-bold">{account.name}</span>
          </DialogDescription>
        </DialogHeader>
        <TransferForm account={account} close={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
