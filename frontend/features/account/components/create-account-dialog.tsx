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
import { useRef, useState } from "react";
import { createAccountAction } from "@/features/account/actions/create-account";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateAccountAction } from "@/features/account/actions/update-account";

type AccountDialogProps = {
  children: React.ReactNode;
  defaultValues?: Account;
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
        <DialogContent onClick={(e) => e.stopPropagation()} className="p-8">
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

type AccountFormProps = {
  closeDialog?: () => void;
  defaultValues?: Account;
};

function AccountForm({ closeDialog, defaultValues }: AccountFormProps) {
  const formType = defaultValues === undefined ? "create" : "update";

  const { toast } = useToast();
  const router = useRouter();

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

  const onSubmit = async (values: Account) => {
    if (formType === "create") {
      const response = await createAccountAction(values);
      if (response.sucess) {
        toast({
          description: (
            <div className="flex items-center">
              <CircleCheck className="mr-2 text-green-500" />
              New account created!
            </div>
          ),
          className: "bg-secondary opacity-90",
          duration: 1000,
        });
        if (closeDialog) closeDialog();
        router.push(`/accounts/${response.accountId}`);
      }
    }

    if (formType === "update") {
      await updateAccountAction(4, values);
    }
  };

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
