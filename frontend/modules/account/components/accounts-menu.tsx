"use client";

import { Wallet } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CreateAccountMenuSubItem } from "@/modules/account/components/create-account-menu-sub-item";
import { AccountDropdownMenu } from "@/modules/account/components/account-dropdown-menu";
import { useState } from "react";
import { useAccountsStore } from "@/stores/use-accounts-store";

export function AccountsMenu() {
  const accounts = useAccountsStore((state) => state.accounts);
  const [open, setOpen] = useState(false);

  const closeCollapse = () => {
    setOpen(false);
  };

  return (
    <SidebarMenu>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Wallet />
              <span>Accounts</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <CreateAccountMenuSubItem />
              {accounts.map((item) => {
                return (
                  <SidebarMenuSubItem key={item.id}>
                    <SidebarMenuSubButton href={`/accounts/${item.id}`}>
                      {item.name}
                      <AccountDropdownMenu
                        closeCollapse={closeCollapse}
                        account={item}
                      />
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
