"use client";

import { useCurrencyStore } from "@/stores/use-currency-store";
import { Wallet } from "lucide-react";

type BalanceProps = {
  amount: number;
};

export function Balance({ amount }: BalanceProps) {
  const currency = useCurrencyStore((state) => state.currency);

  return (
    <div className="flex gap-8 items-center text-xl w-full bg-secondary p-4 rounded">
      <div className="bg-violet-500/20 p-6 rounded">
        <Wallet className="w-10 h-10 text-violet-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg text-muted-foreground">Balance</span>
        <span className="font-bold text-2xl">
          {amount.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  );
}
