"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewSavingTransaction } from "@/types/saving-transaction";
import { revalidateTag } from "next/cache";

export async function updateSavingTransactionAction(
  savingTransactionId: number,
  values: NewSavingTransaction,
) {
  const { error } = await apiClient.PUT(
    "/api/saving-transaction/{savingTransactionId}",
    {
      params: {
        path: {
          savingTransactionId,
        },
      },
      body: {
        accountId: values.accountId,
        amount: values.amount,
        description: values.description,
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

  return { sucess: "Saving transaction updated!" };
}
