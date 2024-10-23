import apiClient from "./client";

export async function getSavingGoals() {
  return await apiClient.GET("/api/user/saving-goals");
}
