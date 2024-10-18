import { TrendingUp } from "lucide-react";

type IncomeProps = {
  amount: number;
  currencySymbol: string;
};

export function Income({ amount, currencySymbol }: IncomeProps) {
  return (
    <div className="flex gap-8 items-center text-xl w-full bg-secondary p-4 rounded">
      <div className="bg-green-500/20 p-6 rounded">
        <TrendingUp className="w-14 h-14 text-green-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg text-muted-foreground">Income</span>
        <span className="font-bold text-3xl">
          {amount.toLocaleString()} {currencySymbol}
        </span>
      </div>
    </div>
  );
}
