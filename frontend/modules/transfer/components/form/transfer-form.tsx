"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAccountsStore } from "@/stores/use-accounts-store";
import { AccountModel } from "@/types/account";
import { NewTransfer } from "@/types/transfer";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type TransferFormProps = {
  account: AccountModel;
  close?: () => void;
};

export function TransferForm({ account, close }: TransferFormProps) {
  const accounts = useAccountsStore((state) => state.accounts);
  const filteredAccounts = accounts.filter((item) => item.id !== account.id);

  const form = useForm<NewTransfer>({
    defaultValues: {
      amount: 0,
      description: "",
      sourceAccountId: 0,
      destinationAccountId: 0,
    },
  });

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="text-sm md:text-lg">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
                <FormDescription>Amount of transfer (required)</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-sm md:text-lg">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Transfer description (optional)
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destinationAccountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${filteredAccounts[0].id}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredAccounts.map((item) => {
                      return (
                        <SelectItem key={item.id} value={`${item.id}`}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select an account for this transfer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end gap-2">
            <Button onClick={() => close?.()} type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">New transfer</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
