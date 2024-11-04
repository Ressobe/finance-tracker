import apiClient from "./client";

export async function getTransactions() {
  return await apiClient.GET("/api/user/transactions");
}
