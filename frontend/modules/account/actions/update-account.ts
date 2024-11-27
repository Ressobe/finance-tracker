"use server";

import apiClient from "@/api/client";
import { Account } from "@/types/account";
import { ApiError, isApiError } from "@/types/api-error";
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
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidatePath(`/accounts/${accountId}`);

  return { sucess: "Account updated!" };
}
