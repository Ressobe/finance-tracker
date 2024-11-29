"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Category } from "@/types/category";
import { CategoryDialog } from "./category-dialog";
import { DeleteCategoryAlertDialog } from "./delete-category-alert-dialog";

type CategoryDropdownMenu = {
  category: Category;
};

export function CategoryDropdownMenu({ category }: CategoryDropdownMenu) {
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
        <CategoryDialog
          defaultValue={category}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </CategoryDialog>

        <DeleteCategoryAlertDialog
          category={category}
          closeDropdownMenu={closeDropdownMenu}
        >
          <button className="w-full flex items-center gap-2 text-left text-sm p-2 hover:bg-secondary rounded transition-all cursor-pointer">
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </DeleteCategoryAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
