import apiClient from "@/api/client";

export async function getAccount(accountId: number) {
  return await apiClient.GET("/api/account/{accountId}", {
    params: {
      path: {
        accountId,
      },
    },
  });
}
