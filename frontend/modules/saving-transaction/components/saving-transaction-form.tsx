"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountModel } from "@/types/account";
import {
  NewSavingTransaction,
  newSavingTransactionSchema,
} from "@/types/saving-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

// type SavingTransactionFormProps = {
//   savingGoalId: number;
//   accounts: AccountModel[];
// };

export function SavingTransactionForm() {
  const form = useForm<NewSavingTransaction>({
    resolver: zodResolver(newSavingTransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: NewSavingTransaction) => {
    startTransition(async () => {
      console.log(values);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                  Description of your saving transaction (optional)
                </FormDescription>
              </FormItem>
            )}
          />
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
                <FormDescription>
                  Amount of your saving transaction (required)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end gap-x-2 text-right">
          <Button type="button" variant="secondary" disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Create saving transaction
          </Button>
        </div>
      </form>
    </Form>
  );
}
