"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Transaction } from "@/types/transaction";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { TransactionDialog } from "./create-transaction-dialog";
import { DeleteTransactionAlertDialog } from "./delete-transaction-alert-dialog";
import { AccountModel } from "@/types/account";

type TransactionDropdownMenuProps = {
  account: AccountModel;
  transaction: Transaction;
  closeCollapse?: () => void;
};

export function TransactionDropdownMenu({
  account,
  transaction,
  closeCollapse,
}: TransactionDropdownMenuProps) {
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
        <TransactionDialog
          account={account}
          defaultValue={transaction}
          type="income"
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Pencil className="w-4 h-4" />
            Edit Transaction
          </button>
        </TransactionDialog>

        <DeleteTransactionAlertDialog
          transaction={transaction}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            Delete Transaction
          </button>
        </DeleteTransactionAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
