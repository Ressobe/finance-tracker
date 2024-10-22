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
import { AccountModel } from "@/types/account";
import { useRef, useState, useTransition } from "react";
import { deleteAccountAction } from "../actions/delete-account";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type DeleteAccountAlertDialogProps = {
  children: React.ReactNode;
  account: AccountModel;
  defaultOpen?: boolean;
};

export function DeleteAccountAlertDialog({
  children,
  account,
  defaultOpen,
}: DeleteAccountAlertDialogProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleContinue = () => {
    startTransition(async () => {
      const response = await deleteAccountAction(account.id);
      if (response.sucess) {
        router.replace("/");
        router.refresh();

        toast({
          description: (
            <div className="flex items-center gap-4 text-xl">
              <CircleCheck className="text-green-500 w-12 h-12" />
              <span>Account {account.name} deleted!</span>
            </div>
          ),
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
    });
  };

  const handleCancel = () => {
    if (divRef.current) {
      divRef.current.click();
    }
  };

  return (
    <div ref={divRef}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          className="text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              <span className="text-violet-500 font-bold">{account.name} </span>
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue} disabled={isPending}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
