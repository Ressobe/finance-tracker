"use server";

import apiClient from "@/api/client";
import { Account } from "@/types/account";

export async function createAccountAction(values: Account) {
  const { data, error } = await apiClient.POST("/api/account", {
    body: {
      name: values.name,
      currentBalance: Number(values.currentBalance),
    },
  });

  if (error) {
    return { error: "Something happend wrong!" };
  }

  return { sucess: "Account created!", accountId: data.id };
}
