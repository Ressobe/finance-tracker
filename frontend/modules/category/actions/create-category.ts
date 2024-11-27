"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewCategory } from "@/types/category";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(values: NewCategory) {
  const { error } = await apiClient.POST("/api/category", {
    body: {
      name: values.name,
    },
  });

  if (error) {
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidatePath("/settings");

  return { sucess: "New category created!" };
}
