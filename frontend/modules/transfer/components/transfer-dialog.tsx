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
import { useAccountsStore } from "@/stores/use-accounts-store";
import { Transfer } from "@/types/transfer";

type CreateTransactionDialogProps = {
  children: React.ReactNode;
  account: AccountModel;
  defaultValue?: Transfer;
  closeDropdownMenu?: () => void;
};

export function TransferDialog({
  children,
  account,
  defaultValue,
  closeDropdownMenu,
}: CreateTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
    closeDropdownMenu?.();
  };

  const typeOfDialog = defaultValue ? "update" : "create";
  const accounts = useAccountsStore((state) => state.accounts);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={accounts.length <= 1}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {typeOfDialog === "create"
              ? "Create a new transfer"
              : "Update a transfer"}
          </DialogTitle>
          <DialogDescription>
            {typeOfDialog === "create" ? "New " : "Update "} transfer for{" "}
            <span className="font-bold text-violet-500">{account.name}</span>
          </DialogDescription>
        </DialogHeader>
        <TransferForm
          account={account}
          close={closeDialog}
          defaultValue={defaultValue}
        />
      </DialogContent>
    </Dialog>
  );
}
