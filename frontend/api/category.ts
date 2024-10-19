import apiClient from "@/server/api";

export async function getCategory(categoryId: number) {
  return await apiClient.GET("/api/account/{accountId}", {
    params: {
      path: {
        accountId: categoryId,
      },
    },
  });
}
