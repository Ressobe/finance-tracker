import { CategoryItem } from "@/features/category/components/category-item";
import { Card, CardContent, CardHeader } from "./ui/card";

type IncomeByCategoriesProps = {
  categories: {
    name: string;
    percentageShare: number;
    amount: number;
  }[];
};

export function IncomeByCategories({ categories }: IncomeByCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-2xl">Income by categories</h1>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {categories.map((item) => (
            <CategoryItem key={item.name} type="income" {...item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
