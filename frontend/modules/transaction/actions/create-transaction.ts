"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewTransaction } from "@/types/transaction";
import { revalidatePath } from "next/cache";

export async function createTransactionAction(
  newTransaction: NewTransaction,
  type: 0 | 1,
  accountId: number,
) {
  const { error } = await apiClient.POST("/api/transaction/{accountId}", {
    body: {
      categoryId: newTransaction.categoryId,
      amount: newTransaction.amount,
      description: newTransaction.description,
      transactionType: type,
      createdAt: newTransaction.transactionDate.toISOString(),
    },
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

  revalidatePath(`/accounts/${accountId}`);

  return { sucess: "New transaction created!" };
}
