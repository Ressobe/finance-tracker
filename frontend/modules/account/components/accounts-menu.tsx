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
import { AccountModel } from "@/types/account";
import { AccountDropdownMenu } from "@/modules/account/components/account-dropdown-menu";
import { useEffect, useState } from "react";
import useStore from "@/stores/useStore";
import accountsStore, { useAccountsStore } from "@/stores/accounts-store";

type AccountsMenuProps = {
  accounts: AccountModel[] | undefined;
};

export function AccountsMenu({ accounts }: AccountsMenuProps) {
  const [open, setOpen] = useState(false);
  const closeCollapse = () => {
    setOpen(false);
  };
  const accountsStore = useStore(useAccountsStore, (state) => state);
  if (!accountsStore) {
    return null;
  }

  if (accounts === undefined) return null;

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
              {accountsStore.count}
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
