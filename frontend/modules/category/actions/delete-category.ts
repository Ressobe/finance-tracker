"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidatePath("/settings");

  return { sucess: "Category was deleted!" };
}
