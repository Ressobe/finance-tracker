import { CategoryItem } from "@/modules/category/components/category-item";
import { Card, CardContent, CardHeader } from "./ui/card";

type IncomeByCategoriesProps = {
  categories: {
    categoryId: number;
    categoryName: string;
    amount: number;
    percentage: number;
  }[];
};

export function IncomeByCategories({ categories }: IncomeByCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-xl">Income by categories</h1>
      </CardHeader>

      <CardContent>
        <ul className="space-y-8">
          {categories.map((item) => (
            <CategoryItem key={item.categoryId} type="income" {...item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
