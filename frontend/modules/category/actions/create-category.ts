"use server";

import apiClient from "@/api/client";
import { NewCategory } from "@/types/category";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(values: NewCategory) {
  const { error } = await apiClient.POST("/api/category", {
    body: {
      name: values.name,
    },
  });

  if (error) {
    return { error: "Something went wrong!" };
  }

  revalidatePath("/settings");

  return { sucess: "New category created!" };
}
