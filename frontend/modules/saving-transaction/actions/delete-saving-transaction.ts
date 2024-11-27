"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { revalidateTag } from "next/cache";

export async function deleteSavingTransactionAction(
  savingTransactionId: number,
) {
  const { error } = await apiClient.DELETE(
    "/api/saving-transaction/{savingTransactionId}",
    {
      params: {
        path: {
          savingTransactionId,
        },
      },
    },
  );

  if (error) {
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidateTag("saving-transactions");

  return { sucess: "Saving transaction deleted!" };
}
