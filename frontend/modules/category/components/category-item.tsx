import { Progress } from "@/components/ui/progress";

type CategoryItemProps = {
  type: "income" | "expense";
  categoryName: string;
  percentage: number;
  amount: number;
};

export function CategoryItem({
  type,
  categoryName,
  percentage,
  amount,
}: CategoryItemProps) {
  const indicatorColor = type === "income" ? "#22c55e" : "#ef4444";
  const trackColor = type === "income" ? "#bbf7d0" : "#fecaca";

  return (
    <li className="space-y-1">
      <div className="w-full flex justify-between">
        <div className="text-lg space-x-2">
          <span>{categoryName} </span>
          <span className="text-muted-foreground text-sm">({percentage}%)</span>
        </div>
        <span className="text-lg">{amount.toLocaleString()} PLN</span>
      </div>
      <Progress
        value={percentage}
        className="w-full h-2"
        indicatorColor={indicatorColor}
        trackColor={trackColor}
      />
    </li>
  );
}
