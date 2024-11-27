"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";

export async function deleteAccountAction(accountId: number) {
  const { error } = await apiClient.DELETE("/api/account/{accountId}", {
    params: {
      path: {
        accountId,
      },
    },
  });

  if (error) {
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  return { sucess: "Account deleted sucesful! " };
}
