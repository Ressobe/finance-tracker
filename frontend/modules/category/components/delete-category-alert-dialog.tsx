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
import { Category } from "@/types/category";
import { deleteCategoryAction } from "../actions/delete-category";

type DeleteCategoryAlertDialogProps = {
  children: React.ReactNode;
  category: Category;
  closeDropdownMenu?: () => void;
};

export function DeleteCategoryAlertDialog({
  category,
  children,
  closeDropdownMenu,
}: DeleteCategoryAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const closeAlertDialog = () => {
    if (closeDropdownMenu) closeDropdownMenu();
    setOpen(false);
  };

  const handleContinue = () => {
    startTransition(async () => {
      const response = await deleteCategoryAction(category.id);

      if (response.sucess) {
        toast({
          description: <SucessToastMessage message="Category deleted!" />,
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
            <span className="text-violet-500 font-bold">{category.name} </span>
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
