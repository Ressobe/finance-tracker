import { getUserCategories } from "@/api/category";
import { getUserAccounts } from "@/api/user";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StoresProvider } from "@/providers/stores-provider";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: accounts } = await getUserAccounts();
  const { data: categories } = await getUserCategories();

  return (
    <SidebarProvider>
      <StoresProvider
        accounts={accounts}
        categories={categories}
        currency="PLN"
      >
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="p-10">{children}</div>
        </main>
      </StoresProvider>
    </SidebarProvider>
  );
}
