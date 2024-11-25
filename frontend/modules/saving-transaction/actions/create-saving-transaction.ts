"use server";

import apiClient from "@/api/client";
import { NewSavingTransaction } from "@/types/saving-transaction";
import { revalidatePath } from "next/cache";

export async function createSavingTransaction(
  savingGoalId: number,
  savingTransaction: NewSavingTransaction,
) {
  const { error } = await apiClient.POST(
    "/api/saving-transaction/{savingGoalId}",
    {
      params: {
        path: {
          savingGoalId: savingGoalId,
        },
      },
      body: {
        amount: savingTransaction.amount,
        accountId: savingTransaction.accountId,
        description: savingTransaction.description,
      },
    },
  );

  if (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }

  revalidatePath("/saving-goals");

  return { sucess: "Saving transaction created!" };
}
