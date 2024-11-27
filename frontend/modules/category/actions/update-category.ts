"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewCategory } from "@/types/category";
import { revalidatePath } from "next/cache";

export async function updateCategoryAction(
  categoryId: number,
  category: NewCategory,
) {
  const { error } = await apiClient.PUT("/api/category/{categoryId}", {
    params: {
      path: {
        categoryId,
      },
    },
    body: {
      name: category.name,
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

  return { sucess: "Category updated!" };
}
