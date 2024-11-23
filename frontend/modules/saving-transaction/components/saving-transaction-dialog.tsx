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

type SavingTransactionDialogProps = {
  savingGoal: SavingGoalModel;
  children: React.ReactNode;
};

export function SavingTransactionDialog({
  savingGoal,
  children,
}: SavingTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new saving transaction</DialogTitle>
          <DialogDescription>
            New saving transaction for{" "}
            <span className="text-violet-500 font-bold">{savingGoal.name}</span>
          </DialogDescription>
        </DialogHeader>
        <SavingTransactionForm
          savingGoalId={savingGoal.id}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
