"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { SavingGoalModel } from "@/types/saving-goal";
import { revalidatePath } from "next/cache";

export async function updateSavingGoalAction(values: SavingGoalModel) {
  const { error } = await apiClient.PUT("/api/saving-goal/{savingGoalId}", {
    body: {
      name: values.name,
      targetAmount: values.targetAmount,
    },
    params: {
      path: {
        savingGoalId: values.id,
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

  revalidatePath("/saving-goals");

  return { sucess: "Saving goal updated!" };
}
