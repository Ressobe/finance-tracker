"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SavingGoalDialog } from "./saving-goal-dialog";
import { DeleteSavingGoalAlertDialog } from "./delete-saving-goal-alert-dialog";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { SavingGoalModel } from "@/types/saving-goal";
import { useState } from "react";

type SavingGoalDropdownMenuProps = {
  savingGoal: SavingGoalModel;
};

export function SavingGoalDropdownMenu({
  savingGoal,
}: SavingGoalDropdownMenuProps) {
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
        <SavingGoalDialog
          closeDropdownMenu={closeDropdownMenu}
          defaultValues={savingGoal}
        >
          <Button variant="ghost" className="p-0 gap-2">
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </SavingGoalDialog>

        <DeleteSavingGoalAlertDialog savingGoal={savingGoal}>
          <Button variant="ghost" className="p-0 gap-2">
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </Button>
        </DeleteSavingGoalAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
