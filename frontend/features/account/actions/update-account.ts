"use server";

import apiClient from "@/api/client";
import { Account } from "@/types/account";

export async function updateAccountAction(accountId: number, values: Account) {
  const { error } = await apiClient.PUT("/api/account/{accountId}", {
    params: {
      path: {
        accountId: accountId,
      },
    },
    body: {
      name: values.name,
      currentBalance: Number(values.currentBalance),
    },
  });
  if (error) {
    return { error: "Something went wrong!" };
  }
  return { sucess: "Account updated!" };
}
