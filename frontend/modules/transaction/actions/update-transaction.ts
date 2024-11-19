"use server";

import apiClient from "@/api/client";
import { NewTransaction } from "@/types/transaction";
import { revalidateTag } from "next/cache";

export async function updateTransactionAction(
  accountId: number,
  transactionId: number,
  updatedTransaction: NewTransaction,
) {
  const { error } = await apiClient.PUT("/api/transaction/{transactionId}", {
    params: {
      path: {
        transactionId,
      },
    },
    body: {
      amount: updatedTransaction.amount,
      categoryId: updatedTransaction.categoryId,
      description: updatedTransaction.description ?? "",
      accountId: accountId,
      createdAt: updatedTransaction.transactionDate.toISOString(),
    },
  });

  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidateTag("transactions");

  return { sucess: "Transaction updated!" };
}
