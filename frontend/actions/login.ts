"use server";

import { login } from "@/server/user";
import { Login } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(values: Login) {
  const { data, error } = await login(values);

  if (error) {
    return { error: "Something went wrong!" };
  }

  if (data.token) {
    cookies().set("token", data.token, {
      httpOnly: true,
      path: "/",
    });
    redirect("/");
  }

  return { sucess: "You are logged in!" };
}
