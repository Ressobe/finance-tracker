"use client";

import { useCurrencyStore } from "@/stores/use-currency-store";
import { TrendingDown } from "lucide-react";

type ExpenseProps = {
  amount: number;
};

export function Expense({ amount }: ExpenseProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <div className="flex gap-8 items-center text-xl w-full bg-secondary p-4 rounded">
      <div className="bg-red-500/20 p-6 rounded">
        <TrendingDown className="w-10 h-10 text-red-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg text-muted-foreground">Expense</span>
        <span className="font-bold text-2xl">
          {amount.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  );
}
