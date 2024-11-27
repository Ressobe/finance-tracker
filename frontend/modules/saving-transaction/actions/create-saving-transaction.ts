"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewSavingTransaction } from "@/types/saving-transaction";
import { revalidatePath } from "next/cache";

export async function createSavingTransaction(
  savingGoalId: number,
  savingTransaction: NewSavingTransaction,
) {
  const { error } = await apiClient.POST(
    "/api/saving-transaction/{savingGoalId}",
    {
      params: {
        path: {
          savingGoalId: savingGoalId,
        },
      },
      body: {
        amount: savingTransaction.amount,
        accountId: savingTransaction.accountId,
        description: savingTransaction.description,
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

  revalidatePath("/saving-goals");

  return { sucess: "Saving transaction created!" };
}
