"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { AccountDialog } from "./account-dialog";
import { AccountModel } from "@/types/account";
import { useState } from "react";
import { DeleteAccountAlertDialog } from "./delete-account-alert-dialog";

type AccountDropdownMenuProps = {
  account: AccountModel;
  closeCollapse?: () => void;
};

export function AccountDropdownMenu({
  account,
  closeCollapse,
}: AccountDropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const closeDropdownMenu = () => {
    if (closeCollapse) closeCollapse();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="p-2">
        <AccountDialog
          closeDropdownMenu={closeDropdownMenu}
          defaultValues={account}
        >
          <span className="w-full flex items-center gap-2 text-left text-sm p-1 hover:bg-secondary transition-all cursor-pointer">
            <Pencil className="w-4 h-4" />
            Edit Account
          </span>
        </AccountDialog>
        <DeleteAccountAlertDialog
          closeDropdownMenu={closeDropdownMenu}
          account={account}
        >
          <span className="w-full flex items-center gap-2 text-left text-sm p-1 hover:bg-secondary transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            Delete Account
          </span>
        </DeleteAccountAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
