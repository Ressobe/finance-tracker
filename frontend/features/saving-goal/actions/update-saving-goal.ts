"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidatePath("/saving-goals");

  return { sucess: "Saving goal updated!" };
}
