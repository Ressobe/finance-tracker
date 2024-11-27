"use server";

import apiClient from "@/api/client";
import { ApiError, isApiError } from "@/types/api-error";
import { revalidatePath } from "next/cache";

export async function deleteSavingGoalAction(savingGoalId: number) {
  const { error } = await apiClient.DELETE("/api/saving-goal/{savingGoalId}", {
    params: {
      path: {
        savingGoalId,
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

  return { sucess: "Saving goal deleted!" };
}
