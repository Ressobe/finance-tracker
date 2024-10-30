"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidatePath("/settings");

  return { sucess: "Category updated!" };
}
