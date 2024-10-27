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
import {
  NewSavingGoal,
  newSavingGoalSchema,
  SavingGoalModel,
} from "@/types/saving-goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createSavingGoalAction } from "../actions/create-saving-goal";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { ErrorToastMessage } from "@/components/error-toast-message";
import { updateSavingGoalAction } from "../actions/update-saving-goal";

type SavingGoalFormProps = {
  closeDialog?: () => void;
  defaultValues?: SavingGoalModel;
};

export function SavingGoalForm({
  closeDialog,
  defaultValues,
}: SavingGoalFormProps) {
  const type = defaultValues === undefined ? "create" : "update";

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const form = useForm<NewSavingGoal>({
    resolver: zodResolver(newSavingGoalSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      targetAmount: defaultValues?.targetAmount ?? 0,
    },
  });

  const onSubmit = async (values: NewSavingGoal) => {
    startTransition(async () => {
      let response = null;
      if (type === "create") {
        response = await createSavingGoalAction(values);
      }
      if (type === "update" && defaultValues) {
        response = await updateSavingGoalAction({
          id: defaultValues.id,
          name: values.name,
          targetAmount: values.targetAmount,
          currentSaved: defaultValues.currentSaved,
        });
      }

      if (response?.sucess) {
        toast({
          description: (
            <SucessToastMessage
              message={
                type === "create"
                  ? "New saving goal created!"
                  : "Saving goal upated!"
              }
            />
          ),
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
        if (closeDialog) closeDialog();
      }

      if (response?.error) {
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
                  {type === "create" ? (
                    <>Name of your new saving goal (required)</>
                  ) : (
                    <>Update your name of saving goal</>
                  )}
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
                  {type === "create" ? (
                    <>Target amount that you want to save (required)</>
                  ) : (
                    <>Update your target amount</>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-4 justify-end">
          <Button onClick={closeDialog} type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="space-x-2 transition-all active:scale-110"
            disabled={isPending}
          >
            <PlusCircle />{" "}
            <span> {type === "create" ? "Add" : "Update"} Goal</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
