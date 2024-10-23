"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewSavingGoal, newSavingGoalSchema } from "@/types/saving-goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
// import { useTransition } from "react";
import { useForm } from "react-hook-form";

export function SavingGoalForm() {
  // const [isPending, startTransition] = useTransition();

  const form = useForm<NewSavingGoal>({
    resolver: zodResolver(newSavingGoalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
    },
  });

  const onSubmit = async (values: NewSavingGoal) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  Name of your new saving goal (required)
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem className="text-sm md:text-lg">
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Target amount that you want to save (required)
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit" className="space-x-2">
            <PlusCircle /> <span>Add Goal</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
