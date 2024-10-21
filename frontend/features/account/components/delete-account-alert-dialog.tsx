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
import { Account } from "@/types/account";
import { useRef, useState } from "react";

type DeleteAccountAlertDialogProps = {
  children: React.ReactNode;
  account: Account;
  defaultOpen?: boolean;
};

export function DeleteAccountAlertDialog({
  children,
  account,
  defaultOpen,
}: DeleteAccountAlertDialogProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleContinue = () => {
    console.log(account);
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
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
