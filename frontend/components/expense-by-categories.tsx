import { CategoryItem } from "@/features/category/components/category-item";
import { Card, CardContent, CardHeader } from "./ui/card";

type ExpenseByCategoriesProps = {
  categories: {
    name: string;
    percentageShare: number;
    amount: number;
  }[];
};

export function ExpenseByCategories({ categories }: ExpenseByCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-2xl">Expense by categories</h1>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {categories.map((item) => (
            <CategoryItem key={item.name} type="expense" {...item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
