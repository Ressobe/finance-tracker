"use server";

import apiClient from "@/api/client";
import { revalidateTag } from "next/cache";

export async function deleteSavingTransactionAction(
  savingTransactionId: number,
) {
  const { error } = await apiClient.DELETE(
    "/api/saving-transaction/{savingTransactionId}",
    {
      params: {
        path: {
          savingTransactionId,
        },
      },
    },
  );

  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidateTag("saving-transactions");

  return { sucess: "Saving transaction deleted!" };
}
