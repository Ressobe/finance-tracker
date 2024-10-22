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
import { useRef, useState } from "react";
import { AccountForm } from "./account-form";

type AccountDialogProps = {
  children: React.ReactNode;
  defaultValues?: AccountModel;
};

export function AccountDialog({ children, defaultValues }: AccountDialogProps) {
  const formType = defaultValues === undefined ? "create" : "update";
  const [open, setOpen] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const closeDialog = () => {
    setOpen(false);
    if (divRef.current) {
      divRef.current.click();
    }
  };

  return (
    <div ref={divRef}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          onClick={(e) => e.stopPropagation()}
          className="text-left w-full"
        >
          {children}
        </DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>
              {formType === "create" ? (
                <>
                  Create your new{" "}
                  <span className="text-violet-500">account</span>
                </>
              ) : (
                <>
                  Update your
                  <span className="text-violet-500">
                    {" "}
                    {defaultValues?.name}{" "}
                  </span>
                  account
                </>
              )}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AccountForm
            closeDialog={closeDialog}
            defaultValues={defaultValues}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
