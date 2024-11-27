"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { revalidateTag } from "next/cache";

export async function deleteTransactionAction(transactionId: number) {
  const { error } = await apiClient.DELETE("/api/transaction/{transactionId}", {
    params: {
      path: {
        transactionId,
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

  revalidateTag("transactions");

  return { sucess: "Transaction was deleted!" };
}
