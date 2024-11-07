"use server";

import apiClient from "@/api/client";

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

  return { sucess: "Transfer deleted!" };
}
