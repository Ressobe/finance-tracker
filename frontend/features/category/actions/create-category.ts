"use server";

import apiClient from "@/api/client";
import { NewCategory } from "@/types/category";

export async function createCategoryAction(values: NewCategory) {
  const { error } = await apiClient.POST("/api/category", {
    body: {
      name: values.name,
    },
  });

  if (error) {
    return { error: "dkdk" };
  }
  return { sucess: "dkdk" };
}
