"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidateTag("transfers");

  return { sucess: "Transfer deleted!" };
}
