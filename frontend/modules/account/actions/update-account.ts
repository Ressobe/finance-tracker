"use server";

import apiClient from "@/api/client";
import { Account } from "@/types/account";
import { revalidatePath } from "next/cache";

export async function updateAccountAction(accountId: number, values: Account) {
  const { error } = await apiClient.PUT("/api/account/{accountId}", {
    params: {
      path: {
        accountId: accountId,
      },
    },
    body: {
      name: values.name,
      currentBalance: values.currentBalance,
    },
  });

  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidatePath(`/accounts/${accountId}`);

  return { sucess: "Account updated!" };
}
