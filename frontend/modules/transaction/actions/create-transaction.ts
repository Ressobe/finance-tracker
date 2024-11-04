"use server";

import apiClient from "@/api/client";
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
    },
    params: {
      path: {
        accountId,
      },
    },
  });
  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidatePath(`/accounts/${accountId}`);

  return { sucess: "New transaction created!" };
}
