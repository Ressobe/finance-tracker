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

export async function getCategories() {
  return await apiClient.GET("/api/user/categories");
}

export async function getUserCategories() {
  return await apiClient.GET("/api/user/categories");
}
