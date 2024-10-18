"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useForm } from "react-hook-form";
import { Register, registerSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { FormError } from "@/app/_components/auth/form-error";
import { FormSucess } from "@/app/_components/auth/form-sucess";
import { Button } from "@/app/_components/ui/button";
import { useState, useTransition } from "react";
import { registerAction } from "@/app/_actions/register";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (formValues: Register) => {
    setError("");
    setSucess("");

    startTransition(async () => {
      await registerAction(formValues);

      // if (response.sucess) {
      //   form.reset();
      // }
      // setError(response.error);
      // setSucess(response.sucess);
    });
  };

  return (
    <Card>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="text-sm md:text-lg">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john@gmail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-sm md:text-lg">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-sm md:text-lg">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="text-sm md:text-lg">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={sucess} />
            <Button
              variant="secondary"
              type="submit"
              className="w-full rounded-lg relative"
              disabled={isPending}
            >
              {isPending ? <>Create an account</> : <>Create an account</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
