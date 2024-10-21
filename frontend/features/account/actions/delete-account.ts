"use server";

import apiClient from "@/api/client";

export async function deleteAccountAction(accountId: number) {
  const { error } = await apiClient.DELETE("/api/account/{accountId}", {
    params: {
      path: {
        accountId,
      },
    },
  });
  if (error) {
    return { error: "Something went wrong!" };
  }
  return { sucess: "Account deleted sucesful! " };
}
