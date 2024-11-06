"use server";

import apiClient from "@/api/client";
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
    console.log(error);
    return { error: "Something went wrong!" };
  }

  revalidatePath(`/accounts/${values.sourceAccountId}`);

  return { sucess: "New transfer created!" };
}
