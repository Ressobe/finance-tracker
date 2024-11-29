import { CategoryItem } from "@/modules/category/components/category-item";
import { Card, CardContent, CardHeader } from "./ui/card";

type ExpenseByCategoriesProps = {
  categories: {
    categoryId: number;
    categoryName: string;
    amount: number;
    percentage: number;
  }[];
};

export function ExpenseByCategories({ categories }: ExpenseByCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-xl">Expense by categories</h1>
      </CardHeader>

      <CardContent>
        <ul className="space-y-8">
          {categories.map((item) => (
            <CategoryItem key={item.categoryId} type="expense" {...item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
