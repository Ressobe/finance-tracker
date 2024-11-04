"use client";

import {
  newTransacitonSchema,
  NewTransaction,
  TransactionType,
} from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { cn, formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { useCategoriesStore } from "@/stores/use-categories-store";
import { useCurrencyStore } from "@/stores/use-currency-store";
import { createTransactionAction } from "../actions/create-transaction";
import { useToast } from "@/hooks/use-toast";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";

type TransactionFormProps = {
  type: TransactionType;
  accountId: number;
  closeDialog?: () => void;
};

export function TransactionForm({
  type,
  accountId,
  closeDialog,
}: TransactionFormProps) {
  const typeNum = type === "income" ? 0 : 1;

  const categories = useCategoriesStore((state) => state.categories);
  const currency = useCurrencyStore((state) => state.currency);

  const now = new Date();

  const form = useForm<NewTransaction>({
    resolver: zodResolver(newTransacitonSchema),
    defaultValues: {
      amount: 0,
      categoryId: categories[0].id,
      description: "",
      transactionDate: new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
      ),
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: NewTransaction) => {
    const response = await createTransactionAction(values, typeNum, accountId);
    if (response.sucess) {
      toast({
        description: <SucessToastMessage message="New transaction created!" />,
        className: "bg-secondary opacity-90",
        duration: 2000,
      });
    }
    if (response.error) {
      toast({
        description: <ErrorToastMessage message="Something went wrong!" />,
        className: "bg-secondary opacity-90",
        duration: 2000,
      });
    }

    closeDialog?.();
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
                  Transaction description (optional)
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
                <div className="flex items-center gap-4">
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  {currency}
                </div>
                <FormMessage />
                <FormDescription>Transaction amount (required)</FormDescription>
              </FormItem>
            )}
          />
          <div className="w-full flex justify-between">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={`${categories[0].id}`}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={`${item.id}`}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for this transaction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          type="button"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            const utcDate = new Date(
                              Date.UTC(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                              ),
                            );
                            field.onChange(utcDate);
                          }
                        }}
                        className="flex flex-col"
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select date when transaction happened
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button
            onClick={() => closeDialog?.()}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button type="submit">New transaction</Button>
        </div>
      </form>
    </Form>
  );
}
