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
import { SavingGoalModel } from "@/types/saving-goal";

type SavingGoalDialogProps = {
  children: React.ReactNode;
  closeDropdownMenu?: () => void;
  defaultValues?: SavingGoalModel;
};

export function SavingGoalDialog({
  children,
  defaultValues,
  closeDropdownMenu,
}: SavingGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const type = defaultValues === undefined ? "create" : "update";

  const closeDialog = () => {
    if (closeDropdownMenu) closeDropdownMenu();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? (
              <span>
                Create your new{" "}
                <span className="text-violet-500">saving goal</span>
              </span>
            ) : (
              <span>
                Update your{" "}
                <span className="text-violet-500">{defaultValues?.name}</span>{" "}
                saving goal
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === "create" ? (
              <span>Create your new goal to track progress</span>
            ) : (
              <span>Update your saving goal</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <SavingGoalForm
          closeDialog={closeDialog}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
