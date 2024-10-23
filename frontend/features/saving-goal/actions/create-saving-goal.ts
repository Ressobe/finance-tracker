"use server";

import apiClient from "@/api/client";
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
    return { error: "Something went wrong!" };
  }

  revalidatePath("/saving-goals");

  return { sucess: "New saving goal created!" };
}
