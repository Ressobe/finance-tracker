import { Progress } from "@/components/ui/progress";

type CategoryItemProps = {
  type: "income" | "expense";
  name: string;
  percentageShare: number;
  amount: number;
};

export function CategoryItem({
  type,
  name,
  percentageShare,
  amount,
}: CategoryItemProps) {
  const indicatorColor = type === "income" ? "bg-green-500" : "bg-red-500";
  const trackColor = type === "income" ? "bg-green-500/20" : "bg-red-500/20";

  return (
    <li className="space-y-1">
      <div className="w-full flex justify-between">
        <div className="text-lg space-x-2">
          <span>{name} </span>
          <span className="text-muted-foreground text-sm">
            ({percentageShare}%)
          </span>
        </div>
        <span className="text-lg">{amount.toLocaleString()} PLN</span>
      </div>
      <Progress
        value={percentageShare}
        className="w-full"
        indicatorColor={indicatorColor}
        trackColor={trackColor}
      />
    </li>
  );
}
