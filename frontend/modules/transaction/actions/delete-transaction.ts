"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidateTag("transactions");

  return { sucess: "Transaction was deleted!" };
}
