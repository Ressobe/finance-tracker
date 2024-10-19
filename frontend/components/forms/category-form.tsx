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
} from "@/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { NewCategory, newCategorySchema } from "@/types/category";

export function CategoryForm() {
  const form = useForm<NewCategory>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      name: "",
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
                  <FormDescription>Category name (required)</FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end gap-2">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">New category</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
