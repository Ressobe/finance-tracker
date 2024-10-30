import { getCategories } from "@/api/category";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDropdownMenu } from "@/modules/category/components/category-dropdown-menu";
import { CategoryDialog } from "@/modules/category/components/category-dialog";
import { Category } from "@/types/category";
import { CirclePlus } from "lucide-react";

export default async function SettingsPage() {
  const { data, error } = await getCategories();
  if (error) return null;

  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <span className="text-muted-foreground">
          Manage your account settings and categories
        </span>
      </div>
      <CurrencyCard />
      <CategoriesCard categories={data} />
    </section>
  );
}

type CategoriesCardProps = {
  categories: Category[];
};

function CategoriesCard({ categories }: CategoriesCardProps) {
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
        <ul className="w-full flex gap-4">
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
    <Card className="p-8">
      <CardContent>
        <div className="flex justify-between items-center">
          <div>{category.name}</div>
          <CategoryDropdownMenu category={category} />
        </div>
      </CardContent>
    </Card>
  );
}

function CurrencyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Currency</CardTitle>
        <CardDescription>
          Select your default currency for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button>Update</Button>
      </CardContent>
    </Card>
  );
}
