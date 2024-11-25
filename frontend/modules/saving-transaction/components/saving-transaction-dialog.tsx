"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SavingGoalModel } from "@/types/saving-goal";
import { SavingTransactionForm } from "./saving-transaction-form";
import { useState } from "react";
import { SavingTransaction } from "@/types/saving-transaction";

type SavingTransactionDialogProps = {
  savingGoal: SavingGoalModel;
  defaultValue?: SavingTransaction;
  closeDropdownMenu?: () => void;
  children: React.ReactNode;
};

export function SavingTransactionDialog({
  savingGoal,
  defaultValue,
  closeDropdownMenu,
  children,
}: SavingTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    closeDropdownMenu?.();
    setOpen(false);
  };

  const typeOfDialog = defaultValue ? "update" : "create";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {typeOfDialog === "create"
              ? "Create a new saving transaction"
              : "Update saving transaction"}
          </DialogTitle>
          <DialogDescription>
            {typeOfDialog === "create" ? "New " : "Update "} saving transaction
            for{" "}
            <span className="text-violet-500 font-bold">{savingGoal.name}</span>
          </DialogDescription>
        </DialogHeader>
        <SavingTransactionForm
          savingGoalId={savingGoal.id}
          defaultValue={defaultValue}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
