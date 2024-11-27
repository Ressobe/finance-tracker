"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { revalidateTag } from "next/cache";

export async function deleteTransferAction(transferId: number) {
  const { error } = await apiClient.DELETE("/api/transfer/{transferId}", {
    params: {
      path: {
        transferId,
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

  revalidateTag("transfers");

  return { sucess: "Transfer deleted!" };
}
