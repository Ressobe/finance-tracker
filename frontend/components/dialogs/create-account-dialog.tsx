"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Account, accountSchema } from "@/types/account";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type AccountDialogProps = {
  children: React.ReactNode;
  defaultValues?: Account;
};

export function AccountDialog({ children, defaultValues }: AccountDialogProps) {
  const formType = defaultValues === undefined ? "create" : "update";
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {formType === "create" ? (
              <>
                Create your new <span className="text-violet-500">account</span>
              </>
            ) : (
              <>
                Update your
                <span className="text-violet-500"> {defaultValues?.name} </span>
                account
              </>
            )}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AccountForm closeDialog={closeDialog} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}

type AccountFormProps = {
  closeDialog?: () => void;
  defaultValues?: Account;
};

function AccountForm({ closeDialog, defaultValues }: AccountFormProps) {
  const formType = defaultValues === undefined ? "create" : "update";

  const form = useForm<Account>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: defaultValues?.name,
      currentBalance: defaultValues?.currentBalance,
    },
  });

  const onCancel = () => {
    if (closeDialog) closeDialog();
  };

  const onSubmit = async () => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Name of your new account (required)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentBalance"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Your current balance on this account (required)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {formType === "create" ? "Create" : "Update"} account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
