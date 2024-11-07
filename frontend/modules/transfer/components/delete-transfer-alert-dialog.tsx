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
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";
import { deleteTransferAction } from "../actions/delete-transfer";
import { Transfer } from "@/types/transfer";

type DeleteTransferAlertDialogProps = {
  transfer: Transfer;
  children: React.ReactNode;
  closeDropdownMenu?: () => void;
};

export function DeleteTransferAlertDialog({
  transfer,
  children,
  closeDropdownMenu,
}: DeleteTransferAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const closeAlertDialog = () => {
    if (closeDropdownMenu) closeDropdownMenu();
    setOpen(false);
  };

  const handleContinue = () => {
    startTransition(async () => {
      const response = await deleteTransferAction(transfer.id);

      if (response.sucess) {
        toast({
          description: <SucessToastMessage message="Transfer deleted!" />,
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
            This action cannot be undone. This will permanently delete your
            transfer ({transfer.description}) and remove your data from our
            servers.
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
