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
import { useToast } from "@/hooks/use-toast";
import { NewSavingGoal, newSavingGoalSchema } from "@/types/saving-goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createSavingGoalAction } from "../actions/create-saving-goal";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";

type SavingGoalFormProps = {
  closeDialog?: () => void;
};

export function SavingGoalForm({ closeDialog }: SavingGoalFormProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const form = useForm<NewSavingGoal>({
    resolver: zodResolver(newSavingGoalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
    },
  });

  const onSubmit = async (values: NewSavingGoal) => {
    startTransition(async () => {
      const response = await createSavingGoalAction(values);
      if (response.sucess) {
        toast({
          description: (
            <SucessToastMessage message="New saving goal created!" />
          ),
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
        if (closeDialog) closeDialog();
      }

      if (response.error) {
        toast({
          description: <ErrorToastMessage message="Someting went wrong!" />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
    });
  };

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
                <FormLabel>Target amount</FormLabel>
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
          <Button
            type="submit"
            variant="secondary"
            className="space-x-2 transition-all active:scale-110"
            disabled={isPending}
          >
            <PlusCircle /> <span>Add Goal</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
