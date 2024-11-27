"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { SavingTransactionDialog } from "./saving-transaction-dialog";
import { SavingGoalModel } from "@/types/saving-goal";
import { DeleteSavingTransactionAlertDialog } from "./delete-saving-transaction-alert-dialog";
import { SavingTransaction } from "@/types/saving-transaction";

type SavingTransactionDropdownMenuProps = {
  savingGoal: SavingGoalModel;
  savingTransaction: SavingTransaction;
  closeCollapse?: () => void;
};

export function SavingTransactionDropdownMenu({
  savingGoal,
  savingTransaction,
  closeCollapse,
}: SavingTransactionDropdownMenuProps) {
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
        <SavingTransactionDialog
          savingGoal={savingGoal}
          defaultValue={savingTransaction}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </SavingTransactionDialog>

        <DeleteSavingTransactionAlertDialog
          savingTransaction={null}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </DeleteSavingTransactionAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
