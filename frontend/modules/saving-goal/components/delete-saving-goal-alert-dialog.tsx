"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SavingGoalModel } from "@/types/saving-goal";
import { useState, useTransition } from "react";
import { deleteSavingGoalAction } from "../actions/delete-saving-goal";
import { useToast } from "@/hooks/use-toast";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";

type DeleteSavingGoalAlertDialogProps = {
  savingGoal: SavingGoalModel;
  children: React.ReactNode;
  closeDropdownMenu?: () => void;
};

export function DeleteSavingGoalAlertDialog({
  savingGoal,
  children,
  closeDropdownMenu,
}: DeleteSavingGoalAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const closeAlertDialog = () => {
    if (closeDropdownMenu) closeDropdownMenu();
    setOpen(false);
  };

  const handleContinue = () => {
    startTransition(async () => {
      const response = await deleteSavingGoalAction(savingGoal.id);

      if (response.sucess) {
        toast({
          description: <SucessToastMessage message="Saving goal updated!" />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }

      if (response.error) {
        toast({
          description: <ErrorToastMessage message="Someting went wrong!" />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }

      closeAlertDialog();
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="text-violet-500 font-bold">
              {savingGoal.name}{" "}
            </span>
            saving goal and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeAlertDialog} disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
