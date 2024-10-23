"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidatePath("/saving-goals");

  return { sucess: "Saving goal deleted!" };
}
