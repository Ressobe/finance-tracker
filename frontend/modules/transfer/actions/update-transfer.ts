"use server";

import apiClient from "@/api/client";
import { Transfer } from "@/types/transfer";

export async function updateTransferAction(values: Transfer) {
  const { error } = await apiClient.PUT("/api/transfer/{transferId}", {
    params: {
      path: {
        transferId: values.id,
      },
    },
    body: {
      amount: values.amount,
      description: values.description,
      sourceAccountId: values.sourceAccountId,
      destinationAccountId: values.destinationAccountId,
    },
  });

  if (error) {
    return { error: "Something went wrong!" };
  }

  // revalidatePath("")

  return { sucess: "Transfer updated!" };
}
