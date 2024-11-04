"use client";

import { useCurrencyStore } from "@/stores/use-currency-store";
import { TrendingUp } from "lucide-react";

type IncomeProps = {
  amount: number;
};

export function Income({ amount }: IncomeProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <div className="flex gap-8 items-center text-xl w-full bg-secondary p-4 rounded">
      <div className="bg-green-500/20 p-6 rounded">
        <TrendingUp className="w-10 h-10 text-green-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg text-muted-foreground">Income</span>
        <span className="font-bold text-2xl">
          {amount.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  );
}
