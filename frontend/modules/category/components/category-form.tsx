"use client";

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
import { Category, NewCategory, newCategorySchema } from "@/types/category";
import { createCategoryAction } from "../actions/create-category";
import { useToast } from "@/hooks/use-toast";
import { ErrorToastMessage } from "@/components/error-toast-message";
import { SucessToastMessage } from "@/components/sucess-toast-message";
import { SubmitButton } from "@/components/submit-button";
import { updateCategoryAction } from "../actions/update-category";

type CategoryFormProps = {
  defaultValues?: Category;
  close?: () => void;
};

export function CategoryForm({ close, defaultValues }: CategoryFormProps) {
  const type = defaultValues === undefined ? "create" : "update";
  const form = useForm<NewCategory>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: NewCategory) => {
    if (type === "create") {
      const response = await createCategoryAction(values);
      if (response.error) {
        toast({
          description: <ErrorToastMessage message={response.error} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
      if (response.sucess) {
        toast({
          description: <SucessToastMessage message={response.sucess} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
    }

    if (type === "update") {
      if (!defaultValues) {
        toast({
          description: <ErrorToastMessage message="Something went wrong!" />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });

        return;
      }
      const response = await updateCategoryAction(defaultValues.id, values);
      if (response.error) {
        toast({
          description: <ErrorToastMessage message={response.error} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
      if (response.sucess) {
        toast({
          description: <SucessToastMessage message={response.sucess} />,
          className: "bg-secondary opacity-90",
          duration: 2000,
        });
      }
    }
    close?.();
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
                  <FormDescription>Category name (required)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end gap-2">
            <Button onClick={() => close?.()} type="button" variant="secondary">
              Cancel
            </Button>
            <SubmitButton>
              {type === "create" ? "New" : "Update"} category
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
