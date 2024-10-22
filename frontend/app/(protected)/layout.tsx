import { getUserAccounts } from "@/api/user";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUserAccounts();

  return (
    <SidebarProvider>
      <AppSidebar accounts={data} />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
