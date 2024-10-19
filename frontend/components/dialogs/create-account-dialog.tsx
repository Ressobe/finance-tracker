"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { NewAccount, newAccountSchema } from "@/types/account";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";

export function CreateAccountDialog() {
  return (
    <Dialog>
      <DialogTrigger>Create a new account</DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Create your new account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AccountForm />
      </DialogContent>
    </Dialog>
  );
}

function AccountForm() {
  const form = useForm<NewAccount>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: {
      name: "",
      currentBalance: 0,
    },
  });

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
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">New account</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
