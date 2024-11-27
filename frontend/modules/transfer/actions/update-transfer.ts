"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
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
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidateTag("transfers");

  return { sucess: "Transfer updated!" };
}
