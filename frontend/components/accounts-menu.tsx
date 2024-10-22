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
import { CreateAccountMenuSubItem } from "@/features/account/components/create-account-menu-sub-item";
import { AccountModel } from "@/types/account";
import Link from "next/link";
import { AccountDropdownMenu } from "@/features/account/components/account-dropdown-menu";
import { useState } from "react";

type AccountsMenuProps = {
  accounts: AccountModel[] | undefined;
};

export function AccountsMenu({ accounts }: AccountsMenuProps) {
  const [open, setOpen] = useState(false);

  const closeCollapse = () => {
    setOpen(false);
  };

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
              <span>Accounts</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <CreateAccountMenuSubItem />
              {accounts.map((item) => {
                return (
                  <Link key={item.id} href={`/accounts/${item.id}`}>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        {item.name}
                        <AccountDropdownMenu
                          closeCollapse={closeCollapse}
                          account={item}
                        />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </Link>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
