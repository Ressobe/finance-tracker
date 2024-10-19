"use server";

import { register } from "@/api/user";
import { Register } from "@/types/auth";

export async function registerAction(values: Register) {
  const { error } = await register(values);
  if (error) {
    return { error: "Something went wrong!" };
  }
  return { sucess: "Your account created, now you can log in!" };
}
