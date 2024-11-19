"use client";

import {
  CircleDollarSign,
  LucideProps,
  PiggyBank,
  Settings,
  SquareKanban,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutButton } from "./logout-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AccountsMenu } from "@/modules/account/components/accounts-menu";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareKanban,
  },
  {
    title: "Saving goals",
    url: "/saving-goals",
    icon: PiggyBank,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-10 h-10 text-green-500" />
          <h1 className="w-fit text-xl font-bold">Finance tracker</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <AppSidebarMenuItem item={items[0]} pathname={pathname} />
            <AccountsMenu />
            <SidebarMenu>
              {items.slice(1).map((item) => (
                <AppSidebarMenuItem
                  key={item.url}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}

type AppSidebarMenuItemProps = {
  item: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
  pathname: string;
};

function AppSidebarMenuItem({ item, pathname }: AppSidebarMenuItemProps) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          className={cn(
            item.url === pathname &&
              "bg-secondary-foreground/10 transition-all",
          )}
        >
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
