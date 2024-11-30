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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountsStore } from "@/stores/use-accounts-store";
import {
  NewSavingTransaction,
  newSavingTransactionSchema,
  SavingTransaction,
} from "@/types/saving-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createSavingTransaction } from "../actions/create-saving-transaction";
import { useToast } from "@/hooks/use-toast";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";
import { updateSavingTransactionAction } from "../actions/update-saving-transaction";

type SavingTransactionFormProps = {
  savingGoalId: number;
  defaultValue?: SavingTransaction;
  closeDialog?: () => void;
};

export function SavingTransactionForm({
  savingGoalId,
  defaultValue,
  closeDialog,
}: SavingTransactionFormProps) {
  const accounts = useAccountsStore((state) => state.accounts);
  const typeOfForm = defaultValue ? "update" : "create";

  const form = useForm<NewSavingTransaction>({
    resolver: zodResolver(newSavingTransactionSchema),
    defaultValues: {
      description: defaultValue?.description ?? "",
      amount: defaultValue?.amount ?? 0,
      accountId: defaultValue?.accountId ?? accounts[0].id,
    },
  });

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: NewSavingTransaction) => {
    startTransition(async () => {
      let response = null;
      if (typeOfForm === "create") {
        response = await createSavingTransaction(savingGoalId, values);
      }
      if (typeOfForm === "update" && defaultValue) {
        response = await updateSavingTransactionAction(defaultValue.id, values);
      }

      if (response?.sucess) {
        toast({
          description: <SucessToastMessage message={response.sucess} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }

      if (response?.error) {
        toast({
          description: <ErrorToastMessage message={response.error} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }

      closeDialog?.();
    });
  };

  const handleCancel = () => {
    closeDialog?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormDescription>
                  Amount of your saving transaction (required)
                </FormDescription>
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
                  Description of your saving transaction (optional)
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                  disabled={!!defaultValue?.accountId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.map((item) => {
                      return (
                        <SelectItem key={item.id} value={`${item.id}`}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>Select an account</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end gap-x-2 text-right">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {typeOfForm === "create" ? "Create " : "Update "} saving transaction
          </Button>
        </div>
      </form>
    </Form>
  );
}
