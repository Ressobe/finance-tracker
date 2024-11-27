"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { NewSavingGoal } from "@/types/saving-goal";
import { revalidatePath } from "next/cache";

export async function createSavingGoalAction(values: NewSavingGoal) {
  const { error } = await apiClient.POST("/api/saving-goal", {
    body: {
      name: values.name,
      targetAmount: values.targetAmount,
    },
  });

  if (error) {
    if (isApiError(error)) {
      const apiError = error as ApiError;
      return { error: apiError.message };
    }
    return { error: "Unknown error occurred" };
  }

  revalidatePath("/saving-goals");

  return { sucess: "New saving goal created!" };
}
