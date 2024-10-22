import { MoreHorizontal, Wallet } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentAccount } from "@/features/account/components/dropdown-menu-content-account";
import { CreateAccountMenuSubItem } from "@/features/account/components/create-account-menu-sub-item";
import { AccountModel } from "@/types/account";
import Link from "next/link";
import { useState } from "react";
import { EditAccountDropdownMenuItem } from "@/features/account/components/edit-account-dropdown-menu-item";
import { DeleteAccountDropdownMenuItem } from "@/features/account/components/delete-account-dropdown-menu-item";

type AccountsMenuProps = {
  accounts: AccountModel[] | undefined;
};

export function AccountsMenu({ accounts }: AccountsMenuProps) {
  if (accounts === undefined) return null;

  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible">
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
                        <AccountDropdownMenu account={item} />
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

type AccountDropdownMenuProps = {
  account: AccountModel;
};

function AccountDropdownMenu({ account }: AccountDropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const closeDropdownMenu = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <EditAccountDropdownMenuItem
          closeDropdownMenu={closeDropdownMenu}
          account={account}
        />
        <DeleteAccountDropdownMenuItem
          closeDropdownMenu={closeDropdownMenu}
          account={account}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
