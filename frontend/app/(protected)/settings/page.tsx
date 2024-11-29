import { getCategories } from "@/api/category";
import { CategoriesCard } from "@/modules/category/components/categories-card";

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
      <CategoriesCard categories={data} />
    </section>
  );
}
