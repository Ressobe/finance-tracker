"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewTransfer } from "@/types/transfer";
import { revalidatePath } from "next/cache";

export async function createTransferAction(values: NewTransfer) {
  const { error } = await apiClient.POST("/api/transfer", {
    body: {
      amount: values.amount,
      sourceAccountId: values.sourceAccountId,
      destinationAccountId: values.destinationAccountId,
      createdAt: new Date().toUTCString(),
    },
  });

  if (error) {
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidatePath(`/accounts/${values.sourceAccountId}`);

  return { sucess: "New transfer created!" };
}
