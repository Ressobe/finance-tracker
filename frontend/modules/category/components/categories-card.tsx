import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Category } from "@/types/category";
import { CategoryDialog } from "./category-dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { CategoryDropdownMenu } from "./category-dropdown-menu";

type CategoriesCardProps = {
  categories: Category[];
};

export function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Add, edit or remove your categories for transactions
          </CardDescription>
        </div>
        <CategoryDialog>
          <Button
            variant="outline"
            className="space-x-2 bg-orange-500/10 hover:bg-orange-500/30 border-orange-500"
          >
            <CirclePlus className="text-orange-500" />
            <span>Create a new category</span>
          </Button>
        </CategoryDialog>
      </CardHeader>
      <CardContent>
        <ul className="w-full flex flex-wrap justify-evenly gap-8">
          {categories.map((item) => (
            <CategoryItem key={item.id} category={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Card className="p-8 flex-1">
      <div className="relative flex justify-center items-center p-6">
        <div>{category.name}</div>
        <CategoryDropdownMenu category={category} />
      </div>
    </Card>
  );
}
