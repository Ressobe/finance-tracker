"use server";

import apiClient from "@/api/client";
import { NewTransfer } from "@/types/transfer";
import { revalidateTag } from "next/cache";

export async function updateTransferAction(
  transferId: number,
  values: NewTransfer,
) {
  const { error } = await apiClient.PUT("/api/transfer/{transferId}", {
    params: {
      path: {
        transferId,
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
    console.log(transferId);
    console.log(error);
    return { error: "Something went wrong!" };
  }

  revalidateTag("transfers");

  return { sucess: "Transfer updated!" };
}
