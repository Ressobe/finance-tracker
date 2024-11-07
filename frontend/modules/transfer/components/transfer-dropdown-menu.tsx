"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Transfer } from "@/types/transfer";
import { DeleteTransferAlertDialog } from "./delete-transfer-alert-dialog";
import { TransferDialog } from "./transfer-dialog";
import { AccountModel } from "@/types/account";

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
        <Button variant="ghost" className="p-0">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <TransferDialog
          closeDropdownMenu={closeDropdownMenu}
          account={account}
          defaultValue={transfer}
        >
          <Button variant="ghost" className="p-0 gap-2">
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </TransferDialog>

        <DeleteTransferAlertDialog
          transfer={transfer}
          closeDropdownMenu={closeDropdownMenu}
        >
          <Button variant="ghost" className="p-0 gap-2">
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </Button>
        </DeleteTransferAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
