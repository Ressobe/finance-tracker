"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { useState } from "react";
import { Category } from "@/types/category";

type CreateCategoryDialogProps = {
  children: React.ReactNode;
  closeDropdownMenu?: () => void;
  defaultValue?: Category;
};

export function CategoryDialog({
  children,
  closeDropdownMenu,
  defaultValue,
}: CreateCategoryDialogProps) {
  const type = defaultValue === undefined ? "create" : "update";

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    closeDropdownMenu?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? (
              <>
                Create a new <span className="text-orange-500">category</span>
              </>
            ) : (
              <>
                Update{" "}
                <span className="text-orange-500">{defaultValue?.name}</span>{" "}
                category
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === "create" ? (
              <>Create a new category for your transactions</>
            ) : (
              <>Update category for your transactions</>
            )}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm defaultValues={defaultValue} close={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
