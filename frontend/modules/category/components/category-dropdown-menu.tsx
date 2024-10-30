"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { DeleteCategoryAlertDialog } from "./delete-category-alert-dialog";
import { Category } from "@/types/category";
import { CategoryDialog } from "./category-dialog";

type CategoryDropdownMenuProps = {
  category: Category;
};

export function CategoryDropdownMenu({ category }: CategoryDropdownMenuProps) {
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
        <CategoryDialog
          closeDropdownMenu={closeDropdownMenu}
          defaultValue={category}
        >
          <Button variant="ghost" className="p-0 gap-2">
            <Pencil className="w-4 h-4" />
            Edit category
          </Button>
        </CategoryDialog>

        <DeleteCategoryAlertDialog
          closeDropdownMenu={closeDropdownMenu}
          category={category}
        >
          <Button variant="ghost" className="p-0 gap-2">
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        </DeleteCategoryAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
