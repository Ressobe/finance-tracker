"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(categoryId: number) {
  const { error } = await apiClient.DELETE("/api/category/{categoryId}", {
    params: {
      path: {
        categoryId,
      },
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

  return { sucess: "Category was deleted!" };
}
