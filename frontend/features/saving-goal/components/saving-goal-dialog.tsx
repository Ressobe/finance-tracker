"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SavingGoalForm } from "./saving-goal-form";
import { useState } from "react";

type SavingGoalDialogProps = {
  children: React.ReactNode;
  // defaultValues?: SavingGoal
};

export function SavingGoalDialog({ children }: SavingGoalDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create your new <span className="text-violet-500">saving goal</span>
          </DialogTitle>
          <DialogDescription>
            Create your new goal to track progress
          </DialogDescription>
        </DialogHeader>
        <SavingGoalForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
