import apiClient from "@/api/client";
import { Login, Register } from "@/types/auth";

export async function login(loginValues: Login) {
  return await apiClient.POST("/api/user/login", {
    body: {
      email: loginValues.email,
      password: loginValues.password,
    },
  });
}

export async function register(registerValues: Register) {
  return await apiClient.POST("/api/user/register", {
    body: {
      email: registerValues.email,
      username: registerValues.name,
      password: registerValues.password,
    },
  });
}

export async function getOverview() {
  return await apiClient.GET("/api/user/overview");
}

export async function getUserAccounts() {
  return await apiClient.GET("/api/user/accounts");
}
