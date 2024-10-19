import apiClient from "@/api/client";

export async function getCategory(categoryId: number) {
  return await apiClient.GET("/api/account/{accountId}", {
    params: {
      path: {
        accountId: categoryId,
      },
    },
  });
}
