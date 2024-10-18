"use server";

import { register } from "@/server/user";
import { Register } from "@/types/auth";

export async function registerAction(values: Register) {
  await register(values);
}
