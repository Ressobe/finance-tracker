"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { loginSchema } from "@/types/auth";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with diffrent provider"
      : "";
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSucess("");

    startTransition(async () => {
      try {
        // await loginAction(values, callbackUrl);
        setSucess("You are logged in!");
      } catch (e) {
        console.log(e);
        setError("Invalid credentials!");
      }
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
            </div>
            <Button
              variant="secondary"
              type="submit"
              className="w-full relative"
              disabled={isPending}
            >
              {isPending ? <>Login</> : <>Login</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
