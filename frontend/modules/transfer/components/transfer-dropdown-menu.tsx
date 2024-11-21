"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Transfer } from "@/types/transfer";
import { DeleteTransferAlertDialog } from "./delete-transfer-alert-dialog";
import { TransferDialog } from "./transfer-dialog";
import { AccountModel } from "@/types/account";
import { SidebarMenuAction } from "@/components/ui/sidebar";

type TransferDropdownMenuProps = {
  account: AccountModel;
  transfer: Transfer;
};

export function TransferDropdownMenu({
  account,
  transfer,
}: TransferDropdownMenuProps) {
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
      <DropdownMenuContent side="right" align="start" className="p-2">
        <TransferDialog
          account={account}
          defaultValue={transfer}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Pencil className="w-4 h-4" />
            Edit Transfer
          </button>
        </TransferDialog>

        <DeleteTransferAlertDialog
          transfer={transfer}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            Delete Transfer
          </button>
        </DeleteTransferAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
