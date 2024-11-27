"use server";

import apiClient from "@/api/client";
import { Account } from "@/types/account";
import { ApiError, isApiError } from "@/types/api-error";

export async function createAccountAction(values: Account) {
  const { data, error } = await apiClient.POST("/api/account", {
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

  return { sucess: "Account created!", accountId: data.id };
}
