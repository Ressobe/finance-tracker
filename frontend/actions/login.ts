"use server";

import { login } from "@/api/user";
import { Login } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(values: Login) {
  const { data, error } = await login(values);

  console.log("error from loginAction", error);

  if (error) {
    return { error: "Something went wrong!" };
  }

  if (data.token) {
    (await cookies()).set("token", data.token, {
      httpOnly: true,
      path: "/",
    });
    redirect("/");
  }

  return { sucess: "You are logged in!" };
}
